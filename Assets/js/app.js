let app = angular.module('bevasarlolistaApp', []);

let kategoriaSelect = document.querySelector("#kategoriaSelect");
let termekSelect = document.querySelector("#termekSelect");
let mennyisegUpDown = document.querySelector("#mennyisegUpDown");
let addBtn = document.querySelector(".addBtn");

app.run(function($rootScope)
{
    $rootScope.appTitle =  "Bevásárló lista";

    $rootScope.author = "MR - ME";

    $rootScope.kategoriak = [];

    $rootScope.termekek = [];

    $rootScope.termekekNevei = [];

    $rootScope.lista = [];

    axios.get("http://localhost:3000").then(res => {
        $rootScope.termekek = res.data;

        for (let index = 0; index < $rootScope.termekek.length; index++) {
            if (!$rootScope.kategoriak.includes($rootScope.termekek[index].category))
            {
                $rootScope.kategoriak.push($rootScope.termekek[index].category);
            }
        }

        for (let index = 0; index < $rootScope.kategoriak.length; index++) {
            let option = document.createElement("option");
            option.text = $rootScope.kategoriak[index];
            kategoriaSelect.appendChild(option);
        }

        $rootScope.$apply();
    });


    kategoriaSelect.addEventListener("click", ()=>
    {
        termekSelect.length = 1;

        $rootScope.termekekNevei = [];

        for (let index = 0; index < $rootScope.termekek.length; index++) {

            if (kategoriaSelect.options[kategoriaSelect.selectedIndex].text == $rootScope.termekek[index].category && !$rootScope.termekekNevei.includes($rootScope.termekek[index].productname))
            {
                $rootScope.termekekNevei.push($rootScope.termekek[index].productname);
            }
        }

        for (let index = 0; index < $rootScope.termekekNevei.length; index++) {
            let option = document.createElement("option");
            option.text = $rootScope.termekekNevei[index];
            termekSelect.appendChild(option);
        }
    });

    addBtn.addEventListener("click", () => {
        if (kategoriaSelect.selectedIndex != 0 && termekSelect.selectedIndex != 0 && mennyisegUpDown.value > 0)
        {
            let termek = {
                kategoria: kategoriaSelect.options[kategoriaSelect.selectedIndex].text,
                neve: termekSelect.options[termekSelect.selectedIndex].text,
                mennyiseg: Number(mennyisegUpDown.value),
                egysegar: 0
            };
    
            $rootScope.termekek.forEach(element => {
                if (element.category == kategoriaSelect.options[kategoriaSelect.selectedIndex].text && element.productname == termekSelect.options[termekSelect.selectedIndex].text)
                {
                    termek.egysegar = Number(element.price);
                }
            });
    
            $rootScope.lista.push(termek);
    
            $rootScope.$apply();
        }
    });
});
