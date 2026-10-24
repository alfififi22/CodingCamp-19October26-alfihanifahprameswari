// ===== Helpers for Local Storage =====
function load(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ===== Light / Dark mode (Challenge 1) =====
const themeBtn = document.getElementById("theme-btn");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}
applyTheme(load("theme", "light"));

themeBtn.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  save("theme", next);
  applyTheme(next);
});

// ===== Greeting, clock & custom name (Challenge 2) =====
const clockEl = document.getElementById("clock");
const dateEl = document.getElementById("date");
const greetingEl = document.getElementById("greeting");
const nameInput = document.getElementById("name-input");
let userName = load("userName", "");
nameInput.value = userName;

function getGreeting(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 15) return "Good afternoon";
  if (hour < 18) return "Good evening";
  return "Good night";
}

function updateClock() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString("en-GB");
  dateEl.textContent = now.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
  const greet = getGreeting(now.getHours());
  greetingEl.textContent = userName ? greet + ", " + userName + "!" : greet + "!";
}
updateClock();
setInterval(updateClock, 1000);

document.getElementById("name-form").addEventListener("submit", (e) => {
  e.preventDefault();
  userName = nameInput.value.trim();
  save("userName", userName);
  updateClock();
});

// ===== Focus Timer (25 minutes) =====
const TIMER_SECONDS = 25 * 60;
const timerEl = document.getElementById("timer");
let remaining = TIMER_SECONDS;
let timerId = null;

function showTimer() {
  const m = String(Math.floor(remaining / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  timerEl.textContent = m + ":" + s;
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

document.getElementById("start-btn").addEventListener("click", () => {
  if (timerId) return; // already running
  timerId = setInterval(() => {
    remaining--;
    showTimer();
    if (remaining <= 0) {
      stopTimer();
      alert("Time's up! Take a break 🎉");
    }
  }, 1000);
});

document.getElementById("stop-btn").addEventListener("click", stopTimer);

document.getElementById("reset-btn").addEventListener("click", () => {
  stopTimer();
  remaining = TIMER_SECONDS;
  showTimer();
});
showTimer();

// ===== To-Do List (Challenge 3: prevent duplicates) =====
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoMsg = document.getElementById("todo-msg");
let tasks = load("tasks", []);

function isDuplicate(text, ignoreId) {
  return tasks.some(t => t.id !== ignoreId && t.text.toLowerCase() === text.toLowerCase());
}

function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.done;
    check.addEventListener("change", () => {
      task.done = check.checked;
      save("tasks", tasks);
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "secondary";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText === null) return;
      const clean = newText.trim();
      if (!clean) return;
      if (isDuplicate(clean, task.id)) {
        todoMsg.textContent = "That task already exists!";
        return;
      }
      todoMsg.textContent = "";
      task.text = clean;
      save("tasks", tasks);
      renderTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "del";
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      save("tasks", tasks);
      renderTasks();
    });

    li.append(check, span, editBtn, delBtn);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  if (isDuplicate(text, null)) {
    todoMsg.textContent = "That task already exists!";
    return;
  }
  todoMsg.textContent = "";
  tasks.push({ id: Date.now(), text: text, done: false });
  save("tasks", tasks);
  todoInput.value = "";
  renderTasks();
});
renderTasks();

// ===== Quick Links =====
const linksEl = document.getElementById("links");
const defaultLinks = [
  { name: "Google", url: "https://google.com" },
  { name: "GitHub", url: "https://github.com" },
  { name: "YouTube", url: "https://youtube.com" }
];
let links = load("links", defaultLinks);

function renderLinks() {
  linksEl.innerHTML = "";
  links.forEach((link, index) => {
    const wrap = document.createElement("div");
    wrap.className = "link-item";

    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const del = document.createElement("button");
    del.textContent = "✕";
    del.setAttribute("aria-label", "Delete " + link.name);
    del.addEventListener("click", () => {
      links.splice(index, 1);
      save("links", links);
      renderLinks();
    });

    wrap.append(a, del);
    linksEl.appendChild(wrap);
  });
}

document.getElementById("link-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("link-name").value.trim();
  let url = document.getElementById("link-url").value.trim();
  if (!name || !url) return;
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  links.push({ name: name, url: url });
  save("links", links);
  e.target.reset();
  renderLinks();
});
renderLinks();
