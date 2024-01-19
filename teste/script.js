const divResultado = document.getElementById("Resultado");
const btnVerificar = document.getElementById("btn-verificar");

btnVerificar.addEventListener("click", (evt) => {
    const input = document.getElementById("texto").value.toUpperCase();
    divResultado.innerHTML = getLetterFromWord("a", input);
});

function getLetterFromWord(letra, input) {
    let contLetra = 0;
    let arrayPosicoes = [];
    let letraUppercase = letra.toUpperCase();
    let palavra = [...input];
    
    for (let l = 0; l < palavra.length; l++) {
        if (palavra[l] === letraUppercase) {
            contLetra++;
            arrayPosicoes.push(l);
        }
    }
    return `${contLetra} letras ${letraUppercase} encontradas. Posições ${arrayPosicoes.toString()}`;
}

