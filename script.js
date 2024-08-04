const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const taskDescriptionInput = document.getElementById("taskDescriptionInput");
const startDateInput = document.getElementById("startDateInput");
const endDateInput = document.getElementById("endDateInput");
const editForm = document.getElementById("editForm");
const editTaskInput = document.getElementById("editTaskInput");
const editTaskDescriptionInput = document.getElementById("editTaskDescriptionInput");
const editStartDateInput = document.getElementById("editStartDateInput");
const editEndDateInput = document.getElementById("editEndDateInput");
let currentTask = null;

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
}

function getDateStatus(endDate) {
    const today = new Date();
    const end = new Date(endDate);
    if (end.toDateString() === today.toDateString()) {
        return 'today';
    } else if (end < today) {
        return 'overdue';
    } else {
        return '';
    }
}

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (taskText !== "") {
        const formattedStartDate = startDate ? formatDate(startDate) : '';
        const formattedEndDate = endDate ? formatDate(endDate) : '';
        const dateStatus = endDate ? getDateStatus(endDate) : '';

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="task-content">
                <span class="task-text">${taskText}</span>
                <span class="task-description">${taskDescription}</span>
                <div class="task-dates">
                    <span class="task-date">Início: ${formattedStartDate}</span>
                    <span class="task-date ${dateStatus}">Conclusão: ${formattedEndDate}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="editButton" onClick="editTask(this)">Editar</button>
                <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
            </div>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
        taskDescriptionInput.value = "";
        startDateInput.value = "";
        endDateInput.value = "";
    }
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector(".task-text").textContent;
    const taskDescription = li.querySelector(".task-description").textContent;
    const startDate = li.querySelector(".task-dates .task-date").textContent.split(": ")[1];
    const endDate = li.querySelectorAll(".task-dates .task-date")[1].textContent.split(": ")[1];

    editTaskInput.value = taskText;
    editTaskDescriptionInput.value = taskDescription;
    editStartDateInput.value = startDate;
    editEndDateInput.value = endDate;

    currentTask = li;
    editForm.style.display = "block";
}

function saveEdit() {
    const taskText = editTaskInput.value.trim();
    const taskDescription = editTaskDescriptionInput.value.trim();
    const startDate = editStartDateInput.value;
    const endDate = editEndDateInput.value;

    if (taskText !== "") {
        const formattedStartDate = startDate ? formatDate(startDate) : '';
        const formattedEndDate = endDate ? formatDate(endDate) : '';
        const dateStatus = endDate ? getDateStatus(endDate) : '';

        currentTask.querySelector(".task-text").textContent = taskText;
        currentTask.querySelector(".task-description").textContent = taskDescription;
        currentTask.querySelector(".task-dates .task-date").textContent = `Início: ${formattedStartDate}`;
        currentTask.querySelectorAll(".task-dates .task-date")[1].textContent = `Conclusão: ${formattedEndDate}`;
        currentTask.querySelectorAll(".task-dates .task-date")[1].className = `task-date ${dateStatus}`;

        editForm.style.display = "none";
        currentTask = null;
    }
}

function cancelEdit() {
    editForm.style.display = "none";
    currentTask = null;
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    taskList.removeChild(li);
}
