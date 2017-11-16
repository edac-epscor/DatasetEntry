<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;
      $datasetid = $data->datasetid;
      $embargoreleasedate = $data->embargoreleasedate;
      $embargoreason = $data->embargoreason;
                 
      $sql = str_replace("@datasetid",":datasetid",$sql);
      $sql = str_replace("@embargoreleasedate",":embargoreleasedate",$sql);
      $sql = str_replace("@embargoreason",":embargoreason",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':datasetid', $datasetid, PDO::PARAM_STR);

       $stmt->bindParam(':embargoreleasedate', $embargoreleasedate, PDO::PARAM_STR);
       $stmt->bindParam(':embargoreason', $embargoreason, PDO::PARAM_STR);

       $stmt->execute();
       
       $array = array("status"=>"OK");
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }
    
?>