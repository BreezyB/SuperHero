app.service('HeroService', function ($http, $q) {
    var url = 'https://superherodb.firebaseio.com/';
    this.PostHero = function (hero) {
        var def = $q.defer();
        $http({
            url: url + '.json',
            data: hero,
            method: 'POST'
        }).success(function (data) {
            hero.key = data.name;
            def.resolve(hero);
        }).error(function () {
            console.log("there was an error posting your hero");
            def.reject();
        });
        return def.promise;
    }

    this.PutHero = function (hero) {
        var def = $q.defer();
        $http({
            url: url + hero.key + "/.json",
            data: {
                name: hero.name,
                description: hero.description,
                image: hero.image
            },
            method: 'PUT'
        }).success(function (data) {
            def.resolve();
        }).error(function () {
            console.log("There was an error putting your hero.");
            def.reject();
        })
        return def.promise;
    }
    this.DeleteHero = function (key) {
        var def = $q.defer();
        $http({
            url: url + key + "/.json",
            method: 'DELETE'
        }).success(function () {
            def.resolve();
        }).error(function () {
            def.reject();
        })
        return def.promise;
    }
})