// cria a janela modal que aparece quando o jogo termina (ganhou ou perdeu)

const styleObject = {
  styleForDivContainerPopUp: `
    visibility: visible;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    transition: all 0.3s ease-in-out;
    `,
  styleForDivContainerPalavras: `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    max-width: 480px;
    height: auto;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    padding: 1rem 1rem;
    border: 1px solid #000;
    font-size: 20px;
    font-weight: bold;
    color: white;
    outline: 2px solid black;
    `,
  styleForDivClosePopUp: `
    width: 100%;
    height: 35px;
    margin-top: 1rem;
    `,

  styleForButton: `
    width: 100%;
    height: inherit;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    `,
};

// cria a janela modal que aparece quando o jogo termina (ganhou ou perdeu)
function modalWindow(palavra, status = "lose", onRestart) {
  let divContainerPopUp = document.createElement("div");
  let divContainerPalavra = document.createElement("div");
  let divClosePopUp = document.createElement("div");
  let button = document.createElement("button");

  button.setAttribute("id", "close-popup");
  button.setAttribute("style", styleObject.styleForButton);
  button.innerHTML = "Jogar novamente";
  button.addEventListener("click", (evt) => {
    // remove o modal do DOM e então executa o callback de reinício
    if (divContainerPopUp && divContainerPopUp.parentNode) {
      divContainerPopUp.parentNode.removeChild(divContainerPopUp);
    }
    if (typeof onRestart === "function") {
      onRestart();
    }
  });

  divClosePopUp.setAttribute("class", "container-closePopUp");
  divContainerPopUp.setAttribute("class", "container-popup");

  divContainerPalavra.setAttribute("class", "container-palavra");
  divContainerPalavra.setAttribute(
    "style",
    styleObject.styleForDivContainerPalavras
  );

  divClosePopUp.setAttribute("style", styleObject.styleForDivClosePopUp);

  divContainerPopUp.setAttribute(
    "style",
    styleObject.styleForDivContainerPopUp
  );

  if (status === "win") {
    divContainerPalavra.innerHTML = `PARABÉNS! Você acertou a palavra: "${palavra.toUpperCase()}"`;
  } else {
    divContainerPalavra.innerHTML = `VOCÊ ESGOTOU SUAS CHANCES! </br> "${palavra}" foi a palavra sorteada`;
  }

  divClosePopUp.appendChild(button);
  divContainerPalavra.appendChild(divClosePopUp);
  divContainerPopUp.appendChild(divContainerPalavra);

  return divContainerPopUp;
}
export { modalWindow };
