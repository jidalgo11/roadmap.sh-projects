async function fetchData() {
	fetch("https://api.github.com/users/jidalgo11/events").then((response) =>
		response.json().then((data) => {
			displayActivity(data);
		})
	);
}

function displayActivity(events) {
	console.log(events.length);
	if (events.length === 0) {
		console.log("No recent activity found.");
	}
	events.forEach((event) => {
		let output;
		switch (event.type) {
			case "PushEvent":
				const commitCount = event.payload.commits.length;
				output = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
				break;
			case "IssuesEvent":
				output = `${
					event.payload.action.charAt(0).toUpperCase() +
					event.payload.action.slice(1)
				} an issue in ${event.repo.name}`;
				break;
			case "WatchEvent":
				output = `Starred ${event.repo.name}`;
				break;
			case "CreateEvent":
				output = `Created ${event.payload.ref_type} in ${event.repo.name}`;
				break;
			case "ForkEvent":
				output = `Forked ${event.repo.name}`;
			case "DeleteEvent":
				output = `Deleted ${event.payload.ref_type} in ${event.repo.name}`;
			default:
				output = `${event.type.replace("Event", "")} in ${event.repo.name}`;
				break;
		}
		console.log(`- ${output}`);
	});
}

fetchData();
