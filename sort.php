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
	}
	
	$kon1 = new SimpleDB($servername, $username, $password, $dbname);
	
	if($form_var[2]==="false"){
			if($form_var[0]=="glyphicon glyphicon-triangle-bottom" && $form_var[1]=="bt1"){
			
			$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
			FROM main,status 
			WHERE status_FK=status.id 
			ORDER BY summary ASC";
			
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
					$myObj->arrowId = $form_var[1];
					$myObj->completedTask = $form_var[2];
					$myObj->query = $sql1;
				}
				$myJSON = json_encode($myObj);
				echo($myJSON);
			}
			else if($result1->num_rows == 0){
				echo "0 results";
			}
			
			}
			else if($form_var[0]=="glyphicon glyphicon-triangle-top" && $form_var[1]=="bt1"){
				$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
				FROM main,status 
				WHERE status_FK=status.id 
				ORDER BY summary DESC";
				
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
						$myObj->triangleId = $form_var[1];
						$myObj->completedTask = $form_var[2];
						$myObj->query = $sql1;
					}
					$myJSON = json_encode($myObj);
					echo($myJSON);
				}
				else if($result1->num_rows == 0){
					echo "0 results";
				}
			}
			else if($form_var[0]=="glyphicon glyphicon-triangle-bottom" && $form_var[1]=="bt2"){
				
				$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
				FROM main,status 
				WHERE status_FK=status.id 
				ORDER BY status DESC";
				
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
						$myObj->arrowId = $form_var[1];
						$myObj->completedTask = $form_var[2];
						$myObj->query = $sql1;
					}
					$myJSON = json_encode($myObj);
					echo($myJSON);
				}
				else if($result1->num_rows == 0){
					echo "0 results";
				}
				
			}
			else if($form_var[0]=="glyphicon glyphicon-triangle-top" && $form_var[1]=="bt2"){
				$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
				FROM main,status 
				WHERE status_FK=status.id 
				ORDER BY status ASC";
				
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
						$myObj->triangleId = $form_var[1];
						$myObj->completedTask = $form_var[2];
						$myObj->query = $sql1;
					}
					$myJSON = json_encode($myObj);
					echo($myJSON);
				}
				else if($result1->num_rows == 0){
					echo "0 results";
				}
			}
			else if($form_var[0]=="glyphicon glyphicon-triangle-bottom" && $form_var[1]=="bt3"){
			
			$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
			FROM main,status 
			WHERE status_FK=status.id 
			ORDER BY due_date ASC";
			
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
					$myObj->arrowId = $form_var[1];
					$myObj->completedTask = $form_var[2];
					$myObj->query = $sql1;
				}
				$myJSON = json_encode($myObj);
				echo($myJSON);
			}
			else if($result1->num_rows == 0){
				echo "0 results";
			}
			
		}
		else if($form_var[0]=="glyphicon glyphicon-triangle-top" && $form_var[1]=="bt3"){
			$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
			FROM main,status 
			WHERE status_FK=status.id 
			ORDER BY due_date DESC";
			
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
					$myObj->triangleId = $form_var[1];
					$myObj->completedTask = $form_var[2];
					$myObj->query = $sql1;
				}
				$myJSON = json_encode($myObj);
				echo($myJSON);
			}
			else if($result1->num_rows == 0){
				echo "0 results";
			}
		}
	}
	else if($form_var[2]==="true"){
		
		if($form_var[0]=="glyphicon glyphicon-triangle-bottom" && $form_var[1]=="bt1"){
			
			$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
			FROM main,status 
			WHERE status_FK=status.id  AND status.status='Completed' 
			ORDER BY summary ASC";
			
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
					$myObj->arrowId = $form_var[1];
					$myObj->completedTask = $form_var[2];
					$myObj->query = $sql1;
				}
				$myJSON = json_encode($myObj);
				echo($myJSON);
			}
			else if($result1->num_rows == 0){
				echo "0 results";
			}
			
			}
			else if($form_var[0]=="glyphicon glyphicon-triangle-top" && $form_var[1]=="bt1"){
				$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
				FROM main,status 
				WHERE status_FK=status.id AND status.status='Completed' 
				ORDER BY summary DESC";
				
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
						$myObj->triangleId = $form_var[1];
						$myObj->completedTask = $form_var[2];
						$myObj->query = $sql1;
					}
					$myJSON = json_encode($myObj);
					echo($myJSON);
				}
				else if($result1->num_rows == 0){
					echo "0 results";
				}
			}
			else if($form_var[0]=="glyphicon glyphicon-triangle-bottom" && $form_var[1]=="bt2"){
				
				$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
				FROM main,status 
				WHERE status_FK=status.id  AND status.status='Completed' 
				ORDER BY status DESC";
				
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
						$myObj->arrowId = $form_var[1];
						$myObj->completedTask = $form_var[2];
						$myObj->query = $sql1;
					}
					$myJSON = json_encode($myObj);
					echo($myJSON);
				}
				else if($result1->num_rows == 0){
					echo "0 results";
				}
				
			}
			else if($form_var[0]=="glyphicon glyphicon-triangle-top" && $form_var[1]=="bt2"){
				$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
				FROM main,status 
				WHERE status_FK=status.id AND status.status='Completed' 
				ORDER BY status ASC";
				
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
						$myObj->triangleId = $form_var[1];
						$myObj->completedTask = $form_var[2];
						$myObj->query = $sql1;
					}
					$myJSON = json_encode($myObj);
					echo($myJSON);
				}
				else if($result1->num_rows == 0){
					echo "0 results";
				}
			}
			else if($form_var[0]=="glyphicon glyphicon-triangle-bottom" && $form_var[1]=="bt3"){
			
			$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
			FROM main,status 
			WHERE status_FK=status.id  AND status.status='Completed' 
			ORDER BY due_date ASC";
			
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
					$myObj->arrowId = $form_var[1];
					$myObj->completedTask = $form_var[2];
					$myObj->query = $sql1;
				}
				$myJSON = json_encode($myObj);
				echo($myJSON);
			}
			else if($result1->num_rows == 0){
				echo "0 results";
			}
			
		}
		else if($form_var[0]=="glyphicon glyphicon-triangle-top" && $form_var[1]=="bt3"){
			$sql1 = "SELECT main.id, status.id, summary, status_FK, DATE_FORMAT(due_date, '%d %b %Y') due_date, status.status, status.id as statId 
			FROM main,status 
			WHERE status_FK=status.id AND status.status='Completed' 
			ORDER BY due_date DESC";
			
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
					$myObj->triangleId = $form_var[1];
					$myObj->completedTask = $form_var[2];
					$myObj->query = $sql1;
				}
				$myJSON = json_encode($myObj);
				echo($myJSON);
			}
			else if($result1->num_rows == 0){
				echo "0 results";
			}
		}
		
	}
		
}

?>