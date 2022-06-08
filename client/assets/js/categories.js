categoryInput.value = "";

let categories = [];

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
            categories = [];
            // let option = document.createElement("option");
            // option.value = 0;
            // option.text = "All";
            // sel.add(option, null);
            data.forEach(item => {
                let option = document.createElement("option");
                option.value = item.category_id;
                option.text = item.category_name;
                sel.add(option, null);
                categories.push(item);
            });
        })
        .catch(error => console.log('error', error));
}






fetchCategories();