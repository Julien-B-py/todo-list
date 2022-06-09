<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: DELETE');

require_once './connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    parse_str(file_get_contents("php://input"), $delete_vars);

    $todoId = htmlspecialchars($delete_vars["ref"]);

    // Query
    $preparedRequest = $bdd->prepare("DELETE FROM `todos` WHERE todo_ref = :ref");;

    $preparedRequest->bindValue(":ref", $todoId, PDO::PARAM_STR);

    $result = $preparedRequest->execute();

    // error
    if (!$result) {
        echo "Error";
    }
}
