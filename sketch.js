let preguntas = [
  "Mis ríos y acuíferos están un poco secos... ¿Podrías hacerme el favor de cerrar la llave mientras te cepillas los dientes o te enjabonas las manos?",
  "Oh...Bueno, podiamos intentarlo en otro momento",
  "Para producir luz, muchas fábricas queman carbón. Si te pido el favor de apagar los focos que no uses para que trabajen menos..."
];

let respuestasPositivas = [
  "¡Gracias! ¡Eres un héroe del agua!",
  "Está bien, pero recuerda que el agua es un recurso valioso.",
  "¡Genial! Cada pequeño esfuerzo cuenta para cuidar nuestro planeta."
];

let respuestasNegativas = [
  "¡Qué pena! Pero aún puedes ayudar a cuidar el agua.",
  "No pasa nada, cada pequeño cambio también cuenta.",
  "Gracias por intentarlo, tu apoyo también importa."
];

let indiceActual = 0;
let textoActual = "";
let contadorLetras = 0;
let velocidad = 0.5;
let estado = "pregunta";
let textoMostrar = "";


// Variables para los botones
let botonA;
let botonB;

let miImagen; // 1. Declarar la variable global

function preload() {
  // 2. Cargar la imagen antes de ejecutar el programa
  miImagen = loadImage('perro.gif');
} 

function setup() {
  createCanvas(1920, 1080); // Subimos un poco el alto para que quepan los botones abajo
  textSize(24);
  textFont('Courier New');
  textAlign(LEFT, TOP);
  
  // 2. CREAMOS LOS BOTONES
  botonA = createButton('A');
  botonA.position(600, 850);
  botonA.size(100, 40);
  botonA.mousePressed(responderPositivo);
  
  botonB = createButton('B');
  botonB.position(1200, 850);
  botonB.size(100, 40);
  botonB.mousePressed(responderNegativo);
}

function draw() {
  background(0);
  
 imageMode(CENTER);
  image(miImagen, 1000,300,1100,700); 
  
  fill(255); 
  
  let textoCompleto = estado === "pregunta" ? preguntas[indiceActual] : textoMostrar;
  
  textoActual = textoCompleto.substring(0, floor(contadorLetras));
  
  text(textoActual, 500, 700, 900, 120);
  
  if (contadorLetras < textoCompleto.length) {
    contadorLetras += velocidad;
    botonA.hide();
    botonB.hide();
  } else {
    if (estado === "pregunta") {
      botonA.show();
      botonB.show();
      botonA.html('A');
      botonB.html('B');
      botonA.mousePressed(responderPositivo);
      botonB.mousePressed(responderNegativo);
    } else {
      botonA.show();
      botonB.show();
      botonA.html('SIGUIENTE');
      botonB.html('SIGUIENTE');
      botonA.mousePressed(siguientePregunta);
      botonB.mousePressed(siguientePregunta);
    }
  }
}

function responderPositivo() {
  textoMostrar = respuestasPositivas[indiceActual];
  estado = "respuesta";
  contadorLetras = 0;
  textoActual = "";
}

function responderNegativo() {
  textoMostrar = respuestasNegativas[indiceActual];
  estado = "respuesta";
  contadorLetras = 0;
  textoActual = "";
}

function siguientePregunta() {
  indiceActual = (indiceActual + 1) % preguntas.length;
  estado = "pregunta";
  contadorLetras = 0;
  textoActual = "";
  textoMostrar = "";
}