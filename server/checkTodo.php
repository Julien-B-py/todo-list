<?php

header("Access-Control-Allow-Origin: *");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $todoId = htmlspecialchars($_POST["id"]);
    $todoStatus = htmlspecialchars($_POST["status"]);





    if ($todoStatus === "false") {
        $todoStatus = 1;
    } else {
        $todoStatus = 2;
    }

    $bdd = new PDO("mysql:host=localhost;dbname=todolist", "root", "");

    // Query
    $preparedRequest = $bdd->prepare("UPDATE `todos` SET `statusid` = :stats  WHERE `todo_ref` = :id");

    $preparedRequest->bindValue(":stats", $todoStatus, PDO::PARAM_INT);
    $preparedRequest->bindValue(":id", $todoId, PDO::PARAM_STR);

    $result = $preparedRequest->execute();

    if ($result) {
        echo "success";
    }
}
