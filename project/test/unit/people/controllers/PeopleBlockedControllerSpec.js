describe("PeopleBlockedController tests", function() {

  var $scope = null,
      $controller = null;

  beforeEach(function() {

    inject(function(_$controller, _$rootScope_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
    });

    $controller("PeopleBlockedController", {$scope: $scope});

    $scope.$digest();

  });

});