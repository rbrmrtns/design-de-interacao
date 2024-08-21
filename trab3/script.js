async function fetchTaxas() {
  try {
    const response = await fetch("https://brasilapi.com.br/api/taxas/v1");
    if (!response.ok) throw new Error("Erro ao buscar as taxas.");
    const taxas = await response.json();
    document.getElementById("taxas").innerHTML = taxas
      .map(
        (t) =>
          `<p><strong>Nome:</strong> ${t.nome} - <strong>Valor:</strong> ${t.valor}</p>`
      )
      .join("");
  } catch (error) {
    document.getElementById(
      "taxas"
    ).innerHTML = `<p class="error">${error.message}</p>`;
  }
}

async function fetchEstados() {
  try {
    const response = await fetch("https://brasilapi.com.br/api/ibge/uf/v1");
    if (!response.ok) throw new Error("Erro ao buscar os estados.");
    const Estados = await response.json();
    document.getElementById("estados").innerHTML = Estados.map(
      (e) =>
        `<p><strong>Nome:</strong> ${e.nome}, <strong>Sigla:</strong> ${e.sigla} - <strong>Região:</strong> ${e.regiao.nome}, <strong>Sigla:</strong> ${e.regiao.sigla}</p>`
    ).join("");
  } catch (error) {
    document.getElementById(
      "Estados"
    ).innerHTML = `<p class="error">${error.message}</p>`;
  }
}

async function fetchLivro() {
  const isbn = document.getElementById("isbnInput").value;
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/isbn/v1/${isbn}`
    );
    if (!response.ok)
      throw new Error("ISBN não encontrada na base de dados ou inválido.");
    const livroInfo = await response.json();
    let autores = livroInfo.authors.join(", ");
    let formato = "";

    if (livroInfo.format == "PHYSICAL") {
      formato = "Físico";
    } else if (livroInfo.format == "DIGITAL") {
      formato = livroInfo.format[0] + livroInfo.format.slice(1).toLowerCase();
    }

    document.getElementById("livro").innerHTML = `
            <p><strong>Título:</strong> ${livroInfo.title}</p>
            <p><strong>Subtítulo:</strong> ${livroInfo.subtitle}</p>
            <p><strong>Autor(es):</strong> ${autores}</p>
            <p><strong>Sinopse:</strong> ${livroInfo.synopsis}</p>
            <p><strong>Número de Páginas:</strong> ${livroInfo.page_count}</p>
            <p><strong>Formato:</strong> ${formato}</p>
            <p><strong>Ano de Publicação:</strong> ${livroInfo.year}</p>
            <p><strong>Editora:</strong> ${livroInfo.publisher}</p>
            <p><strong>Preço de Varejo:</strong> R$${livroInfo.retail_price}</p>
            `;
  } catch (error) {
    document.getElementById(
      "livro"
    ).innerHTML = `<p class="error">${error.message}</p>`;
  }
}

async function fetchDominio() {
  const dominio = document.getElementById("dominioInput").value;
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/registrobr/v1/${dominio}`
    );
    if (!response.ok) throw new Error("Domínio inválido.");
    const dominioInfo = await response.json();

    let status = "";
    switch (dominioInfo.status_code) {
      case 0:
        status = "Domínio Disponível";
        break;
      case 1:
        status = "Disponível com Tickets Concorrentes";
        break;
      case 2:
        status = "Já Registrado";
        break;
      case 3:
        status = "Indisponível";
        break;
      case 4:
        status = "Inválido";
        break;
      case 5:
        status = "Aguardando Processo de Liberação";
        break;
      case 6:
        status = "Disponível no Processo de Liberação em Andamento";
        break;
      case 7:
        status =
          "Disponível no Processo de Liberação em Andamento com Tickets Concorrentes";
        break;
      case 8:
        status = "Erro";
        break;
      case 9:
        status = "Domínio em Processo de Liberação Competitivo";
        break;
      case 10:
        status = "Desconhecido";
        break;
    }

    let hosts = dominioInfo.hosts.join(", ");
    let dataExpiracao = new Date(dominioInfo["expires-at"]).toLocaleDateString(
      "pt-BR"
    );
    document.getElementById("dominioAv").innerHTML = `
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>Host(s):</strong> ${hosts}</p>
            <p><strong>Data de Expiração:</strong> ${dataExpiracao}</p>
            `;
  } catch (error) {
    document.getElementById(
      "dominioAv"
    ).innerHTML = `<p class="error">${error.message}</p>`;
  }
}

async function fetchWithRace() {
  const apis = [
    fetch("https://jsonplaceholder.typicode.com/users/1/posts"),
    fetch("https://jsonplaceholder.typicode.com/users/2/posts"),
    fetch("https://jsonplaceholder.typicode.com/users/3/posts"),
  ];

  try {
    const response = await Promise.race(apis);
    if (!response.ok) throw new Error("Erro na consulta.");
    const data = await response.json();
    document.getElementById(
      "raceResult"
    ).innerHTML = `<p><strong>Índice 0 do Resultado:</strong> ID: ${data[0].id}, Título: ${data[0].title}</p>`;
  } catch (error) {
    document.getElementById(
      "raceResult"
    ).innerHTML = `<p class="error">${error.message}</p>`;
  }
}

async function fetchWithAll() {
  const apis = [
    fetch("https://jsonplaceholder.typicode.com/users/1/posts"),
    fetch("https://jsonplaceholder.typicode.com/users/2/posts"),
    fetch("https://jsonplaceholder.typicode.com/users/3/posts"),
  ];

  try {
    const responses = await Promise.all(apis);
    const data = await Promise.all(
      responses.map((response) => {
        if (!response.ok) throw new Error("Erro na consulta.");
        return response.json();
      })
    );
    document.getElementById("allResult").innerHTML = data
      .map(
        (d) =>
          `<p><strong>Índice 0 do Resultado:</strong> ID: ${d[0].id}, Título: ${d[0].title}</p>`
      )
      .join("");
  } catch (error) {
    document.getElementById(
      "allResult"
    ).innerHTML = `<p class="error">${error.message}</p>`;
  }
}
