<?php
/* Created 2/10/2015 */
/* Created 2/13/2015 to accept the logged in userid as a parameter */
/* Modifed to use PDO on 5/2/2015 */


      include 'dbConnectPDO.php';

      /* First lets get the sql string to pass to the database */
      $data = json_decode(file_get_contents("php://input"));
      $userid = $data->id;
      $sql = "select distinct collectionid,collections.collectiontitle from datasets left join collections on collections.id = datasets.collectionid where datasets.userid=:userid";

      $rowsArray = array();
      $currentRow = 0;

      try {
       $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
       // set the PDO error mode to exception
       $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      // prepare sql and bind parameters
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':userid', $userid, PDO::PARAM_STR);
      $stmt->execute();

      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $rowsArray[] = $row;

        $sql2 = "select datasets.id as datasetid, datasetname as datasettitle, status.id as statusid, rejected, coalesce(status.description,'unknown') as status , step from datasets left join status on status.id=datasets.status where userid=:userid and collectionid=:collectionid order by datasets.id";

            $stmt2 = $conn->prepare($sql2);
            $stmt2->bindParam(':userid', $userid, PDO::PARAM_STR);
            $stmt2->bindParam(':collectionid', $row['collectionid'], PDO::PARAM_STR);
            $stmt2->execute();

            $datasetzArray = array();

            while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
              $datasetzArray[] = $row2;
            }
            $stmt2->closeCursor();

            $rowsArray[$currentRow]['datasetz']=$datasetzArray;

            $currentRow=$currentRow+1;
     }

     echo json_encode($rowsArray);

     }
      catch(PDOException $e)
     {
      echo "Error: " . $e->getMessage();
     }

?>
