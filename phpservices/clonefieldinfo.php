<?php

      include 'dbConnectPDO.php';

      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = "INSERT INTO fieldinfo (datasetid,field,description,units,frequency,aggregation,nodata,dommin,dommax) ";
      $sql .= "Select :newdsetid,field,description,units,frequency,aggregation,nodata,dommin,dommax ";
      $sql .= "from fieldinfo where datasetid=:datasetid";

      $datasetid = $data->datasetid;
      $newdsetid = $data->newdsetid;

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindValue(':newdsetid', $newdsetid, PDO::PARAM_STR);
       $stmt->bindValue(':datasetid', $datasetid, PDO::PARAM_STR);
       $stmt->execute();

       $array = array("status"=>"OK", "newid"=>$conn->lastInsertId());

       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>
