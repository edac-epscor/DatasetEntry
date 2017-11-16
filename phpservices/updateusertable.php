<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
           
      $userid = $data->userid;   
      $firstname = $data->firstname;
      $lastname = $data->lastname;
      $Userusername = $data->username;
      $Userpassword = $data->password;
      $encryptedpwd = "hakdhaksjdhaskj";

      $key = 'password to (en/de)crypt';
      $string = $Userpassword;
      $encryptedpwd = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($key), $string, MCRYPT_MODE_CBC, md5(md5($key))));

      if ($userid === "") {
        $sql = "INSERT INTO users(username,password,firstname,lastname,encryptedpwd) ";
        $sql .= "VALUES(:username,:password,:firstname,:lastname,:encryptedpwd)";
      }
      else
      {
      }

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindValue(':firstname', $firstname, PDO::PARAM_STR);
       $stmt->bindValue(':lastname', $lastname, PDO::PARAM_STR);
       $stmt->bindValue(':username', $Userusername, PDO::PARAM_STR);
       $stmt->bindValue(':password', $Userpassword, PDO::PARAM_STR);
       $stmt->bindValue(':encryptedpwd', $encryptedpwd, PDO::PARAM_STR);
       
       $stmt->execute();
              
       $array = array("status"=>"OK", "newid"=>$conn->lastInsertId());
       
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>