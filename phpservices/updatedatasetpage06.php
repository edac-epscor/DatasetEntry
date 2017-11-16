<?php

			include 'dbConnectPDO.php';

      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;

      $datasetid = $data->datasetid;
      $filename = $data->filename;
      $filetype = $data->filetype;
      $filedescription = $data->filedescription;

      $sql = str_replace("@datasetid",":datasetid",$sql);
      /*$sql = str_replace("@filename",":filename",$sql);
      $sql = str_replace("@filetype",":filetype",$sql);*/
      $sql = str_replace("@filedescription",":filedescription",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':datasetid', $datasetid, PDO::PARAM_STR);

       /*$stmt->bindParam(':filename', $filename, PDO::PARAM_STR);
       $stmt->bindParam(':filetype', $filetype, PDO::PARAM_STR);*/
       $stmt->bindParam(':filedescription', $filedescription, PDO::PARAM_STR);

       $stmt->execute();

       $array = array("status"=>"OK");
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>
