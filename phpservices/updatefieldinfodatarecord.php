<?php 

	include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;

      $fieldinfoid = $data->fieldinfoid;

      $field = $data->field;
      $description = $data->description;
      $units = $data->units;
      $frequency = $data->frequency;
      $aggregation = $data->aggregation;
      $nodata = $data->nodata;
      $dommin = $data->dommin;
      $dommax = $data->dommax;

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':fieldinfoid', $fieldinfoid, PDO::PARAM_STR);

       $stmt->bindParam(':field', $field, PDO::PARAM_STR);
       $stmt->bindParam(':description', $description, PDO::PARAM_STR);
       $stmt->bindParam(':units', $units, PDO::PARAM_STR);
       $stmt->bindParam(':frequency', $frequency, PDO::PARAM_STR);
       $stmt->bindParam(':aggregation', $aggregation, PDO::PARAM_STR);
       $stmt->bindParam(':nodata', $nodata, PDO::PARAM_STR);
       $stmt->bindParam(':dommin', $dommin, PDO::PARAM_STR);
       $stmt->bindParam(':dommax', $dommax, PDO::PARAM_STR);

       $stmt->execute();
       
       $array = array("status"=>"OK");
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }
    
?>