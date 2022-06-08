<?php

header("Access-Control-Allow-Origin: *");

require_once "./guidv4.php";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $todo = htmlspecialchars($_POST["todo"]);
    $category = htmlspecialchars($_POST["category"]);



    $uuid = guidv4();


    $bdd = new PDO("mysql:host=localhost;dbname=todolist", "root", "");

    // Query
    $preparedRequest = $bdd->prepare("INSERT INTO `todos` (`todo_id`, `todo_desc`, `todo_ref`, `categoryid`, `statusid`, `todo_creation`) VALUES (NULL, :todo, :ref, :categoryId, 2, CURRENT_TIMESTAMP)");

    $preparedRequest->bindValue(":todo", $todo, PDO::PARAM_STR);
    $preparedRequest->bindValue(":ref", $uuid, PDO::PARAM_STR);
    $preparedRequest->bindValue(":categoryId", $category, PDO::PARAM_INT);

    $result = $preparedRequest->execute();

    if ($result) {
        echo "success";
    }
}
