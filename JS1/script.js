//DADOS DOS FILMES (array de objetos)
let filmes = [
  { titulo: "Tudo em Todo o Lugar ao Mesmo Tempo", ano: 2022, genero: "Ficção científica", nota: 5, poster: "assets/td em todo lugar ao mesmo tempo.jpg" },
  { titulo: "Barbie", ano: 2023, genero: "Aventura", nota: 5, poster: "assets/barbie.jpg" },
  { titulo: "Parasita", ano: 2019, genero: "Suspense", nota: 5, poster: "assets/parasita.jpg" },
  { titulo: "Ainda Estou Aqui", ano: 2024, genero: "Drama Histórico", nota: 5, poster: "assets/ainda estou aqui.jpg" },
  { titulo: "Dear Friends (2007)", ano: 2007, genero: "Drama", nota: 5, poster: "assets/dear friends.jpg" },
  { titulo: "Kamikaze Girls", ano: 2004, genero: "Comédia/Drama", nota: 5, poster: "assets/kamikaze girls.jpg" },
  { titulo: "Blade Runner 2049", ano: 2017, genero: "Ficção científica", nota: 5, poster: "assets/blade-runner-menor.jpg" },
  { titulo: "Backrooms: Um Não-Lugar", ano: 2026, genero: "Ficção científica", nota: 5, poster: "assets/backrooms.jpg" },
  { titulo: "Obsession", ano: 2026, genero: "Terror", nota: 5, poster: "assets/obsession.jpg" }
  
];

let favoritos = [];     // títulos favoritados
let listaAtual = [];    // filmes que estão na tela agora

// Elementos da página
let grade = document.getElementById("grade");
let contador = document.getElementById("contador");
let campoBusca = document.getElementById("busca");
let filtroGenero = document.getElementById("filtro-genero");

// ===== C. MOSTRAR FILMES =====
function mostrarFilmes(lista) {
  listaAtual = lista;
  let html = "";

  // Se a lista estiver vazia, mostra mensagem
  if (lista.length === 0) {
    grade.innerHTML = "<p>Nenhum filme encontrado</p>";
    contador.innerText = 0;
    return;
  }

  // Percorre o array e monta os cards
  for (let i = 0; i < lista.length; i++) {
    let filme = lista[i];

    // Operador ternário: selo para nota >= 8
    let selo = filme.nota >= 8 ? '<p class="selo">⭐ Recomendado</p>' : "";

    html += `
      <div class="card">
        <img src="${filme.poster}" alt="Poster de ${filme.titulo}">
        <h3>${filme.titulo}</h3>
        <p>Ano: ${filme.ano}</p>
        <p>Gênero: ${filme.genero}</p>
        <p>Nota: ${filme.nota}</p>
        ${selo}
        <button onclick="favoritar(${i})">♥ Favoritar</button>
      </div>
    `;
  }

  grade.innerHTML = html;
  contador.innerText = lista.length;   // total de filmes mostrados
}

// BUSCA + FILTRO POR GÊNERO
function aplicarFiltros() {
  let texto = campoBusca.value.toLowerCase();
  let genero = filtroGenero.value;
  let resultado = [];

  for (let filme of filmes) {
    let achouTitulo = filme.titulo.toLowerCase().includes(texto);
    let achouGenero;

    // if / else: "Todos" mostra tudo
    if (genero === "Todos") {
      achouGenero = true;
    } else {
      achouGenero = filme.genero === genero;
    }

    if (achouTitulo && achouGenero) {
      resultado.push(filme);
    }
  }

  mostrarFilmes(resultado);
}

// Evento de busca: a cada letra digitada
campoBusca.addEventListener("input", aplicarFiltros);

// Evento de filtro: ao escolher um gênero
filtroGenero.addEventListener("change", aplicarFiltros);

// Preenche o select com os gêneros existentes no array
function preencherGeneros() {
  let generos = [];
  for (let filme of filmes) {
    if (!generos.includes(filme.genero)) {
      generos.push(filme.genero);
    }
  }
  for (let g of generos) {
    filtroGenero.innerHTML += `<option value="${g}">${g}</option>`;
  }
}

// INVERTER ORDEM
document.getElementById("btn-inverter").addEventListener("click", function () {
  filmes.reverse();
  aplicarFiltros();
});

// FAVORITOS
function favoritar(indice) {
  let titulo = listaAtual[indice].titulo;

  // Não repete
  if (!favoritos.includes(titulo)) {
    favoritos.push(titulo);
  }
  atualizarFavoritos();
}

function atualizarFavoritos() {
  let lista = document.getElementById("lista-favoritos");
  let html = "";

  for (let titulo of favoritos) {
    html += `<li>${titulo}</li>`;
  }

  lista.innerHTML = html;
  document.getElementById("contador-favoritos").innerText = favoritos.length;
}

document.getElementById("btn-limpar").addEventListener("click", function () {
  favoritos = [];
  atualizarFavoritos();
});

// INTERAÇÃO COM O MOUSE
let tituloCatalogo = document.getElementById("titulo-catalogo");
let tituloDestaque = document.getElementById("titulo-destaque");

tituloCatalogo.addEventListener("mouseenter", function () {
  tituloCatalogo.style.color = "#2fd8ff";
});
tituloCatalogo.addEventListener("mouseout", function () {
  tituloCatalogo.style.color = "";
});

tituloDestaque.addEventListener("mouseenter", function () {
  tituloDestaque.style.backgroundColor = "#7b2ff7";
});
tituloDestaque.addEventListener("mouseout", function () {
  tituloDestaque.style.backgroundColor = "";
});

// INÍCIO: roda ao carregar a página
preencherGeneros();
mostrarFilmes(filmes);
atualizarFavoritos();