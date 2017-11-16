<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;
      $collectiontitle = $data->collectiontitle;
      $userid = $data->userid;
      
      $sql = str_replace("@collectiontitle",":collectiontitle",$sql);
      $sql = str_replace("@userid",":userid",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':collectiontitle', $collectiontitle, PDO::PARAM_STR);
       $stmt->bindParam(':userid', $userid, PDO::PARAM_STR);
       $stmt->execute();
       
       $array = array("status"=>"OK");
       echo json_encode($array);

     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>