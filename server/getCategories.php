<?php

header("Access-Control-Allow-Origin: *");

require_once './connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Query
    $preparedRequest = $bdd->prepare("SELECT * FROM categories");

    $preparedRequest->execute();

    // PDO::FETCH_ASSOC: returns an array indexed by column name as returned in your result set
    $results = $preparedRequest->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);

    // // Close connection
    // $bdd = NULL;
}
