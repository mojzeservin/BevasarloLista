let app = angular.module('bevasarlolistaApp', []);

app.run(function($rootScope)
{
    $rootScope.appTitle =  "Bevásárló lista";
    $rootScope.author = "MR - ME";
    $rootScope.company = "(12.A) Bajai SZC Türr István Technikum";
    $rootScope.year = new Date().getFullYear();
}); 