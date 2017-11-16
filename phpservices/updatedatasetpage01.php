<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = $data->sql;

      //Add sql to update the step
      //$sql = $sql . ";Update datasets set step = 1 where id = :datasetoruserid and ((step is null) or (step <1))";
      
      //$userid = $data->userid;
      $datasetoruserid = $data->datasetoruserid;
      $datasetname = $data->datasetname;
      $collectionid = $data->collectionid;
      $categoryid = $data->categoryid;
      $subcategoryid = $data->subcategoryid;
      $institutionid = $data->institutionid;
          
      $sql = str_replace("@datasetoruserid",":datasetoruserid",$sql);
      $sql = str_replace("@datasetname",":datasetname",$sql);
      $sql = str_replace("@collectionid",":collectionid",$sql);
      $sql = str_replace("@categoryid",":categoryid",$sql);
      $sql = str_replace("@subcategoryid",":subcategoryid",$sql);
      $sql = str_replace("@institutionid",":institutionid",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':datasetoruserid', $datasetoruserid, PDO::PARAM_STR);
       $stmt->bindParam(':datasetname', $datasetname, PDO::PARAM_STR);
       $stmt->bindParam(':collectionid', $collectionid, PDO::PARAM_STR);
       $stmt->bindParam(':categoryid', $categoryid, PDO::PARAM_STR);
       $stmt->bindParam(':subcategoryid', $subcategoryid, PDO::PARAM_STR);
       $stmt->bindParam(':institutionid', $institutionid, PDO::PARAM_STR);
       $stmt->execute();
       
       $array = array("status"=>"OK");
       if (substr($sql, 0, 6 ) === "insert")
       {
         $theid = $conn->lastInsertId();
         $array = array("status"=>"OK", "newid"=>$conn->lastInsertId());
       }
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>