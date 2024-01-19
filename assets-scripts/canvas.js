const myCanvas = document.getElementById("mycanvas");
var contexto = myCanvas.getContext("2d");

contexto.clearRect(0, 0, myCanvas.width, myCanvas.height);

var raioCabeca = 20;
var alturaCorpo = 60;

var novaPosiçãoX = 870;
var novaPosiçãoY = 200;

function drawBackGround(){
    contexto.fillStyle = "#f7f2f2";
    contexto.strokeStyle = "#d8e7eb";
    contexto.lineWidth = 0.3;
    for (let h = 0; h < 980; h += 40) {
        contexto.strokeRect(h, 0, 40, 480);
    }
    for (let v = 0; v < 480; v += 40) {
        contexto.strokeRect(0, v, 1000, 40);
    }
}

contexto.strokeStyle = "#000";

function drawHead(){
    contexto.beginPath();
    contexto.arc(novaPosiçãoX, novaPosiçãoY, raioCabeca, 0, 2 * Math.PI);
    contexto.fillStyle = "#47331a";
    contexto.fill();
    contexto.stroke();
}

function drawBody(){
    contexto.beginPath();
    contexto.lineWidth = 5;
    contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca); 
    contexto.lineTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + alturaCorpo); 
    contexto.strokeStyle = "#47331a";
    contexto.fill();
    contexto.stroke();
}

function drawArms(){
    var comprimentoBracos = 25;
    contexto.beginPath();
    contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + 30);
    contexto.lineTo(novaPosiçãoX - comprimentoBracos, novaPosiçãoY + raioCabeca + 60);
    contexto.stroke();

    contexto.beginPath();
    contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + 30);
    contexto.lineTo(novaPosiçãoX + comprimentoBracos, novaPosiçãoY + raioCabeca + 60);
    contexto.stroke();
}

function drawLegs(){
    var comprimentoPernas = 25;
    contexto.beginPath();
    contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + alturaCorpo);
    contexto.lineTo(novaPosiçãoX - comprimentoPernas, novaPosiçãoY + raioCabeca + alturaCorpo + 80);
    contexto.stroke();

    contexto.beginPath();
    contexto.moveTo(novaPosiçãoX, novaPosiçãoY + raioCabeca + alturaCorpo);
    contexto.lineTo(novaPosiçãoX + comprimentoPernas, novaPosiçãoY + raioCabeca + alturaCorpo + 80);
    contexto.stroke();
}

function drawLineHang(){
    contexto.beginPath();
    contexto.lineWidth = 5;
    contexto.strokeStyle = "#b57238";
    contexto.fill();
    contexto.moveTo(900, 223);
    contexto.lineTo(830, 222);
    contexto.stroke();
}

drawBackGround();

export { drawBackGround, drawHead, drawBody, drawArms, drawLegs, drawLineHang }
