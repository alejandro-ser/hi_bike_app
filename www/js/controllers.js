angular.module('starter')

.controller('AppCtrl', function($scope, $http, $state, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.logout = function() {

    $http.get("http://hibike.dev/auth/logout")
    .then(function(respuesta) {
      console.log(respuesta.data.messages);
      $state.go('login');
    }, function(respuesta) {
      console.log(respuesta.data.error);
    });

  };
})

.controller('LoginCtrl', function($scope, $http, $state, $stateParams, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.registerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.showLogin = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.registerData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.login = function() {
    var form = this;
    var link = 'http://hibike.dev/auth/login';
    var userData = {email: form.email,
                    password: form.password};

    $http.post(link, userData)
    .then(function (response){
      $scope.response = response.data;
      if ($scope.response.status === 1) {
        //console.log($scope.response.user);
        $state.go('app.profile', {id: $scope.response.user.id});
      }else if($scope.response.status === 0){
        console.log($scope.response.messages);
      }
    }, function(error) {
      console.log(error);
    });
  }

  //Metodos para el registro
  $http.get("http://hibike.dev/profiles")
  .then(function(respuesta) {
    $scope.profiles = respuesta.data.profiles;
  }, function(respuesta) {
    console.log(respuesta.data);
  });

  $http.get("http://hibike.dev/bike-types")
  .then(function(respuesta) {
    $scope.bike_types = respuesta.data.bike_types;
  }, function(respuesta) {
    console.log(respuesta.data);
  });

  $scope.createUser = function() {
    var form = this;
    var link = 'http://hibike.dev/api/users/store';
    var userData = {name: form.name,
                    username: form.username,
                    email: form.email,
                    gender: form.gender,
                    bike_type: form.bike_type,
                    id_profile: form.id_profile,
                    password: form.password};

    $http.post(link, userData)
    .then(function (response){
      $scope.response = response.data;
      if ($scope.response.status === 1) {
        console.log($scope.response.messages);
        $scope.modal.hide();
      }else if($scope.response.status === 0){
        $scope.messages = $scope.response.messages;
        console.log($scope.response.messages);
      }
    }, function(error) {
      alert(error.data.error);
    });
  }
})

.controller('ProfileCtrl', function($scope, $http, $state, $stateParams) {
  var link = 'http://hibike.dev/api/users/show';
  var params = {id: $stateParams.id};
  $http.post(link, params)
  .then(function(respuesta) {
    //console.log(respuesta.data.user);
    $scope.user = respuesta.data.user;
  }, function(respuesta) {
    console.log(respuesta);
  });
})
;