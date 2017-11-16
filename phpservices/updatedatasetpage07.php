<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;

      $datasetid = $data->datasetid;
      $dateperformed = $data->dateperformed;
      $firstname = $data->firstname;
      $lastname = $data->lastname;
      $description = $data->description;                 
                 
      $sql = str_replace("@datasetid",":datasetid",$sql);
      $sql = str_replace("@dateperformed",":dateperformed",$sql);
      $sql = str_replace("@firstname",":firstname",$sql);
      $sql = str_replace("@lastname",":lastname",$sql);
      $sql = str_replace("@description",":description",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':datasetid', $datasetid, PDO::PARAM_STR);

       $stmt->bindParam(':dateperformed', $dateperformed, PDO::PARAM_STR);
       $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
       $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
       $stmt->bindParam(':description', $description, PDO::PARAM_STR);

       $stmt->execute();
       
       $array = array("status"=>"OK");
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>