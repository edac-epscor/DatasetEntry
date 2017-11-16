<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;
      $description = $data->description;
      $istabulardata = $data->istabulardata;

      $sql = str_replace("@description",":description",$sql);
      $sql = str_replace("@istabulardata",":istabulardata",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':description', $description, PDO::PARAM_STR);
       $stmt->bindParam(':istabulardata', $istabulardata, PDO::PARAM_STR);
       $stmt->execute();
       
       $array = array("status"=>"OK");
       echo json_encode($array);
       
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>