const piedra = "rock";
const papel = "paper";
const tijeras = "scissors";

const empate = 0;
const victoria = 1;
const derrota = 2;

let isPlaying = false;

const piedraBtn = document.getElementById("piedra");
const papelBtn = document.getElementById("papel");
const tijerasBtn = document.getElementById("tijeras");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const compuImg = document.getElementById("compu-img");


piedraBtn.addEventListener("click", ()=>{
    jugar(piedra)
})

papelBtn.addEventListener("click", ()=>{
    jugar(papel)
})

tijerasBtn.addEventListener("click", ()=>{
    jugar(tijeras)
});

function jugar(userOption) {
    if (isPlaying) return;
    isPlaying = true;

    userImg.src = "../images/"+userOption+ ".svg";
    resultText.innerHTML = "Escogiendo..";

    const interval = setInterval(function(){
        const machineOption = calcOpcionMaquina();
       
        compuImg.src = "../images/"+machineOption+ ".svg";

    },200);

    setTimeout(function() {

        clearInterval(interval);

        const machineOption = calcOpcionMaquina();
        const resultado = calcResult(userOption, machineOption);
    
        compuImg.src = "../images/"+machineOption+ ".svg";
        
    
        switch(resultado){
            case empate:
                resultText.innerHTML = "Empate";
                break;
            case victoria:
                resultText.innerHTML = "Ganaste!";
                break;
            case derrota:
                resultText.innerHTML = "Perdiste!";
                break;
        }
        isPlaying = false;
    }, 2000);

    }

    function calcOpcionMaquina (){
        const number = Math.floor(Math.random() * 3);
        switch (number){
            case 0:
                return piedra;
            case 1:
                return papel;
            case 2:
                return tijeras;
        }
    }

    function calcResult(userOption, machineOption){
        if (userOption === machineOption) {
            return empate
    
        }else if
            (userOption === piedra){
                if(machineOption === papel) return derrota;
                if(machineOption === tijeras) return victoria;
    
    
            }else if(userOption === papel ){
              if(machineOption === tijeras) return derrota
              if(machineOption === piedra) return victoria;


            }else if (userOption === tijeras){
                if(machineOption === piedra) return derrota;
                if(machineOption === papel) return victoria;
            }
    }