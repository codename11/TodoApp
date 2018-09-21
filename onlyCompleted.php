<?php
require 'funkcije.php';

	$form_var = array();
	if(isset($_GET)){
		
		$servername = "127.0.0.1";
		$username = "root";
		$password = "";
		$dbname = "todoapp";
		
		foreach ($_GET as $value) {
			$obj1 = new Validation($value);
			$form_var[] = $obj1 -> test_input($obj1 -> getData());
		}
		
		$kon1 = new SimpleDB($servername, $username, $password, $dbname);

		$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId
		FROM main,status 
		WHERE status_FK=status.id AND status.status='Completed'";
		$result1=$kon1->execute($sql1);
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

?>