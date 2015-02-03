app.controller('HomeController', function ($scope, HeroService, HeroFactory) {
    $scope.heroArray = [],
    $scope.firebase = 'https://superherodb.firebaseio.com/';

    $scope.Hero = function (name, description, image, key) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.key = key;
    }
    //Used for the edit, to create a copy of the Hero since angular.clone() did not work.
    $scope.Hero.prototype.clone = function () {
        var hero = this;
        return new $scope.Hero(hero.name, hero.description, hero.image, hero.key);
    }
    $scope.addHero = function () {
        $scope.newHero = new $scope.Hero($scope.inputName, $scope.inputDesc, $scope.inputImg);
        
        HeroService.PostHero($scope.newHero).then(function (data) {
            $scope.heroArray.push(data);
        }, function () { /* error function */ });
        
        //clears out inputs
        $scope.inputName = $scope.inputDesc = $scope.inputImg = '';
    }

    $scope.saveEdit = function (index, hero) {
        HeroService.PutHero(hero).then(function () {
            $scope.heroArray[index] = angular.copy(hero);
            hero = {}; 
        })
    }

    $scope.deleteHero = function (index) {
        $scope.key = $scope.heroArray[index].key;
        HeroService.DeleteHero($scope.key).then(function () {
            $scope.heroArray.splice(index, 1);
        })
    }

    //Using factory for GET to show how to write a factory in Angular
    HeroFactory.GetHero().then(function (data) {
        for (var i = 0; i < data.length; i++) {
            $scope.heroArray.push(new $scope.Hero(data[i].name, data[i].description, data[i].image, data[i].key));
        }
    })
})