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

#### Optional

Run `npm link` to install it globally.

## Usage

- Add a task

```bash
task-cli add "Learn Nodes.js"
```

- List tasks

```bash
task-cli list
```

- List tasks based on status

```bash
# List todo tasks
task-cli list todo

# List in-progress tasks
task-cli list in-progress

# List done tasks
task-cli list done
```

- Update task based on id

```bash
task-cli update 1 "Learn more Nodes.js"
```

- Delete task based on id

```bash
task-cli delete 1
```
