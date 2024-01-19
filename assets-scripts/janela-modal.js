const styleObject = {
    styleForDivContainerPopUp: 
    `visibility: "visible";
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    transition: all 0.3s ease-in-out;`,
    styleForDivContainerPalavras: 
    `display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 200px;
    background-color: rgb(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 1rem 1rem;
    border: 1px solid #000;
    font-size: 30px;
    font-weight: bold;
    color: white;
    outline: 2px solid black;`,
    styleForDivClosePopUp: 
    `width: 50%;
    height: 35px;
    margin-top: 1rem;`,
    styleForButton:
    `width: 100%;
    height: inherit;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;`
}

function modalWindow(palavra){
    let divContainerPopUp = document.createElement("div");
    let divContainerPalavra = document.createElement("div");
    let divClosePopUp = document.createElement("div");
    let button = document.createElement("button");

    button.setAttribute("id", "close-popup");
    button.setAttribute("style", styleObject.styleForButton);
    button.innerHTML = "Jogar novamente";
    button.addEventListener("click", (evt)=>{
        divContainerPopUp.style.visibility = "hidden";
        reloadPage();
    })

    divClosePopUp.setAttribute("class", "container-closePopUp");
    divContainerPopUp.setAttribute("class", "container-popup");

    divContainerPalavra.setAttribute("class", "container-palavra");
    divContainerPalavra.setAttribute("style", styleObject.styleForDivContainerPalavras);

    divClosePopUp.setAttribute("style", styleObject.styleForDivClosePopUp);

    divContainerPopUp.setAttribute("style", styleObject.styleForDivContainerPopUp);

    divContainerPalavra.innerHTML = `VOCÊ ESGOTOU SUAS CHANCES! </br> "${palavra}" foi a palavra sorteada`

    divClosePopUp.appendChild(button);
    divContainerPalavra.appendChild(divClosePopUp);
    divContainerPopUp.appendChild(divContainerPalavra);

    return divContainerPopUp;
}
function reloadPage() {
    location.reload();
}

export { modalWindow, reloadPage };


