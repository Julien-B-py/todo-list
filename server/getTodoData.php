<?php

header("Access-Control-Allow-Origin: *");

require_once './connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $todoId = $_GET["ref"];

    // Query
    $preparedRequest = $bdd->prepare("SELECT * FROM todos t INNER JOIN categories c ON c.category_id = t.categoryid INNER JOIN status ON status.status_id = t.statusid WHERE todo_ref = :ref");

    $preparedRequest->bindValue(":ref", $todoId, PDO::PARAM_STR);

    $results = $preparedRequest->execute();

    // PDO::FETCH_ASSOC: returns an array indexed by column name as returned in your result set
    $results = $preparedRequest->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);

    // // Close connection
    // $bdd = NULL;
}
