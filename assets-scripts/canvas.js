// esse arquivo contém funções para desenhar o boneco da forca em um canvas HTML5

const myCanvas = document.getElementById("mycanvas");
if (!myCanvas) {
  // canvas não existe no DOM atual
  console.warn("Canvas #mycanvas não encontrado. Desabilitando desenhos.");
}

var contexto = myCanvas ? myCanvas.getContext("2d") : null;

// variáveis dependentes do tamanho do canvas
var raioCabeca = 20;
var alturaCorpo = 60;
var novaPosiçãoX = 0;
var novaPosiçãoY = 0;

function computePositions() {

  if (!myCanvas) return;
  // recalcula posições e tamanhos baseados nas dimensões atuais do canvas

  const w = myCanvas.width;
  const h = myCanvas.height;
  novaPosiçãoX = Math.round(w * 0.87);
  novaPosiçãoY = Math.round(h * 0.42);
  raioCabeca = Math.max(10, Math.round(Math.min(w, h) * 0.03));
  alturaCorpo = Math.max(30, Math.round(h * 0.12));
}

function drawBackGround() {
  if (!contexto) return;
  contexto.clearRect(0, 0, myCanvas.width, myCanvas.height);
  contexto.fillStyle = "#f7f2f2";
  contexto.strokeStyle = "#d8e7eb";
  contexto.lineWidth = 0.3;
  const w = myCanvas.width;
  const h = myCanvas.height;
  for (let hpos = 0; hpos < w; hpos += 40) {
    contexto.strokeRect(hpos, 0, 40, h);
  }
  for (let v = 0; v < h; v += 40) {
    contexto.strokeRect(0, v, w, 40);
  }
}

if (contexto) contexto.strokeStyle = "#000";

function drawHead() {
  if (!contexto) return;
  contexto.beginPath();
  contexto.arc(novaPosiçãoX, novaPosiçãoY, raioCabeca, 0, 2 * Math.PI);
  contexto.fillStyle = "#47331a";
  contexto.fill();
  contexto.stroke();
}

function drawBody() {
  if (!contexto) return;
  contexto.beginPath();
  contexto.lineWidth = 5;
  contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca);
  contexto.lineTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + alturaCorpo);
  contexto.strokeStyle = "#47331a";
  contexto.stroke();
}

function drawArms() {
  if (!contexto) return;
  var comprimentoBracos = Math.max(20, Math.round(myCanvas.width * 0.025));
  contexto.beginPath();
  contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + 30);
  contexto.lineTo(
    novaPosiçãoX - comprimentoBracos,
    novaPosiçãoY + raioCabeca + 60
  );
  contexto.stroke();

  contexto.beginPath();
  contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + 30);
  contexto.lineTo(
    novaPosiçãoX + comprimentoBracos,
    novaPosiçãoY + raioCabeca + 60
  );
  contexto.stroke();
}

function drawLegs() {
  if (!contexto) return;
  var comprimentoPernas = Math.max(20, Math.round(myCanvas.width * 0.025));
  contexto.beginPath();
  contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + alturaCorpo);
  contexto.lineTo(
    novaPosiçãoX - comprimentoPernas,
    novaPosiçãoY + raioCabeca + alturaCorpo + 80
  );
  contexto.stroke();

  contexto.beginPath();
  contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + alturaCorpo);
  contexto.lineTo(
    novaPosiçãoX + comprimentoPernas,
    novaPosiçãoY + raioCabeca + alturaCorpo + 80
  );
  contexto.stroke();
}

function drawLineHang() {
  if (!contexto) return;
  contexto.beginPath();
  contexto.lineWidth = 5;
  contexto.strokeStyle = "#b57238";
  contexto.moveTo(
    Math.round(myCanvas.width * 0.9),
    Math.round(myCanvas.height * 0.46)
  );
  contexto.lineTo(
    Math.round(myCanvas.width * 0.83),
    Math.round(myCanvas.height * 0.458)
  );
  contexto.stroke();
}

// recalcula posições quando a janela muda de tamanho e redesenha background
function handleResize() {

  if (!myCanvas) return;
  // manter tamanho alinhado ao CSS se estiver usando largura responsiva

  const style = getComputedStyle(myCanvas);
  // tenta ajustar atributos do canvas para corresponder ao tamanho renderizado

  const cssWidth = parseInt(style.width, 10);
  const cssHeight = parseInt(style.height, 10);
  if (!isNaN(cssWidth) && !isNaN(cssHeight)) {
    myCanvas.width = cssWidth;
    myCanvas.height = cssHeight;
  }
  computePositions();
  drawBackGround();
}

if (myCanvas) {
  computePositions();
  drawBackGround();
  window.addEventListener("resize", handleResize);
}

export { drawBackGround, drawHead, drawBody, drawArms, drawLegs, drawLineHang }
