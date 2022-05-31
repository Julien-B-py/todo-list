<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: DELETE');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    parse_str(file_get_contents("php://input"), $delete_vars);

    $todoId = htmlspecialchars($delete_vars["ref"]);
    echo $todoId;

    $bdd = new PDO("mysql:host=localhost;dbname=todolist", "root", "");

    // Query
    $preparedRequest = $bdd->prepare("DELETE FROM `todos` WHERE ref = :ref");;

    $preparedRequest->bindValue(":ref", $todoId, PDO::PARAM_STR);

    $result = $preparedRequest->execute();

    // error
    if (!$result) {
        echo "Error";
    }
}
