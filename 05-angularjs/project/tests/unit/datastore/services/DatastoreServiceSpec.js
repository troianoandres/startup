describe("Tests for DatastoreService", function() {

    beforeEach(function(){
        angular.mock.module('$firebase', []);
        //angular.mock.module('', []);
        module('DatastoreModule', ['$firebase']);
    });

    /*
    beforeEach(inject(function($rootScope, $controller){
        $scope = $rootScope.new();
        ctrl = $controller('NameCtrl', {
            $scope: $scope,
        });
    }));
    */

  describe('Constructor', function () {

    it('assigns a name', function () {
      expect(1).toBe(1);
    });

  });

});