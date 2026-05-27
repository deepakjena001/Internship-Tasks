let tasks = [];

let editIndex = -1;

let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {

    let taskName = taskInput.value;

    taskName = taskName.trim();

    if(taskName === ""){
        alert("Enter some value");
        return;
    }

    if (editIndex !== -1){

        tasks[editIndex] = taskName;

        editindex = -1;

        addBtn.innerText = "Add task"
    } else {
        tasks.push(taskName);
    }

    

    taskInput.value = "";

    displayTasks();

});


function displayTasks(){


    taskList.innerHTML = "";

    for( i=0; i<tasks.length; i++){


        let li = document.createElement("div");

        let taskText = document.createElement("span");
        taskText.innerText = tasks[i];

        let btnDiv = document.createElement("div");
        btnDiv.classList.add("task-buttons");

        let editBtn = document.createElement("button");
        editBtn.innerText = "edit";
        editBtn.classList.add("edit-button");

        editBtn.addEventListener("click", function(){

            taskInput.value = tasks[i];

            editIndex = i

            addBtn.innerHTML = "Update task";

            
        })




        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "delete";
        deleteBtn.classList.add("delete-button");

        deleteBtn.addEventListener("click", function(){

            tasks.splice(i, 1);

            displayTasks();            
        })


        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(btnDiv);


        taskList.appendChild(li);
        
    }
}




