<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;
                
      $datasetid = $data->datasetid;
      $isotopicid = $data->isotopicid;
      $keywordList = $data->keywordList;
      $placenameList = $data->placenameList;
          
      $sql = str_replace("@datasetid",":datasetid",$sql);
      $sql = str_replace("@isotopicid",":isotopicid",$sql);
      $sql = str_replace("@keywordList",":keywordList",$sql);
      $sql = str_replace("@placenameList",":placenameList",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':datasetid', $datasetid, PDO::PARAM_STR);

       $stmt->bindParam(':isotopicid', $isotopicid, PDO::PARAM_STR);
       $stmt->bindParam(':keywordList', $keywordList, PDO::PARAM_STR);
       $stmt->bindParam(':placenameList', $placenameList, PDO::PARAM_STR);

       $stmt->execute();
       
       $array = array("status"=>"OK");
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>