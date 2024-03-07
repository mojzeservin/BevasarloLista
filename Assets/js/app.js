let app = angular.module('bevasarlolistaApp', []);

let kategoria = document.querySelector("#kategoria");
let termek = document.querySelector("#termek");
let mennyiseg = document.querySelector("#mennyiseg");

app.run(function($rootScope)
{
    $rootScope.appTitle =  "Bevásárló lista";
    $rootScope.author = "MR - ME";

    $rootScope.termekek = [];

    $rootScope.kategoriak = [];

    axios.get("http://localhost:3000").then(res => {
        $rootScope.termekek = res.data;

        for (let index = 0; index < $rootScope.termekek.length; index++) {
            if (!$rootScope.kategoriak.includes($rootScope.termekek[index].category))
            {
                $rootScope.kategoriak.push($rootScope.termekek[index].category);
            }
        }

        $rootScope.$apply();
    });
}); 