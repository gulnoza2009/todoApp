// Data
const todos = [];
let counter = 0;

todos[todos.length] = {
  text: "Bozorlik qilish",
  status: "inProgress",
  id: todos.length,
};
todos[todos.length] = {
  text: "Maktabdan bolalarni olish",
  status: "inProgress",
  id: todos.length,
};
todos[todos.length] = {
  text: "Ovqat tayyorlash",
  status: "completed",
  id: todos.length,
};
todos[todos.length] = {
  text: "Darsga borish",
  status: "inProgress",
  id: todos.length,
};
todos[todos.length] = {
  text: "Dars tayyorlash",
  status: "inProgress",
  id: todos.length,
};

// CONSTANTS ******************************
const todosUl = document.querySelector(".todos");
const btn_add = document.querySelector(".btn_add");
const modal = document.querySelector(".modal_container");
const create = document.querySelector(".create");
const cancel = document.querySelector(".cancel");
const input = document.querySelector(".input");
const btn_sort = document.querySelector(".btn_sort");
const menu_sort = document.querySelector(".menu_sort");
const completedLI = document.querySelector(".completedLI");
const inProgressLI = document.querySelector(".inProgressLI");
const removedLI = document.querySelector(".removedLI");
const all = document.querySelector(".all");

// FUNCTIONS **************************************************
// DELETED
const deleteItem = function (event) {
  const id = event.target.parentElement.value;
  console.log(id);
  const findTodoItem = todos.find((todo) => todo.id == id);
  console.log(findTodoItem);
  findTodoItem.status = "removed";
  if (counter == 2) {
    inProgressLIFn();
    btn_add.classList.add("none");
  } else {
    updatedTodosUI();
  }
};
const addDeleteListener = function () {
  const delBtns = document.querySelectorAll(".btn_delete");
  delBtns.forEach((btn) => btn.addEventListener("click", deleteItem));
};

// COMPLETED
const completedFn = (e) => {
  const id = e.target.value;
  const findForCompleted = todos.find((todo) => todo.id == id);
  findForCompleted.status =
    findForCompleted.status !== "completed" ? "completed" : "inProgress";
  if (counter == 1) {
    completedLIFn();
    btn_add.classList.add("none");
  } else if (counter == 2) {
    inProgressLIFn();
    btn_add.classList.add("none");
  } else if (counter == 0) updatedTodosUI();
};
const addCompletedListener = function () {
  const checkBtns = document.querySelectorAll(".btn_check");
  btn_add.classList.remove("none");
  checkBtns.forEach((btn) => btn.addEventListener("click", completedFn));
};

const updatedTodosUI = function () {
  todosUl.innerHTML = "";

  const TODOS = todos.filter((todo) => todo.status != "removed");

  TODOS.forEach((todo) => {
    const li = `
          <li class="todo_item ${
            todo.status === "completed" ? "completed" : ""
          }">
              <div class="todo_text">
                  <button class="btn_check" value="${todo.id}"></button>
                  <span>${todo.text}</span>
              </div>
              <button class="btn_delete ${
                todo.status == "completed" ? "none" : ""
              }" value="${todo.id}">
                  <img src="https://todo-app-google.netlify.app/img/remove-icon.svg" alt="">
              </button>
          </li>
      `;
    todosUl.insertAdjacentHTML("afterbegin", li);
  });
  addDeleteListener();
  addCompletedListener();
};

const completedLIFn = function () {
  todosUl.innerHTML = "";

  const completedTodos = todos.filter((todo) => todo.status == "completed");

  completedTodos.forEach((todo) => {
    const li = `
          <li class="todo_item completed">
              <div class="todo_text">
                  <button class="btn_check" value="${todo.id}"></button>
                  <span>${todo.text}</span>
              </div>
              <button class="btn_delete none" value="${todo.id}">
                  <img src="https://todo-app-google.netlify.app/img/remove-icon.svg" alt="">
              </button>
          </li>
      `;
    todosUl.insertAdjacentHTML("afterbegin", li);
  });
  addCompletedListener();
};

const inProgressLIFn = function () {
  todosUl.innerHTML = "";
  btn_add.classList.add("none");

  const inProgressTodos = todos.filter((todo) => todo.status == "inProgress");

  inProgressTodos.forEach((todo) => {
    const li = `
          <li class="todo_item">
              <div class="todo_text">
                  <button class="btn_check" value="${todo.id}"></button>
                  <span>${todo.text}</span>
              </div>
              <button class="btn_delete" value="${todo.id}">
                  <img src="https://todo-app-google.netlify.app/img/remove-icon.svg" alt="">
              </button>
          </li>
      `;
    todosUl.insertAdjacentHTML("afterbegin", li);
  });
  addCompletedListener();
  addDeleteListener();
};

// REMOVED
const recoveryFn = function (e) {
  const id = e.target.parentElement.value;
  const findForRemoved = todos.find((todo) => todo.id == id);
  findForRemoved.status = "inProgress";
  removedLIFn();
};
const addRecoveryListener = function () {
  const recoveryBtns = document.querySelectorAll(".recovery");
  recoveryBtns.forEach((btn) => btn.addEventListener("click", recoveryFn));
};
const removedLIFn = function () {
  todosUl.innerHTML = "";
  btn_add.classList.add("none");

  const removedTodos = todos.filter((todo) => todo.status == "removed");

  removedTodos.forEach((todo) => {
    const li = `
          <li class="todo_item">
              <div class="todo_text">
                  <button class="recovery" value="${todo.id}"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDL0_CREhc2yASzbvwA8MGwesvuW2zMBXug&usqp=CAU" alt=""></button>
                  <span>${todo.text}</span>
              </div>
          </li>
      `;
    todosUl.insertAdjacentHTML("afterbegin", li);
  });

  addRecoveryListener();
};

updatedTodosUI();

// EVENTS ******************************************************
// TO DO ITEM ADD
btn_add.addEventListener("click", () => {
  menu_sort.classList.remove("block");
  modal.classList.remove("none");
  input.value = "";
});
cancel.addEventListener("click", () => {
  modal.classList.add("none");
});
create.addEventListener("click", () => {
  if (input.value.trim()) {
    todos[todos.length] = {
      text: input.value,
      status: "inProgress",
      id: todos.length,
    };
    modal.classList.add("none");
  }
  updatedTodosUI();
});

// SORTS
btn_sort.addEventListener("click", () => {
  menu_sort.classList.toggle("block");
});
completedLI.addEventListener("click", () => {
  counter = 1;
  completedLIFn();
  btn_add.classList.add("none");
});
inProgressLI.addEventListener("click", () => {
  counter = 2;
  inProgressLIFn();
  btn_add.classList.add("none");
});
all.addEventListener("click", () => {
  counter = 0;
  updatedTodosUI();
});
removedLI.addEventListener("click", removedLIFn);
