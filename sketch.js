// --------------------------
// CONTENIDO DEL DIÁLOGO
// --------------------------
const preguntas = [
  "Mis ríos y acuíferos están un poco secos... ¿Podrías hacerme el favor de cerrar la llave mientras te cepillas los dientes o te enjabonas las manos?",
  "Mi piel son los bosques, los parques y los jardines... ¿Puedes ayudarme a recoger la basura que esta tirada?",
  "A veces siento que me cuesta respirar por tanto humo que hay por todos lados... Si es más conveniente ¿Podrías caminar o usar una bicicleta en lugar de un automóvil?",
  "Cuando una habitación esta vacía, la luz ya no necesita seguir brillando. ¿Podrías apagarla antes de irte?",
  "El plastico me inunda por todos lados, me hace sentir muy asfixiado...¿Me ayudas reduciendo tu uso de plásticos y a reciclarlo correctamente?"
];

const respuestasPositivas = [
  ["¡Gracias! Eso me alivia bastante", "Haces un gran trabajo al cuidar el agua, es un recurso muy valioso para mi.", "Espero que me sigas ayudando con esos buenos hábitos."],
  ["¡Gracias por ayudarme! Cada acción cuenta para mantener mi piel limpia y saludable.", "Vamos por buen camino, y se que juntos vamos a poder cambiar algo en el mundo.", "¡Estoy muy agradecido por tu gran trabajo!"],
  ["¡Vaya! ¡Qué alivio! Gracias por ayudarme a respirar mejor.", "Todo este aire contaminado me hace sentir muy mal, pero gracias a ti me siento mejor.", "¡Eres muy bueno manteniendo el aire limpio, sigamos trabajando juntos!"],
  ["¡Wow!, mira eso.", "He recuperado toda mi energía gracias a ti.", "Eres increíble cuidando de mí, gracias por ayudarme a mantenerme saludable y feliz."],
  ["¡Eres increíble!, me siento muy feliz y recuperado gracias a ti.", "Me has salvado de morir", "Muchas gracias por cuidar de mí... Y de ti..."]
];

const respuestasNegativas = [
  ["Oh... No te preocupes, ya habrá otra ocasión en la que puedas ayudarme.", "La próxima vez, cierra la llave cuando no la uses.", "Por favor, recordarlo es muy importante..."],
  ["Ehh?...", "¿En serio no te importa ayudarme?... Estás siendo muy egoísta.", "Espero que no pagues las consecuencias de esto..."],
  ["Oh...", "eso no se ve bien...", "No se siente bien perder mis hojas, me estás lastimando."],
  ["¡Oh no!... Estoy perdiendo mi energía...", "¡Por favor!... No me dejes así, ayúdame a mantenerme saludable y feliz...", "Aún puedes cambiar de opinión..."],
  [".  .  .", "Estoy... muriendo, ¿por qué?...", "¿Por qué?... dime...", "Solo... quería hacerte feliz... y me lastimaste..."]
];

const dialogoBuenoFinal = [
  "¡Qué alegría! El bosque también lo siente!",
  "Gracias a ti florezco, respiro y vuelvo a sonreír.",
  "Cuidarme es cuidar tu propio hogar... Siempre estaré contigo."
];

const dialogoMaloFinal = [
  "No tengo fuerzas...",
  "No dejaré de creer que podemos cuidar de este lugar.",
  "Pero...Ya no nos queda tiempo"
];

// --------------------------
// VARIABLES GENERALES
// --------------------------
let indiceActual = 0;
let indiceRespuesta = 0;
let contadorLetras = 0;
const velocidadTexto = 0.8;
let estado = "pregunta";
let textoMostrar = "";
let respuestasActuales = [];
let tipoFinal = null;
let botonFinalVisible = false;

// RECURSOS DE AUDIO
let sonidoPisadas, sonidoInicio, musicaDesarrollo, musicaFinalBueno, musicaFinalMalo;

// Recursos visuales
let miVideo;
let gifSecundario, gifSiguiente, gifSeis, gifSiete, gifOcho, gifNueve, gifDiez, gifOnce, gifDoce, gifTrece, gifCatorce, gifBuenoFinal, gifMaloFinal;
let mostrandoVideo = false;
let mostrarConversacion = false;
let esperandoInicio = true;
let tiempoInicioEspera;
const duracionEspera = 7000;

// Botones
let botonA, botonB, botonSiguiente, botonSiguienteGif, botonFinal;
let miImagen, imagenPositiva, imagenNegativa;

// Control PS5
let controllerIndex = null;
let opcionSeleccionada = 0;
let botonXPresionadoPrev = false;
let dpadIzqPrev = false;
let dpadDerPrev = false;

// --------------------------
// CARGA DE ARCHIVOS
// --------------------------
function preload() {
  // AUDIOS
  sonidoPisadas = loadSound('pisadas.mp3');
  sonidoInicio = loadSound('Inicio.mp3');
  musicaDesarrollo = loadSound('Desarrollo.mp3');
  musicaFinalBueno = loadSound('Final bueno.mp3');
  musicaFinalMalo = loadSound('Final malo.mp3');

  imagenPositiva = loadImage('4.GIF');
  imagenNegativa = loadImage('5.GIF');
  gifSecundario = loadImage('2.GIF');
  gifSiguiente = loadImage('3.GIF');
  gifSeis = loadImage('6.GIF');
  gifSiete = loadImage('7.GIF');
  gifOcho = loadImage('8.GIF');
  gifNueve = loadImage('9.GIF');
  gifDiez = loadImage('10.GIF');
  gifOnce = loadImage('11.GIF');
  gifDoce = loadImage('12.GIF');
  gifTrece = loadImage('13.GIF');
  gifCatorce = loadImage('14.GIF');
  gifBuenoFinal = loadImage('bueno.GIF');
  gifMaloFinal = loadImage('malo.GIF');
  miImagen = gifSecundario;
}

// --------------------------
// CONFIGURACIÓN INICIAL
// --------------------------
function setup() {
  createCanvas(1920, 1080);
  textSize(24);
  textFont('Courier New');
  textAlign(LEFT, TOP);
  imageMode(CENTER);

  // VOLÚMENES
  sonidoPisadas.setVolume(0.5);
  sonidoInicio.setVolume(0.7);
  musicaDesarrollo.setVolume(0.5);
  musicaFinalBueno.setVolume(0.6);
  musicaFinalMalo.setVolume(0.6);

  tiempoInicioEspera = millis();

  window.addEventListener("gamepadconnected", (e) => {
    controllerIndex = e.gamepad.index;
  });
  window.addEventListener("gamepaddisconnected", () => {
    controllerIndex = null;
  });

  miVideo = createVideo('1.mp4');
  miVideo.hide();
  miVideo.volume(0);

  miVideo.elt.onplay = () => {
    userStartAudio().then(() => {
      if (!sonidoPisadas.isPlaying()) {
        sonidoPisadas.stop();
        sonidoPisadas.loop();
      }
    });
  };

  miVideo.elt.onended = () => {
    if (sonidoPisadas.isPlaying()) sonidoPisadas.stop();
    mostrandoVideo = false;
    miImagen = gifSecundario;
    if (!sonidoInicio.isPlaying()) sonidoInicio.play();
  };

  // Botones principales
  botonA = createButton('SI');
  botonA.position(600, 850);
  botonA.size(80, 40);
  botonA.style('background-color', 'transparent');
  botonA.style('border', '2px solid #ffffff');
  botonA.style('border-radius', '8px');
  botonA.style('font-size', '26px');
  botonA.style('font-family', 'Courier New');
  botonA.style('font-weight', 'bold');
  botonA.style('color', '#ffffff');
  botonA.mousePressed(responderPositivo);

  botonB = createButton('NO');
  botonB.position(1200, 850);
  botonB.size(80, 40);
  botonB.style('background-color', 'transparent');
  botonB.style('border', '2px solid #ffffff');
  botonB.style('border-radius', '8px');
  botonB.style('font-size', '26px');
  botonB.style('font-family', 'Courier New');
  botonB.style('font-weight', 'bold');
  botonB.style('color', '#ffffff');
  botonB.mousePressed(responderNegativo);

  botonSiguiente = createButton('SIGUIENTE');
  botonSiguiente.position(900, 850);
  botonSiguiente.size(160, 40);
  botonSiguiente.style('background-color', 'transparent');
  botonSiguiente.style('border', '2px solid #ffd54f');
  botonSiguiente.style('border-radius', '8px');
  botonSiguiente.style('font-size', '24px');
  botonSiguiente.style('font-family', 'Courier New');
  botonSiguiente.style('font-weight', 'bold');
  botonSiguiente.style('color', '#ffd54f');
  botonSiguiente.mousePressed(siguientePregunta);
  botonSiguiente.hide();

  botonSiguienteGif = createButton('INICIO');
  botonSiguienteGif.position(1230, 300);
  botonSiguienteGif.size(210, 40);
  botonSiguienteGif.style('background-color', 'transparent');
  botonSiguienteGif.style('border', 'none');
  botonSiguienteGif.style('font-size', '25px');
  botonSiguienteGif.style('font-family', 'Courier New');
  botonSiguienteGif.style('color', '#000000');
  botonSiguienteGif.mousePressed(siguienteGif);
  botonSiguienteGif.hide();

  // BOTÓN FIN
  botonFinal = createButton('FIN');
  botonFinal.position(900, 850);
  botonFinal.size(120, 40);
  botonFinal.style('background-color', 'transparent');
  botonFinal.style('border', '2px solid #ffd54f');
  botonFinal.style('border-radius', '8px');
  botonFinal.style('font-size', '24px');
  botonFinal.style('font-family', 'Courier New');
  botonFinal.style('font-weight', 'bold');
  botonFinal.style('color', '#ffd54f');
  botonFinal.mousePressed(regresarAlVideoInicial);
  botonFinal.hide();
}

// --------------------------
// FUNCIONES AUXILIARES
// --------------------------
function leerBotonConfirmacion(gp) {
  if (!gp) return false;
  // Índice 1 = Botón X en control PS5
  const indices = [0, 1, 2, 9, 10];
  for (let i of indices) {
    if (gp.buttons[i]?.pressed) return true;
  }
  return false;
}

function iniciarVideo() {
  esperandoInicio = false;
  miVideo.show();
  miVideo.play();
  mostrandoVideo = true;
  mostrarConversacion = false;
}

function detenerTodosLosSonidos() {
  if (sonidoPisadas.isPlaying()) sonidoPisadas.stop();
  if (sonidoInicio.isPlaying()) sonidoInicio.stop();
  if (musicaDesarrollo.isPlaying()) musicaDesarrollo.stop();
  if (musicaFinalBueno.isPlaying()) musicaFinalBueno.stop();
  if (musicaFinalMalo.isPlaying()) musicaFinalMalo.stop();
}

// FUNCIÓN PARA REGRESAR AL VIDEO INICIAL
function regresarAlVideoInicial() {
  detenerTodosLosSonidos();
  // Reiniciar TODAS las variables del proyecto
  indiceActual = 0;
  indiceRespuesta = 0;
  contadorLetras = 0;
  estado = "pregunta";
  textoMostrar = "";
  respuestasActuales = [];
  tipoFinal = null;
  botonFinalVisible = false;
  opcionSeleccionada = 0;
  mostrarConversacion = false;
  // Ocultar todos los botones
  botonFinal.hide();
  botonA.hide();
  botonB.hide();
  botonSiguiente.hide();
  botonSiguienteGif.hide();
  // REINICIAR Y REPRODUCIR EL VIDEO DESDE EL PRINCIPIO
  miVideo.stop();
  miVideo.time(0);
  miVideo.show();
  mostrandoVideo = true;
  miVideo.play();
}

function avanzarDialogoFinal() {
  const dialogoActual = tipoFinal === "bueno" ? dialogoBuenoFinal : dialogoMaloFinal;
  if (indiceRespuesta < dialogoActual.length - 1) {
    indiceRespuesta++;
    textoMostrar = dialogoActual[indiceRespuesta];
    contadorLetras = 0;
  } else {
    botonFinal.show();
    botonFinalVisible = true;
  }
}

// --------------------------
// BUCLE PRINCIPAL
// --------------------------
function draw() {
  background(0);

  if (esperandoInicio) {
    botonA.hide(); botonB.hide(); botonSiguiente.hide(); botonSiguienteGif.hide(); botonFinal.hide();
    if (millis() - tiempoInicioEspera >= duracionEspera) iniciarVideo();
    return;
  }

  if (controllerIndex !== null) {
    let gp = navigator.getGamepads()[controllerIndex];
    if (gp) {
      let dpadIzq = gp.buttons[14]?.pressed || false;
      let dpadDer = gp.buttons[15]?.pressed || false;
      let botonX = leerBotonConfirmacion(gp);

      if (dpadIzq && !dpadIzqPrev) opcionSeleccionada = 0;
      if (dpadDer && !dpadDerPrev) opcionSeleccionada = 1;

      if (botonX && !botonXPresionadoPrev) {
        // ACCIÓN VINCULADA AL BOTÓN X: REGRESAR AL VIDEO SI ESTÁ VISIBLE EL BOTÓN FIN
        if (botonFinalVisible) {
          regresarAlVideoInicial();
        }
        else if (!mostrandoVideo && miImagen === gifSecundario) siguienteGif();
        else if (miImagen === gifBuenoFinal || miImagen === gifMaloFinal) avanzarDialogoFinal();
        else if (estado === "respuesta") siguientePregunta();
        else if (contadorLetras >= preguntas[indiceActual].length && estado === "pregunta") {
          opcionSeleccionada === 0 ? responderPositivo() : responderNegativo();
        }
      }

      dpadIzqPrev = dpadIzq; dpadDerPrev = dpadDer; botonXPresionadoPrev = botonX;
    }
  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Conecta un control de PS5 o usa el mouse", width / 2, height / 2);
    textAlign(LEFT, TOP);
    textSize(24);
  }

  if (mostrandoVideo) image(miVideo, 960, 300, 1100, 700);
  else image(miImagen, 960, 300, 1100, 700);

  // CAMBIOS DE AUDIO
  if (miImagen === gifSiguiente && !musicaDesarrollo.isPlaying()) {
    if (sonidoInicio.isPlaying()) sonidoInicio.stop();
    musicaDesarrollo.loop();
  }
  if (miImagen === gifBuenoFinal) {
    if (musicaDesarrollo.isPlaying()) musicaDesarrollo.stop();
    if (!musicaFinalBueno.isPlaying()) musicaFinalBueno.loop();
  }
  if (miImagen === gifMaloFinal) {
    if (musicaDesarrollo.isPlaying()) musicaDesarrollo.stop();
    if (!musicaFinalMalo.isPlaying()) musicaFinalMalo.loop();
  }

  // Mostrar texto
  if (mostrarConversacion) {
    let textoCompleto;
    if (miImagen === gifBuenoFinal || miImagen === gifMaloFinal) {
      const dialogoActual = tipoFinal === "bueno" ? dialogoBuenoFinal : dialogoMaloFinal;
      textoCompleto = dialogoActual[indiceRespuesta];
    } else {
      textoCompleto = estado === "pregunta" ? preguntas[indiceActual] : textoMostrar;
    }

    let textoVisible = textoCompleto.substring(0, floor(min(contadorLetras, textoCompleto.length)));
    fill(255);
    text(textoVisible, 500, 700, 900, 120);
    if (contadorLetras < textoCompleto.length) contadorLetras += velocidadTexto;
  }

  // Selección
  if (opcionSeleccionada === 0) {
    botonA.style('color', '#ffd54f');
    botonA.style('border-color', '#ffd54f');
    botonB.style('color', '#ffffff');
    botonB.style('border-color', '#ffffff');
  } else {
    botonB.style('color', '#ffd54f');
    botonB.style('border-color', '#ffd54f');
    botonA.style('color', '#ffffff');
    botonA.style('border-color', '#ffffff');
  }

  // Visibilidad de botones
  const esFinal = miImagen === gifBuenoFinal || miImagen === gifMaloFinal;
  if (!mostrandoVideo && miImagen === gifSecundario) {
    botonSiguienteGif.show(); botonA.hide(); botonB.hide(); botonSiguiente.hide(); botonFinal.hide();
  } else if (esFinal) {
    botonA.hide(); botonB.hide(); botonSiguiente.hide(); botonSiguienteGif.hide();
  } else if (!mostrarConversacion || contadorLetras < (estado === "pregunta" ? preguntas[indiceActual].length : textoMostrar.length)) {
    botonA.hide(); botonB.hide(); botonSiguiente.hide(); botonSiguienteGif.hide(); botonFinal.hide();
  } else {
    estado === "pregunta" ? (botonA.show(), botonB.show(), botonSiguiente.hide(), botonFinal.hide()) : (botonA.hide(), botonB.hide(), botonSiguiente.show(), botonFinal.hide());
  }
}

// --------------------------
// LÓGICA DE ACCIONES
// --------------------------
function responderPositivo() {
  if (miImagen === gifSeis) {
    const gifsPositivos = [gifSiete, gifSiete, gifNueve, gifOnce, gifTrece];
    miImagen = gifsPositivos[indiceActual];
  } else {
    miImagen = imagenPositiva;
  }
  respuestasActuales = respuestasPositivas[indiceActual];
  indiceRespuesta = 0;
  textoMostrar = respuestasActuales[indiceRespuesta];
  estado = "respuesta";
  contadorLetras = 0;
}

function responderNegativo() {
  if (miImagen === gifSeis) {
    const gifsNegativos = [gifOcho, gifOcho, gifDiez, gifDoce, gifCatorce];
    miImagen = gifsNegativos[indiceActual];
  } else {
    miImagen = imagenNegativa;
  }
  respuestasActuales = respuestasNegativas[indiceActual];
  indiceRespuesta = 0;
  textoMostrar = respuestasActuales[indiceRespuesta];
  estado = "respuesta";
  contadorLetras = 0;
}

function siguientePregunta() {
  if (estado === "respuesta" && indiceRespuesta < respuestasActuales.length - 1) {
    indiceRespuesta++;
    textoMostrar = respuestasActuales[indiceRespuesta];
    contadorLetras = 0;
    return;
  }

  if (miImagen === gifTrece) {
    miImagen = gifBuenoFinal;
    tipoFinal = "bueno";
    indiceRespuesta = 0;
    mostrarConversacion = true;
    contadorLetras = 0;
    return;
  }
  if (miImagen === gifCatorce) {
    miImagen = gifMaloFinal;
    tipoFinal = "malo";
    indiceRespuesta = 0;
    mostrarConversacion = true;
    contadorLetras = 0;
    return;
  }

  if (indiceActual < preguntas.length - 1) {
    indiceActual++;
    indiceRespuesta = 0;
    miImagen = gifSeis;
    estado = "pregunta";
    contadorLetras = 0;
    textoMostrar = "";
    respuestasActuales = [];
    opcionSeleccionada = 0;
  }
}

function siguienteGif() {
  miImagen = gifSiguiente;
  mostrarConversacion = true;
  estado = "pregunta";
  contadorLetras = 0;
  textoMostrar = "";
  botonSiguienteGif.hide();
}