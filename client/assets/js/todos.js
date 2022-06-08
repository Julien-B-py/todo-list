//archiver les anciens todo



let selectedTodoId = "";

let todos = [];
let filteredTodos = [];

input.value = "";

addButton.addEventListener("click", function (event) {
  event.preventDefault();

  const todo = input.value;
  const category = sel.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("todo", todo);
  urlencoded.append("category", category);

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
      filteredTodos = [...todos];

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



const checkTodo = async (data, checked) => {
  // Postman
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("id", data);
  urlencoded.append("status", checked);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("http://localhost:8001/checkTodo.php", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      fetchTodos();
    })
    .catch(error => console.log('error', error));


};



fetchTodos();

const displayTodos = () => {

  if (document.querySelectorAll(".todo").length > 0) {
    document.querySelectorAll(".todo").forEach(e => e.remove());
  }

  todos.forEach((todo) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    newDiv.dataset.ref = todo.todo_ref;

    let todoInner = document.createElement("div");
    todoInner.classList.add("todo__inner");
    newDiv.appendChild(todoInner);

    let circle = document.createElement("i");

    let span = document.createElement('span');
    let newContent = document.createTextNode(todo.todo_desc);
    span.appendChild(newContent);
    // check if todo status is completed
    if (todo.statusid === 1) {
      circle.classList.add("fa-solid", "fa-circle-check", "checkbox");
      span.classList.add("completed");
    }
    else {
      circle.classList.add("fa-solid", "fa-circle", "checkbox");
    }



    let deleteButton = document.createElement("i");
    deleteButton.classList.add("fa-solid", "fa-trash");
    deleteButton.dataset.ref = todo.todo_ref;

    todoInner.appendChild(circle);
    todoInner.appendChild(span);
    newDiv.appendChild(deleteButton);

    document.querySelector(".todos__inner").appendChild(newDiv);
    // section.insertBefore(newDiv, form);
  });

  const deleteTodos = document.querySelectorAll(".fa-trash");

  deleteTodos.forEach((item) =>
    item.addEventListener("click", (e) => {
      // PROPAGATION PREVENT
      e.stopPropagation();

      const uuid = e.target.dataset.ref;

      console.log(e.target.dataset.ref)

      deleteTodo(uuid);

    })
  );

  const checkTodos = document.querySelectorAll(".checkbox");

  checkTodos.forEach((item) =>
    item.addEventListener("click", (e) => {
      // PROPAGATION PREVENT
      e.stopPropagation();

      //  = e.target.dataset.ref;

      const uuid = e.target.closest(".todo").dataset.ref;
      const checked = e.target.classList.contains("fa-circle-check");

      checkTodo(uuid, checked);

    })
  );

  const existingTodos = document.querySelectorAll(".todo");

  existingTodos.forEach(
    (todo) =>
    (todo.onclick = (e) => {

      const parentDiv = e.target.closest(".todo");
      const uuid = parentDiv.dataset.ref;

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

  // console.log(data);

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
  input.value = data.todo_desc;

  var label2 = document.createElement("label");
  label2.setAttribute("for", "category");
  label2.textContent = "Category";
  // var input2 = document.createElement("input");
  // input2.type = "text";
  // input2.name = "todo";
  // input2.id = "category";
  // input2.value = data.category_name;

  var label3 = document.createElement("label");
  label3.setAttribute("for", "status");
  label3.textContent = "Status";

  var catSelect = document.createElement("select");
  catSelect.id = "category";
  categories.forEach(item => {
    let option = document.createElement("option");
    option.value = item.category_id;
    option.text = item.category_name;

    // Auto select the saved option
    if (data.category_name === item.category_name) {
      option.selected = true;
    }

    catSelect.add(option, null);
  });

  var statusSelect = document.createElement("select");
  statusSelect.id = "status";
  todosStatus.forEach(item => {
    let option = document.createElement("option");
    option.value = item.status_id;
    option.text = item.status_name;

    // Auto select the saved option
    if (data.status_name === item.status_name) {
      option.selected = true;
    }

    statusSelect.add(option, null);
  });

  var label4 = document.createElement("label");
  label4.setAttribute("for", "tags");
  label4.textContent = "Tags";
  var input3 = document.createElement("input");
  input3.type = "text";
  input3.name = "tags";
  input3.id = "tags";
  input3.value = data.tags;

  var label5 = document.createElement("label");
  label5.textContent = "Date created";
  let span = document.createElement('span');
  let newContent = document.createTextNode(moment(data.todo_creation).format('MMMM Do YYYY'));
  span.appendChild(newContent);


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
  // newDiv.appendChild(input2);
  newDiv.appendChild(catSelect);
  newDiv.appendChild(label3);
  newDiv.appendChild(statusSelect);
  newDiv.appendChild(label4);
  newDiv.appendChild(input3);
  newDiv.appendChild(label5);
  newDiv.appendChild(span);
  newDiv.appendChild(closeBtn);
  newDiv.appendChild(confirmBtn);
  document.querySelector("main").appendChild(newDiv);

  input.focus();

  closeBtn.onclick = () => {
    document.querySelector(".todo__details").remove();
  };

  confirmBtn.onclick = () => {
    updateTodo({ todo: input.value, id: selectedTodoId, category: catSelect.value, status: statusSelect.value });
  };
};

const updateTodo = (value) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  console.log(value);

  var urlencoded = new URLSearchParams();
  urlencoded.append("todo", value.todo);
  urlencoded.append("id", value.id);
  urlencoded.append("category", value.category);
  urlencoded.append("status", value.status);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://localhost:8001/updateTodo.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // console.log(result);
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



const filterTodos = () => {

  // filteredTodos.forEach(todo => {
  //   console.log(todo.categoryid === Number(sel.value));
  // })

  h2.textContent = sel.options[sel.selectedIndex].text;

  if (Number(sel.value) === 0) {
    todos = [...filteredTodos];
  } else {
    todos = filteredTodos.filter(todo => todo.categoryid === Number(sel.value));
  }


  displayTodos();
  // console.log(test);
}



sel.onchange = () => {
  filterTodos();
  if (document.querySelector(".todo__details")) {
    document.querySelector(".todo__details").remove();
  }

}


