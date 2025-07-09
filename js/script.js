document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const resultsContainer = document.getElementById("results");
  const formContainer = document.getElementById("form-container");
  const audio = document.getElementById("background-music");
  const promise = audio.play();

  if (promise !== undefined) {
    promise
      .then((_) => {
        console.log("A música começou a tocar automaticamente.");
      })
      .catch((error) => {
        console.log("Autoplay bloqueado. Esperando o usuário clicar.");
        window.addEventListener(
          "click",
          () => {
            audio.play();
          },
          { once: true }
        );
      });
  }

  let distancia = parseFloat(
    prompt("Qual a distância percorrida da sua casa até seu trabalho (em km)")
  );
  let consumoMedio = parseFloat(
    prompt("Qual o consumo médio do veículo (em Km/L).")
  );

  if (
    isNaN(distancia) ||
    isNaN(consumoMedio) ||
    distancia < 0 ||
    consumoMedio < 0
  ) {
    alert("Entrada inválida, por favor digite uma entrada válida");
    return;
  }

  let consumoNecessarioLitro = distancia / consumoMedio;

  let qtdPostos = parseInt(prompt("Em quantos postos você pesquisou?"));

  if (isNaN(qtdPostos) || qtdPostos <= 0) {
    alert("Entrada inválida, por favor digite uma entrada válida");
    return;
  }

  let valorTotal = 0;
  let menorValor = 0;
  for (let index = 1; index <= qtdPostos; index++) {
    let valorCombustivel;
    while (true) {
      valorCombustivel = parseFloat(
        prompt("Digite o valor encontrado (em R$) no posto " + index)
      );
      if (!isNaN(valorCombustivel) && valorCombustivel >= 0) {
        break;
      }
      alert("Valor de combustível inválido. Tente novamente.");
    }

    if (!menorValor || valorCombustivel < menorValor) {
      menorValor = valorCombustivel;
    }
    valorTotal = valorTotal + valorCombustivel;
  }

  let media = valorTotal / qtdPostos;
  let gastoDiario = 2 * (consumoNecessarioLitro * menorValor);

  resultsContainer.innerHTML +=
    "<p>" +
    "O consumo necessário é " +
    consumoNecessarioLitro.toFixed(2) +
    " Litros" +
    "</p>";
  resultsContainer.innerHTML +=
    "<p>" + "O menor valor pesquisado é R$ " + menorValor.toFixed(2) + "</p>";
  resultsContainer.innerHTML +=
    "<p>" + "A média dos valores pesquisados é R$ " + media.toFixed(2) + "</p>";
  resultsContainer.innerHTML +=
    "<p>" +
    "O gasto diário (ida e volta) é R$ " +
    gastoDiario.toFixed(2) +
    "</p>";

  formContainer.style.display = "block";
});
