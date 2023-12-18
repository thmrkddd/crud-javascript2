//!===================== TodoList =======================
function getItemLC() {
  return JSON.parse(localStorage.getItem("task-data"));
}

// function setItemLC(){
//   return localStorage.setItem("task-data", JSON.stringify(data));
// }

//? CRUD
//! CREATE
let btn = document.querySelector(".btn");
let inp = document.querySelector(".task-input");
let list = document.querySelector(".task-list");

btn.addEventListener("click", () => {
  if (!inp.value.trim()) {
    alert("Заполните поле!");
    return;
  }
  let obj = {
    task: inp.value,
  };
  setItemToStorage(obj);
  createElement();
  inp.value = "";
});

function setItemToStorage(task) {
  let data = getItemLC() || [];
  data.push(task);
  localStorage.setItem("task-data", JSON.stringify(data));
}

//! READ
function createElement() {
  if (!getItemLC()) {
    localStorage.setItem("task-data", "[]");
  }
  let newData = getItemLC();
  list.innerHTML = "";
  newData.forEach((elem, index) => {
    let li = document.createElement("li");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    //? событии
    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
    li.innerText = elem.task;
    li.appendChild(btnDelete);
    li.appendChild(btnEdit);
    list.appendChild(li);
  });
}

//! DELETE
function deleteElement(index) {
  let data = getItemLC();
  data.splice(index, 1);
  localStorage.setItem("task-data", JSON.stringify(data));
  createElement();
}

//! UPDATE
let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let btnClose = document.querySelector(".btn-close");

function editElement(index) {
  mainModal.style.display = "block";
  let data = getItemLC();
  inpEdit.setAttribute("id", index);
  inpEdit.value = data[index].task;
}

let btnSave = document.querySelector(".btn-save");
btnSave.addEventListener("click", () => {
  let data = getItemLC();
  let index = inpEdit.id;
  if (!inpEdit.value.trim()) {
    alert("Заполните поле!");
    return;
  }
  let newTask = {
    task: inpEdit.value,
  };
  data.splice(index, 1, newTask);
  localStorage.setItem("task-data", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});

// // XMLHttpRequest
// let xhr = new XMLHttpRequest();
// xhr.open("GET", "http://localhost:8000/todos");
// xhr.send();
// xhr.onload = function () {
//   // console.log(xhr.response);
//   let data = JSON.parse(xhr.response);
//   console.log(data);
// };

// fetch()
// let promise = fetch("http://localhost:8000/todos");
// promise
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });
