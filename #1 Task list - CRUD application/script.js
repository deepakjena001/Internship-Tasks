// Array to store all tasks
let tasks = [];

// Variable to check edit mode
let editIndex = -1;

// Get HTML elements
let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");


// Add button click event
addBtn.addEventListener("click", function () {

    // Get input value
    let taskName = taskInput.value;

    // Remove extra spaces
    taskName = taskName.trim();

    // Check if input is empty
    if (taskName === "") {
        alert("Please enter a task");
        return;
    }

    // Edit task
    if (editIndex !== -1) {

        tasks[editIndex] = taskName;

        editIndex = -1;

        addBtn.innerText = "Add Task";
    }

    // Add new task
    else {

        tasks.push(taskName);
    }

    // Clear input field
    taskInput.value = "";

    // Display updated task list
    displayTasks();
});


// Function to display tasks
function displayTasks() {

    // Clear old list first
    taskList.innerHTML = "";

    // Loop through all tasks
    for (let i = 0; i < tasks.length; i++) {

        // Create list item
        let li = document.createElement("li");

        // Create task text
        let taskText = document.createElement("span");
        taskText.innerText = tasks[i];

        // Create button container
        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("task-buttons");

        // Create Edit button
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add("edit-btn");

        // Edit button click
        editButton.addEventListener("click", function () {

            // Put task text into input field
            taskInput.value = tasks[i];

            // Store current index
            editIndex = i;

            // Change button text
            addBtn.innerText = "Update Task";
        });

        // Create Delete button
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete-btn");

        // Delete button click
        deleteButton.addEventListener("click", function () {

            // Remove task from array
            tasks.splice(i, 1);

            // Update UI
            displayTasks();
        });

        // Add buttons inside button div
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);

        // Add text and buttons inside li
        li.appendChild(taskText);
        li.appendChild(buttonDiv);

        // Add li into ul
        taskList.appendChild(li);
    }
}