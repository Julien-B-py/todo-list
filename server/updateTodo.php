<?php

header("Access-Control-Allow-Origin: *");

require_once './connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $todo = htmlspecialchars($_POST["todo"]);
    $todoId = htmlspecialchars($_POST["id"]);
    $todoCategory = htmlspecialchars($_POST["category"]);
    $todoStatus = htmlspecialchars($_POST["status"]);

    // Query
    $preparedRequest = $bdd->prepare("UPDATE `todos` SET `todo_desc` = :todo, `categoryid` = :cat, `statusid` = :stat  WHERE `todo_ref` = :id");

    $preparedRequest->bindValue(":todo", $todo, PDO::PARAM_STR);
    $preparedRequest->bindValue(":id", $todoId, PDO::PARAM_STR);
    $preparedRequest->bindValue(":cat", $todoCategory, PDO::PARAM_INT);
    $preparedRequest->bindValue(":stat", $todoStatus, PDO::PARAM_INT);

    $result = $preparedRequest->execute();

    if ($result) {
        echo "success";
    }
}
