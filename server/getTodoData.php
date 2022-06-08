<?php

header("Access-Control-Allow-Origin: *");

// Create connection
// Need to uncomment extension=pdo_mysql in php.ini first
try {
    $bdd = new PDO("mysql:host=localhost;dbname=todolist", "root", "");
} catch (PDOException $e) {
    die($e->getMessage());
}


$todoId = $_GET["ref"];

// Query
// $preparedRequest = $bdd->prepare("SELECT * FROM todos WHERE todo_ref = :ref");



$preparedRequest = $bdd->prepare("SELECT * FROM todos t INNER JOIN categories c ON c.category_id = t.categoryid WHERE todo_ref = :ref");

$preparedRequest->bindValue(":ref", $todoId, PDO::PARAM_STR);

$results = $preparedRequest->execute();


// PDO::FETCH_ASSOC: returns an array indexed by column name as returned in your result set
$results = $preparedRequest->fetchAll(PDO::FETCH_ASSOC);



echo json_encode($results);


// // Close connection
// $bdd = NULL;