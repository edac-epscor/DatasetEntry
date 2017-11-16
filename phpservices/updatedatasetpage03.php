<?php 

			include 'dbConnectPDO.php';
	    
      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
if (is_null($data))
{
  echo "packageisnull";
}
else {
      $sql = $data->sql;
  
      $datasetid = $data->datasetid;
      $abstract = $data->abstract;
      $purpose = $data->purpose;
      $otherinfo = $data->otherinfo;
 
      //$sql = str_replace("@datasetid",":datasetid",$sql);
      //$sql = str_replace("@abstract",":abstract",$sql);
      //$sql = str_replace("@purpose",":purpose",$sql);
      //$sql = str_replace("@otherinfo",":otherinfo",$sql);

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
      // set the PDO error mode to exception
       $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindParam(':datasetid', $datasetid, PDO::PARAM_STR);

       $stmt->bindParam(':abstract', $abstract, PDO::PARAM_STR);
       $stmt->bindParam(':purpose', $purpose, PDO::PARAM_STR);
       $stmt->bindParam(':otherinfo', $otherinfo, PDO::PARAM_STR);

       $stmt->execute();
       
       $array = array("status"=>"OK");
       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $sql . "<br>" . $e->getMessage();
     
     }
}
?>