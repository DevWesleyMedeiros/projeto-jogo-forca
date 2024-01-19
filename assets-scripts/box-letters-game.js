import { palavras } from "./objeto-palavras.js";
import { drawBody, drawHead, drawArms, drawLegs, drawLineHang } from "./canvas.js";
import { modalWindow, reloadPage } from "./janela-modal.js";

let newGame = document.querySelector("#new-game");

newGame.addEventListener("click", (evt)=>{
    alert("Novo Jogo Carregado");
    reloadPage();
})

const buttonsLine = [...document.querySelectorAll('.container-letters > #row1 > span > button')];

const divLettersFild = document.querySelector(".letters-fild");
const wordClue = document.querySelector("#word-clue");

function getRandomPropetyAndValues(objeto) {
    let keyObject = Object.keys(objeto);
    let valueObject = keyObject[Math.floor(Math.random() * keyObject.length)];

    const propValues = objeto[valueObject];
    const randomValue = propValues[Math.floor(Math.random() * propValues.length)];

    return { property: valueObject, value: randomValue };
}
const { property, value } = getRandomPropetyAndValues(palavras);

wordClue.innerHTML = property;

for (let d = 0; d < value.length; d++) {
    let p = document.createElement("p")
    p.setAttribute("class", "letter");
    let div = document.createElement("div");
    div.setAttribute("class", "fild-letter");
    p.innerHTML = value[d].toUpperCase();
    div.appendChild(p)
    divLettersFild.appendChild(div);
}
let letterForGame = divLettersFild;

let fildForLetters = [...document.querySelectorAll(".letters-fild > .fild-letter > p")];

let tentativas = 6;

buttonsLine.forEach((b, posb) => {
    b.addEventListener("click", (evt) => {
        const letterClicked = evt.target.innerHTML;
        let letterFound = false;

        fildForLetters.forEach((p, posp) => {
            if (fildForLetters[posp].textContent === letterClicked) {
                fildForLetters[posp].style.color = "#000";
                letterFound = true;
            }
        });

        if (!letterFound) {
            alert("Letra não encontrada na palavra");
            tentativas--;
            attempts(tentativas);
        }
        if (tentativas === 1) {
            const model = modalWindow(value)
            document.body.appendChild(model);
        }
    })
});

function attempts(attempt){
    if (attempt !== 0) {
        if (attempt === 5) {
            return drawHead();
        }else if(attempt === 4){
            return drawBody();
        }else if(attempt === 3){
            return drawArms();
        }else if(attempt === 2){
            return drawLegs();
        }else if(attempt === 1){
            return drawLineHang();
        }
    }
}
