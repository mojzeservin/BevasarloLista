let app = angular.module('bevasarlolistaApp', []);

let kategoriaSelect = document.querySelector("#kategoriaSelect");
let termekSelect = document.querySelector("#termekSelect");
let mennyisegUpDown = document.querySelector("#mennyisegUpDown");
let addBtn = document.querySelector(".addBtn");

let saveBtn = document.querySelector(".saveBtn");
let loadBtn = document.querySelector(".loadBtn");
let deleteBtn = document.querySelector(".deleteBtn");

app.run(function($rootScope)
{
    $rootScope.appTitle =  "Bevásárló lista";

    $rootScope.author = "MR - ME";

    $rootScope.arakOsszege = 0;

    mennyisegUpDown.value = 1;

    $rootScope.kategoriak = [];

    $rootScope.termekek = [];

    $rootScope.termekekNevei = [];

    $rootScope.lista = [];

    $rootScope.Delete = function(id){
        $rootScope.lista.forEach(item => {
            if (id == item.id) {
                $rootScope.lista.splice($rootScope.lista.indexOf(item), 1)
            }
        })

        Update();
    };

    $rootScope.Modify = function(id){
        let amount = Number(window.prompt("Mennyiség módosítása erre:"));
        if (amount >= 1) {
            $rootScope.lista.forEach(item => {
                if (id == item.id) {
                    $rootScope.lista[$rootScope.lista.indexOf(item)].mennyiseg = amount;
                }
            })
        }

        Update();
    };

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
                id: $rootScope.lista.length,
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

            kategoriaSelect.selectedIndex = 0;
            termekSelect.selectedIndex = 0;
            mennyisegUpDown.value = 1;
        }

        Update();
    });

    saveBtn.addEventListener("click", () => {
        localStorage.removeItem("BevasarloLista");
        localStorage.setItem("BevasarloLista", JSON.stringify($rootScope.lista));
    });

    loadBtn.addEventListener("click", () => {
        $rootScope.lista = JSON.parse(localStorage.getItem("BevasarloLista"));

        Update();
    });

    deleteBtn.addEventListener("click", () => {
        $rootScope.lista = [];
        
        Update();
    });

    function Update(){
        $rootScope.arakOsszege = 0;

        $rootScope.lista.forEach(item => {
            $rootScope.arakOsszege += item.mennyiseg * item.egysegar;
        });

        // ID refresher
        for (let index = 0; index < $rootScope.lista.length; index++) {
            $rootScope.lista[index].id = index;
        }

        $rootScope.$apply();
    }
});
