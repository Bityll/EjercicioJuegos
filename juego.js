let respuesta = '';
let maxIntentos = 6;
let errores = 0;
let adivinado = [];
let estPalabra = null;

const url = 'https://palabras-aleatorias-public-api.herokuapp.com/random';
// const url = 'https://jsonplaceholder.typicode.com/posts';
var divContiner = document.createElement('div');
window.addEventListener("load", function (event) {
  fetch(url)
    .then(response => response.json())
    .then(json => {
      //Convertir palabras con tilde a sin tilde
      function eliminarDiacriticos(text) {
        return text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      }
      respuesta = eliminarDiacriticos(json.body.Word)
      divContiner.innerHTML = json.body.Word
    })
  divContiner.id = 'bitymelomama'

});

function palAlet() {
  function ajax() {

  }
  ajax()
  // respuesta = programming_languages[Math.floor(Math.random() * programming_languages.length)];
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
setTimeout(() => {
  if (respuesta.length > 1) {
    generateButtons();
    palabrAdivinada();
  } else {
    alert("No cargo");
  }
}, 3000);


