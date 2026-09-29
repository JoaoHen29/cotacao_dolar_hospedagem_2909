// URL da AwesomeAPI para a última cotação do Dólar em Real
const URL_API = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

// Formata um número como moeda brasileira (R$ 5,4321)
function formatarReal(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

// Busca a cotação usando fetch()
async function buscarCotacao() {
  try {
    const resposta = await fetch(URL_API);

    if (!resposta.ok) {
      throw new Error("Erro na requisição: " + resposta.status);
    }

    const dados = await resposta.json();
    const dolar = dados.USDBRL; // objeto com os dados do USD-BRL

    exibirCotacao(dolar);
  } catch (erro) {
    console.error(erro);
    document.getElementById("valor-atual").textContent = "Indisponível";
    document.getElementById("valor-atual").classList.add("erro");
    document.getElementById("ultima-atualizacao").textContent =
      "Não foi possível carregar a cotação. Tentando novamente em 10 segundos...";
  }
}

// Mostra os dados na página
function exibirCotacao(dolar) {
  // bid = valor atual (compra) | high = maior do dia | low = menor do dia
  document.getElementById("valor-atual").textContent = formatarReal(dolar.bid);
  document.getElementById("valor-alta").textContent = formatarReal(dolar.high);
  document.getElementById("valor-baixa").textContent = formatarReal(dolar.low);

  // Variação percentual do dia (extra)
  const variacao = Number(dolar.pctChange);
  const elVariacao = document.getElementById("variacao");
  elVariacao.textContent = (variacao >= 0 ? "▲ +" : "▼ ") + variacao.toFixed(2) + "% hoje";
  elVariacao.classList.add(variacao >= 0 ? "positiva" : "negativa");

  // Data/hora da cotação (create_date já vem no horário de Brasília)
  const [data, hora] = dolar.create_date.split(" ");
  const dataFormatada = data.split("-").reverse().join("/");
  document.getElementById("ultima-atualizacao").textContent =
    "Última cotação: " + dataFormatada + " às " + hora;
}

buscarCotacao();
