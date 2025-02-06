# Task Tracker

Solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) project from [roadmap.sh](https://roadmap.sh)

This is a simple CLI for managing tasks.

## Features

- Add, List, Update, and Delete tasks.
- Mark tasks `todo`, `in-progress`, or `done`.
- List tasks based on their status: `todo`, `in-progress`, or `done`.

## Prerequisites

- Node.js installed on your system.

## Installation

**_Clone the repo_**

```bash
git clone https://github.com/jidalgo11/roadmap.sh-projects.git

# Navigate to the project directory
cd roadmap.sh-projects/backend-projects/task-tracker
```

Give `index.js` execution permissions:

```bash
chmod +x index.js
```

## Usage

- Add a task

```bash
./index.js task-cli add "Learn Nodes.js"
```

- List tasks

```bash
./index.js task-cli list
```

- List tasks based on status

```bash
# List todo tasks
./index.js task-cli list todo

# List in-progress tasks
./index.js task-cli list in-progress

# List done tasks
./index.js task-cli list done
```

- Update task based on id

```bash
./index.js task-cli update 1 "Learn more Nodes.js"
```

- Delete task based on id

```bash
./index.js task-cli delete 1
```

## Optional

Run `npm link` to install it globally.
Then you can use the command anywhere in the system and omit ```./index.js``` to manage tasks.

Example:

```bash
task-cli add "Learn Node.js"
```
