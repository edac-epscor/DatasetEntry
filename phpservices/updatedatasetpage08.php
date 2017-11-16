<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;

      $datasetid = $data->datasetid;
      $licensename = $data->licensename;
      $licensereference = $data->licensereference;
      $licensereason = $data->licensereason;
                 
      $sql = str_replace("@datasetid",":datasetid",$sql);
      $sql = str_replace("@licensename",":licensename",$sql);
      $sql = str_replace("@licensereference",":licensereference",$sql);
      $sql = str_replace("@licensereason",":licensereason",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':datasetid', $datasetid, PDO::PARAM_STR);

       $stmt->bindParam(':licensename', $licensename, PDO::PARAM_STR);
       $stmt->bindParam(':licensereference', $licensereference, PDO::PARAM_STR);
       $stmt->bindParam(':licensereason', $licensereason, PDO::PARAM_STR);

       $stmt->execute();
       
       $array = array("status"=>"OK");
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }
?>