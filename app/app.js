var employeeApp = angular.module('employeeApp', ['ngRoute']);

employeeApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/home', {
        templateUrl: 'views/home.html'
    }).when('/viewEmployee', {
        templateUrl: 'views/viewEmployee.html',
        controller: 'ViewController'
    }).when('/deleteEmployee/:empId', {
        templateUrl: 'views/deleteEmployee.html',
        controller: 'ViewController'
    }).when('/editEmployee/:empId', {
        templateUrl: 'views/editEmployee.html',
        controller: 'ViewController'
    }).otherwise({
        redirectTo: '/home'
    })


}]);


employeeApp.controller('ViewController', ['$scope','$http','$location','$routeParams', function($scope, $http, $location, $routeParams){

    // GET
        $http({
            method: 'GET',
            url : 'https://erick1259.pythonanywhere.com/api/employee/GetAllEmployee'
        }).then(function(response){
            $scope.employees = response.data;
        })

        // create variables
        $scope.first_name = null;
        $scope.last_name = null;
        $scope.address = null;
        $scope.salary = null;
        $scope.dob = null;


        // create postData function
        $scope.postData = function(first_name, last_name,address, salary,dob){

                var data = {
                    first_name: first_name,
                    last_name: last_name,
                    address: address,
                    salary: salary,
                    dob: dob
                };


                // post

                $http.post("https://erick1259.pythonanywhere.com/api/employee/AddEmployee", JSON.stringify(data)).then(function(response){
                    if(response.data)
                    $scope.msg = "Registered Successfully";
                    $scope.statusValue = response.status;


                },   function(response){


                    $scope.msg = "Service Does not Exist";
                    $scope.statusValue = response.status;

                });

        };


        // DELETE
        // $location
        // $routeParams

        $scope.Id = $routeParams.empId;
        // Create Delete()

        $scope.Delete = function(){

            if($scope.Id > 0){

                // call $http delete service
                $http.delete('https://erick1259.pythonanywhere.com/api/employee/DeleteEmployee/'+ $scope.Id).then(function(response){

                if(response.data)

                $scope.msg = "Deleted Successfully";
                $location.path('/viewEmployee')

                   
                     }, function(response){

                        $scope.msg = "Service Not Exists"
                     });
                }
         }



        // UPDATE

        // Fill the employee records for update

        if($routeParams.empId){
            $scope.Id = $routeParams.empId;

            $http({
                method: 'GET',
                url: 'https://erick1259.pythonanywhere.com/api/employee/GetOneEmployee/'+ $scope.Id
            }).then(function(response){
                $scope.first_name = response.data.first_name;
                $scope.last_name = response.data.last_name;
                $scope.address = response.data.address;
                $scope.salary = response.data.salary;
                $scope.dob = response.data.dob;

                $

            });


            // Apply the Update
            $scope.updateData = function(first_name, last_name, address, salary, dob){
                var data = {

                    first_name: first_name,
                    last_name: last_name,
                    address: address,
                    salary:salary,
                    dob:dob
                }


                // Apply $http put service

                $http.put('https://erick1259.pythonanywhere.com/api/employee/UpdateEmployee/' + $scope.Id, JSON.stringify(data)).then(function(response){
                        if(response.data)
                        $scope.msg = "Updated Successfully";
                        $location.path('/viewEmployee')

                }, function(response){

                        $scope.msg = "Service Does Not Exist."

                });
             }
         }

}]);