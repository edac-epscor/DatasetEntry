<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;

      $datasetid = $data->datasetid;
      $firstname = $data->firstname;
      $lastname = $data->lastname;
      $email = $data->email;
      $phone = $data->phone;
      $firstnamepi = $data->firstnamepi;
      $lastnamepi = $data->lastnamepi;
      $emailpi = $data->emailpi;
      $phonepi = $data->phonepi;
          
      //Can probably just replace al '@' with ':'
      $sql = str_replace("@datasetid",":datasetid",$sql);
      $sql = str_replace("@firstname",":firstname",$sql);
      $sql = str_replace("@lastname",":lastname",$sql);
      $sql = str_replace("@email",":email",$sql);
      $sql = str_replace("@phone",":phone",$sql);
      $sql = str_replace("@firstnamepi",":firstnamepi",$sql);
      $sql = str_replace("@lastnamepi",":lastnamepi",$sql);
      $sql = str_replace("@emailpi",":emailpi",$sql);
      $sql = str_replace("@phonepi",":phonepi",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':datasetid', $datasetid, PDO::PARAM_STR);

       $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
       $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
       $stmt->bindParam(':email', $email, PDO::PARAM_STR);
       $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);

       $stmt->bindParam(':firstnamepi', $firstnamepi, PDO::PARAM_STR);
       $stmt->bindParam(':lastnamepi', $lastnamepi, PDO::PARAM_STR);
       $stmt->bindParam(':emailpi', $emailpi, PDO::PARAM_STR);
       $stmt->bindParam(':phonepi', $phonepi, PDO::PARAM_STR);

       $stmt->execute();
       
       $array = array("status"=>"OK");
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>