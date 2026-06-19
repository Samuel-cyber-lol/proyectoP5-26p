let preguntas = [
  "Mis ríos y acuíferos están un poco secos... ¿Podrías hacerme el favor de cerrar la llave mientras te cepillas los dientes o te enjabonas las manos? ¿SÍ o NO?",
  "Oh...Bueno, podiamos intentarlo en otro momento",
  "Para producir luz, muchas fábricas queman carbón. Si te pido el favor de apagar los focos que no uses para que trabajen menos... ¿SÍ o NO?"
];

let indiceActual = 0; // Lleva el control de qué pregunta estamos mostrando
let textoActual = "";
let contadorLetras = 0;
let velocidad = 0.5;

// Variables para los botones
let botonSi;
let botonNo;

let miImagen; // 1. Declarar la variable global

function preload() {
  // 2. Cargar la imagen antes de ejecutar el programa
  miImagen = loadImage('perro.gif');
} 

function setup() {
  createCanvas(1100, 1000); // Subimos un poco el alto para que quepan los botones abajo
  textSize(24);
  textFont('Courier New');
  textAlign(LEFT, TOP);
  
  // 2. CREAMOS LOS BOTONES
  // Botón SÍ
  botonSi = createButton('SÍ');
  botonSi.position(300, 800); // Posición en la pantalla (X, Y)
  botonSi.size(100, 40);      // Tamaño (Ancho, Alto)
  botonSi.mousePressed(siguientePregunta); // Qué pasa cuando le dan clic
  
  // Botón NO
  botonNo = createButton('NO');
  botonNo.position(600, 800);
  botonNo.size(100, 40);
  botonNo.mousePressed(siguientePregunta);
}

function draw() {
  background(0);
  
 imageMode(CENTER);
  image(miImagen, 500, 250,1200,700); 
  
  fill(255); 
  
  // Obtenemos el texto de la pregunta actual de la lista
  let textoCompleto = preguntas[indiceActual];
  
  textoActual = textoCompleto.substring(0, floor(contadorLetras));
  
  text(textoActual, 100, 650, 900, 120);
  
  if (contadorLetras < textoCompleto.length) {
    contadorLetras += velocidad;
    
    // Mientras la máquina escribe, escondemos los botones para que no hagan trampa
    botonSi.hide();
    botonNo.hide();
  } else {
    // Cuando la máquina termina de escribir, mostramos los botones
    botonSi.show();
    botonNo.show();
  }
}

// 3. FUNCIÓN PARA PASAR A LA SIGUIENTE PREGUNTA
function siguientePregunta() {
  // Avanzamos al siguiente elemento de la lista
  indiceActual++;
  
  // Si llegamos al final de las preguntas, volvemos a empezar
  if (indiceActual >= preguntas.length) {
    indiceActual = 0; 
  }
  
  // REINICIAMOS la máquina de escribir para el nuevo texto
  contadorLetras = 0;
  textoActual = "";
}