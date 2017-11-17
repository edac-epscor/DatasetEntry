
(function() {
    'use strict';

    var myapp = angular.module('myapp',["ngRoute", "ngAnimate", "ngMaterial", "ngCookies", "ngMessages", "ngSanitize", "chart.js", "ui.bootstrap", "angularUtils.directives.dirPagination"]);

    angular.module("myapp")
      .config(function ($routeProvider) {
          var drupalPath = Drupal.settings.datasetentry.path;
         $routeProvider
                .when('/', { templateUrl: drupalPath + "/partials/startpage.html", controller: "applicationController" })
                .when('/home', { templateUrl: drupalPath + "/partials/home.html", controller: "applicationController" })
                .when('/test', { templateUrl: drupalPath + "/partials/test.html", controllerAs: "tst", controller: "testController", caseInsensitiveMatch: true })
                .when('/newuser', { templateUrl: drupalPath + "/partials/newuser.html", controllerAs: "vm", controller: "newuserController", caseInsensitiveMatch: true })
                .when('/userloggedin', { templateUrl: drupalPath + "/partials/userloggedin.html", controllerAs: "dsc", controller: "datasetController", caseInsensitiveMatch: true })
                .when('/dispds', { templateUrl: drupalPath + "/partials/dispds.html", controllerAs: "dispds", controller: "displayDSController"})
                .when('/clonedataset', { templateUrl: drupalPath + "/partials/clonedataset.html", controllerAs: "vm", controller: "cloneDatasetController", caseInsensitiveMatch: true })
                .when('/showdataset', { templateUrl: drupalPath + "/partials/showdataset.html", controllerAs: "dsc", controller: "showDatasetController", caseInsensitiveMatch: true })
		.when('/cookieid', { templateUrl: drupalPath + "/partials/cookieid.php", controllerAs: "vm", controller: "page01Controller", caseInsensitiveMatch: true })
                .when('/page01', { templateUrl: drupalPath + "/partials/page01.html", controllerAs: "vm", controller: "page01Controller", caseInsensitiveMatch: true })
                .when('/page02', { templateUrl: drupalPath + "/partials/page02.html", controllerAs: "vm", controller: "page02Controller", caseInsensitiveMatch: true })
                .when('/page03', { templateUrl: drupalPath + "/partials/page03.html", controllerAs: "vm", controller: "page03Controller", caseInsensitiveMatch: true })
                .when('/page04', { templateUrl: drupalPath + "/partials/page04.html", controllerAs: "vm", controller: "page04Controller", caseInsensitiveMatch: true })
                .when('/page05', { templateUrl: drupalPath + "/partials/page05.html", controllerAs: "vm", controller: "page05Controller", caseInsensitiveMatch: true })
                .when('/page06', { templateUrl: drupalPath + "/partials/page06.html", controllerAs: "vm", controller: "page06Controller", caseInsensitiveMatch: true })
                .when('/page07', { templateUrl: drupalPath + "/partials/page07.html", controllerAs: "vm", controller: "page07Controller", caseInsensitiveMatch: true })
                .when('/page08', { templateUrl: drupalPath + "/partials/page08.html", controllerAs: "vm", controller: "page08Controller", caseInsensitiveMatch: true })
                .when('/page09', { templateUrl: drupalPath + "/partials/page09.html", controllerAs: "vm", controller: "page09Controller", caseInsensitiveMatch: true })
                .when('/page10', { templateUrl: drupalPath + "/partials/page10.html", controllerAs: "vm", controller: "page10Controller", caseInsensitiveMatch: true })
                .when('/page11', { templateUrl: drupalPath + "/partials/page11.html", controllerAs: "vm", controller: "page11Controller", caseInsensitiveMatch: true })
                .when('/page12', { templateUrl: drupalPath + "/partials/page12.html", controllerAs: "vm", controller: "page12Controller", caseInsensitiveMatch: true })
        })
        .config(['ChartJsProvider', function (ChartJsProvider) {
            ChartJsProvider.setOptions({
                colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
            });
            ChartJsProvider.setOptions('doughnut', {
                cutoutPercentage: 60
            });
        }])
        .run(function ($rootScope, $location) {
        //Parse the endPoint from the url we come in on to avoid cross domain issues
        //e.g.  http://www.prodata123.com/index.html becomes www.prodata123.com
        //This (below) doesn't work after 'refresh'
        //Get the protocol (http or https) - we will use this when calling phpservices
            $rootScope.serviceurl = $location.absUrl();

            $rootScope.protocol = ($location.absUrl().toLowerCase().substring(0, 5) === 'https') ? "https://" : "http://";
            $rootScope.endPoint = $location.absUrl().replace($rootScope.protocol, '');
           //Now we need to get the default domain
            if ($rootScope.endPoint.indexOf('/index') > -1) {
                //If we rely on the 'default page' mechanism of the server we might not have an index page
                $rootScope.endPoint = $rootScope.endPoint.substring(0, $rootScope.endPoint.indexOf('/index'));
            }
            else if ($rootScope.endPoint.indexOf('/#') > -1) {
                //This happens when we 'refresh' from one of the inner pages
                $rootScope.endPoint = $rootScope.endPoint.substring(0, $rootScope.endPoint.indexOf('/#'));
            }
            else if ($rootScope.endPoint.indexOf('#/') > -1) {
                //This happens when we 'refresh' from one of the inner pages
              $rootScope.endPoint = $rootScope.endPoint.substring(0, $rootScope.endPoint.indexOf('#/'));
            }
            //Append drupal specific path info
            var xxx = $rootScope.endPoint;
            var drupalpth = Drupal.settings.datasetentry.path;
           $rootScope.endPoint = xxx.replace('datasetentry', drupalpth);

        });
})();

(function() {
    'use strict';

    angular.module("myapp")
      .filter('encodeURIComponent', function() {
     return window.encodeURIComponent;
    });

})();

(function() {
    'use strict';

    angular.module("myapp")
    .service('sharedService', function () {
        var theUserID = "";
        var theDatasetID = "";
        var theCollectionID = "";

        return {
            getUserID: function () {
                return this.theUserID;
            },
            getUserFirstName: function () {
                return this.theUserFirstName;
            },
            getUserLastName: function () {
                return this.theUserLastName;
            },
            setUserID: function (userid) {
                this.theUserID = userid;
            },
            setUserFirstName: function (userFirstName) {
                this.theUserFirstName = userFirstName;
            },
            setUserLastName: function (userLastName) {
                this.theUserLastName = userLastName;
            },
            getDataSetID: function () {
                return this.theDatasetID;
            },
            setDataSetID: function (datasetid) {
                this.theDatasetID = datasetid;
            },
            getCollectionID: function () {
                return this.theCollectionID;
            },
            setCollectionID: function (dsetz) {
                this.theCollectionID = dsetz;
            },
            setIsTabular: function (istab) {
                this.isTabular = istab;
            },
            getIsTabular: function () {
                return this.isTabular;
            },
            setIsWorkbook: function (iswb) {
                this.isWorkbook = iswb;
            },
            getIsWorkbook: function (iswb) {
                return this.isWorkbook;
            },
        };
    })
})();

(function() {
    'use strict';

    angular.module("myapp")
    .service('datasetsService', function ($http, $q, $rootScope, $location) {

         this.loginPHP = function (credentials) {
             var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/login.php', credentials)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
               .error(function (responseData) {
                   deferred.reject(data);
                   console.log("Error !" + responseData);
               });
            return deferred.promise;
        }

        this.createNewUserPHP = function (params) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/createnewuser.php', params)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
               .error(function (responseData) {
                   deferred.reject(data);
                   console.log("Error !" + responseData);
               });
            return deferred.promise;
        }

        this.updateUsersTablePHP = function (params) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updateusertable.php', params)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
               .error(function (responseData) {
                   deferred.reject(data);
                   console.log("Error !" + responseData);
               });
            return deferred.promise;
        }

        this.deletefromtablebyid = function (params) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/deletefromtablebyid.php', params)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
               .error(function (responseData) {
                   deferred.reject(data);
                   console.log("Error !" + responseData);
               });
            return deferred.promise;
        }

        this.cloneDatasetPHP = function (params) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/clonedataset.php', params)
                   .success(function (data) {
                      deferred.resolve(data);
                   })
               .error(function (responseData) {
                   deferred.reject(data);
                   console.log("Error !" + responseData);
               });
            return deferred.promise;
        }

        this.cloneFieldinfoPHP = function (params) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/clonefieldinfo.php', params)
                   .success(function (data) {
                      deferred.resolve(data);
                   })
               .error(function (responseData) {
                   deferred.reject(data);
                   console.log("Error !" + responseData);
               });
            return deferred.promise;
        }

        this.getProcessesPHP = function (sql) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/getprocesses.php', sql)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
               .error(function (responseData) {
                   deferred.reject(data);
                   console.log("Error !" + responseData);
               });
            return deferred.promise;
        }

        this.getFieldInfoRecordsPHP = function (sql) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/getfieldinforecords.php', sql)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
               .error(function (responseData) {
                   deferred.reject(data);
                   console.log("Error !" + responseData);
               });
            return deferred.promise;
        }

        this.getfieldinforecord = function (sql) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/getfieldinforecord.php', sql)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
               .error(function (responseData) {
                   deferred.reject(data);
                   alert('sskjfhksjhf');
                   console.log("Error !" + responseData);
               });
            return deferred.promise;
        }

        this.getDataFromDBPHP = function (sql) {
            var deferred = $q.defer();
            var theData = JSON.parse(sql);
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/getdatafromdb.php', sql)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.getDataFromDatasetRecord = function (postData) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/getdatasetrecord.php', postData)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.getUserDatasetsPHP = function (params) {
            //Sample Params: '{"id": "1"}'
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/getuserdatasets.php', params)
                .success(function (data) {
                    deferred.resolve(data);
                })
                     .error(function (responseData) {
                         deferred.reject(data);
                         console.log("Error !" + responseData);
                     });
            return deferred.promise;
        }

        this.getUserDatasetsforCloningPHP = function (params) {
            //Sample Params: '{"id": "1"}'
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/getuserdatasetsforcloning.php', params)
                .success(function (data) {
                    deferred.resolve(data);
                })
                     .error(function (responseData) {
                         deferred.reject(data);
                         console.log("Error !" + responseData);
                     });
            return deferred.promise;
        }

        this.addNewCollection = function (theNewCollectionTitle,theUserId) {
            var deferred = $q.defer();
            var params = '{"sql":"insert into collections (collectiontitle,userid) values(@collectiontitle,@userid)","collectiontitle":"' + theNewCollectionTitle + '","userid":' + theUserId + '}';
           $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/addnewcollection.php', params)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.addNewFileType = function (description, istabulardata) {
            var deferred = $q.defer();

            var params = '{"sql":"insert into filetypes (description,istabulardata) values (@description,@istabulardata)", ';
            params += '"description":"' + description + '",';
            params += '"istabulardata":"' + istabulardata + '"';
            params += '}';

            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/addnewfiletype.php', params)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page01 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage01.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page02 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage02.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page03 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage03.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page04 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage04.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page05 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage05.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page06 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage06.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page07 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage07.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page08 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage08.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page09 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage09.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page10 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage10.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page11 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage11.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        //Called from Page 11 when saving edits
        this.updatefieldinfodatarecord = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatefieldinfodatarecord.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetPHP_Page12 = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetpage12.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }

        this.updateDatasetStep = function (theDataPackage) {
            var deferred = $q.defer();
            $http.post($rootScope.protocol + $rootScope.endPoint + '/phpservices/updatedatasetstep.php', theDataPackage)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                .error(function (responseData) {
                    deferred.reject(data);
                    console.log("Error !" + responseData);
                });
            return deferred.promise;
        }


    });
})();

(function() {
    'use strict';

    angular.module("myapp")
    .directive('modalDialog', function () {
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function (scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width)
                    scope.dialogStyle.width = attrs.width;
                if (attrs.height)
                    scope.dialogStyle.height = attrs.height;
                scope.hideModal = function () {
                    scope.show = false;
                };
            },
            template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>" // See below
        };
    })
    .controller("testController", ['$location', '$rootScope', '$cookies', 'datasetsService', 'sharedService', function ($location, $rootScope, $cookies, datasetsService, sharedService) {
        var tst = this;
        tst.modalShown = false;

        tst.init = function () {

        }

        tst.helpContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque condimentum justo aliquam sodales auctor. Proin quis massa placerat, interdum ipsum et, tempus urna. Mauris lobortis ultricies orci ac bibendum. Ut sed quam arcu. In id auctor quam. Proin consequat efficitur libero at placerat. Pellentesque vehicula, lorem et varius aliquet, felis ante consequat magna, eu elementum felis libero sed neque. Nunc et justo in enim rhoncus euismod at in sem. Morbi rhoncus ligula lectus, eu fermentum libero rhoncus viverra.";

        tst.toggleModal = function () {
            tst.modalShown = !tst.modalShown;
        };

        tst.checkthedates = function () {
            //Dates are expected in mm/dd/yyyy format
            var dt1 = (tst.thedate1.getMonth() + 1) + "/" + (tst.thedate1.getDate()) + "/" + (tst.thedate1.getFullYear());
            var dt2 = tst.thedate2;
            tst.themessage = "";
            if (checkthisdate(dt1)) {
                tst.themessage = "Date 1 is valid";
            }
            else {
                tst.themessage = "Date 1 is invalid";
            }
            if (checkthisdate(dt2)) {
                tst.themessage += "    Date 2 is valid";
            }
            else {
                tst.themessage += "    Date 2 is invalid";
            }

        }

        function checkthisdate(theDate) {
            var sParts = theDate.split("/");
            var m = sParts[0];
            var d = sParts[1];
            var y = sParts[2];
            alert(m + ',' + d + ',' + y);
            var date = new Date(y, m - 1, d);
            if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                return true;
            } else {
                return false;
            }
        }

        tst.init();


    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("applicationController", ['$location', '$cookies', '$rootScope', 'datasetsService', 'sharedService', function ($location, $cookies, $rootScope, datasetsService, sharedService) {
        var ac = this;
        ac.userid = "";
        ac.credentials = {};
        ac.userInfo = {};
        ac.failedlogin = "";
        ac.submitted = false;
        ac.datestatus = "";

        ac.init = function () {
            if (Drupal.settings.datasetentry.user_name != "")
            {
                //var thePath = $location.absUrl();
                //var n = thePath.lastIndexOf("/");
                //var thePage = thePath.substring(n);

                var thePage = $location.absUrl().substring($location.absUrl().lastIndexOf("/"));

                ac.userInfo.id = Drupal.settings.datasetentry.userid;
                ac.userInfo.firstname = Drupal.settings.datasetentry.user_name;
                ac.userInfo.lastname = "";

                sharedService.setUserID(ac.userInfo.id);
                sharedService.setUserFirstName(ac.userInfo.firstname);
                sharedService.setUserLastName(ac.userInfo.lastname);
                $cookies.loggedinuser = ac.userInfo.id;
                $cookies.loggedinuserfirstname = ac.userInfo.firstname;
                $cookies.loggedinuserlastname = ac.userInfo.lastname;
                //$location.path("/userloggedin");

                //If we are hitting F5 (refresh) then we want to return to the same page we are on
                if (thePage.toLowerCase().trim().substring(0,5) === '/page') {
                    $location.path(thePage);
                }
                else
                {
                    $location.path("/userloggedin");
                }

            }
            else
            {
                $location.path("/home")
            }
        }
        //This is used to get the path to the question mark graphic
        //Inside DRUPAL
        ac.qmarkpath = $rootScope.protocol + $rootScope.endPoint + "/angularimages";
        ac.loaderpath = $rootScope.protocol + $rootScope.endPoint;
        //Standard Application
        //ac.qmarkpath = "/angularimages";

        //Let's see if we have a cookie and if the user and/or datasetid is defined
        var loggedInUser = $cookies.loggedinuser;
        if (loggedInUser !== 'undefined') {
            sharedService.setUserID($cookies.loggedinuser);
            sharedService.setUserFirstName($cookies.loggedinuserfirstname);
            sharedService.setUserLastName($cookies.loggedinuserlastname);

            ac.userid = sharedService.getUserID();
        }
        var datasetid = $cookies.datasetid;
        if (datasetid !== 'undefined') {
            sharedService.setDataSetID($cookies.datasetid);
        }

        ac.newUser = function () {
            $location.path("/newuser");
        }

        ac.logmein = function () {
            alert('ac.logmein - deprecated');
            //Code was used in testing
            //$location.path("/userloggedin");
            //sharedService.setUserID('1');
            //$cookies.loggedinuser = '1';
            //ac.userid = sharedService.getUserID();
        }

        ac.logmein2 = function () {
            //Now we need to see if we can login successfully
            var creds = '{"username":"' + ac.credentials.username + '","password":"' + ac.credentials.password + '"}';
            datasetsService.loginPHP(creds)
                .then(function (data) {
                    ac.userInfo = data;
                    if (typeof ac.userInfo.id === "undefined") {
                        ac.failedlogin = "invalid username or password - try again";
                    }
                    else {
                        ac.userInfo = data;
                        sharedService.setUserID(ac.userInfo.id);
                        sharedService.setUserFirstName(ac.userInfo.firstname);
                        sharedService.setUserLastName(ac.userInfo.lastname);
                        $cookies.loggedinuser = ac.userInfo.id;
                        $cookies.loggedinuserfirstname = ac.userInfo.firstname;
                        $cookies.loggedinuserlastname = ac.userInfo.lastname;
                        $location.path("/userloggedin");
                    }
                }, function (theError) {
                    ac.userInfo = 'bad data:' + theError;
                })
        }

        ac.init();

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("datasetController", ['$scope', '$location', '$cookies', 'datasetsService', 'sharedService', function ($scope, $location, $cookies, datasetsService, sharedService) {
        //This controller will load the user datasets after login
        var dsc = this;

        //Get shared service data
        dsc.collections = [{}];
        dsc.actualdatasets = [];
        dsc.theuserid = sharedService.getUserID();
        dsc.theuserfirstname = sharedService.getUserFirstName();
        dsc.theuserlastname = sharedService.getUserLastName();
        dsc.datasettoclone = "";
        dsc.dsetz = [];
        dsc.dsetzr = [];
        $scope.data = [];
        $scope.labels = [];
        $scope.options = { //needed for centered text // NOTE: not currently in use as drupal strips inline styles.
            elements: {
                center: {
                    // the longest text that could appear in the center
                    maxText: '100%',
                    text: '450',
                    fontColor: '#FF6684',
                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    fontStyle: 'normal',
                    // fontSize: 12,
                    // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
                    // if these are not specified either, we default to 1 and 256
                    minFontSize: 1,
                    maxFontSize: 256,
                }
            },
            legendCallback: function(chart) {
                  var text = [];
                  text.push('<ul>');
                  for (var i=0; i<chart.data.datasets[0].data.length; i++) {
                      text.push('<li><span>')//('<li><span><a href="/datasetentry#/userloggedin/#');
                      //text.push(chart.data.labels[i])
                      text.push(chart.data.labels[i]);
                      text.push('</span></li>');
                  }
                  text.push('</ul>');
                  return text.join("");

              },

        };
        $scope.height_chart = window.innerHeight*0.15;

        dsc.init = function () {
            dsc.getuserdatasetsphp();
            dsc.datasettoclone = "";

        }

        dsc.showdataset = function (dsetz) {
            sharedService.setCollectionID(dsetz);
            $location.path("/showdataset");
        }

        dsc.getuserdatasetsphp = function () {
            var params = '{"id": "' + sharedService.getUserID() + '"}';
            datasetsService.getUserDatasetsPHP(params)
                            .then(function (data) {
                                dsc.userdatasets = data;
                                //console.log(data.length);
                                dsc.existingdatasets = dsc.userdatasets.length; //this shows # of collections, not datasets?
                                dsc.dSetLength = 0;
                                var sData = [];
                                var sLabels = []; // thought id stripping was due to too many pushes to chart. guess not.
                                for(var i=0; i<data.length; i++) {
                                    dsc.actualdatasets = data[i].datasetz;
                                    //console.log("datasetz");
                                    for(var j=0; j<data[i].datasetz.length; j++) {
                                        if(data[i].datasetz[j].statusid < 2) {
                                            dsc.dsetz.push(data[i].datasetz[j]);
                                        }
                                        if(data[i].datasetz[j].rejected != 0 && data[i].datasetz[j].statusid < 2){
                                            dsc.dsetzr.push(data[i].datasetz[j]);
                                        }
                                    }
                                    sData.push(dsc.actualdatasets.length);
                                    if(data[i].collectiontitle == null) {
                                        sLabels.push("null title");
                                    } else {
                                        sLabels.push(data[i].collectiontitle);
                                    }
                                    dsc.dSetLength += dsc.actualdatasets.length;
                                }
                                $scope.data = sData;
                                console.log(dsc.dsetzr);
                                $scope.labels = sLabels;
                                //dsc.getuserdatasetsforcloningphp();
                            }, function (theError) {
                                dsc.userdatasets = 'bad data:' + theError;
                            })
        }

        //Data Entry 01
        dsc.addnewdataset = function () {
            //Clear out the DataSetID just in case
            sharedService.setDataSetID('');
            $location.path("/page01");
        }

        dsc.clonedataset = function () {
             $location.path("/clonedataset");
        }

        dsc.viewedit = function (datasetid, dsstatusid) {
            sharedService.setDataSetID(datasetid);
            $cookies.datasetid = datasetid;
            //If Status is greater than 'Submitted for Approval' then go to page 12
            if (dsstatusid >= '2') {
                $location.path("/page12");
            }
            else {
                $location.path("/page01");
            }
        }

        dsc.init();

        // write text plugin
        Chart.pluginService.register({

            afterUpdate: function (chart) {
                $scope.chartLegend = chart.generateLegend();
                if (chart.config.options.elements.center) {
                    var helpers = Chart.helpers;
                    var centerConfig = chart.config.options.elements.center;
                    var globalConfig = Chart.defaults.global;
                    var ctx = chart.chart.ctx;

                    var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
                    var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

                    if (centerConfig.fontSize)
                        var fontSize = centerConfig.fontSize;
                        // figure out the best font size, if one is not specified
                    else {
                        ctx.save();
                        var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
                        var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
                        var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

                        do {
                            ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                            var textWidth = ctx.measureText(maxText).width;

                            // check if it fits, is within configured limits and that we are not simply toggling back and forth
                            if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                                fontSize += 1;
                            else {
                                // reverse last step
                                fontSize -= 1;
                                break;
                            }
                        } while (true)
                        ctx.restore();
                    }

                    // save properties
                    chart.center = {
                        font: helpers.fontString(fontSize, fontStyle, fontFamily),
                        fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
                    };
                }
            },
            afterDraw: function (chart) {

                if (chart.center) {
                    var centerConfig = chart.config.options.elements.center;
                    var ctx = chart.chart.ctx;

                    ctx.save();
                    ctx.font = chart.center.font;
                    ctx.fillStyle = chart.center.fillStyle;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                    var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                    ctx.fillText(centerConfig.text, centerX, centerY);
                    ctx.restore();
                }
            },
        });

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("cloneDatasetController", ['$location', '$cookies', 'datasetsService', 'sharedService', function ($location, $cookies, datasetsService, sharedService) {
        //This controller will load the user datasets after login
        var vm = this;
        vm.theuserdatasetsforcloning = [{}];
        vm.datasettoclone = "{}";
        vm.datasetIsSelected = "N";

        vm.init = function () {
            vm.getuserdatasetsforcloningphp();
        }

        vm.checkfordatasetselected = function() {
            if (vm.datasettoclone === undefined) {
                vm.datasetIsSelected = "N";
            }
            else if (vm.datasettoclone.datasetname === "Select") {
                vm.datasetIsSelected = "N";
            }
            else {
                vm.datasetIsSelected = "Y";
            }
        }

        vm.getuserdatasetsforcloningphp = function () {
            var params = '{"userid": "' + sharedService.getUserID() + '"}';
            datasetsService.getUserDatasetsforCloningPHP(params)
                            .then(function (data) {
                                vm.theuserdatasetsforcloning = data;
                                vm.existingdatasets = vm.theuserdatasetsforcloning.length;
                                vm.datasettoclone = vm.theuserdatasetsforcloning[0];  //Start out at SELECT
                           }, function (theError) {
                                vm.userdatasetsforcloning = 'bad data:' + theError;
                            })
        }

        vm.cloneSelectedDatasetTESTING = function (id) {
            var params = '{"datasetid": ' + id + '}';
            alert(id);
        }

        vm.cloneSelectedDataset = function (id) {
            var params = '{"datasetid": ' + id + '}';
            datasetsService.cloneDatasetPHP(params)
                            .then(function (data) {
                                //returns an array("status"=>"OK", "newid"=>$conn->lastInsertId())
                                vm.cloneResults = data;
                                //This code re-displays the listing of datasets
                                //dsc.cloneMode = "N";
                                //dsc.getuserdatasetsphp();
                                vm.viewedit(vm.cloneResults.newid, 1);
                                var params2 = '{"datasetid": ' + id + ', "newdsetid": ' + vm.cloneResults.newid + ' }';
                                datasetsService.cloneFieldinfoPHP(params2)
                                                .then(function (data) {
                                                }, function (theError) {

                                                });
                            }, function (theError) {
                                //alert(data);
                                //dsc.userdatasetsforcloning = 'bad data:' + theError;
                            });
        }

        vm.cancelClone = function () {
            $location.path("/userloggedin");
        }

        vm.viewedit = function (datasetid) {
            sharedService.setDataSetID(datasetid);
            $cookies.datasetid = datasetid;
            $location.path("/page01");
        }

        vm.init();

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("showDatasetController", ['$scope', '$location', '$cookies', 'datasetsService', 'sharedService', function ($scope, $location, $cookies, datasetsService, sharedService) {
        //This controller shows individual datasets on a separate page.
        //Needs cleanup, a lot of stuff left over from initial copy/paste.
        var dsc = this;
        dsc.colltitle = sharedService.getCollectionID();
        //Get shared service data
        dsc.collections = [{}];
        dsc.actualdatasets = [];
        dsc.dsetz = [];
        dsc.theuserid = sharedService.getUserID();
        dsc.theuserfirstname = sharedService.getUserFirstName();
        dsc.theuserlastname = sharedService.getUserLastName();
        dsc.datasettoclone = "";

        dsc.init = function () {
            dsc.getuserdatasetsphp();
            dsc.datasettoclone = "";

        }

        dsc.goHome = function () {
            $location.path("/userloggedin");
        }

        dsc.getuserdatasetsphp = function () {
            var params = '{"id": "' + sharedService.getUserID() + '"}';
            datasetsService.getUserDatasetsPHP(params)
                            .then(function (data) {
                                dsc.userdatasets = data;
                                dsc.existingdatasets = dsc.userdatasets.length; //this shows # of collections, not datasets?
                                dsc.dSetLength = 0;
                                var sData = [];
                                var sLabels = []; // thought id stripping was due to too many pushes to chart. guess not.
                                for(var i=0; i<data.length; i++) {
                                    dsc.actualdatasets = data[i].datasetz;
                                    sData.push(dsc.actualdatasets.length);
                                    if(data[i].collectiontitle == null) {
                                        sLabels.push("null title");
                                    } else {
                                        sLabels.push(data[i].collectiontitle);
                                    }
                                    if(data[i].collectiontitle == dsc.colltitle) {
                                        dsc.dsetz = data[i].datasetz;
                                    }
                                    dsc.dSetLength += dsc.actualdatasets.length;
                                }
                                $scope.data = sData;
                                $scope.labels = sLabels;
                                //dsc.getuserdatasetsforcloningphp();
                            }, function (theError) {
                                dsc.userdatasets = 'bad data:' + theError;
                            })
        }

        //Data Entry 01
        dsc.addnewdataset = function () {
            //Clear out the DataSetID just in case
            sharedService.setDataSetID('');
            $location.path("/page01");
        }

        dsc.clonedataset = function () {
             $location.path("/clonedataset");
        }

        dsc.viewedit = function (datasetid, dsstatusid) {
            sharedService.setDataSetID(datasetid);
            $cookies.datasetid = datasetid;
            //If Status is 'Submitted for Approval' then go to page 12
            if (dsstatusid >= '2') {
                $location.path("/page12");
            }
            else {
                $location.path("/page01");
            }
        }

        dsc.init();

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page01Controller", ['$scope', '$location', 'datasetsService', 'sharedService', '$q', function ($scope, $location, datasetsService, sharedService, $q) {
        var vm = this;
        vm.collection = null;
        vm.collections = [{}];
        vm.categories = [{}];
        vm.subcategories = [{}];
        vm.institutions = [{}];
        vm.datasetDetails = {};
        vm.submitted = false;
        vm.returnvalue = {};
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.showloader = false;
        vm.saveerrors = '';
        vm.addnewcollectionerror = '';
        vm.modalShown = false;

        vm.init = function () {
            vm.getCollections(); //This starts the process, the getCategories() is called the this success function etc
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.getCollections = function () {
            //var sql = '{"sql":"select id,collectiontitle from collections"}';
            var sql = '{"sql":"select id,collectiontitle from collections where userid=' + sharedService.getUserID() + '"}';
            //var params = '{"sql":"select id,collectiontitle from collections where userid=:userid","userid":"' + sharedService.getUserID() + '"}';
            datasetsService.getDataFromDBPHP(sql)
                .then(function (data) {
                    vm.collections = data;
                    vm.collections.push({ id: "-1", collectiontitle: "Add new collection" });

                    vm.getCategories();
                }, function (theError) {
                    vm.collections = 'bad data:' + theError;
                })
        }

        vm.getCategories = function () {
            var sql = '{"sql":"select id,categorytitle from categorys"}';
            datasetsService.getDataFromDBPHP(sql)
                .then(function (data) {
                    vm.categories = data; //PHP returns a JSON object but C# does not so you need JSON.parse(data);JSON.parse(data);
                    vm.getSubCategories();
                }, function (theError) {
                    vm.collections = 'bad data:' + theError;
                })
        }

        vm.getSubCategories = function () {
            var sql = '{"sql":"select id,categoryid,subcategorytitle from subcategorys"}';
            datasetsService.getDataFromDBPHP(sql)
                .then(function (data) {
                    vm.subcategories = data; //PHP returns a JSON object but C# does not so you need JSON.parse(data);JSON.parse(data);JSON.parse(data);
                    vm.getInstitutions();
                }, function (theError) {
                    vm.subcategories = 'bad data:' + theError;
                })
        }

        vm.getInstitutions = function () {
            // structure when calling C# var sql = "{sql:'select id,institutionname from institutions'}";
            var sql = '{"sql":"select id,institutionname from institutions"}';
            datasetsService.getDataFromDBPHP(sql)
                .then(function (data) {
                    vm.institutions = data; //PHP returns a JSON object but C# does not so you need JSON.parse(data);JSON.parse(data);JSON.parse(data);JSON.parse(data);
                    //Are we 'Adding a new dataset' or 'Editing an existing one'?
                    if ((typeof vm.workingdatasetid === "undefined") || (vm.workingdatasetid === '')) {
                        //Adding a new DataSet
                        //TODO We might want to 'remember' that we are adding
                    }
                    else {
                        //Let's go get the existing data and update the form
                        vm.getDatasetDetails(vm.workingdatasetid);
                    }
                }, function (theError) {
                    vm.institutions = 'bad data:' + theError;
                })
        }

        vm.getDatasetDetails = function (theDatasetID) {
            var params = '{"sql":"select collectionid, coalesce(collectiontitle,@notset) as collectiontitle,datasetname,datasets.categoryid, coalesce(categorytitle,@notset) as categorytitle,subcategoryid, coalesce(subcategorytitle,@notset) as subcategorytitle,institutionid, coalesce(institutionname,@notset) as institutionname from datasets left join collections on collections.id = collectionid left join categorys on categorys.id = categoryid left join subcategorys on subcategorys.id = subcategoryid left join institutions on institutions.id = institutionid where datasets.id=@datasetid","notset":"not set","datasetid":"' + theDatasetID + '"}';
            datasetsService.getDataFromDatasetRecord(params)
                .then(function (data) {
                    vm.datasetDetails = data;
                    for (var i = 0; i < vm.collections.length; i++) {
                        if (vm.datasetDetails.collectionid == vm.collections[i].id) {
                            vm.collection = vm.collections[i];
                            break;
                        }
                    }

                    vm.datasetname = vm.datasetDetails.datasetname;

                    for (var i = 0; i < vm.categories.length; i++) {
                        if (vm.datasetDetails.categoryid == vm.categories[i].id) {
                            vm.category = vm.categories[i];
                            break;
                        }
                    }
                    for (var i = 0; i < vm.subcategories.length; i++) {
                        if (vm.datasetDetails.subcategoryid == vm.subcategories[i].id) {
                            vm.subcategory = vm.subcategories[i];
                            break;
                        }
                    }
                    for (var i = 0; i < vm.institutions.length; i++) {
                        if (vm.datasetDetails.institutionid == vm.institutions[i].id) {
                            vm.institution = vm.institutions[i];
                            break;
                        }
                    }
                    //If this is a 'cloned' record set then the datasetname will be blank so let's mark the form and field as dirty
                    //which will make the validation error show up immediately
                    if (vm.datasetname === "") {
                        $scope.masterForm.$setDirty();
                        $scope.masterForm.txtdatasetname.$setDirty();
                    }
                    vm.showloader = false;

                }, function (theError) {
                    vm.datasetDetails = 'bad data:' + theError;
                })
        }

        vm.refreshCollections = function (newcollection) {
            //var sql = '{"sql":"select id,collectiontitle from collections"}';
            var sql = '{"sql":"select id,collectiontitle from collections where userid=' + sharedService.getUserID() + '"}';

            datasetsService.getDataFromDBPHP(sql)
                .then(function (data) {
                    vm.collections = data;
                    //And then set the index to the just added item
                    for (var i = 0; i < vm.collections.length; i++) {
                        if (newcollection == vm.collections[i].collectiontitle) {
                            vm.collection = vm.collections[i];
                            break;
                        }
                    }
                    vm.collections.push({ id: "-1", collectiontitle: "Add new collection" });
                }, function (theError) {
                    vm.collections = 'bad data:' + theError;
                })
        }

        vm.init();

        vm.logmein = function () {
            $location.path("/userloggedin");
        }

        vm.viewedit = function (datasetid) {
            alert(datasetid);
        }

        vm.backtohome = function () {
            $location.path("/");
        }

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.getEndpoint = function () {
            return $rootScope.endPoint;
        };

        vm.savePageData = function (thePage, action, formIsValid) {
            vm.submitted = true;
            if (formIsValid) {
                if ((typeof vm.workingdatasetid === "undefined") || (vm.workingdatasetid === '')) {
                    //We are ADDING a new dataset
                    var sql = '{"sql":"insert into datasets (userid,datasetname,collectionid,categoryid,subcategoryid,institutionid) Values (@datasetoruserid,@datasetname,@collectionid,@categoryid,@subcategoryid,@institutionid)",';
                    sql += '"datasetoruserid":"' + sharedService.getUserID() + '",';
                }
                else {
                    //We are updating a dataset
                    var sql = '{"sql":"update datasets set datasetname=@datasetname, collectionid=@collectionid, categoryid=@categoryid, subcategoryid=@subcategoryid, institutionid=@institutionid where id=@datasetoruserid;Update datasets set step = 1 where id = @datasetoruserid and ((step is null) or (step <1))",';
                    sql += '"datasetoruserid":"' + vm.workingdatasetid + '",';
                }
                sql += '"datasetname":"' + vm.datasetname + '",';
                sql += '"collectionid":"' + vm.collection.id + '",';
                sql += '"categoryid":"' + vm.category.id + '",';
                sql += '"subcategoryid":"' + vm.subcategory.id + '",';
                sql += '"institutionid":"' + vm.institution.id + '"';
                sql += '}';
                datasetsService.updateDatasetPHP_Page01(sql)
                    .then(function (data) {
                        vm.returnvalue = data;
                        if (vm.returnvalue.status == "OK") {
                            if ((typeof vm.workingdatasetid === "undefined") || (vm.workingdatasetid === '')) {
                                sharedService.setDataSetID(vm.returnvalue.newid);
                                vm.workingdatasetid = sharedService.getDataSetID();
                            }
                            $location.path((action == 'Next') ? "/page02" : "/userloggedin");
                        }
                        else {
                            vm.saveerrors = data;
                        }
                    }, function (theError) {
                        vm.saveerrors = theError;
                        updateStatus = data;
                    })
            }
            else {
                alert('correct errors and try again');
            }
        }

        vm.addnewcollection = function () {
            vm.addnewcollectionerror = '';
            var newCollectionItem = vm.newcollection.toLowerCase().trim();
            if (lfCollectionAlreadyExists(newCollectionItem) == "false") {
                //We will add it to the database and then refresh the collection list
                datasetsService.addNewCollection(vm.newcollection, sharedService.getUserID())
                    .then(function (data) {
                        //We need to 'refresh' the collections
                        vm.refreshCollections(vm.newcollection);
                    }, function (theError) {
                        //Report some error
                    })
            }
            else {
                vm.addnewcollectionerror = 'duplicate collection name';
            }
        }

        function lfCollectionAlreadyExists(newCollectionTitle) {
            var itemExists = "false";
            for (var key in vm.collections) {
                if (newCollectionTitle == vm.collections[key].collectiontitle.toLowerCase()) {
                    itemExists = "true";
                }
            }
            return itemExists;
        }

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page02Controller", ['$scope', '$location', 'datasetsService', 'sharedService', function ($scope, $location, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.pageinfo = {};
        vm.returnvalue = {};
        vm.submitted = false;
        vm.modalShown = false;

        vm.init = function () {
            vm.getPageInfo();
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.getPageInfo = function () {
            var params = '{"sql":"select firstname, lastname, email, phone, firstnamepi, lastnamepi, emailpi, phonepi from datasets where datasets.id=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(params)
                .then(function (data) {
                    vm.pageinfo = data;
                    vm.firstname = vm.pageinfo.firstname;
                    vm.lastname = vm.pageinfo.lastname;
                    vm.email = vm.pageinfo.email;
                    vm.phone = vm.pageinfo.phone;
                    vm.firstnamepi = vm.pageinfo.firstnamepi;
                    vm.lastnamepi = vm.pageinfo.lastnamepi;
                    vm.emailpi = vm.pageinfo.emailpi;
                    vm.phonepi = vm.pageinfo.phonepi;
                }, function (theError) {
                    vm.pageinfo = 'bad data:' + theError;
                })
        }

        vm.savePageData = function (thePage, action, formIsValid) {
            vm.submitted = true;
            if (formIsValid) {
                var sql = '{"sql":"update datasets set firstname=@firstname,lastname=@lastname,email=@email,phone=@phone,';
                sql += 'firstnamepi=@firstnamepi,lastnamepi=@lastnamepi,emailpi=@emailpi,phonepi=@phonepi ';
                sql += 'WHERE id=@datasetid;Update datasets set step = 2 where id = @datasetid and ((step is null) or (step <2))",';
                sql += '"datasetid":"' + sharedService.getDataSetID() + '",';
                sql += '"firstname":"' + ((typeof vm.firstname === 'undefined') ? '' : vm.firstname) + '",';
                sql += '"lastname":"' + ((typeof vm.lastname === 'undefined') ? '' : vm.lastname) + '",';
                sql += '"email":"' + ((typeof vm.email === 'undefined') ? '' : vm.email) + '",';
                sql += '"phone":"' + ((typeof vm.phone === 'undefined') ? '' : vm.phone) + '",';
                sql += '"firstnamepi":"' + ((typeof vm.firstnamepi === 'undefined') ? '' : vm.firstnamepi) + '",';
                sql += '"lastnamepi":"' + ((typeof vm.lastnamepi === 'undefined') ? '' : vm.lastnamepi) + '",';
                sql += '"emailpi":"' + ((typeof vm.emailpi === 'undefined') ? '' : vm.emailpi) + '",';
                sql += '"phonepi":"' + ((typeof vm.phonepi === 'undefined') ? '' : vm.phonepi) + '"';
                sql += '}';
                datasetsService.updateDatasetPHP_Page02(sql)
                    .then(function (data) {
                        vm.returnvalue = data;
                        if (vm.returnvalue.status == "OK") {
                            $location.path((action == 'Next') ? "/page03" : "/userloggedin");
                        }
                        else {
                            vm.saveerrors = data;
                        }
                    }, function (theError) {
                        vm.saveerrors = theError;
                        updateStatus = data;
                    })
            }
            else {
                alert('Please correct the errors and try again');
            }
        }

        vm.init();

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page03Controller", ['$scope', '$location', '$sanitize', 'datasetsService', 'sharedService', function ($scope, $location, $sanitize, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.submitted = false;
        vm.modalShown = false;

        vm.init = function () {
            vm.getPageInfo();
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.getPageInfo = function () {
            var params = '{"sql":"select abstract, purpose, otherinfo from datasets where datasets.id=@datasetid;Update datasets set step = 3 where id = @datasetid and ((step is null) or (step <3))","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(params)
             .then(function (data) {
                 vm.pageinfo = data;
                 vm.abstract = vm.pageinfo.abstract;
                 vm.purpose = vm.pageinfo.purpose;
		 vm.otherinfo = (vm.pageinfo.otherinfo === null) ? '' : vm.pageinfo.otherinfo;
//               vm.otherinfo = vm.pageinfo.otherinfo;
             }, function (theError) {
                 vm.pageinfo = 'bad data:' + theError;
             })
        }

        vm.replaceWordChars = function(text) {
          //http://www.wilsonmar.com/1eschars.htm - nice list of escape characters
          // Any character that is not ASCII:  s = s.replace(/[^\u000A\u0020-\u007E]/g, ' ');
          // the /g on the end means globally
          // you can also use an i as in /gi to mean case insensitive


          //var s = text;

          var s = (text === null) ? '' : text;
          //Double quotes
          s = s.replace(/"/g, '\\"');
          // tab
          s = s.replace(/[\u0009]/g, "\\t");
          // linefeed
          s = s.replace(/[\u000A]/g, "\\n");
          // carriage return (and line feed)
          s = s.replace(/[\u000D]/g, "\\r\\n");
          // smart single quotes and apostrophe
          s = s.replace(/[\u2018|\u2019|\u201A]/g, "\'");
          // smart double quotes
          s = s.replace(/[\u201C|\u201D|\u201E]/g, "\"");
          // ellipsis
          s = s.replace(/\u2026/g, "...");
          // dashes
          s = s.replace(/[\u2013|\u2014]/g, "-");
          // circumflex
          s = s.replace(/\u02C6/g, "^");
          // open angle bracket
          s = s.replace(/\u2039/g, "<");
          // close angle bracket
          s = s.replace(/\u203A/g, ">");
          // spaces
          s = s.replace(/[\u02DC|\u00A0]/g, " ");
        return s;
      }

        vm.savePageData = function (thePage, action, formIsValid) {
            vm.submitted = true;
            //Refactor this after verifying it works as expected
            var unsanitizedAbstract = ((typeof vm.abstract === 'undefined') ? '' : vm.abstract);
            var unsanitizedPurpose = ((typeof vm.purpose === 'undefined') ? '' : vm.purpose);
            var unsanitizedOtherInfo = ((typeof vm.otherinfo === 'undefined') ? '' : vm.otherinfo);
            //var sanitizedabstract = $sanitize(unsanitizedAbstract);
            //var sanitizedpurpose = $sanitize(unsanitizedPurpose);
            //var sanitizedotherinfo = $sanitize(unsanitizedOtherInfo);
            var sanitizedabstract = vm.replaceWordChars(unsanitizedAbstract);
            var sanitizedpurpose = vm.replaceWordChars(unsanitizedPurpose);
            var sanitizedotherinfo = vm.replaceWordChars(unsanitizedOtherInfo);

            if (formIsValid) {
                var sql = '{"sql":"update datasets set abstract=:abstract,purpose=:purpose,otherinfo=:otherinfo ';
                sql += 'WHERE id=:datasetid",';
                sql += '"datasetid":"' + sharedService.getDataSetID() + '",';
                sql += '"abstract":"' + sanitizedabstract + '",';
                sql += '"purpose":"' + sanitizedpurpose + '",';
                sql += '"otherinfo":"' + sanitizedotherinfo + '"';
                sql += '}';

                datasetsService.updateDatasetPHP_Page03(sql)
                    .then(function (data) {
                        vm.returnvalue = data;
                        if (vm.returnvalue.status == "OK") {
                            $location.path((action == 'Next') ? "/page04" : "/userloggedin");
                        }
                        else {
                            vm.saveerrors = "Error writing to database. Can happen when you cut/paste text from another application (e.g. MSWord, web page etc.)" + data;
                            vm.saveerrors = data;
                            if (data === 'packageisnull') {
                              vm.saveerrors = "Data error: Usually means there are invalid characters in the Abstract, Purpose or Other Info. Can happen when you cut/paste from another application (e.g. MSWord)";
                            }
                            else {
                              vm.saveerrors = "Json Error: " + data;
                            }
                            //0 = JSON_ERROR_NONE
                            //1 = JSON_ERROR_DEPTH
                            //2 = JSON_ERROR_STATE_MISMATCH
                            //3 = JSON_ERROR_CTRL_CHAR
                            //4 = JSON_ERROR_SYNTAX
                            //5 = JSON_ERROR_UTF8
                        }
                    }, function (theError) {
                        vm.saveerrors = theError;
                        updateStatus = data;
                    })
            }
            else {
                alert('Please correct the errors and try again');
            }
        }

        vm.init();

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page04Controller", ['$scope', '$location', 'datasetsService', 'sharedService', function ($scope, $location, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.isotopics = [{}];
        vm.keywords = [];
        vm.places = [];
        vm.keywordSelected = null;
        vm.placeSelected = null;
        vm.showKeyWordRequiredMessage = false;
        vm.showPlacenameRequiredMessage = false;
        vm.showISOCategoryRequiredMessage = false;
        vm.submitted = false;
        vm.isotopic = null;
        vm.modalShown = false;

        vm.init = function () {
            vm.keywordSelected = "";
            vm.keywordBeingAdded = "";

            vm.placeSelected = "";
            vm.placeBeingAdded = "";

            vm.getPageInfo();  //Calls the getISOTopics in the 'then' clause
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.getISOTopics = function () {
            var sql = '{"sql":"select id,categoryname from isotopics"}';
            datasetsService.getDataFromDBPHP(sql)
                .then(function (data) {
                    vm.isotopics = data; //PHP returns a JSON object but C# does not so you need JSON.parse(data);
                    //Now the iso topic
                    for (var i = 0; i < vm.isotopics.length; i++) {
                        if (vm.isotopicid == vm.isotopics[i].id) {
                            vm.isotopic = vm.isotopics[i];
                            break;
                        }
                    }
                }, function (theError) {
                    vm.isotopics = 'bad data:' + theError;
                })
        }

        vm.getPageInfo = function () {
            var params = '{"sql":"select keywords, placenames, isotopicid from datasets where datasets.id=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(params)
             .then(function (data) {
                 vm.pageinfo = data;
                 vm.isotopicid = vm.pageinfo.isotopicid;
                 if (vm.pageinfo.keywords != null) {
                    var theKeywordsArray = vm.pageinfo.keywords.split("|");
                    vm.keywords.length = 0;  //Clear the array
                    for (var i = 0; i < theKeywordsArray.length; i++) {
                        vm.keywords.push({ kw: theKeywordsArray[i] });
                    }
                    vm.keywordSelected = vm.keywords[0];
                 }
                 if (vm.pageinfo.placenames != null) {
                    var thePlacenamesArray = vm.pageinfo.placenames.split("|");
                    vm.places.length = 0;  //Clear the array
                    for (var i = 0; i < thePlacenamesArray.length; i++) {
                        vm.places.push({ pname: thePlacenamesArray[i] });
                    }
                    vm.placeSelected = vm.places[0];
                 }

                 vm.getISOTopics();

             }, function (theError) {
                 vm.pageinfo = 'bad data:' + theError;
             })
        }

        vm.init();

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        //KEYWORD Operations: Add and Remove
        vm.addKeyword = function () {
            if (vm.keywordBeingAdded.trim() != "") {
                vm.keywords.push({ kw: vm.keywordBeingAdded });
                vm.keywordBeingAdded = "";
                vm.keywordSelected = vm.keywords[0];
                vm.showKeyWordRequiredMessage = false;
            }
        }

        vm.removeKeyword = function () {
            if (vm.keywords.indexOf(vm.keywordSelected) >= 0) {
                vm.keywords.splice(vm.keywords.indexOf(vm.keywordSelected), 1);
                vm.keywordSelected = vm.keywords[0];
            }
            vm.showKeyWordRequiredMessage = (vm.keywords.length == 0);
        }

        //PLACENAMES Operations: Add and Remove
        vm.addPlace = function () {
            if (vm.placeBeingAdded.trim() != "") {
                vm.places.push({ pname: vm.placeBeingAdded });
                vm.placeBeingAdded = "";
                vm.placeSelected = vm.places[0];
            }
       }

        vm.removePlace = function () {
            if (vm.places.indexOf(vm.placeSelected) >= 0) {
                vm.places.splice(vm.places.indexOf(vm.placeSelected), 1);
                vm.placeSelected = vm.places[0];
            }
        }

        vm.getListOfKeyWords = function () {
            var keywordList = "";
            for (var i = 0; i < vm.keywords.length; i++) {
               if (typeof vm.keywords[i].kw !== 'undefined') {
                 if (keywordList.length > 0) { keywordList += "|"; }
                 keywordList += vm.keywords[i].kw;
               }
            }
            return keywordList;
        }

        vm.getListOfPlacenames = function () {
            var placenameList = "";
            for (var i = 0; i < vm.places.length; i++) {
                if (typeof vm.places[i].pname !== 'undefined') {
                    if (placenameList.length > 0) { placenameList += "|"; }
                    placenameList += vm.places[i].pname;
                }
            }
            return placenameList;
        }

        vm.savePageData = function (thePage, action) {

            var keywordList = vm.getListOfKeyWords();
            var placenameList = vm.getListOfPlacenames();
            vm.submitted = true;
            if ((keywordList != "") && (placenameList != "") && (vm.isotopic != null)) {
                var sql = '{"sql":"update datasets set isotopicid=@isotopicid, keywords=@keywordList,placenames=@placenameList WHERE id=@datasetid;Update datasets set step = 4 where id = @datasetid and ((step is null) or (step <4))",';
                sql += '"datasetid":"' + sharedService.getDataSetID() + '",';
                sql += '"isotopicid":"' + ((typeof vm.isotopic === 'undefined') ? '' : vm.isotopic.id) + '",';
                sql += '"keywordList":"' + ((typeof vm.keywords === 'undefined') ? '' : keywordList) + '",';
                sql += '"placenameList":"' + ((typeof vm.places === 'undefined') ? '' : placenameList) + '"';
                sql += '}';

                datasetsService.updateDatasetPHP_Page04(sql)
                    .then(function (data) {
                        vm.returnvalue = data;
                        if (vm.returnvalue.status == "OK") {
                            $location.path((action == 'Next') ? "/page05" : "/userloggedin");
                        }
                        else {
                            vm.saveerrors = data;
                        }
                    }, function (theError) {
                        vm.saveerrors = theError;
                        updateStatus = data;
                    })
            }
            else {
                vm.showKeyWordRequiredMessage = (keywordList == "");
                vm.showPlacenameRequiredMessage = (placenameList == "");
                vm.showISOCategoryRequiredMessage = (vm.isotopic == null);
            }
        }

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        ngModel.$setViewValue(element.val());
                        ngModel.$render();
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl, dsetid_){
            var fd = new FormData();
            fd.append('file', file);

            return $http.post(uploadUrl, fd, {
                params: {dsetid: dsetid_},
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });


        }
    }])
    .controller("page06Controller", ['$scope', '$http', '$location', 'datasetsService', 'sharedService', 'fileUpload', function ($scope, $http, $location, datasetsService, sharedService, fileUpload) {

        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.isTabularFileType = false;  //We will use this variable to decide whether or not we move on to page 07 or 08
        vm.returnvalue = {};
        vm.submitted = false;
        vm.rmDupe = false;
        vm.modalShown = false;
        vm.files = {};
        vm.overwrite = '';

        vm.init = function () {
            vm.isTabularFile();
            vm.getPageInfo();
        }

        vm.tglExist = function() {
            $scope.filexist = false;
            $scope.dupfile = false;
            vm.rmDupe = true;
            vm.overwrite = "?overwrite=true";
        }

        vm.isTabularFile = function () {
            var params = '{"sql":"select filetypes.istabulardata from datasets left join filetypes on filetypes.description=datasets.filetype where datasets.id=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(params)
                .then(function (data) {         // TODO: do we even need this anymore
                    vm.returnvalue = data;
                    if (vm.returnvalue.istabulardata == 1 && !sharedService.getIsWorkbook()) {
                        vm.isTabularFileType = true;
                    }
                    else {
                        vm.isTabularFileType = sharedService.getIsTabular();
                    }
                }, function (theError) {
                    vm.fields = 'bad data:' + theError;
                })
        }

        $scope.uploadFile = function(){
            $scope.attemptingup = true;
            $scope.nofile = false;
            $scope.upfailure = false;
            $scope.dupfile = false;
            $scope.upsuccess = false;
            var file = $scope.myFile;
            console.log(file.name);
            $http.get("/simpleup/exists?filename=" + file.name)
                .then(function (response) {
                    if(response.data.Exists && !vm.rmDupe) {
                        $scope.dupfile = true;
                        $scope.attemptingup = false;
                    }
                    else {
                        vm.rlyUpload();
                    }
                });
        }

        vm.rlyUpload = function(){
            $scope.attemptingup = true;
            $scope.nofile = false;
            $scope.upfailure = false;
            $scope.dupfile = false;
            $scope.upsuccess = false;
            //$scope.filexist = false;
            var file = $scope.myFile;
            console.log(file.name);

            console.dir(file);
            var uploadUrl = '/simpleup/' + vm.overwrite;
            fileUpload.uploadFileToUrl(file, uploadUrl, vm.workingdatasetid)
            .then(function(resp){
                if(resp.status == 201) {
                    $scope.nofile = false;
                    $scope.upfailure = false;
                    $scope.dupfile = false;
                    $scope.attemptingup = false;
                    $scope.filexist = false;
                    $scope.upsuccess = true;
                    vm.overwrite = '';
                }
                if(resp.status == 204) {
                    $scope.upsuccess = false;
                    $scope.upfailure = false;
                    $scope.dupfile = false;
                    $scope.attemptingup = false;
                    $scope.filexist = false;
                    $scope.nofile = true;
                }
                console.log(resp.statusText);
            }, function(resp){
                if(resp.status == 302) {
                    $scope.upfailure = false;
                    $scope.nofile = false;
                    $scope.upsuccess = false;
                    $scope.attemptingup = false;
                    $scope.filexist = false;
                    $scope.dupfile = true;
                } else {
                    $scope.nofile = false;
                    $scope.upsuccess = false;
                    $scope.dupfile = false;
                    $scope.attemptingup = false;
                    $scope.filexist = false;
                    $scope.upfailure = true;
                }
                console.log(resp.statusText);
            });
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.getDeliveryMethod = function () {
            var sql = "{sql:'select deliverymethod from datasets where datasets.id=@datasetid','datasetid':'" + vm.workingdatasetid + "'}";
            datasetsService.getDataFromDB(sql)
             .then(function (data) {
                 vm.deliverymethod = JSON.parse(data).deliverymethod;
             }, function (theError) {
                 vm.deliverymethod = 'bad data:' + theError;
             })
        }

        vm.getPageInfo = function () {
            var params = '{"sql":"select filename, filetype, filedescription from datasets where datasets.id=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(params)
             .then(function (data) {
                 vm.pageinfo = data;
                 vm.files = data;
                 if(vm.files.filename != null) {
                     $scope.filexist = true;
                 }
             }, function (theError) {
                 vm.pageinfo = 'bad data:' + theError;
             })
        }

        vm.init();

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.savePageData = function (thePage, action, formIsValid) {
            vm.submitted = true;
            if (formIsValid) {
                var sql = '{"sql":"update datasets set deliverymethod=@deliverymethod ';
                sql += 'WHERE id=@datasetid;Update datasets set step = 5 where id = @datasetid and ((step is null) or (step <5))",';
                sql += '"datasetid":"' + sharedService.getDataSetID() + '",';
                sql += '"deliverymethod":"' + ((typeof vm.deliverymethod === 'undefined') ? '' : vm.deliverymethod) + '"';
                sql += "}";

                datasetsService.updateDatasetPHP_Page05(sql)
                   .then(function (data) {
                       vm.returnvalue = data;
                       if (vm.returnvalue.status == "OK") {
                           if (action == 'Next') {
                               //We will only go to Page07 (Next) if the file type isTabularData
                               $location.path((vm.isTabularFileType === true) ? "/page07" : "/page08");
                           } else {
                               $location.path("/userloggedin");
                           }
                       }
                       else {
                           vm.saveerrors = data;
                       }
                   }, function (theError) {
                       vm.saveerrors = theError;
                       updateStatus = data;
                   })
            }
            else {
                alert('Please correct the errors and try again');
            }
        }

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page05Controller", ['$scope', '$location', 'datasetsService', 'sharedService', function ($scope, $location, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.filetypes = [{}];
        vm.showAddNewFileTypeDialog = false;
        vm.submitted = false;
        vm.modalShown = false;

        vm.init = function () {
            vm.getFileTypes();
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.getFileTypes = function () {
            var sql = '{"sql":"select id,description from filetypes"}';
            datasetsService.getDataFromDBPHP(sql)
                .then(function (data) {
                    vm.filetypes = data;
                    vm.getPageInfo();
                }, function (theError) {
                    vm.filetypes = 'bad data:' + theError;
                })
        }

        vm.getPageInfo = function () {
            var params = '{"sql":"select filename, filetype, filedescription from datasets where datasets.id=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(params)
               .then(function (data) {
                   var pageinfo = data;
                   //vm.filename = pageinfo.filename;
                   vm.filedescription = pageinfo.filedescription;
                   for (var i = 0; i < vm.filetypes.length; i++) {
                       if (pageinfo.filetype == vm.filetypes[i].description) {
                           vm.selectedfiletype = vm.filetypes[i];
                           break; // TODO: probably don't need to get filetypes anymore
                       }
                   }
               }, function (theError) {
                   vm.pageinfo = 'bad data:' + theError;
               })
        }

        vm.init();

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.addNewFileType = function () {
            vm.showAddNewFileTypeDialog = true;
        }

        vm.saveNewFileType = function (formIsValid) {   // TODO: make sure deprecated
            vm.submitted = true;
            if (formIsValid) {

                var description = ((typeof vm.newfiletype === 'undefined') ? '' : vm.newfiletype);
                var istabulardata = ((vm.newistabular === true) ? 1 : 0)

                datasetsService.addNewFileType(description, istabulardata)
                    .then(function (data) {
                        vm.returnvalue = data;
                        if (vm.returnvalue.status == "OK") {
                            vm.refreshFileTypes(vm.newfiletype);
                            vm.newfiletype = "";
                            vm.newistabular = 0;
                            //masterForm.$setPristine();
                        }
                        else {
                            vm.saveerrors = data;
                        }
                    }, function (theError) {
                        vm.saveerrors = theError;
                        updateStatus = data;
                    })
            }
            else {
                alert('Please correct the errors and try again');
            }
        }

        vm.refreshFileTypes = function (newFileType) { // TODO: make sure deprecated
            vm.showAddNewFileTypeDialog = false;

            var sql = '{"sql":"select id,description from filetypes"}';
            datasetsService.getDataFromDBPHP(sql)
                .then(function (data) {
                    vm.filetypes = data;
                    //And then set the index to the just added item
                    for (var i = 0; i < vm.filetypes.length; i++) {
                        if (newFileType == vm.filetypes[i].description) {
                            vm.selectedfiletype = vm.filetypes[i];
                            break;
                        }
                    }
                    vm.collections.push({ id: "-1", collectiontitle: "Add new collection" });
                }, function (theError) {
                    vm.collections = 'bad data:' + theError;
                })

        }

        vm.cancelNewFileType = function () {
            vm.showAddNewFileTypeDialog = false;
        }

        vm.savePageData = function (thePage, action, formIsValid) {
            vm.submitted = true;
            if (formIsValid) {
                sharedService.setIsTabular(vm.newistabular);
                sharedService.setIsWorkbook(vm.isworkbook);
                if(vm.isworkbook && vm.newistabular) {
                    sharedService.setIsTabular(false); // skip if its tabular
                }                                      // but a workbook

                var sql = '{"sql":"update datasets set filedescription=@filedescription ';
                sql += 'WHERE id=@datasetid;Update datasets set step = 6 where id = @datasetid and ((step is null) or (step <6))",';
                sql += '"datasetid":"' + sharedService.getDataSetID() + '",';
                //sql += '"filename":"' + ((typeof vm.filename === 'undefined') ? '' : vm.filename) + '",';
                //sql += '"filetype":"' + ((typeof vm.selectedfiletype === 'undefined') ? '' : vm.selectedfiletype.description) + '",';
                sql += '"filedescription":"' + ((typeof vm.filedescription === 'undefined') ? '' : vm.filedescription) + '"';
                sql += '}';
                datasetsService.updateDatasetPHP_Page06(sql)
                    .then(function (data) {
                        vm.returnvalue = data;
                        if (vm.returnvalue.status == "OK") {
                            $location.path((action == 'Next') ? "/page06" : "/userloggedin");
                        }
                        else {
                            vm.saveerrors = data;
                        }
                    }, function (theError) {
                        vm.saveerrors = theError;
                        updateStatus = data;
                    })
            }
            else {
                alert('Please correct the errors and try again');
            }
        }

    }])
})();

(function() {
    'use strict';

   angular.module("myapp")
    .controller("page08Controller", ['$scope', '$location', 'datasetsService', 'sharedService', function ($scope, $location, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.processes = [{}];
        vm.submitted = false;
        vm.modalShown = false;
        $scope.myDate = new Date();

        vm.init = function () {
            vm.processingyn = 'Y';  //Hard coded for now
            vm.getProcesses();
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.getProcesses = function () {
            var sql = '{"sql":"select dateperformed,firstname,lastname,description FROM processes where datasetid=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getProcessesPHP(sql)
                .then(function (data) {
                    vm.processes = data;
                }, function (theError) {
                    vm.processes = 'bad data:' + theError;
                })
        }

        vm.init();

        vm.theformisempty = function () {
            if (((typeof vm.dateperformed === 'undefined') || (vm.dateperformed === null)) &&
                (typeof vm.firstname === 'undefined') &&
                (typeof vm.lastname === 'undefined') &&
                (typeof vm.stepdescription === 'undefined')) {
                return true;
            }
            return false
        }

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.resetform = function () {
            $scope.masterForm.$setPristine();
        }

        vm.lfDateOK = function (theDateTovalidate) {
            vm.dateerrormessage = '';
            var matches = theDateTovalidate.match(/(\d{1,2})[- \/](\d{1,2})[- \/](\d{4})/);
            if (!matches) return false;

            // convert pieces to numbers
            // make a date object out of it
            var month = parseInt(matches[1], 10);
            var day = parseInt(matches[2], 10);
            var year = parseInt(matches[3], 10);
            var date = new Date(year, month - 1, day);
            if (!date || !date.getTime()) return false;

            // make sure we didn't have any illegal
            // month or day values that the date constructor
            // coerced into valid values
            if (date.getMonth() + 1 != month ||
                date.getFullYear() != year ||
                date.getDate() != day) {
                return false;
            }
            return true;
        }

        vm.updatestep = function() {
            var sql = '{"sql":"Update datasets set step = 8 where id = @datasetid and ((step is null) or (step <8))",';
            sql += '"datasetid":"' + sharedService.getDataSetID() + '"';
            sql += '}';

            datasetsService.updateDatasetStep(sql)
                .then(function (data) {
                   if (action == 'Again') {
                        $location.path((action == 'Next') ? "/page09" : "/userloggedin");
                    }
                    else {
                        vm.saveerrors = data;
                    }
                }, function (theError) {
                    vm.saveerrors = theError;
                })
        }

        vm.savePageData = function (thePage, action, formIsValid) {
            if (vm.theformisempty()) {
                vm.updatestep();
                if (action == 'Again') {
                    //Do nothing
                }
                else {
                    $location.path((action == 'Next') ? "/page09" : "/userloggedin");
                }
            }
            else {
                vm.submitted = true;
                if (formIsValid) {
                    if (vm.processingyn == 'Y') {
                        if (true) { //Used to call lfDateOK, no longer necessary since datepicker
                                    //validates for us. Lazy way to "remove" if statement.
                            //TODO May want to revisit this conversion if time is required
                            var isoDate = new Date(vm.dateperformed).toISOString();
                            var dateperformed = isoDate.substring(0, 10);
                            //No need to return the new id at the present time
                            var sql = '{"sql":"insert into processes (datasetid,dateperformed,firstname,lastname,description) VALUES(@datasetid,@dateperformed,@firstname,@lastname,@description)",';
                            sql += '"datasetid":"' + sharedService.getDataSetID() + '",';
                            sql += '"dateperformed":"' + ((typeof dateperformed === 'undefined') ? '' : dateperformed) + '",';
                            sql += '"firstname":"' + ((typeof vm.firstname === 'undefined') ? '' : vm.firstname) + '",';
                            sql += '"lastname":"' + ((typeof vm.lastname === 'undefined') ? '' : vm.lastname) + '",';
                            sql += '"description":"' + ((typeof vm.stepdescription === 'undefined') ? '' : vm.stepdescription) + '"';
                            sql += '}';
                            datasetsService.updateDatasetPHP_Page07(sql)
                                .then(function (data) {
                                    vm.returnvalue = data;
                                    if (vm.returnvalue.status == "OK") {
                                        if (action == 'Again') {
                                            vm.getProcesses();
                                            //clear the form in preparation to going again
                                            vm.dateperformed = '';
                                            vm.firstname = '';
                                            vm.lastname = '';
                                            vm.stepdescription = '';
                                            vm.resetform();
                                        }
                                        else {
                                            $location.path((action == 'Next') ? "/page09" : "/userloggedin");
                                        }
                                    }
                                    else {
                                        vm.saveerrors = data;
                                    }
                                }, function (theError) {
                                    vm.saveerrors = theError;
                                    updateStatus = data;
                                })
                        }
                        else {
                            vm.dateerrormessage = "invalid date";  //Show some error  sxfsdfsd
                        }
                    }
                    else {
                        alert('Please correct the errors and try again');
                    }
                }
            }
        }
    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page11Controller", ['$scope', '$location', 'datasetsService', 'sharedService', function ($scope, $location, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.submitted = false;
        vm.modalShown = false;
        vm.differentlicense = "N";

        vm.init = function () {
            vm.getPageInfo();
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.getPageInfo = function () {
            var params = '{"sql":"select licensename, licensereference, licensereason from datasets where datasets.id=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(params)
                //.getDatasetPageInfo(sql)
                .then(function (data) {
                    vm.pageinfo = data;
                    vm.licensename = vm.pageinfo.licensename;
                    vm.licensereference = vm.pageinfo.licensereference;
                    vm.licensereason = vm.pageinfo.licensereason;
                }, function (theError) {
                    vm.pageinfo = 'bad data:' + theError;
                })
        }

        vm.init();

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.saveProcessingStep = function (thePage, action) {
            alert('functionality not implemented yet');
        }

        vm.updatestep = function() {
            var sql = '{"sql":"Update datasets set step = 11 where id = @datasetid and ((step is null) or (step <11))",';
            sql += '"datasetid":"' + sharedService.getDataSetID() + '"';
            sql += '}';

            datasetsService.updateDatasetStep(sql)
                .then(function (data) {
                    //Nothing to do
                }, function (theError) {
                    vm.saveerrors = theError;
                })
        }

        vm.savePageData = function (thePage, action, formIsValid) {
            vm.submitted = true;
            if (formIsValid) {
                if (vm.differentlicense == 'Y') {
                    //No need to return the new id at the present time
                    var sql = '{"sql":"update datasets set licensename=@licensename, licensereference=@licensereference, licensereason=@licensereason ';
                    sql += 'WHERE id=@datasetid;Update datasets set step=11 where id = @datasetid and ((step is null) or (step <11))",';
                    sql += '"datasetid":"' + sharedService.getDataSetID() + '",';
                    sql += '"licensename":"' + ((typeof vm.licensename === 'undefined') ? '' : vm.licensename) + '",';
                    sql += '"licensereference":"' + ((typeof vm.licensereference === 'undefined') ? '' : vm.licensereference) + '",';
                    sql += '"licensereason":"' + ((typeof vm.licensereason === 'undefined') ? '' : vm.licensereason) + '"';
                    sql += '}';
                    datasetsService.updateDatasetPHP_Page08(sql)
                        .then(function (data) {
                            vm.returnvalue = data;
                            if (vm.returnvalue.status == "OK") {
                                $location.path((action == 'Next') ? "/page12" : "/userloggedin");
                            }
                            else {
                                vm.saveerrors = data;
                            }
                        }, function (theError) {
                            vm.saveerrors = theError;
                            updateStatus = data;
                        })
                }
                else {
                    vm.updatestep();
                    $location.path((action == 'Next') ? "/page12" : "/userloggedin");
                }
            }
            else {
                alert('Please correct the errors and try again');
            }
        }
    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page09Controller", ['$scope', '$location', 'datasetsService', 'sharedService', function ($scope, $location, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.submitted = false;
        vm.dateerrormessage = "";
        vm.modalShown = false;
        vm.embargoyn = "N";

        vm.init = function () {
            vm.getPageInfo();
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.lfDateOK = function (theDateTovalidate) {
            vm.dateerrormessage = '';
            var matches = theDateTovalidate.match(/(\d{1,2})[- \/](\d{1,2})[- \/](\d{4})/);
            if (!matches) return false;

            // convert pieces to numbers
            // make a date object out of it
            var month = parseInt(matches[1], 10);
            var day = parseInt(matches[2], 10);
            var year = parseInt(matches[3], 10);
            var date = new Date(year, month - 1, day);
            if (!date || !date.getTime()) return false;

            // make sure we didn't have any illegal
            // month or day values that the date constructor
            // coerced into valid values
            if (date.getMonth() + 1 != month ||
                date.getFullYear() != year ||
                date.getDate() != day) {
                return false;
            }
            return true;
        }

        vm.getPageInfo = function () {
            var params = '{"sql":"select embargoreleasedate, embargoreason from datasets where datasets.id=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(params)
                //.getDatasetPageInfo(sql)
                .then(function (data) {
                    vm.pageinfo = data;

                    if (vm.pageinfo.embargoreason == null) {
                        vm.embargoreason = "";
                    }
                    else {
                      vm.embargoreason = vm.pageinfo.embargoreason;
                    }

                    if (vm.pageinfo.embargoreleasedate == null) {
                        vm.embargoreleasedate = "";
                    }
                    else {
                        var year = vm.pageinfo.embargoreleasedate.substring(0, 4);
                        var month = vm.pageinfo.embargoreleasedate.substring(5, 7);
                        var day = vm.pageinfo.embargoreleasedate.substring(8, 10);
                        vm.embargoreleasedate = month + "/" + day + "/" + year;
                    }
                }, function (theError) {
                    vm.pageinfo = 'bad data:' + theError;
                })
        }

        vm.init();

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.saveProcessingStep = function (thePage, action) {
            alert('functionality not implemented yet');
        }

        vm.updatestep = function() {
            var sql = '{"sql":"Update datasets set step = 9 where id = @datasetid and ((step is null) or (step <9))",';
            sql += '"datasetid":"' + sharedService.getDataSetID() + '"';
            sql += '}';

            datasetsService.updateDatasetStep(sql)
                .then(function (data) {
                    //Nothing to do
                }, function (theError) {
                    vm.saveerrors = theError;
                })
        }

        vm.savePageData = function (thePage, action) {
            vm.submitted = true;
            if (vm.embargoyn == 'Y') {
                if (vm.lfDateOK(vm.embargoreleasedate)) {
                    //May want to revisit this conversion if time is required
                    var isoDate = new Date(vm.embargoreleasedate).toISOString();
                    var releaseDate = isoDate.substring(0, 10);

                    //No need to return the new id at the present time
                    var sql = '{"sql":"update datasets set embargoreleasedate=@embargoreleasedate, embargoreason=@embargoreason ';
                    sql += 'WHERE id=@datasetid;Update datasets set step = 9 where id = @datasetid and ((step is null) or (step <9))",';
                    sql += '"datasetid":"' + sharedService.getDataSetID() + '",';
                    sql += '"embargoreleasedate":"' + ((typeof releaseDate === 'undefined') ? '' : releaseDate) + '",';
                    sql += '"embargoreason":"' + ((typeof vm.embargoreason === 'undefined') ? '' : vm.embargoreason) + '"';
                    sql += '}';

                    datasetsService.updateDatasetPHP_Page09(sql)
                        .then(function (data) {
                            vm.returnvalue = data;
                            if (vm.returnvalue.status == "OK") {
                                $location.path((action == 'Next') ? "/page10" : "/userloggedin");
                            }
                            else {
                                vm.saveerrors = data;
                            }
                        }, function (theError) {
                            vm.saveerrors = theError;
                            updateStatus = data;
                        })
                }
                else {
                    vm.dateerrormessage = "invalid date";  //Show some error  sxfsdfsd
                }
            }
            else {
                vm.updatestep();
                $location.path((action == 'Next') ? "/page10" : "/userloggedin");
            }
        }

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page10Controller", ['$scope', '$location', 'datasetsService', 'sharedService', function ($scope, $location, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.YesorNo = "";

        vm.modalShown = false;

        vm.init = function () {
            vm.getDataOneState();
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };



        vm.getDataOneState = function () {
            var params = '{"sql":"select uploadtodataone from datasets where datasets.id=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(params)
                .then(function (data) {
                    vm.returnvalue = data;
                    if (vm.returnvalue.uploadtodataone === "No") {
                        vm.YesorNo = "No";
                    }
                    else {
                        vm.YesorNo = "Yes"
                    }
                }, function (theError) {
                    vm.YesorNo = 'bad data:' + theError;
                })
        }

        vm.init();

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.savePageData = function (thePage, action) {
            vm.saveerrors = "";
            if ((vm.YesorNo == "Yes") || (vm.YesorNo == "No")) {
                var sql = '{"sql":"update datasets set uploadtodataone=@uploadtodataone where id=@datasetoruserid;Update datasets set step = 10 where id = @datasetoruserid and ((step is null) or (step <10))",';
                sql += '"datasetoruserid":"' + vm.workingdatasetid + '",';
                sql += '"uploadtodataone":"' + vm.YesorNo + '"';
                sql += '}';

                datasetsService.updateDatasetPHP_Page10(sql)
                    .then(function (data) {
                        vm.returnvalue = data;
                        if (vm.returnvalue.status == "OK") {
                            $location.path((action == 'Next') ? "/page11" : "/userloggedin");
                        }
                        else {
                            vm.saveerrors = data;
                        }
                    }, function (theError) {
                        vm.saveerrors = theError;
                        updateStatus = data;
                    })
            }
            else {
                vm.saveerrors = "You must select Yes or No";
            }
        }

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page07Controller", ['$scope', '$location', 'datasetsService', 'sharedService', function ($scope, $location, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.fields = [{}];
        vm.fieldinfoyn = 'Y';  //Hard coded - no longer asking the Yes/No but will automatically show if file type is tabular
        vm.returnvalue = {};
        vm.showMe = '';
        vm.modalShown = false;
        vm.dommin = 'N/A';
        vm.dommax = 'N/A';
        vm.editmode = false;
        vm.editID = -1;
        vm.submitted = false;

        vm.field = "N/A";
        vm.description = "N/A";
        vm.units = "N/A";
        vm.frequency = "N/A";
        vm.aggregation = "N/A";
        vm.nodata = "N/A";

        $scope.formempty = true;
        $scope.masterForm.$setPristine();

        vm.init = function () {
            vm.getFields();
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.lsClearFields = function() {
          vm.field = "N/A";
          vm.description = "N/A";
          vm.units = "N/A";
          vm.frequency = "N/A";
          vm.aggregation = "N/A";
          vm.nodata = "N/A";
          vm.dommin = "N/A";
          vm.dommax = "N/A";
        }

        vm.getFields = function () {
            var sql = '{"sql":"select id,field,description,units,frequency,aggregation,nodata, dommin, dommax FROM fieldinfo where datasetid=@datasetid","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getFieldInfoRecordsPHP(sql)
                .then(function (data) {
                    vm.fields = data;
                }, function (theError) {
                    vm.fields = 'bad data:' + theError;
                })
        }

        vm.init();

        vm.theformisempty = function () {
            var fieldInfoValues;
          if (typeof vm.field === 'undefined' || vm.field =='N/A') {
              fieldInfoValues = '';
          } else {
              fieldInfoValues = vm.field;
          }

          if (typeof vm.description === 'undefined' || vm.description =='N/A') {
              fieldInfoValues += '';
          } else {
              fieldInfoValues += vm.description;
          }

          if (typeof vm.units === 'undefined' || vm.units =='N/A') {
              fieldInfoValues += '';
          } else {
              fieldInfoValues += vm.units;
          }

          if (typeof vm.frequency === 'undefined' || vm.frequency =='N/A') {
              fieldInfoValues += '';
          } else {
              fieldInfoValues += vm.frequency;
          }

          if (typeof vm.aggregation === 'undefined' || vm.aggregation =='N/A') {
              fieldInfoValues += '';
          } else {
              fieldInfoValues += vm.aggregation;
          }

          if (typeof vm.nodata === 'undefined' || vm.nodata =='N/A') {
              fieldInfoValues += '';
          } else {
              fieldInfoValues += vm.nodata;
          }

          if (typeof vm.dommin === 'undefined' || vm.dommin =='N/A') {
              fieldInfoValues += '';
          } else {
              fieldInfoValues += vm.dommin;
          }

          if (typeof vm.dommax === 'undefined' || vm.dommax =='N/A') {
              fieldInfoValues += '';
          } else {
              fieldInfoValues += vm.dommax;
          }
          //fieldInfoValues += (typeof vm.description === 'undefined') ? '' : vm.description;
          //fieldInfoValues += (typeof vm.units === 'undefined') ? '' : vm.units;
          //fieldInfoValues += (typeof vm.frequency === 'undefined') ? '' : vm.frequency;
          //fieldInfoValues += (typeof vm.aggregation === 'undefined') ? '' : vm.aggregation;
          //fieldInfoValues += (typeof vm.nodata === 'undefined') ? '' : vm.nodata;
          //fieldInfoValues += (typeof vm.dommin === 'undefined') ? '' : vm.dommin;
          //fieldInfoValues += (typeof vm.dommax === 'undefined') ? '' : vm.dommax;
          if (fieldInfoValues == ''){
              $scope.formempty = true;
            return true;
          }
          else {
              $scope.formemepty = false;
            return false;
          }
        }

        vm.DeleteFieldInfoRecord = function (fieldinfoid) {
          if (confirm("Set to delete - are you sure?")){
             var sql = '{"sql":"delete from fieldinfo where id=:id",';
             sql += '"id":"' + fieldinfoid + '"}';
             datasetsService.deletefromtablebyid(sql)
                  .then(function (data) {
                      vm.returnvalue = data;
                      if (vm.returnvalue.status == "OK") {
                        vm.getFields();
                      }
                      else {
                        vm.saveerrors = data;
                      }
                  }, function (theError) {
                    vm.saveerrors = theError;
                    updateStatus = data;
              })
          }
        }

        vm.cancelEdits = function(){
          vm.editmode = false;
          vm.editID = -1;
          vm.lsClearFields();
        }

        vm.saveEdits = function(){
          //Lets Update the data record the new data
          if (vm.editID != -1) {
            if (vm.theformisempty() === false) {
              var sql = '{"sql":"update fieldinfo set field=:field,description=:description,units=:units,frequency=:frequency,aggregation=:aggregation,nodata=:nodata,dommin=:dommin,dommax=:dommax where id=:fieldinfoid",';
              sql += '"fieldinfoid":"' + vm.editID + '",';
              sql += '"field":"' + ((typeof vm.field === 'undefined') ? '' : vm.field) + '",';
              sql += '"description":"' + ((typeof vm.description === 'undefined') ? '' : vm.description) + '",';
              sql += '"units":"' + ((typeof vm.units === 'undefined') ? '' : vm.units) + '",';
              sql += '"frequency":"' + ((typeof vm.frequency === 'undefined') ? '' : vm.frequency) + '",';
              sql += '"aggregation":"' + ((typeof vm.aggregation === 'undefined') ? '' : vm.aggregation) + '",';
              sql += '"nodata":"' + ((typeof vm.nodata === 'undefined') ? '' : vm.nodata) + '",';
              sql += '"dommin":"' + ((typeof vm.dommin === 'undefined') ? '' : vm.dommin) + '",';
              sql += '"dommax":"' + ((typeof vm.dommax === 'undefined') ? '' : vm.dommax) + '"';
              sql += '}';
              datasetsService.updatefieldinfodatarecord(sql)
                .then(function (data) {
                  vm.returnvalue = data;
                  if (vm.returnvalue.status === "OK") {
                    //vm.lsClearFields(); edge case for leaving fields alone
                    vm.getFields();
                    vm.editmode = false;
                  }
                  else {
                    vm.saveerrors = data;
                  }
                }
                , function (theError) {
                  vm.saveerrors = data;
                })
            }
          }
       }

        vm.EditFieldInfoRecord = function (fieldinfoid){
          vm.editmode = true;  //set the editmode
          vm.editID = fieldinfoid;
          //Get the fields for the selected id and display them
          var sql = '{"sql":"select id,field,description,units,frequency,aggregation,nodata, dommin, dommax FROM fieldinfo where id=:fieldinfoid","fieldinfoid":"' + fieldinfoid + '"}';
          datasetsService.getfieldinforecord(sql)
            .then(function (data) {
              vm.returnvalue.status = "OK";
              if (vm.returnvalue.status === "OK") {
                vm.pageinfo = data;
                vm.field = vm.pageinfo.field;
                vm.description = vm.pageinfo.description;
                vm.units = vm.pageinfo.units;
                vm.frequency = vm.pageinfo.frequency;
                vm.aggregation = vm.pageinfo.aggregation;
                vm.nodata = vm.pageinfo.nodata;
                vm.dommin = vm.pageinfo.dommin;
                vm.dommax = vm.pageinfo.dommax;                      }
              else {
                vm.saveerrors = data;
              }
            }
            , function (theError) {
              vm.saveerrors = theError;
              updateStatus = data;
            })

          //and display them in the text fields

        }

        vm.backButton = function (toPage) {
            $location.path("/" + toPage);
        }

        vm.savePageData = function (thePage, action, formIsValid) {
          vm.submitted = true;
          if (formIsValid) {
            if (vm.fieldinfoyn == 'Y') {
                if (vm.theformisempty() == false) {
                    var sql = '{"sql":"insert into fieldinfo (datasetid,field,description,units,frequency,aggregation,nodata,dommin,dommax) VALUES(@datasetid,@field,@description,@units,@frequency,@aggregation,@nodata,@dommin,@dommax)",';
                    sql += '"datasetid":"' + sharedService.getDataSetID() + '",';
                    sql += '"field":"' + ((typeof vm.field === 'undefined') ? '' : vm.field) + '",';
                    sql += '"description":"' + ((typeof vm.description === 'undefined') ? '' : vm.description) + '",';
                    sql += '"units":"' + ((typeof vm.units === 'undefined') ? '' : vm.units) + '",';
                    sql += '"frequency":"' + ((typeof vm.frequency === 'undefined') ? '' : vm.frequency) + '",';
                    sql += '"aggregation":"' + ((typeof vm.aggregation === 'undefined') ? '' : vm.aggregation) + '",';
                    sql += '"nodata":"' + ((typeof vm.nodata === 'undefined') ? '' : vm.nodata) + '",';
                    sql += '"dommin":"' + ((typeof vm.dommin === 'undefined') ? '' : vm.dommin) + '",';
                    sql += '"dommax":"' + ((typeof vm.dommax === 'undefined') ? '' : vm.dommax) + '"';
                    sql += '}';
                    $scope.masterForm.$setPristine();
                    datasetsService.updateDatasetPHP_Page11(sql)
                        .then(function (data) {
                            vm.returnvalue = data;
                            if (vm.returnvalue.status == "OK") {
                                if (action == 'Again') {
                                    vm.getFields();
                                    //clear the form in preparation to going again
                                    vm.lsClearFields(); // need it for now to make sure a record isn't saved after using add another then next
                                    //vm.field = '';
                                    //vm.description = '';
                                    //vm.units = '';
                                    //vm.frequency = '';
                                    //vm.aggregation = '';
                                    //vm.nodata = '';
                                    //vm.dommin = '';
                                    //vm.dommax = '';
                                }
                                else {
                                    $location.path((action == 'Next') ? "/page08" : "/userloggedin");
                                }
                            }
                            else {
                                vm.saveerrors = data;
                            }
                        }, function (theError) {
                            vm.saveerrors = theError;
                            updateStatus = data;
                        })
                }
                else {
                    $location.path((action == 'Next') ? "/page08" : "/userloggedin");
                }
            }
          }
        }

    }])
})();

(function() {
    'use strict';

    angular.module("myapp")
    .controller("page12Controller", ['$scope', '$location', 'datasetsService', 'sharedService', function ($scope, $location, datasetsService, sharedService) {
        var vm = this;
        //Get shared service data
        vm.theuserid = sharedService.getUserID();
        vm.workingdatasetid = sharedService.getDataSetID();
        vm.message = "";
        vm.finalData = {};
        vm.modalShown = false;

        vm.init = function () {
            //Need to get a collection of fields to display on the page
            vm.getFinalData();
            vm.updatestep();
        }

        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.closeToHome = function () {
            sharedService.setDataSetID('');
            $location.path("/userloggedin");
        }

        vm.updatestep = function() {
            var sql = '{"sql":"Update datasets set step = 12 where id = @datasetid and ((step is null) or (step<12))",';
            sql += '"datasetid":"' + sharedService.getDataSetID() + '"';
            sql += '}';

            datasetsService.updateDatasetStep(sql)
                .then(function (data) {
                    //Nothing to do
                }, function (theError) {
                    vm.saveerrors = theError;
                })
        }

        vm.submitApproval = function () {
            //Change Status to 2 - Submitted for approval
            var sql = '{"sql":"update datasets set status=2, rejected=0 where id=@datasetid",';
            sql += '"datasetid":"' + vm.workingdatasetid + '"';
            sql += '}';
            datasetsService.updateDatasetPHP_Page12(sql)
                .then(function (data) {
                    vm.returnvalue = data;
                    if (vm.returnvalue.status == "OK") {
                        //vm.message = "Submitted for approval successfully";
                        $location.path("/userloggedin");
                    }
                    else {
                        vm.saveerrors = data;
                    }
                }, function (theError) {
                    vm.saveerrors = theError;
                    updateStatus = data;
                })
        }

        vm.certify = function () {
            //Change Status to 4 and set datetime stamp Certified
            //Change Status to 2 - Submitted for approval
            var sql = '{"sql":"update datasets set status=4, datecertified=now() where id=@datasetid",';
            sql += '"datasetid":"' + vm.workingdatasetid + '"';
            sql += '}';
            datasetsService.updateDatasetPHP_Page12(sql)
                .then(function (data) {
                    vm.returnvalue = data;
                    if (vm.returnvalue.status == "OK") {
                        vm.message = "Set to Certified successfully";
                    }
                    else {
                        vm.saveerrors = data;
                    }
                }, function (theError) {
                    vm.saveerrors = theError;
                    updateStatus = data;
                })

        }

        vm.getFinalData = function () {
            var sql = '{"sql":"select coalesce(isotopics.categoryname,@notset) as isocategoryname, uploadtodataone,collectiontitle,coalesce(categorytitle,@notset) as categorytitle, coalesce(institutionname,@notset) as institutionname,coalesce(filename,@notset) as filename,coalesce(deliverymethod,@notset) as deliverymethod,datasets.* from datasets left join collections on collections.id = collectionid left join categorys on categorys.id = categoryid left join institutions on institutions.id = institutionid left join isotopics on isotopics.id=isotopicid where datasets.id=@datasetid","notset":"not set","datasetid":"' + vm.workingdatasetid + '"}';
            datasetsService.getDataFromDatasetRecord(sql)
                .then(function (data) {
                    vm.finalData = data;
                }, function (theError) {
                    vm.finalData = 'bad data:' + theError;
                })
        }

        vm.init();

    }])
})();
