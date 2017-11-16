<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;

      $datasetid = $data->datasetid;
      $field = $data->field;
      $description = $data->description;
      $units = $data->units;
      $frequency = $data->frequency;
      $aggregation = $data->aggregation;
      $nodata = $data->nodata;
      $dommin = $data->dommin;
      $dommax = $data->dommax;

      $sql = str_replace("@datasetid",":datasetid",$sql);
      $sql = str_replace("@field",":field",$sql);
      $sql = str_replace("@description",":description",$sql);
      $sql = str_replace("@units",":units",$sql);
      $sql = str_replace("@frequency",":frequency",$sql);
      $sql = str_replace("@aggregation",":aggregation",$sql);
      $sql = str_replace("@nodata",":nodata",$sql);
      $sql = str_replace("@dommin",":dommin",$sql);
      $sql = str_replace("@dommax",":dommax",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':datasetid', $datasetid, PDO::PARAM_STR);

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