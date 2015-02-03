app.factory('HeroFactory', function ($http, $q) {
    var url = 'https://superherodb.firebaseio.com/';
    var GetHero = function () {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: url + '.json'
        }).success(function (data) {
            var myArr = [];
            for (var prop in data) {
                data[prop].key = prop;
                myArr.push(data[prop]);
            }
            def.resolve(myArr);
        }).error(function () {
            console.log("there was an error with your GET hero");
            def.reject();
        })
        return def.promise;
    }
    return {
        GetHero: GetHero
    }
});