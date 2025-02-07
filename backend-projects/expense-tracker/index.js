#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "expenses.json");

const colors = {
	reset: "\x1b[0m",
	green: "\x1b[32m",
	red: "\x1b[31m",
	blue: "\x1b[34m",
};

// Helpers
const generateId = (expenses) => {
	if (!expenses || expenses.length === 0) return 1;

	const maxId = expenses.reduce(
		(max, expense) => (expense.id > max ? expense.id : max),
		0
	);
	return maxId + 1;
};

const getDate = () => {
	const currentDate = new Date();
	const options = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	};

	return currentDate.toLocaleDateString("en-US", options);
};

const read = () => {
	if (fs.existsSync(filePath)) {
		let data = fs.readFileSync(filePath, "utf-8");
		if (data.trim() === "") {
			data = "[]";
		} else {
			return JSON.parse(data);
		}
	}
	return [];
};

const write = (expenses) => {
	fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2), "utf8");
};

const add = (description, amount) => {
	const expenses = read();
	const newExpense = {
		id: generateId(expenses),
		description: description,
		amount: amount,
		date: getDate(),
	};

	expenses.push(newExpense);
	write(expenses);
	console.log(
		`${colors.green}Expense added successfully (ID:${newExpense.id})${colors.reset}`
	);
};

// add("lunch", 20);

const args = process.argv.slice(2);
const command = args[0];
const subCommand = args[1];

const parsedArgs = (args) => {
	const parsed = {};

	for (let i = 2; i < args.length; i += 2) {
		if (args[i].startsWith("--")) {
			parsed[args[i].substring(2)] = args[i + 1];
		}
	}
	return parsed;
};

if (command === "expense-tracker" && subCommand === "add") {
	const expense = parsedArgs(args);
	if (expense.description && expense.amount) {
		add(expense.description, expense.amount);
	} else {
		console.log(`${colors.red}Please add a valid expense.${colors.reset}`);
		console.log(`Use "--help" for usage information.`);
	}
}
