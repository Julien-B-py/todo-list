<?php

header("Access-Control-Allow-Origin: *");

// Create connection
// Need to uncomment extension=pdo_mysql in php.ini first
try {
    $bdd = new PDO("mysql:host=localhost;dbname=todolist", "root", "");
} catch (PDOException $e) {
    die($e->getMessage());
}

// Query
$preparedRequest = $bdd->prepare("SELECT * FROM status");

$preparedRequest->execute();

// PDO::FETCH_ASSOC: returns an array indexed by column name as returned in your result set
$results = $preparedRequest->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);

// // Close connection
// $bdd = NULL;