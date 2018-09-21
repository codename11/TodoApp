<!DOCTYPE html>
<html lang="en">
<head>
	<title>ToDo</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="styles.css">
	<script src="skripta.js"></script>
</head>
<body>

<div class="container">

  <!-- Trigger the modal with a button -->
  <button type="button" class="btn btn-default btn-lg" data-toggle="modal" data-target="#myModal" id="newTask">New Task</button>	
	<form id="forma2">
		<div class="checkbox" id="tasks">
			<label><input type="checkbox" value="showCompletedTasks" id="completedTasks" name="completedTasks">Show completed tasks</label>
		</div>
	</form>

  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">

			<form id="forma1" class="grid-container">
	
				<label class="grid-item" for="summary">Summary:</label>
				<input type="text" class="grid-item item2 form-control" name="summary" id="summary" maxlength="30">

				<label class="grid-item" for="date">Due Date:</label>
				<input type="date" class="grid-item item2 form-control" name="date" id="date">

				<label class="grid-item" for="description">Description:</label>
				<textarea class="grid-item item2 form-control" name="description"  id="description" rows="5"></textarea>

			</form>
        </div>
        <div class="modal-footer">
			<button class="grid-item item3 btn btn-default" id="btn1" data-dismiss="modal">Save</button>
			<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
      
    </div>
  </div>
  
</div>

<div class="container" id="raport"></div>

</body>
</html>
