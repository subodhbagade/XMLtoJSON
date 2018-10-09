var app = angular.module('indexApp', []);
var baseURL = "http://localhost:3000";


app.controller('indexCtrl', function($scope, $http, $location)
{
    $scope.addXMLFile = function()
    {
        var formData = new FormData;

        var file = $('#XMLfile')[0].files[0];
        //console.log(file);
        formData.append('XMLfile',file);


        //post
        var XMLFile = baseURL + '/api/uploadXML';
        $http.post(XMLFile,formData,
        {
            transformRequest: angular.identity,
            headers:{
              'Content-Type':undefined
            }
        }).then(function(res){
            console.log('XML added');
        });
    }
});