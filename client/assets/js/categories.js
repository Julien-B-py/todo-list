categoryInput.value = "";

let sel = document.querySelector("select");

addCategoryButton.addEventListener("click", function (event) {

    event.preventDefault();

    const category = categoryInput.value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("category", category);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://localhost:8001/addCategory.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            fetchCategories();
            categoryInput.value = "";
        })
        .catch(error => console.log('error', error));
});


const fetchCategories = () => {

    const existingOptions = document.querySelectorAll("option");
    if (existingOptions) {
        existingOptions.forEach(o => o.remove());
    }

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8001/getCategories.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            const data = JSON.parse(result);
            data.forEach(item => {
                let option = document.createElement("option");
                option.value = item.name;
                option.text = item.name;
                sel.add(option, null);
            });
        })
        .catch(error => console.log('error', error));
}


fetchCategories();