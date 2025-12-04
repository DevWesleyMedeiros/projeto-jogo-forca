// Esse arquivo contém a lógica do jogo da forca com letras em caixas. Ele manipula o DOM para interatividade, princiapal do jogo.

// importa o objeto com categorias e palavras
import { palavras } from "./objeto-palavras.js";

// importa funções de desenho do canvas
import {
  drawBackGround,
  drawHead,
  drawBody,
  drawArms,
  drawLegs,
  drawLineHang,
} from "./canvas.js";

// importa a função que cria a janela modal
import { modalWindow } from "./janela-modal.js";

const buttonsLine = [
  ...document.querySelectorAll(".container-letters > #row1 > span > button"),
];
const divLettersFild = document.querySelector(".letters-fild");
const wordClue = document.querySelector("#word-clue");

function getRandomPropetyAndValues(objeto) {
  const keys = Object.keys(objeto);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const values = objeto[randomKey];
  const randomValue = values[Math.floor(Math.random() * values.length)];
  return { property: randomKey, value: randomValue };
}

let { property: currentCategory, value: currentValue } =
  getRandomPropetyAndValues(palavras);
wordClue.innerHTML = currentCategory;

let matchedCount = 0;
let tentativas = 6;

// constrói os campos de letras
function buildLetterFields() {
  divLettersFild.innerHTML = "";
  matchedCount = 0;
  for (let i = 0; i < currentValue.length; i++) {
    const ch = currentValue[i];
    const p = document.createElement("p");
    p.className = "letter";
    p.innerHTML = ch.toUpperCase();
    const normalized = ch
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toUpperCase();
    p.dataset.normalized = normalized;
    const div = document.createElement("div");
    div.className = "fild-letter";
    if (!/^[A-Z]$/.test(normalized)) {
      p.style.color = "#000";
      p.dataset.revealed = "true";
      matchedCount++;
    }
    div.appendChild(p);
    divLettersFild.appendChild(div);
  }
}

buildLetterFields();

let fildForLetters = [
  ...document.querySelectorAll(".letters-fild > .fild-letter > p"),
];

// adiciona eventos de clique aos botões de letras
buttonsLine.forEach((b) => {
  b.addEventListener("click", (evt) => {
    const letterClicked = evt.target.innerHTML.toUpperCase();
    let letterFound = false;
    evt.target.disabled = true;
    evt.target.classList.add("disabled");

    // verifica se a letra clicada está na palavra
    fildForLetters.forEach((p) => {
      const normalized = p.dataset.normalized || p.textContent;
      if (normalized === letterClicked) {
        if (!p.dataset.revealed) {
          p.style.color = "#000";
          p.dataset.revealed = "true";
          matchedCount++;
        }
        letterFound = true;
      }
    });

    if (!letterFound) {
      showToast("Letra não encontrada na palavra");
      tentativas--;
      attempts(tentativas);
      if (tentativas === 0) {
        if (!document.querySelector(".container-popup")) {
          const model = modalWindow(currentValue, "lose", resetGame);
          document.body.appendChild(model);
        }
        disableAllButtons();
      }
    }

    // verifica se o jogador ganhou (recalcula campos atualizados e usa comparação robusta)
    fildForLetters = [
      ...document.querySelectorAll(".letters-fild > .fild-letter > p"),
    ];
    if (matchedCount >= fildForLetters.length) {
      if (!document.querySelector(".container-popup")) {
        const model = modalWindow(currentValue, "win", resetGame);
        document.body.appendChild(model);
      }
      disableAllButtons();
    }
  });
});

// desenha partes do boneco conforme as tentativas vão acabando
function attempts(attempt) {
  if (attempt !== 0) {
    if (attempt === 5) return drawHead();
    else if (attempt === 4) return drawBody();
    else if (attempt === 3) return drawArms();
    else if (attempt === 2) return drawLegs();
    else if (attempt === 1) return drawLineHang();
  }
}

// mostra uma notificação temporária na tela
function showToast(message, duration = 1600) {
  const toast = document.createElement("div");
  toast.className = "game-toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
  }, duration - 300);
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, duration);
}

// desabilita todos os botões de letras. Efeito deixa as letras acinzentadas
function disableAllButtons() {
  buttonsLine.forEach((btn) => {
    btn.disabled = true;
    btn.classList.add("disabled");
  });
}

// habilita todos os botões de letras
function enableAllButtons() {
  buttonsLine.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("disabled");
  });
}

// reseta o jogo
function resetGame() {
  // reset state
  tentativas = 6;
  const rand = getRandomPropetyAndValues(palavras);
  currentCategory = rand.property;
  currentValue = rand.value;
  wordClue.innerHTML = currentCategory;
  buildLetterFields();
  fildForLetters = [
    ...document.querySelectorAll(".letters-fild > .fild-letter > p"),
  ];
  enableAllButtons();
  try {
    drawBackGround();
  } catch (e) {}
}

// novo jogo (ícone)
const newGameBtn = document.querySelector("#new-game");
if (newGameBtn) {
  newGameBtn.addEventListener("click", () => {
    showToast("Novo jogo iniciado");
    resetGame();
  });
}

// suporte teclado
window.addEventListener("keydown", (evt) => {
  const key = evt.key.toUpperCase();
  if (!/^[A-ZÇ]$/.test(key)) return;
  const btn = buttonsLine.find(
    (b) => b.textContent.trim().toUpperCase() === key
  );
  if (btn && !btn.disabled) btn.click();
});
