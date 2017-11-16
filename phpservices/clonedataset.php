<?php

      include 'dbConnectPDO.php';

      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $sql = "INSERT INTO datasets (datasetname,userid,collectionid,categoryid,subcategoryid,institutionid,firstname,";
      $sql .= "lastname,email,phone,firstnamepi,lastnamepi,emailpi,phonepi,abstract,purpose,otherinfo,";
      /*$sql .= "keywords,placenames,deliverymethod,filename,filetype,filedescription,licensename,licensereference,";*/
      $sql .= "keywords,placenames,deliverymethod,licensename,licensereference,";
      $sql .= "licensereason,embargoreleasedate,embargoreason,uploadtodataone,isotopicid) ";
      $sql .= "Select '',userid,collectionid,categoryid,subcategoryid,institutionid,firstname,";
      $sql .= "lastname,email,phone,firstnamepi,lastnamepi,emailpi,phonepi,abstract,purpose,otherinfo,";
      /*$sql .= "keywords,placenames,deliverymethod,filename,filetype,filedescription,licensename,licensereference,";*/
      $sql .= "keywords,placenames,deliverymethod,licensename,licensereference,";
      $sql .= "licensereason,embargoreleasedate,embargoreason,uploadtodataone,isotopicid ";
      $sql .= "from datasets where id=:datasetid";

      $datasetid = $data->datasetid;

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       // prepare sql and bind parameters
       $stmt = $conn->prepare($sql);
       $stmt->bindValue(':datasetid', $datasetid, PDO::PARAM_STR);
       $stmt->execute();

       $array = array("status"=>"OK", "newid"=>$conn->lastInsertId());

       echo json_encode($array);
     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>
