<?php

header("Access-Control-Allow-Origin: *");

require_once './connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $todo = htmlspecialchars($_POST["category"]);

    // Query
    $preparedRequest = $bdd->prepare("INSERT INTO `categories` (`category_id`, `category_name`) VALUES (NULL, :category)");

    $preparedRequest->bindValue(":category", $todo, PDO::PARAM_STR);

    $result = $preparedRequest->execute();

    if ($result) {
        echo "success";
    }
}
