
//Ejercicio 10
let todos = [];

const createTodo = (text) => {
  todos.push(text);
};

;

  // Setup the todo text
  todoText.textContent = todo;
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
    removeTodo(todoText);
    renderTodos(todos);
  });

  return todoEl;const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const todoText = document.createElement("span")
};

const renderTodos = (todos) => {
  const todoList = document.querySelector("#todos");
  todoList.innerHTML = "";

  if (todos.length > 0) {
    todos.forEach((todo) => {
      todoList.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "There are no todos to show";
    todoList.appendChild(messageEl);
  }
};

const removeTodo = (todoEl) => {
  const todoIndex = todos.findIndex((todo) => {
    return todo.toLowerCase() === todoEl.textContent.toLowerCase();
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

document.querySelector("#new-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();

  if (text.length > 0) {
    createTodo(text);
    e.target.elements.text.value = "";
  }
  renderTodos(todos);
});
renderTodos(todos);

// Ejercicios 11
const createTodo = (text) => {
    todos.push({
        title: text,
        completed: false
    })
}

// Ejercicio 12
const generateTodoDOM = (todoObj) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')

    // Setup todo checkbox
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todoObj.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todoObj.title)
        renderTodos(todos)
    })

    // Setup the todo text
    todoText.textContent = todoObj.title
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todoObj.title)
        renderTodos(todos)
    })

    return todoEl
}