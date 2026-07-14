// ==========================
// StudySync - Task Manager
// ==========================

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [];

// Load tasks when page opens
window.onload = function () {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
};

// Add Task
function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
    text: task,
    completed: false
});
    saveTasks();

    displayTasks();

    taskInput.value = "";

}

// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span style="
                text-decoration:${task.completed ? "line-through" : "none"};
                font-weight:500;
            ">
                ${task.text}
            </span>

            <div>

                <button onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    updateProgress();
    updateDashboardStats();

}

// Delete Task
function deleteTask(index) {

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}
function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}

// Save to Local Storage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
// ==========================
// Progress Bar
// ==========================

function updateProgress(){

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    if(tasks.length === 0){

        progressBar.style.width = "0%";
        progressText.innerHTML = "0% Completed";

        return;

    }

    let completedTasks = tasks.filter(task => task.completed).length;

    let percent = Math.round((completedTasks / tasks.length) * 100);

    progressBar.style.width = percent + "%";

    progressText.innerHTML = percent + "% Completed";

}
// ==========================
// Pomodoro Timer
// ==========================

let totalSeconds = 25 * 60;
let timerInterval = null;

function updateTimerDisplay(){

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("timer").innerHTML =
        String(minutes).padStart(2,'0') + ":" +
        String(seconds).padStart(2,'0');

}

function startTimer(){

    if(timerInterval) return;

    timerInterval = setInterval(()=>{

        if(totalSeconds > 0){

            totalSeconds--;

            updateTimerDisplay();

        }else{

            clearInterval(timerInterval);

            timerInterval = null;

            alert("🎉 Pomodoro Completed! Take a 5-minute break.");

        }

    },1000);

}

function pauseTimer(){

    clearInterval(timerInterval);

    timerInterval = null;

}

function resetTimer(){

    pauseTimer();

    totalSeconds = 25 * 60;

    updateTimerDisplay();

}

updateTimerDisplay();

function updateDashboardStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("totalTasks").innerHTML = total;
    document.getElementById("completedTasks").innerHTML = completed;
    document.getElementById("pendingTasks").innerHTML = pending;
}
// ================================
// Assignment Tracker
// ================================

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

function addAssignment() {

    const input = document.getElementById("assignmentInput");
    const date = document.getElementById("assignmentDate");

    if (input.value.trim() === "") {
        alert("Please enter an assignment.");
        return;
    }

    assignments.push({
        title: input.value,
        due: date.value
    });
    localStorage.setItem(
    "assignments",
    JSON.stringify(assignments)
);

    input.value = "";
    date.value = "";

    renderAssignments();
}

function renderAssignments() {

    const list = document.getElementById("assignmentList");

    list.innerHTML = "";

    assignments.forEach((assignment, index) => {

        list.innerHTML += `
        <li>
            <div>
                <strong>${assignment.title}</strong><br>
                <small>📅 ${assignment.due || "No Due Date"}</small>
            </div>

            <button onclick="deleteAssignment(${index})">
                Delete
            </button>
        </li>
        `;
    });

}

function deleteAssignment(index){

    assignments.splice(index,1);
    localStorage.setItem(
    "assignments",
    JSON.stringify(assignments)
);

    renderAssignments();

}
renderAssignments();
// ==========================
// Dark Mode
// ==========================

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
    themeBtn.innerHTML = "☀️ Light Mode";
}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML="☀️ Light Mode";

    }else{

        localStorage.setItem("theme","light");

        themeBtn.innerHTML="🌙 Dark Mode";

    }

});
// ==========================
// Daily Motivation
// ==========================

const quotes = [

    "💡 Stay consistent. Success follows discipline.",

    "🚀 Small progress every day adds up to big results.",

    "📚 Learn something today that your future self will thank you for.",

    "🔥 Don't stop when you're tired. Stop when you're done.",

    "💻 Code. Learn. Improve. Repeat.",

    "🎯 Success is built one commit at a time.",

    "🌟 Great developers are made through practice, not talent."

];

function loadQuote(){

    const random = Math.floor(Math.random()*quotes.length);

    document.getElementById("quote").innerHTML = quotes[random];

}

loadQuote();
// ==========================
// Study Streak
// ==========================

function updateStreak(){

    let streak = localStorage.getItem("streak");

    let lastVisit = localStorage.getItem("lastVisit");

    const today = new Date().toDateString();

    if(lastVisit !== today){

        if(streak == null){

            streak = 1;

        }else{

            streak = parseInt(streak) + 1;

        }

        localStorage.setItem("streak",streak);

        localStorage.setItem("lastVisit",today);

    }

    document.getElementById("streak").innerHTML = streak + " Day";

}

updateStreak();
// ======================
// Subjects
// ======================

let subjects =
JSON.parse(localStorage.getItem("subjects")) || [];

function addSubject(){

    const input =
    document.getElementById("subjectInput");

    if(input.value.trim()==""){

        alert("Enter a subject");

        return;

    }

    subjects.push(input.value);

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    input.value="";

    renderSubjects();

}

function renderSubjects(){

    const list =
    document.getElementById("subjectList");

    list.innerHTML="";

    subjects.forEach((subject,index)=>{

        list.innerHTML+=`
        <li>

            ${subject}

            <button onclick="deleteSubject(${index})">
            Delete
            </button>

        </li>
        `;

    });

    document.getElementById("subjectCount").innerHTML =
    subjects.length;

}

function deleteSubject(index){

    subjects.splice(index,1);

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    renderSubjects();

}

renderSubjects();
function clearTasks(){
    localStorage.removeItem("tasks");
    location.reload();
}

function clearAssignments(){
    localStorage.removeItem("assignments");
    location.reload();
}

function clearSubjects(){
    localStorage.removeItem("subjects");
    location.reload();
}

function resetApp(){

    if(confirm("Reset everything?")){

        localStorage.clear();

        location.reload();

    }

}