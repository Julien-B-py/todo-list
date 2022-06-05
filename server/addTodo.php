<?php

header("Access-Control-Allow-Origin: *");

require_once "./guidv4.php";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $todo = htmlspecialchars($_POST["todo"]);



    $uuid = guidv4();


    $bdd = new PDO("mysql:host=localhost;dbname=todolist", "root", "");

    // Query
    $preparedRequest = $bdd->prepare("INSERT INTO `todos` (`id`, `task`, `ref`) VALUES (NULL, :todo, :ref)");

    $preparedRequest->bindValue(":todo", $todo, PDO::PARAM_STR);
    $preparedRequest->bindValue(":ref", $uuid, PDO::PARAM_STR);

    $result = $preparedRequest->execute();

    if ($result) {
        echo "success";
    }
}
