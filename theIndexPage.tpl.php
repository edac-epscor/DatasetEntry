<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>EPSCOR</title>
</head>
<body ng-app='myapp' ng-controller="applicationController as ac">
<!--
<hr />
the base url is <?php echo $GLOBALS['base_url'] ?>
<br />
the User is <?php echo $GLOBALS['user']->name.'  '.$GLOBALS['user']->uid ?>
<hr />
-->
    <form id="masterForm" name="masterForm" novalidate>
        <!-- All of the individual pages will be injected into this div -->
        <div class="container">
            <div class="view-animate-container">
                <div ng-cloak ng-view class="view-animate">
                </div>
            </div>
        </div>
    </form>
    <!--</div>-->
    <div>
        <!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.7/angular.min.js"></script> -->
    </div>
</body>
</html>
