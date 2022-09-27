// VARIABLES
let todos = [];
const filters = {
  searchTitle: "",
  showFinished: false,
  showUnfinished: false,
};

// FUNCIONES
const createTodo = (text) => {
  const todo = {
    title: text,
    completed: false,
  };
  todos.push(todo);
  saveTodosToLocalStorage();
};
const generateTodoDOM = (todoObj) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const todoText = document.createElement("span");

  // Setup todo checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todoObj.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todoObj.title);
    renderTodos();
  });

  // Setup the todo text
  todoText.textContent = todoObj.title;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todoObj.title);
    renderTodos();
  });

  return todoEl;
};
const toggleTodo = (title) => {
  const todo = todos.find(
    (todo) => todo.title.toLowerCase() === title.toLowerCase()
  );

  if (todo) {
    todo.completed = !todo.completed;
  }
  saveTodosToLocalStorage();
};
const removeTodo = (title) => {
  const todoIndex = todos.findIndex(
    (todo) => todo.title.toLowerCase() === title.toLowerCase()
  );

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
  saveTodosToLocalStorage();
};
const renderTodos = () => {
  // filtered Todos
  let filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(filters.searchTitle.toLowerCase())
  );
  if (filters.showFinished && filters.showUnfinished) {
    // do nothing
  } else if (filters.showFinished) {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
  } else if (filters.showUnfinished) {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  }

  const todoList = document.querySelector("#todos");
  todoList.innerHTML = "";

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoList.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "There are no todos to show";
    todoList.appendChild(messageEl);
  }
};
const saveTodosToLocalStorage = () => {
  window.localStorage.setItem("todos", JSON.stringify(todos));
};
const fetchTodosFromLocalStorage = () => {
  const todosJSON = window.localStorage.getItem("todos");

  if (todosJSON) {
    todos = JSON.parse(todosJSON);
  } else {
    todos = [];
  }
};

// EVENTOS - FUNCIONES
const onSubmit = (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();

  if (text.length > 0) {
    createTodo(text);
    e.target.elements.text.value = "";
  }
  renderTodos();
};
const onInput = (e) => {
  filters.searchTitle = e.target.value;
  renderTodos();
};
const onFinishedCheckChange = (e) => {
  filters.showFinished = e.target.checked;
  renderTodos();
};
const onUnfinishedCheckChange = (e) => {
  filters.showUnfinished = e.target.checked;
  renderTodos();
};
const onStorageChange = (e) => {
  if (e.key === "todos") {
    fetchTodosFromLocalStorage();
    renderTodos();
  }
};

// DOM - ELEMENTOS
const formulario = document.querySelector("#new-todo");
const searchText = document.querySelector("#search-text");
const finishedCheck = document.querySelector("#show-finished");
const unfinishedCheck = document.querySelector("#show-unfinished");

// EVENTOS - LINKS
formulario.addEventListener("submit", onSubmit);
searchText.addEventListener("input", onInput);
finishedCheck.addEventListener("change", onFinishedCheckChange);
unfinishedCheck.addEventListener("change", onUnfinishedCheckChange);
window.addEventListener("storage", onStorageChange);

// SCRIPT
fetchTodosFromLocalStorage();
renderTodos();