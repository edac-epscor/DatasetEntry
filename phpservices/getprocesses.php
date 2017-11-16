<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;
      $datasetid = $data->datasetid;
      $rowArray = array();

      $sql = str_replace("@datasetid",":datasetid",$sql);
      
      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      // prepare sql and bind parameters
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':datasetid', $datasetid, PDO::PARAM_STR); 
      $stmt->execute();
      
      $row = $stmt->fetchALL(PDO::FETCH_ASSOC); 
      $rowArray[] = $row;
     
     echo json_encode($row); 

     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>
