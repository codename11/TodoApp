<?php

require 'funkcije.php';

	$form_var = array();
	
if(isset($_GET)){
	
	foreach ($_GET as $value) { 
	
		$obj1 = new Validation($value);
		$form_var[] = $obj1 -> test_input($obj1 -> getData());
	
	}
	
	/*Sadrzaj za modal formu:
	$form_var[0]== summary;
	$form_var[1]== date;
	$form_var[2]== description;
	$form_var[3]== update; // "true" or "false"
	*/
	
	$servername = "127.0.0.1";
	$username = "root";
	$password = "";
	$dbname = "todoapp";
	
	$kon1 = new SimpleDB($servername, $username, $password, $dbname);
	
	if($form_var[3]=="true"){

		$sql = "SELECT id 
		FROM main 
		WHERE id='$form_var[4]'";

		$result1=$kon1->execute($sql);
		
		$myId = "";
		if($result1->num_rows > 0){//Get an id from db.
			
			while($row = $result1->fetch_assoc()) {
				
				$myId = $row["id"];
				echo $myId;
			}
			
			$sql1 = "UPDATE main SET summary='$form_var[0]', due_date='$form_var[1]', description='$form_var[2]' WHERE main.id='$myId'";
			$kon1->execute($sql1);
			
		}
		else if($result1->num_rows == 0){
			echo $form_var[3];
			echo "0 results";
		}
		
	}
	else if($form_var[3]=="false"){
		
		$sql1 = "INSERT INTO main (summary, due_date, description, status_FK) 
		VALUES ('$form_var[0]', '$form_var[1]', '$form_var[2]',1)";
		$kon1->execute($sql1);
		
	}
	
	$sql2 = "SELECT main.id, status.id as statId, summary, status_FK, due_date, status.status
		FROM main,status 
		WHERE status_FK=status.id";
		$result2=$kon1->execute($sql2);
		$br1 = 0;
		$select1 = "";
		if($result2->num_rows > 0){
			
			while($row = $result2->fetch_assoc()) {
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

?>