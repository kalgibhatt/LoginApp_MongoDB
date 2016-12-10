var LoginApp = angular.module('LoginApp', ['ngProgress']);

LoginApp.controller('signIn', function($scope, $http,$window, ngProgressFactory, $timeout) {
	
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
			if (data.status_code === 500) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				
			} else {		 
				$window.location.assign("/homepage");
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
	
	$scope.create = function() {
		$window.location.assign("/");
	};
	
	$scope.progressbar = ngProgressFactory.createInstance();
	$scope.progressbar.start();
	$scope.progressbar.complete();
});

LoginApp.controller('register', function($scope, $http,$window, ngProgressFactory, $timeout) {
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
			if(data.status_code === 200) {
				$window.location.assign("/signIn"); 
			} else {
				$window.location.assign("/register"); 
			}
		});
	};
	
	$scope.alreadyAccount = function() {
		$window.location.assign("/signIn");
	};
	
	$scope.progressbar = ngProgressFactory.createInstance();
	$scope.progressbar.start();
	$scope.progressbar.complete();
});


LoginApp.controller('homepage', function($scope, $http, ngProgressFactory, $timeout) {
	$http({
		method : "POST",
		url : '/homepage',
	}).success(function(data) {
		$scope.username	=	data.username;
		$scope.email	=	data.email;
		$scope.fname	=	data.fname;
		$scope.lname	=	data.lname;
	});
	
	$scope.progressbar = ngProgressFactory.createInstance();
	$scope.progressbar.start();
	$scope.progressbar.complete();
});
