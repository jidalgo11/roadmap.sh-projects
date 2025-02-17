const colors = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
};

async function fetchData(user) {
	try {
		const response = await fetch(`https://api.github.com/users/${user}/events`);

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("User not found. Please check the username.");
			} else if (response.status === 403) {
				throw new Error("Rate limit exceeded. Try again later.");
			} else {
				throw new Error(
					`Unexpected error: ${response.status} ${response.statusText}`
				);
			}
		}

		return await response.json(); // Return the fetched data
	} catch (error) {
		console.error("Error fetching data:", error.message);
		return null; // Return null to handle errors gracefully
	}
}

function handleNonPushEvent(event) {
	let output;
	switch (event.type) {
		case "IssuesEvent":
			output = `Handled issue in ${event.repo.name}`;
			break;
		case "WatchEvent":
			output = `Starred ${event.repo.name}`;
			break;
		case "ForkEvent":
			output = `Forked ${event.repo.name}`;
			break;
		default:
			output = `${event.type} in ${event.repo.name}`;
	}
	console.log(`- ${output}`);
}

function processPushEvents(data) {
	const pushEventMap = new Map();

	data.forEach((event, i) => {
		if (event.type === "PushEvent") {
			const repoName = event.repo.name;
			const commitCount = event.payload.commits.length;

			if (pushEventMap.has(repoName)) {
				pushEventMap.set(repoName, pushEventMap.get(repoName) + commitCount);
			} else {
				pushEventMap.set(repoName, commitCount);
			}

			if (i === data.length - 1 || data[i + 1].type !== "PushEvent") {
				for (const [repo, totalCommits] of pushEventMap) {
					console.log(
						`- Pushed ${totalCommits} commit${
							totalCommits === 1 ? "" : "s"
						} to ${repo}`
					);
				}
				pushEventMap.clear();
			}
		} else {
		}
	});
}

async function displayActivity(user) {
	const data = await fetchData(user);
	if (!data || data.length === 0) {
		console.log("No recent activity found.");
		return;
	}
	console.log("Output:");

	// Use a Map to track aggregated PushEvents for the most recent push event batch
	const pushEventMap = new Map();

	// Loop through all events
	data.forEach((event, index) => {
		if (event.type === "PushEvent") {
			const repoName = event.repo.name;
			const commitCount = event.payload.commits.length;

			// Aggregate commit counts for the same repo **until another event is encountered**
			if (pushEventMap.has(repoName)) {
				pushEventMap.set(repoName, pushEventMap.get(repoName) + commitCount);
			} else {
				pushEventMap.set(repoName, commitCount);
			}

			// Check if the next event is a different type OR if it's the last event
			if (index === data.length - 1 || data[index + 1].type !== "PushEvent") {
				// Print all push events when encountering a different event or end of list
				for (const [repo, totalCommits] of pushEventMap) {
					console.log(
						`- Pushed ${totalCommits} commit${
							totalCommits === 1 ? "" : "s"
						} to ${repo}`
					);
				}
				pushEventMap.clear(); // Clear the pushEventMap for the next batch
			}
		} else {
			// First, output any stored push events before handling the next non-push event
			if (pushEventMap.size > 0) {
				for (const [repo, totalCommits] of pushEventMap) {
					console.log(
						`- Pushed ${totalCommits} commit${
							totalCommits === 1 ? "" : "s"
						} to ${repo}`
					);
				}
				pushEventMap.clear();
			}

			// Process and print non-push events immediately
			let output;
			switch (event.type) {
				case "IssuesEvent":
					output =
						event.payload.action.charAt(0).toUpperCase() +
						event.payload.action.slice(1) +
						` an issue in ${event.repo.name}`;
					break;
				case "WatchEvent":
					output = `Starred ${event.repo.name}`;
					break;
				case "CreateEvent":
					output = `Created ${event.payload.ref_type} in ${event.repo.name}`;
					break;
				case "ForkEvent":
					output = `Forked ${event.repo.name}`;
					break;
				case "DeleteEvent":
					output = `Deleted ${event.payload.ref_type} in ${event.repo.name}`;
					break;
				default:
					output = `${event.type.replace("Event", "")} in ${event.repo.name}`;
					break;
			}
			console.log(`- ${output}`);
		}
	});
}

const args = process.argv.slice(2);
const command = args[0];
const username = args[1];

if (command !== "github-activity") {
	console.log(`${colors.red}Use the "github-activity" command.${colors.reset}`);
} else if (!username) {
	console.log(`${colors.red}Please provide a username.${colors.reset}`);
} else {
	displayActivity(username);
}
