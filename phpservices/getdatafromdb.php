<?php 

      include 'dbConnectPDO.php';
      
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;

      $rowsArray = array();
      
      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
       $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      // prepare sql and bind parameters
      $stmt = $conn->prepare($sql);
      $stmt->execute();
 
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $rowsArray[] = $row;
      } 
     
     echo json_encode($rowsArray); 
    
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>