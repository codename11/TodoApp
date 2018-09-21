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
		$sql1 = "SELECT main.id AS mainId
		FROM main, status 
		WHERE main.summary='$form_var[0]' AND main.status_FK='$form_var[1]' AND status.id=main.status_FK AND main.due_date='$form_var[2]'";
		$result1=$kon1->execute($sql1);
		
		$myId = "";
		if($result1->num_rows > 0){//Get an id from db.
			
			while($row = $result1->fetch_assoc()) {
				
				$myId = $row["mainId"];
				
			}
			
		}
		else if($result1->num_rows == 0){
			echo "0 results";
		}
		
		$sql2 = "DELETE FROM main WHERE id='$myId'";//Delete record from db uusing previously said id.
		$kon1->execute($sql2);
		
		$sql3 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId
				FROM main,status 
				WHERE status_FK=status.id";
			$result3=$kon1->execute($sql3);
			
			if($result3->num_rows > 0){
				
				while($row = $result3->fetch_assoc()) {
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
?>