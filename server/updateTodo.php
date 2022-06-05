<?php

header("Access-Control-Allow-Origin: *");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $todo = htmlspecialchars($_POST["todo"]);
    $todoId = htmlspecialchars($_POST["id"]);

    // echo $todo;
    // echo $todoId;



    // UPDATE `todos` SET `task` = 'fzfafa' WHERE `todos`.`id` = 7




    $bdd = new PDO("mysql:host=localhost;dbname=todolist", "root", "");

    // Query
    // $preparedRequest = $bdd->prepare("INSERT INTO `todos` (`id`, `task`, `ref`) VALUES (NULL, :todo, :ref)");
    $preparedRequest = $bdd->prepare("UPDATE `todos` SET `task` = :todo WHERE `ref` = :id");

    $preparedRequest->bindValue(":todo", $todo, PDO::PARAM_STR);
    $preparedRequest->bindValue(":id", $todoId, PDO::PARAM_STR);

    $result = $preparedRequest->execute();

    if ($result) {
        echo "success";
    }
}
