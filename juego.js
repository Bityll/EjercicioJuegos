var programming_languages = [
	"python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
]

let respuesta = '';
let maxIntentos = 6;
let errores = 0;
let adivinado = [];
let estPalabra = null;

function palAlet() {
  respuesta = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  adivinado.indexOf(chosenLetter) === -1 ? adivinado.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (respuesta.indexOf(chosenLetter) >= 0) {
    palabrAdivinada();
    verSiGane();
  } else if (respuesta.indexOf(chosenLetter) === -1) {
    errores++;
    updateerrores();
    verJuegoPerdido();
    updatefotoAhorcadoture();
  }
}

function updatefotoAhorcadoture() {
  document.getElementById('fotoAhorcado').src = './images/' + errores + '.jpg';
}

function verSiGane() {
  if (estPalabra === respuesta) {
    document.getElementById('keyboard').innerHTML = ' Ganaste';
  }
}

function verJuegoPerdido() {
  if (errores === maxIntentos) {
    document.getElementById('wordSpotlight').innerHTML = 'La respuesta era: ' + respuesta;
    document.getElementById('keyboard').innerHTML = 'Perdiste';
  }
}

function palabrAdivinada() {
  estPalabra = respuesta.split('').map(letter => (adivinado.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = estPalabra;
}

function updateerrores() {
  document.getElementById('errores').innerHTML = errores;
}

function reset() {
  errores = 0;
  adivinado = [];
  document.getElementById('fotoAhorcado').src = './images/0.jpg';

  palAlet();
  palabrAdivinada();
  updateerrores();
  generateButtons();
}

document.getElementById('maxIntentos').innerHTML = maxIntentos;

palAlet();
generateButtons();
palabrAdivinada();
ajax();

/* function ajax()  {
  const http = new XMLHttpRequest();
  const url = 'https://palabras-aleatorias-public-api.herokuapp.com/random';
  http.onreadystatechange = function(){
    console.log(this.responseText);
  }
  http.open('GET', url);
  http.send();
}

fetch('https://palabras-aleatorias-public-api.herokuapp.com/random').then(function(resp){
  console.log(resp.body);
}) */