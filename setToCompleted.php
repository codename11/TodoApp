<?php
require 'funkcije.php';

$arr1 = array();
$form_var = array();

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "todoapp";

if(isset($_GET)){
	
	if(isset($_GET["query"])){
		
		$arr1 = explode(",",$_GET["query"]);
		
		foreach ($arr1 as $value) {
			$obj1 = new Validation($value);
			$form_var[] = $obj1 -> test_input($obj1 -> getData());
		}

		$kon1 = new SimpleDB($servername, $username, $password, $dbname);
		if($form_var[1]!="3"){

			$sql1 = "UPDATE main SET status_FK='3' WHERE summary='$form_var[0]' AND due_date='$form_var[2]'";
			$kon1->execute($sql1);
			
			$sql2 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId
			FROM main,status 
			WHERE status_FK=status.id";
			$result1=$kon1->execute($sql2);
			$br1 = 0;
			$select1 = "";
			if($result1->num_rows > 0){
				
				while($row = $result1->fetch_assoc()) {
					$br1++;
					$myObj->statId[] = $row["statId"];
					$myObj->summary[] = $row["summary"];
					$myObj->due_date[] = $row["due_date"];
					$myObj->select[] = $row["statId"];
				}
				$myJSON = json_encode($myObj);
				echo($myJSON);
			}
			else if($result->num_rows == 0){
				echo "0 results";
			}
			
		}
		else if($form_var[1]=="3"){

			$sql2 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId
			FROM main,status 
			WHERE status_FK=status.id";
			$result1=$kon1->execute($sql2);
			$br1 = 0;
			$select1 = "";
			if($result1->num_rows > 0){
				
				while($row = $result1->fetch_assoc()) {
					$br1++;
					$myObj->statId[] = $row["statId"];
					$myObj->summary[] = $row["summary"];
					$myObj->due_date[] = $row["due_date"];
					$myObj->select[] = $row["statId"];
				}
				$myJSON = json_encode($myObj);
				echo($myJSON);
			}
			else if($result->num_rows == 0){
				echo "0 results";
			}
			
		}
		
	}
	
}

?>