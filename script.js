const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create a new list item
        let li = document.createElement("li");
        
        // Create the span for the task text
        let taskText = document.createElement("span");
        taskText.className = "task"; // Add a class for styling
        taskText.innerHTML = inputBox.value;
        li.appendChild(taskText); // Append task text to the list item

        // Create the span for the delete icon
        let deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "\u00d7"; // Unicode for the multiplication sign (×)//
        deleteIcon.className = "delete"; // Class for the delete button
        deleteIcon.onclick = function() {
            li.remove(); // Remove the list item
            saveData(); // Save changes
        };
        li.appendChild(deleteIcon); // Append delete icon to the list item

        // Add the list item to the container
        listContainer.appendChild(li);
        
        // Clear the input box
        inputBox.value = ""; 
        
        // Save to local storage
        saveData();
    }
}

// Toggle the checked class when a task is clicked
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN" && e.target.className === "task") {
        e.target.parentElement.classList.toggle("checked");
        saveData();
    }
}, false);

// Save the list items to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load the saved list items from local storage
function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data");
    if (listContainer.innerHTML) {
        // Attach delete functionality again to each delete button after reload
        let deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(button => {
            button.onclick = function() {
                button.parentElement.remove(); // Remove the list item
                saveData(); // Save changes
            };
        });
    }
}

showTasks();
