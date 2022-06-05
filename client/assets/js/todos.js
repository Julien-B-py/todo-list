//archiver les anciens todo

const form = document.querySelector("form");

const inputs = document.querySelectorAll("input");
const categoryInput = inputs[0];
const input = inputs[1];

const buttons = document.querySelectorAll("button");
const addCategoryButton = buttons[0];
const addButton = buttons[1];

const section = document.querySelector("section");

let selectedTodoId = "";

let todos = [];

input.value = "";

addButton.addEventListener("click", function (event) {
  event.preventDefault();

  const todo = input.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("todo", todo);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://localhost:8001/addTodo.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // console.log(result)
      fetchTodos();
      // clear input field and set focus
      input.value = "";
      input.focus();
      addButton.setAttribute('disabled', '');
      addButton.style.border = "1px solid #dce4ec";
      addButton.style.backgroundColor = "#e6e6e6";
    })
    .catch((error) => {
      // console.log('error', error);
      displayError();
    });
});

const displayError = () => {
  var newDiv = document.createElement("div");
  newDiv.classList.add("error");
  var newContent = document.createTextNode(
    "Error when attempting to fetch resource."
  );
  newDiv.appendChild(newContent);
  section.insertBefore(newDiv, form);
};

const fetchTodos = () => {
  todos = [];
  const existingTodos = document.querySelectorAll(".todo");

  existingTodos.forEach((item) => {
    item.parentNode.removeChild(item);
  });

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8001/getTodos.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = JSON.parse(result);
      data.forEach((todo) => todos.push(todo));

      displayTodos();
    })
    .catch((error) => {
      // console.log('error', error);
      displayError();
    });
};

const deleteTodo = async (data) => {
  // Postman
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("ref", data);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://localhost:8001/deleteTodo.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // console.log(result);
      fetchTodos();
    })
    .catch((error) => console.log("error", error));
};

fetchTodos();

const displayTodos = () => {
  todos.forEach((todo) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    newDiv.dataset.ref = todo.ref;

    let newContent = document.createTextNode(todo.task);

    let deleteButton = document.createElement("i");
    deleteButton.classList.add("fa-solid", "fa-trash");
    deleteButton.dataset.ref = todo.ref;

    newDiv.appendChild(newContent);
    newDiv.appendChild(deleteButton);

    section.insertBefore(newDiv, form);
  });

  const deleteTodos = document.querySelectorAll(".fa-trash");

  deleteTodos.forEach((item) =>
    item.addEventListener("click", (e) => {
      // PROPAGATION PREVENT
      e.stopPropagation();

      const uuid = e.target.dataset.ref;

      deleteTodo(uuid);
    })
  );

  const existingTodos = document.querySelectorAll(".todo");

  existingTodos.forEach(
    (todo) =>
    (todo.onclick = (e) => {
      const uuid = e.target.dataset.ref;
      getTodoData(uuid);
    })
  );
};

const getTodoData = (taskId) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  selectedTodoId = taskId;

  fetch(`http://localhost:8001/getTodoData.php?ref=${taskId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = JSON.parse(result);
      displayTodoData(data[0]);
    })
    .catch((error) => console.log("error", error));
};

const displayTodoData = (data) => {
  const existingDetails = document.querySelector(".todo__details");
  if (existingDetails) {
    existingDetails.remove();
  }

  var newDiv = document.createElement("section");
  newDiv.classList.add("todo__details");

  const h2 = document.createElement("h2");
  const textNode = document.createTextNode("Details");
  h2.appendChild(textNode);

  var label = document.createElement("label");
  label.setAttribute("for", "description");
  label.textContent = "Description";
  var input = document.createElement("input");
  input.type = "text";
  input.name = "todo";
  input.id = "description";
  input.value = data.task;

  var label2 = document.createElement("label");
  label2.setAttribute("for", "category");
  label2.textContent = "Category";
  var input2 = document.createElement("input");
  input2.type = "text";
  input2.name = "todo";
  input2.id = "category";
  input2.value = data.category;

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close__btn");
  const btnIcon = document.createElement("i");
  btnIcon.classList.add("fa-solid", "fa-xmark");
  closeBtn.appendChild(btnIcon);

  const confirmBtn = document.createElement("button");
  const confirmBtnText = document.createTextNode("Valider");
  confirmBtn.classList.add("btn__confirm");
  const confirmBtnIcon = document.createElement("i");
  confirmBtnIcon.classList.add("fa-solid", "fa-check");
  confirmBtn.appendChild(confirmBtnText);
  confirmBtn.appendChild(confirmBtnIcon);

  newDiv.appendChild(h2);
  newDiv.appendChild(label);
  newDiv.appendChild(input);
  newDiv.appendChild(label2);
  newDiv.appendChild(input2);
  newDiv.appendChild(closeBtn);
  newDiv.appendChild(confirmBtn);
  document.querySelector("main").appendChild(newDiv);

  input.focus();

  closeBtn.onclick = () => {
    document.querySelector(".todo__details").remove();
  };

  confirmBtn.onclick = () => {
    updateTodo({ todo: input.value, id: selectedTodoId });
  };
};

const updateTodo = (value) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("todo", value.todo);
  urlencoded.append("id", value.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://localhost:8001/updateTodo.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      fetchTodos();
      document.querySelector(".todo__details").remove();
    })
    .catch((error) => console.log("error", error));
};


// Detect input
input.addEventListener("input", (event) => {
  if (event.target.value.length === 0) {
    addButton.setAttribute('disabled', '');
    addButton.style.border = "1px solid #dce4ec";
    addButton.style.backgroundColor = "#e6e6e6";
    return;
  }
  addButton.removeAttribute('disabled');
  addButton.style.removeProperty('border');
  addButton.style.removeProperty('background-color');
});


