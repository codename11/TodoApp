<?php
require 'funkcije.php';

$arr1 = array();
$form_var = array();

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "todoapp";

$kon1 = new SimpleDB($servername, $username, $password, $dbname);

if(isset($_GET)){
	
	if(isset($_GET["query"])){
		
		$arr1 = explode(",",$_GET["query"]);
		
		foreach ($arr1 as $value) {
			$obj1 = new Validation($value);
			$form_var[] = $obj1 -> test_input($obj1 -> getData());
		}
		
		$sql1 = "SELECT main.id as mainId, status.id as statId, summary, status_FK, due_date, description, status.status 
		FROM main,status 
		WHERE status_FK=status.id AND summary='$form_var[0]' AND due_date='$form_var[2]'";
				
		$result1=$kon1->execute($sql1);
		$br1 = 0;
		$select1 = "";
		if($result1->num_rows > 0){
			
			while($row = $result1->fetch_assoc()) {
				$br1++;
				$myObj->summary[] = $row["summary"];
				$myObj->due_date[] = $row["due_date"];
				$myObj->description[] = $row["description"];
				$myObj->myId = $row["mainId"];
			}
			$myJSON = json_encode($myObj);
			echo($myJSON);
		}
		else if($result1->num_rows == 0){
			echo "0 results";
		}
		
	}
	
}
?>