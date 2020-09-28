let $todoInput;
let $alertInfo;
let $addBtn;
let $ulList;
let $newTask;
let $popup;
let $popupInfo;
let $editedTodo;
let $popupInput;
let $addPopupBtn;
let $closeTodoBtn;
let $idNumber = 0;
let allTasks;

const addNewTask = () => {
  if ($todoInput.value !== "") {
    $idNumber++;
    $newTask = document.createElement(`li`);
    $newTask.innerText = $todoInput.value;
    $ulList.appendChild($newTask);
    $newTask.setAttribute(`id`, `todo-${$idNumber}`);
    $todoInput.value = ` `;
    $alertInfo.innerText = " ";
    createToolsArea();
  } else {
    $alertInfo.innerText = "Nie podałeś żadnego zadania!";
  }
};

const createToolsArea = () => {
  let toolsPanel = document.createElement(`div`);
  toolsPanel.classList.add(`tools`);

  let completeBtn = document.createElement(`button`);
  completeBtn.classList.add(`complete`);

  let editBtn = document.createElement(`button`);
  editBtn.classList.add(`edit`);

  let deleteBtn = document.createElement(`button`);
  deleteBtn.classList.add(`delete`);

  $newTask.appendChild(toolsPanel);

  toolsPanel.appendChild(completeBtn);
  completeBtn.innerText = "P";

  toolsPanel.appendChild(editBtn);
  editBtn.innerText = "Edit";

  toolsPanel.appendChild(deleteBtn);
  deleteBtn.innerText = "X";
};

const checkClick = (event) => {
  if (event.target.closest("button").classList.contains("complete")) {
    event.target.closest("li").classList.toggle(`completed`);
    event.target.closest("button").classList.toggle(`completed`);
  } else if (event.target.closest("button").className === "edit") {
    editTask(event);
  } else if (event.target.closest("button").classList.contains("delete")) {
    deletetask(event);
  }
};

const editTask = () => {
  const oldTodo = event.target.closest(`li`).id;
  $editedTodo = document.getElementById(oldTodo);
  $popupInput.value = $editedTodo.firstChild.textContent;

  $popup.style.display = `flex`;
};

const changeTodo = () => {
  if ($popupInput.value !== "") {
    $editedTodo.firstChild.textContent = $popupInput.value;
    $popup.style.display = "none";
    $popupInfo.innerText = "";
  } else {
    $popupInfo.innerText = `Musisz podać jakąś treść!`;
  }
};

const closePopup = () => {
  $popupInfo.innerText = "";
  $popup.style.display = `none`;
};

const deletetask = (event) => {
  const deleteTodo = event.target.closest("li");
  deleteTodo.remove();

  if ($allTasks.length === 0) {
    $alertInfo.innerText = `Brak zadań na liście`;
  }
};

const enterCheck = () => {
  if (event.keyCode === 13) {
    addNewTask();
  }
};

const prepareDOMElements = () => {
  $todoInput = document.querySelector(`.todoInput`);
  $alertInfo = document.querySelector(`.alertInfo`);
  $addBtn = document.querySelector(`.addBtn`);
  $ulList = document.querySelector(`.todoList ul`);

  $popup = document.querySelector(".popup");
  $popupInfo = document.querySelector(".popupInfo");
  $popupInput = document.querySelector(".popupInput");
  $addPopupBtn = document.querySelector(".accept");
  $closeTodoBtn = document.querySelector(".cancel");

  $allTasks = $ulList.getElementsByTagName("li");
};

const prepareDOMEvents = () => {
  $addBtn.addEventListener(`click`, addNewTask);
  $ulList.addEventListener(`click`, checkClick);
  $closeTodoBtn.addEventListener(`click`, closePopup);
  $addPopupBtn.addEventListener("click", changeTodo);
  $todoInput.addEventListener(`keyup`, enterCheck);
};

const main = () => {};
prepareDOMElements();
prepareDOMEvents();

document.addEventListener(`DOMContentLoaded`, main);
