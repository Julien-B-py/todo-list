let form = document.querySelector("form");
let addButton = document.querySelector("button");

let todos = [];

addButton.addEventListener("click", function (event) {

    event.preventDefault();

    let input = document.querySelector("input");
    const todo = input.value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("todo", todo);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://localhost:8001/addTodo.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            fetchTodos();
            // clear input field and set focus
            input.value = "";
            input.focus();
        })
        .catch(error => console.log('error', error));


});



const fetchTodos = () => {

    todos = [];
    const existingTodos = document.querySelectorAll(".todo");

    existingTodos.forEach(item => {
        item.parentNode.removeChild(item)
    });

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8001/getTodos.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            const data = JSON.parse(result);
            data.forEach(todo => todos.push(todo))

            displayTodos();

        })
        .catch(error => console.log('error', error));
}


const deleteTodo = async (data) => {

    // Postman
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("ref", data);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://localhost:8001/deleteTodo.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);

            fetchTodos();

        })
        .catch(error => console.log('error', error));

}



fetchTodos();



const displayTodos = () => {

    const section = document.querySelector("section");

    todos.forEach(todo => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("todo");
        let newContent = document.createTextNode(todo.task);

        let deleteButton = document.createElement("i");
        deleteButton.classList.add("fa-solid", "fa-trash");
        deleteButton.dataset.ref = todo.ref;

        newDiv.appendChild(newContent);
        newDiv.appendChild(deleteButton);

        section.insertBefore(newDiv, form);
    });


    const deleteTodos = document.querySelectorAll(".fa-trash");

    deleteTodos.forEach(item => item.addEventListener("click", (e) => {

        const uuid = e.target.dataset.ref;

        deleteTodo(uuid);

    }))

}