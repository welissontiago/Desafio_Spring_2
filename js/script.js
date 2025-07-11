document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.getElementById("form-container");

  const consumoNecessarioEl = document.getElementById("consumo-necessario");
  const menorValorEl = document.getElementById("menor-valor");
  const mediaPrecosEl = document.getElementById("media-precos");
  const gastosDiariosEl = document.getElementById("gastos-diarios");

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

  consumoNecessarioEl.innerHTML = `${consumoNecessarioLitro.toFixed(
    2
  )} <span>Litros</span>`;
  menorValorEl.innerHTML = `R$ ${menorValor.toFixed(2)} <span>por Litro</span>`;
  mediaPrecosEl.innerHTML = `R$ ${media.toFixed(2)} <span>Por litro</span>`;
  gastosDiariosEl.innerHTML = `R$ ${gastoDiario.toFixed(
    2
  )} <span>ida e volta</span>`;

  formContainer.style.display = "flex";
});
