'use strict';


angular.module('dashboard.pipelineview', ['ngRoute', 'dashboard.settings'])

    .factory('PipelineFactory', function (SettingsFactory, $http) {
        var pipeline = {};
            var accessToken;
            accessToken = SettingsFactory.getsettings().accessToken;
            var master_url = SettingsFactory.getsettings().master_url;

            pipeline.getDeployConfigsForProject = function (projectName) {
                return $http({
                    method: 'GET',
                    headers: {
                 	   'Accept': 'application/json',
                 	   'Authorization': 'Bearer ' + accessToken
                 	 },
                    url: master_url + '/oapi/v1/namespaces/'+ projectName +'/deploymentconfigs'
                    
                });

            }
        return {
                getPipeline: function() {
                return pipeline;
            }
        }


    })

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/pipelineview', {
            templateUrl: 'pipelineview/pipelineview.html',
            controller: 'PipelineView1Ctrl'
        });
    }])


    .controller('PipelineView1Ctrl', ['$scope', '$http', 'SettingsFactory', 'PipelineFactory', function ($scope, $http, SettingsFactory, PipelineFactory) {

   //Commentaire Jaafar  2 juillet minuit	
    	
/*    	
    	
        //$http.defaults.headers.common['Authorization'] = 'Basic amFhZmFyOmplZmZqZWZm';

        $http({
            method: 'GET',
            url: 'http://openshift.example.com:84/api/v3/projects/7/repository/commits?private_token=zFRyLGsGd7i5Mq3AEM8s&ref_name=TM-45'
        }).then(function successCallback(response) {
            var myitems = response.data;
            $scope.issues = [];
            $scope.strkeys = [];
            myitems.forEach(function(myitem) {
                //console.log(myitem.message);
                //var result = "";
                var result = myitem.message.match(/(TM-\d+)/g);

                if (!result) {
                } else {
                    console.log(result);
                    console.log("Extracted string: " + result[0]);
                            //console.log(indexOf(result[0], $scope.strkeys));

                            if ($scope.strkeys.indexOf(result[0]) == -1) {
                                $scope.strkeys.push(result[0]);

                                $http.defaults.withCredentials = true;
                                $http.defaults.useXDomain = true;
                                delete $http.defaults.headers.common['X-Requested-With'];

                                $http({
                                    method: 'GET',
                                    url: 'http://openshift.example.com:7878/rest/api/2/issue/'+result[0]+''
                                    headers: {'Authorization': 'Basic amFhZmFyOmplZmZqZWZm',
                                        'Access-Control-Allow-Origin': 'http://openshift.example.com:8000'
                                        }
                                }).then(function successCallback(response) {
                                        //console.log(response.data);
                                        var description = response.data.fields.summary;

                                        $scope.issues.push(
                                            {
                                                "key":result[0],
                                                "url": "http://openshift.example.com:7878/browse/"+result[0],
                                                "description": description
                                            });

                                    }, function errorCallback(response) {
                                        console.log("Could not get JIRA issue");
                                    }
                                )




                                $http({
                                    method: 'GET',
                                    url: 'http://openshift.example.com:7878/rest/api/2/issue/'+result[0]+''
                                }).then(function successCallback(response) {
                                    var description = response.data[0].summary;
                                        $scope.issues.push(
                                            {
                                                "key":result[0],
                                                "url": "test",
                                                "description": description
                                            });

                                    }, function errorCallback(response) {
                                    console.log("Could not get JIRA issue");
                                }
                                )


                            }

                        }


            })
        }, function errorCallback(response) {
            console.log("Error connecting to Gitlab");
        });

*/
 
    	//Fin commentaire Jaafar 2 Juillet minuit
  
        $scope.jiraIssues = [
            {
                "key": "TM-29",
                "description": "implement feature TM-29",
                "url": "http://openshift.example.com:7878/browse/TM-29",
                "status":"in progress"

            },
            {
                "key": "TM-24",
                "description": "implement feature TM-24",
                "url": "http://openshift.example.com:7878/browse/TM-24",
                "status":"in progress"

            }
        ];

        $scope.items = [
            {"name": "un"},
            {"name": "deux"},
            {"name":"trois"}
        ];

        $scope.settings = SettingsFactory.getsettings();
        
        //$http.defaults.headers.common['Authorization'] = 'Bearer xxx';
        //Use accesToken for Bearer
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + ' ' + $scope.settings.accessToken;

        console.log($scope.settings.devproject);
        $scope.accessToken = $scope.settings.accessToken;
        $scope.pipeline = PipelineFactory.getPipeline();

        $scope.pipeline.getDeployConfigsForProject($scope.settings.devproject).then(function successCallback (response) {
            $scope.dcsdev = response.data.items;
        }, function errorCallback(response) {
            alert("Error getting deployConfigs");
            console.log(reponse);
            alert(response);
        });
        $scope.pipeline.getDeployConfigsForProject($scope.settings.qaproject).then(function successCallback (response) {
            $scope.dcsqa = response.data.items;
        }, function errorCallback(response) {
            console.log(response);
        	alert("Error getting deployConfigs");
            
        });

        $scope.pipeline.getDeployConfigsForProject($scope.settings.prodproject).then(function successCallback (response) {
            $scope.dcsprod = response.data.items;
        }, function errorCallback(response) {
        	console.log(response);
            alert("Error getting deployConfigs");
        });


        $scope.eventText = '';
        var handleSelect = function (item, e) {
            $scope.eventText = item.name + ' selected\n' + $scope.eventText;
        };
        var handleSelectionChange = function (selectedItems, e) {
            $scope.eventText = selectedItems.length + ' items selected\n' + $scope.eventText;
        };
        var handleClick = function (item, e) {
            $scope.eventText = item.name + ' clicked\n' + $scope.eventText;
        };
        var handleDblClick = function (item, e) {
            $scope.eventText = item.name + ' double clicked\n' + $scope.eventText;
        };
        var handleCheckBoxChange = function (item, selected, e) {
            $scope.eventText = item.name + ' checked: ' + item.selected + '\n' + $scope.eventText;
        };

        var checkDisabledItem = function (item) {
            return $scope.showDisabled && (item.name === "John Smith");
        };

        $scope.selectType = 'checkbox';
        $scope.updateSelectionType = function () {
            if ($scope.selectType === 'checkbox') {
                $scope.config.selectItems = false;
                $scope.config.showSelectBox = true;
            } else if ($scope.selectType === 'card') {
                $scope.config.selectItems = true;
                $scope.config.showSelectBox = false;
            } else {
                $scope.config.selectItems = false
                $scope.config.showSelectBox = false;
            }
        };

        $scope.showDisabled = false;

        $scope.config = {
            selectItems: false,
            multiSelect: false,
            dblClick: false,
            selectionMatchProp: 'name',
            selectedItems: [],
            checkDisabled: checkDisabledItem,
            showSelectBox: true,
            onSelect: handleSelect,
            onSelectionChange: handleSelectionChange,
            onCheckBoxChange: handleCheckBoxChange,
            onClick: handleClick,
            onDblClick: handleDblClick
        };

        $scope.status = {
            "title": "Nodes",
            "count": 793,
            "href": "#",
            "iconClass": "fa fa-shield",
            "notifications": [
                {
                    "iconClass": "pficon pficon-error-circle-o",
                    "count": 4,
                    "href": "#"
                },
                {
                    "iconClass": "pficon pficon-warning-triangle-o",
                    "count": 1
                }
            ]
        };

        $scope.miniAggStatus = {
            "iconClass": "pficon pficon-container-node",
            "title": "Nodes",
            "count": 0,
            "href": "#",
            "notification": {
                "iconClass": "pficon pficon-error-circle-o",
                "count": 3
            }
        };

        //DEV ENVIRONMENT STATUS
        $scope.devStatus = {
            "title": "Development",
            "count": 3.1,
            "notifications": [
                {
                    "iconImage": "img/kubernetes.svg",
                    "count": 1,
                    "href": "#"
                },
                {
                    "iconImage": "img/OpenShift-logo.svg",
                    "count": 2,
                    "href": "#"
                }
            ]
        };

        //QA environment status
        $scope.qaStatus = {
            "title": "Staging",
            "count": 3.0,
            "notifications": [
                {
                    "iconImage": "img/kubernetes.svg",
                    "count": 1,
                    "href": "#"
                },
                {
                    "iconImage": "img/OpenShift-logo.svg",
                    "count": 2,
                    "href": "#"
                }
            ]
        };

        //PROD environment status
        $scope.prodStatus = {
            "title": "Production",
            "count": 2.8,
            "notifications": [
                {
                    "iconImage": "img/kubernetes.svg",
                    "count": 1,
                    "href": "#"
                },
                {
                    "iconImage": "img/OpenShift-logo.svg",
                    "count": 2,
                    "href": "#"
                }
            ]
        };

/*

        $scope.dcs = [
            {
                "kind": "DeploymentConfig",
                "apiVersion": "v1",
                "metadata": {
                    "name": "monster",
                    "namespace": "devopsdev",
                    "selfLink": "/oapi/v1/namespaces/devopsdev/deploymentconfigs/monster",
                    "uid": "fb937a69-27e0-11e6-897c-000c293f20b2",
                    "resourceVersion": "164636",
                    "creationTimestamp": "2016-06-01T10:09:52Z",
                    "annotations": {
                        "openshift.io/deployment.cancelled": "22"
                    }
                },
                "spec": {
                    "strategy": {
                        "type": "Rolling",
                        "rollingParams": {
                            "updatePeriodSeconds": 1,
                            "intervalSeconds": 1,
                            "timeoutSeconds": 600,
                            "maxUnavailable": "25%",
                            "maxSurge": "25%"
                        },
                        "resources": {}
                    },
                    "triggers": [
                        {
                            "type": "ConfigChange"
                        },
                        {
                            "type": "ImageChange",
                            "imageChangeParams": {
                                "automatic": true,
                                "containerNames": [
                                    "monster"
                                ],
                                "from": {
                                    "kind": "ImageStreamTag",
                                    "name": "monster:latest"
                                },
                                "lastTriggeredImage": "172.30.132.21:5000/devopsdev/monster@sha256:71e586c6603a9681a32b32242a4f067b4a573a103becc8ba0f795bb6d270b1c6"
                            }
                        }
                    ],
                    "replicas": 1,
                    "test": false,
                    "selector": {
                        "deploymentConfig": "monster"
                    },
                    "template": {
                        "metadata": {
                            "name": "monster",
                            "creationTimestamp": null,
                            "labels": {
                                "deploymentConfig": "monster"
                            }
                        },
                        "spec": {
                            "containers": [
                                {
                                    "name": "monster",
                                    "image": "172.30.132.21:5000/devopsdev/monster@sha256:71e586c6603a9681a32b32242a4f067b4a573a103becc8ba0f795bb6d270b1c6",
                                    "ports": [
                                        {
                                            "name": "http",
                                            "containerPort": 8080,
                                            "protocol": "TCP"
                                        },
                                        {
                                            "name": "jolokia",
                                            "containerPort": 8778,
                                            "protocol": "TCP"
                                        },
                                        {
                                            "name": "debug",
                                            "containerPort": 8787,
                                            "protocol": "TCP"
                                        }
                                    ],
                                    "env": [
                                        {
                                            "name": "DB_SERVICE_PREFIX_MAPPING",
                                            "value": "monster-mysql=DB"
                                        },
                                        {
                                            "name": "TX_DATABASE_PREFIX_MAPPING",
                                            "value": "monster-mysql=DB"
                                        },
                                        {
                                            "name": "DB_JNDI",
                                            "value": "java:jboss/datasources/MySQLDS"
                                        },
                                        {
                                            "name": "DB_DATABASE",
                                            "value": "monster"
                                        },
                                        {
                                            "name": "DB_USERNAME",
                                            "value": "monster"
                                        },
                                        {
                                            "name": "DB_PASSWORD",
                                            "value": "monster"
                                        },
                                        {
                                            "name": "JAVA_OPTS",
                                            "value": "-Xmx512m -XX:MaxPermSize=256m -Djava.net.preferIPv4Stack=true -Djboss.modules.system.pkgs=org.jboss.logmanager -Djava.awt.headless=true -Djboss.modules.policy-permissions=true"
                                        },
                                        {
                                            "name": "DEBUG",
                                            "value": "true"
                                        }
                                    ],
                                    "resources": {},
                                    "readinessProbe": {
                                        "exec": {
                                            "command": [
                                                "/bin/bash",
                                                "-c",
                                                "/opt/eap/bin/readinessProbe.sh"
                                            ]
                                        },
                                        "timeoutSeconds": 1,
                                        "periodSeconds": 10,
                                        "successThreshold": 1,
                                        "failureThreshold": 3
                                    },
                                    "terminationMessagePath": "/dev/termination-log",
                                    "imagePullPolicy": "Always"
                                }
                            ],
                            "restartPolicy": "Always",
                            "terminationGracePeriodSeconds": 30,
                            "dnsPolicy": "ClusterFirst",
                            "securityContext": {}
                        }
                    }
                },
                "status": {
                    "latestVersion": 40,
                    "details": {
                        "causes": [
                            {
                                "type": "ImageChange",
                                "imageTrigger": {
                                    "from": {
                                        "kind": "ImageStreamTag",
                                        "name": "monster:latest"
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                "kind": "DeploymentConfig",
                "apiVersion": "v1",
                "metadata": {
                    "name": "monster-mysql",
                    "namespace": "devopsdev",
                    "selfLink": "/oapi/v1/namespaces/devopsdev/deploymentconfigs/monster-mysql",
                    "uid": "fb937583-27e0-11e6-897c-000c293f20b2",
                    "resourceVersion": "160413",
                    "creationTimestamp": "2016-06-01T10:09:52Z"
                },
                "spec": {
                    "strategy": {
                        "type": "Rolling",
                        "rollingParams": {
                            "updatePeriodSeconds": 1,
                            "intervalSeconds": 1,
                            "timeoutSeconds": 600,
                            "maxUnavailable": "25%",
                            "maxSurge": "25%"
                        },
                        "resources": {}
                    },
                    "triggers": [
                        {
                            "type": "ConfigChange"
                        },
                        {
                            "type": "ImageChange",
                            "imageChangeParams": {
                                "automatic": true,
                                "containerNames": [
                                    "monster-mysql"
                                ],
                                "from": {
                                    "kind": "ImageStreamTag",
                                    "namespace": "openshift",
                                    "name": "mysql:latest"
                                },
                                "lastTriggeredImage": "registry.access.redhat.com/rhscl/mysql-56-rhel7:latest"
                            }
                        }
                    ],
                    "replicas": 0,
                    "test": false,
                    "selector": {
                        "deploymentConfig": "monster-mysql"
                    },
                    "template": {
                        "metadata": {
                            "name": "monster-mysql",
                            "creationTimestamp": null,
                            "labels": {
                                "deploymentConfig": "monster-mysql"
                            }
                        },
                        "spec": {
                            "containers": [
                                {
                                    "name": "monster-mysql",
                                    "image": "registry.access.redhat.com/rhscl/mysql-56-rhel7:latest",
                                    "ports": [
                                        {
                                            "containerPort": 3306,
                                            "protocol": "TCP"
                                        }
                                    ],
                                    "env": [
                                        {
                                            "name": "MYSQL_USER",
                                            "value": "monster"
                                        },
                                        {
                                            "name": "MYSQL_PASSWORD",
                                            "value": "monster"
                                        },
                                        {
                                            "name": "MYSQL_DATABASE",
                                            "value": "monster"
                                        }
                                    ],
                                    "resources": {},
                                    "terminationMessagePath": "/dev/termination-log",
                                    "imagePullPolicy": "Always"
                                }
                            ],
                            "restartPolicy": "Always",
                            "terminationGracePeriodSeconds": 30,
                            "dnsPolicy": "ClusterFirst",
                            "securityContext": {}
                        }
                    }
                },
                "status": {
                    "latestVersion": 1,
                    "details": {
                        "causes": [
                            {
                                "type": "ConfigChange"
                            }
                        ]
                    }
                }
            }
        ];

*/

    }]);
