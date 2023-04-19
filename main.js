//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;
var minas = [];


function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");

  casillerosSinDescubrir = FILAS * COLUMNAS;
  ponerMinasTablero();
  console.log(minas);
}


function draw() {
  if (hizoClick == true)
  {
    if(mouseButton == LEFT){
      if(tieneMinaCasillero(columnaPresionada, filaPresionada)){
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_CON_MINA);
        perder();
      }else{
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //pinta el casillero clickeado. Modificar/completar
        descubrirCasillero(columnaPresionada, filaPresionada);
      }
    }
    if(mouseButton == RIGHT){
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
    }

    if(ganoElJuego()){
      ganar();
    }

    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
}


function ganoElJuego()
{
  return (casillerosSinDescubrir == CANTIDAD_MINAS);   //Esto hace que NUNCA gane el juego. Modificar/completar
}

function ponerMinasTablero(){
  let i = 0;
  let columnas = [];
  let filas = [];

  while(i<CANTIDAD_MINAS){
    let columna = getRandomInt(COLUMNAS);
    let fila = getRandomInt(FILAS);
    if(!(tieneMinaCasillero(columna, fila))){
      ponerMinaCasillero(columna, fila);
      columnas.push(columna);
      filas.push(fila);
    }
    else{
      continue;
    }
    //console.log("Fila: "+fila+" Columna: "+columna)
    i++;
  }

  minas.push(filas);
  minas.push(columnas);

}

function mostrarMinas()
{
  for (let i= 0; i < CANTIDAD_MINAS; i++) {
    pintarCasillero(minas[1][i], minas[0][i], COLOR_CASILLERO_CON_MINA);
  }
}

function contarMinasAlrededor(columna, fila)
{


  let contadorMinas = 0;
  for (let  i = fila-1; i <= fila+1; i++) {
    for(let j = columna-1; j <= columna+1; j++){
      if(j<0 || i<0){
        continue;
      }
      if(tieneMinaCasillero(j,i)){
        contadorMinas++;
      }
    } 
  }
  return contadorMinas;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}