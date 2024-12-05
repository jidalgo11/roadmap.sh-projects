#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

const colors = {
	reset: "\x1b[0m",
	green: "\x1b[32m",
	red: "\x1b[31m",
	blue: "\x1b[34m",
};

const commands = [
	{ name: "add", description: "Add a new task." },
	{ name: "update", description: "Update an existing task by ID." },
	{ name: "delete", description: "Delete a task by ID." },
	{ name: "mark-in-progress", description: "Set a task to in-progress by ID." },
	{ name: "mark-done", description: "Set a task to done by ID." },
	{ name: "list", description: "List all tasks." },
	{ name: "list done", description: "List all done tasks." },
	{ name: "list todo", description: "List all todo tasks." },
	{ name: "list in-progress", description: "List all in-progress tasks." },
];

const examples = [
	{ name: "Add a task", description: "task-cli add 'Learn Nodes.js'" },
	{
		name: "Update a task",
		description: "task-cli update 1 'Learn more Nodes.js'",
	},
	{ name: "Delete a task", description: "task-cli delete 1" },
	{
		name: "Mark task to in-progress",
		description: "task-cli mark-in-progress 1",
	},
	{
		name: "Mark task to done",
		description: "task-cli mark-done 1",
	},
	{
		name: "List tasks",
		description: "task-cli list",
	},
	{ name: "List done tasks", description: "task-cli list done" },
	{ name: "List todo tasks", description: "task-cli list todo" },
	{ name: "List in-progress tasks", description: "task-cli list in-progress" },
];

function displayHelp() {
	console.log("TASK-CLI: A Simple CLI for Managing Tasks\n");
	console.log("USAGE:\n task-cli [COMMAND] [OPTIONS]\n");
	console.log("COMMANDS:\n");
	commands.forEach((cmd) => {
		console.log(` ${cmd.name.padEnd(25)}${cmd.description}`);
	});
	console.log("\nOPTIONS:\n -h, --help	Display help\n");
	console.log("EXAMPLES:\n");
	examples.forEach((example) => {
		console.log(` ${example.name}:\n  ${example.description}\n`);
	});
}

function readTasks() {
	if (fs.existsSync(filePath)) {
		let data = fs.readFileSync(filePath, "utf8");
		if (data.trim() === "") {
			data = "[]";
		}
		return JSON.parse(data);
	}
	return [];
}

function writeTasks(tasks) {
	fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
}

function generateTaskID(tasks) {
	if (!tasks || tasks.length === 0) {
		return 1;
	}
	const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
	return maxId + 1;
}

function getDateAndTime() {
	const currentDate = new Date();
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};

	return currentDate.toLocaleDateString("en-US", options);
}

function getMaxDescriptionLength() {
	const tasks = readTasks();
	let maxDescriptionLength = 0;
	tasks.forEach((task, i) => {
		if (task.description.length > maxDescriptionLength) {
			maxDescriptionLength = task.description.length;
		}
	});
	return maxDescriptionLength;
}

function addTask(description) {
	const tasks = readTasks();
	const newTask = {
		id: generateTaskID(tasks),
		description: description,
		status: "todo",
		createdAt: getDateAndTime(),
		updatedAt: getDateAndTime(),
	};
	tasks.push(newTask);
	writeTasks(tasks);
	console.log(
		`${colors.green}Task added successfully (ID: ${newTask.id})${colors.reset}`
	);
}

function updateTask(id, description) {
	const tasks = readTasks();
	const task = tasks.find((task) => task.id === parseInt(id));

	if (task) {
		task.description = description;
		task.updatedAt = getDateAndTime();
		writeTasks(tasks);
	} else {
		console.log(
			`${colors.red}Task doesn't exist. Please enter a valid ID.${colors.reset}`
		);
	}
}

function deleteTask(id) {
	const tasks = readTasks();
	const task = tasks.find((task) => task.id === parseInt(id));

	if (task) {
		tasks.splice(tasks.indexOf(task), 1);
		writeTasks(tasks);
	} else {
		console.log(
			`${colors.red}Task doesn't exist. Please enter a valid ID${colors.reset}`
		);
	}
}

function updateStatus(id, status) {
	const tasks = readTasks();
	const task = tasks.find((task) => task.id === parseInt(id));

	if (task) {
		task.status = status;
		task.updatedAt = getDateAndTime();
		writeTasks(tasks);
	} else {
		console.log(
			`${colors.red}Task doesn't exist. Please enter a valid ID${colors.reset}`
		);
	}
}

function filterTasksByStatus(status) {
	const tasks = readTasks();
	return tasks.filter((task) => task.status === status);
}

function listTasks(status = "all") {
	const tasks = readTasks();
	const paddedString = getMaxDescriptionLength();
	console.log(
		"ID".padEnd(10) + "Description".padEnd(paddedString + 10) + "Status"
	);
	console.log("_".repeat(10 + paddedString + 25));
	if (status === "all") {
		tasks.forEach((task) => {
			console.log(
				task.id.toString().padEnd(10) +
					task.description.padEnd(paddedString + 10) +
					(task.status === "done"
						? colors.red + task.status + colors.reset
						: "") +
					(task.status === "todo"
						? colors.blue + task.status + colors.reset
						: "") +
					(task.status === "in-progress"
						? colors.green + task.status + colors.reset
						: "")
			);
		});
	} else if (status === "done") {
		const tasksCompleted = filterTasksByStatus("done");
		tasksCompleted.forEach((task) => {
			console.log(
				task.id.toString().padEnd(10) +
					task.description.padEnd(paddedString + 10) +
					colors.red +
					task.status +
					colors.reset
			);
		});
	} else if (status === "todo") {
		const tasksTodo = filterTasksByStatus("todo");
		tasksTodo.forEach((task) => {
			console.log(
				task.id.toString().padEnd(10) +
					task.description.padEnd(paddedString + 10) +
					colors.blue +
					task.status +
					colors.reset
			);
		});
	} else if (status === "in-progress") {
		const tasksInProgress = filterTasksByStatus("in-progress");
		tasksInProgress.forEach((task) => {
			console.log(
				task.id.toString().padEnd(10) +
					task.description.padEnd(paddedString + 10) +
					colors.green +
					task.status +
					colors.reset
			);
		});
	}
}

const args = process.argv.slice(2);
if (args[0] === "add") {
	const task = args.slice(1).join(" ");
	try {
		if (!task) {
			throw new Error(`${colors.red}Please add a valid task.${colors.reset}`);
		}
		addTask(task);
	} catch (error) {
		console.error(error.message);
		console.log(`Use "--help" for usage information.`);
	}
} else if (args[0] === "update") {
	const id = args[1];
	const description = args.slice(2).join(" ");
	try {
		if (!id || !description) {
			throw new Error(
				`${colors.red}Please provide a task ID and new description${colors.reset}`
			);
		}
		updateTask(id, description);
	} catch (error) {
		console.error(error.message);
		console.log("Example: task-cli update <id> <task>");
	}
} else if (args[0] === "delete") {
	const id = args[1];
	try {
		if (!id) {
			throw new Error(`${colors.red}Please provide a task ID${colors.reset}`);
		}
		deleteTask(id);
	} catch (error) {
		console.error(error.message);
		console.log(`Example: task-cli delete <id>`);
	}
} else if (args[0] === "mark-in-progress") {
	const id = args[1];
	try {
		if (!id) {
			throw new Error(`${colors.red}Please provide a task ID${colors.reset}`);
		}
		updateStatus(id, "in-progress");
	} catch (error) {
		console.error(error.message);
		console.log("Example: task-cli mark-in-progress <id>");
	}
} else if (args[0] === "mark-done") {
	const id = args[1];
	try {
		if (!id) {
			throw new Error(`${colors.red}Please provide a task ID${colors.reset}`);
		}
		updateStatus(id, "done");
	} catch (error) {
		console.error(error.message);
		console.log("Example: task-cli mark-done <id>");
	}
} else if (args[0] === "list") {
	let status = args[1];
	listTasks(status);
} else if (args[0] === "--help" || args[0] === "-h" || args[0] === "help") {
	displayHelp();
} else {
	console.log('Unknown command. Use "--help" for usage information');
}
