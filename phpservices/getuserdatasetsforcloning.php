<?php 
			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = "SELECT id,datasetname FROM datasets where userid=:userid order by datasetname";
      $userid = $data->userid;

      $rowsArray = array();
      $selectOption = array('id' => '-1', 'datasetname' => 'Select');
      $rowsArray[] = $selectOption;

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      // prepare sql and bind parameters
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':userid', $userid, PDO::PARAM_STR); 
      $stmt->execute();
      
      //This is an ARRAY of rows
      $rows = $stmt->fetchALL(PDO::FETCH_ASSOC); 
     
      //Merge it with the array containing the 'Select' option
      echo json_encode(array_merge($rowsArray, $rows)); 

     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }
     
?>