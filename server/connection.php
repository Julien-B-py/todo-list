<?php

// Create connection
// Need to uncomment extension=pdo_mysql in php.ini first
try {
    $bdd = new PDO("mysql:host=localhost;dbname=todolist", "root", "");
} catch (PDOException $e) {
    die($e->getMessage());
}
