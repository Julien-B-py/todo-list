let todosStatus = [];

const fetchStatus = () => {

    // const existingOptions = document.querySelectorAll("option");
    // if (existingOptions) {
    //     existingOptions.forEach(o => o.remove());
    // }

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8001/getStatus.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            const data = JSON.parse(result);
            todosStatus = [];
            data.forEach(item => {
                todosStatus.push(item);
            });
        })
        .catch(error => console.log('error', error));
}

fetchStatus();