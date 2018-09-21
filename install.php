<?php

require 'funkcije.php';
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "";

// Create connection
$conn = new SimpleDB($servername, $username, $password, $dbname); 

// Create database
$sql1 = "CREATE DATABASE TodoApp";

if ($conn->execute($sql1) === TRUE) {
    echo "Uspesno napravljena baza";
} else {
    echo "Neuspešno napravljena baza: " . $conn->error;
}

$sql2  = "CREATE TABLE TodoApp.status (
		id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		status VARCHAR(12) NOT NULL
		);";

$sql3  = "CREATE TABLE TodoApp.main (
		id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		summary VARCHAR(30) NOT NULL, 
		due_date DATE NOT NULL,
		description VARCHAR(255) NOT NULL,
		status_FK INT(10) UNSIGNED,
		FOREIGN KEY (status_FK) REFERENCES TodoApp.status(id) ON UPDATE CASCADE ON DELETE CASCADE
		);";
			
$sql4 = "INSERT INTO TodoApp.status (status) VALUES('Pending'),('In progress'),('Completed');";
			
$sql = 	$sql2.$sql3.$sql4;

if ($conn->multi_execute($sql) === TRUE) {
    echo "Uspesno napravljene tabele";
} else {
    echo "Neuspešno napravljene tabele: " . $conn->error;
}

$conn->close();
?>