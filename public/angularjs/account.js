var LoginApp = angular.module('LoginApp', []);

LoginApp.controller('signIn', function($scope, $http,$window) {
	
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.signIn = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"username" : $scope.username,
				"password" : $scope.password
			}
		}).success(function(data) {
			if (data.statusCode === 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else {
				$window.location.assign("/homepage"); 
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
});

LoginApp.controller('register', function($scope, $http,$window) {
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/register',
			data : {
				"email"		:	$scope.email,
				"username"	:	$scope.username,
				"password"	: 	$scope.password,
				"fname"		:	$scope.fname,
				"lname"		:	$scope.lname
			}
		}).success(function(data) {
			if(data.statusCode === 200) {
				$window.location.assign("/signIn"); 
			} else {
				$window.location.assign("/register"); 
			}
		});
	};
});

LoginApp.controller('homepage', function($scope, $http,$window) {
	
});
