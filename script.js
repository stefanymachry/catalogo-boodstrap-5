const CATALOG_ITEMS = [
    {
        id: 1,
        titulo: "A razão do Amor",
        categoria: "Livros",
        detalhes: "Uma cientista será obrigada a colaborar com seu rival em um projeto de proporções interestelares, e os resultados prometem ser explosivos.",
        preco: "R$ 39,90",
        estoque: 10,
        autor: "best-seller",
        lancamento: "2022"
    },
    {
        id: 2,
        titulo: "Vaso de Cerâmica Rústica",
        categoria: "artesanato",
        detalhes: "Vaso decorativo, feito a pintura a mão, ideal para flores secas ou como peça central e em mesas. Cada peça e unica. Cor roxa vibrante com detalhe em ouro velho.",
        preco: "R$ 120,00",
        estoque: 3,
        material: "Argila Queimada  e tinta Acrilica",
        comprimento: "20cm x 15cm"
    },
    {
        id: 3,
        titulo: "Eu te amei em outra vida",
        categoria: "Livros",
        detalhes: "Uma sensivel história de amor sobre dois jovens sensiveis e suas almas que insistem em se encontrar em cada nova vida.",
        preco: "R$ 35,90",
        estoque: 22,
        autor: "Dvid Arnold",
        lancamento: "2024"
    },
    {
        id: 4,
        titulo: "colar de sementes naturais",
        categoria: "artesanato",
        detalhes: "colar sustentável feito com sementes de açai e tucumã. Perfeito para um visual boêmio e natural. Fecho ajustável.",
        preco: "R$ 79,90",
        estoque: 8,
        material: "Sementes Naturais e Fio Encerado",
        comprimento: "50cm"
    }
];

// Helper para formatar moedas em reais
const formatCurrency = (value) => value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

/**
* Adiciona listeners aos botoes "Ver detalhes" para popular o modal dinamicamente 
*/
const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');
const modalAction = modalElement.querySelector('.btn-success');

// 1. Ouvinte para popular o modal ANTES de ser exibido
modalElement.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    // procura pelo ID do item clickando no vetor "CATALOG_ITEMS"
    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    
    // Se o item foi encontrado no vetor "CATALOG_ITEMS"
    if (item) {
        // Atualiza o titulo do Modal
        modalTitle.textcontent = item.titulo;
        
        // Cria o HTML de detalhes
        let detailsHTML = `
        <p class="mb-1"><strong>Categoria:</strong> <span class="badge bg-secondary">${item.categoria}</span></p>
        <p class="fs-4 fw-bold text-success mb-3">Preço: ${item.preco}</P>
        <hr>
        <p>${item.detalhes}</p>
        `;
        
        // Adiciona campos especificos por categoria
        if (item.categoria == 'Livros') {
            detailsHTML += `<p><strong>Autor:</strong>${item.autor}</p>`;
            detailsHTML += `<p><strong>Lançamento:</strong>${item.lancamento}</p>`;
            detailsHTML += `<p class="text-info"><strong>Estoque disponivel:</strong> ${item.estoque} unidades</p>`;
        } else if (item.categoria =='artesanato') {
            detailsHTML += `<p><strong>Material:</strong>${item.material}</p>`;
            detailsHTML += `<p><strong>Dimensões/Comprimento:</strong>${item.dimensoes || item.comprimento}</p>`;
            detailsHTML += `<p class="text-info"><strong>Peças Exclusivas em Estoque:></strong> ${item.estoque} unidades</p>`;
        }
        
        // Insere o HTML no corpo do modal
        modalBody.innerHTML = detailsHTML;
        
        // Ao clicar no botão "adicionar ao carrinho"
        modalAction.onclick = () => {
           // Em uma aplicação real, você faria uma chamada de API aqui. 
             // Para este exemplo, apenas adicionamos o item ao carrinho, mostramos o log e fechamos o modal
             adicionarItemCarrinho(item.id);
            console.log(`Ação: Item '${item.titulo}'' (ID: ${item.id}) adicionado ao carrinho.`);
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide(); 
        }
    }
});

// 2. ouvinte para afuncionalidade de busca (simples)
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const items = document.querySelectorAll('.item-catalogo'); 

function executarPesquisa(event) {
    // Previne o envio do formulario para o servidor (back-end)
    event.preventDefault();
    // Obtem o valor do campo de busca de letras minusculas (.tolowerCase())
    const query = searchInput.value.toLowerCase().trim();
    
    // Para cada item do catalogo (quatro itens)
    items.forEach(item => {
        // obtem o titulo e o nome da categoria do item atual em letras minusculas
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const category = item.getAttribute('data-categoria').toLowerCase();
        
        // verifica se o titulo ou a categoria do item atual incluem o valor digitado no campo de busca (query)
        // se o valor do campo de busca (query === "") for em branco, exibe todos os tens
        if (title.includes(query) || category.includes(query) || query === "") {
        } else {
            item.style.display = 'none'; // Esconde o item
        }
    });
}

// Adiciona evento ao clicar no botão "buscar"
searchButton.addEventListener('click', executarPesquisa);
// Adiciona evento ao pressionar qualquer tecla no campo "buscar item"
searchInput.addEventListener('keyup', (event) => {
    // Permite buscar ao pressionar Enter
    if (event.key === 'Enter') {
        executarPesquisa(event);
    } else if (searchInput.value.trim() === "") {
        // Mostra todos os itens se a busca for apagada
        executarPesquisa(event);
    }
});

// 3. atualiza os itens do catalogo ao carregar o HTML da pagina 
// para cada cartao da pagina
items.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('.card-title');
    const category = card.querySelectorAll('.card-text')[0];
    const description = card.querySelectorAll('.card-text')[1];
    
    // o 'index' começa a partir do '0' (zero),
    // enquanto o catalogo de itens (CATALOG_ITEMS) começa a partir de '1' (um)
    // portanto, somamos '1' (um) ao 'index' para que a numeraçao do indice corresponda 
    // a numeraçao do catalogo de itens
    const item = CATALOG_ITEMS.find(i => i.id === (index + 1));
    
    if (item) {
        // atualiza o texto da imagem do cartao com a categoria do item
        img.src = img.src.replace(/\?text=(.*)/, "?text=" + item.categoria.toUpperCase());
        //  atualiza o texto do titulo do cartao
        title.textContent = item.titulo;
        // atualiza a categoria do item
        category.textContent = "Categoria: " + item.categoria;
        //  atualiza a descriçao do item
        description.textContent = item.detalhes;
    }
    
});

// 4. Adiciona funcionalidade de kookies (persitencia) dos itens adicionados ao carrinho
// (mantem os produtos adicionados ao carrinho mesmo se fechar ou atualizar a pagina)
const CART_STORAGE_KEY = 'shopping_cart';

function obterCarrinhoDoNavegador() {
    // Tenta ler o kookie do navegador
    try {
        const cookie = localStorage.getItem(CART_STORAGE_KEY);
        if (cookie) {
            // Se o kookie existir, retorna o kookie
            return JSON.parse(cookie);
        }
    } catch (e) {
        console.error("Falha ao ler o cookie do armazenamento local.")
    }
    // Retorna um vetor vazio em caso de falha
    return [];
}

function salvarCookieCarrinho(itensCarrinho) {
    try {
        // Salva os items do carrinho em formato JSON no navegador
        // Ex: ao adicionar o item com ID '2' e '3' ao carrinho, CART_STORAGE_KEY = {2,3}
        // Voce pode visualizar os itens salvos no navegador em:
        // Botao direito na pagina > Inspencionar >Application > Storage > Local storage
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itensCarrinho));
    } catch (e) {
        console.error("Falha ao salvar carrinho no navegador. Erro:", e);
    }
}

function atualizarContadorCarrinho() {
    // Obtem os itens existentes no carrinho
    const carrinho = obterCarrinhoDoNavegador();
    // Obtem o elemento HTML que exibe o numero de itens no carrinho (bedge)
    const carrinhoBadge = document.getElementById("cart-count");
    
    // Se o elemento que exibe o numero de itens no carrinho (bedge) existe
    if (carrinhoBadge) {
        // Atualiza o bedge do carrinho com o numero de itens no carrinho
        carrinhoBadge.textContent = carrinho.length;
        
        if (carrinho.length > 0) {
            // Remove o class bootstrap 'd-none' (CSS: 'display: none;') para exebir o bedge
            carrinhoBadge.classList.remove('d-none');
        } else {
            // Adiciona a class bootstrap 'd-none' (CSS: 'display: none;') para ocultar o bedge
            carrinhoBadge.classList.add('d-none');
        }
    }
}

function adicionarItemCarrinho(itemId) {
    // Obtem os itens atuais do carrinho
    const carrinho = obterCarrinhoDoNavegador();
    carrinho.push(itemId) // Adiciona o Id do item recebido como parametro da funçao ao carrinho
    salvarCookieCarrinho(carrinho); // Atualiza o kookie do carrinho
    atualizarContadorCarrinho(); // Atualiza o numero de item do HTML do carrinho do nvbar
}

// Carrega o numero de itens no carrinho ao carregar a pagina HTML
atualizarContadorCarrinho();

// 5. Renderiza o conteudo do carrinho
const carrinho_btn = document.getElementById("cart-button");

// Ao clicar no botao do carrinho 
carrinho_btn.addEventListener("click", function() {
    // Exibe a seçao de "meu carrinho de compras" se ela estiver invisivel (remove a classe "d-none")
    // Oculta a seçao de "meu carrinho de compras" se ela nao estiver visivel (adiciona a classe "d-none")
    const carrinho_secao = document.getElementById("cart-section");
    carrinho_secao.classList.toggle("d-none");

    // Se a seçao do carrinho possui a classe "d-none" (ou seja, o carrinho nao esta visivel)
    if (carrinho_secao.classList.contains("d-none")) {
        return; // Para de processar a funçao de renderizar o rercibo se a seçao "meu carrinho de compras" nao esta visivel
    }

    const carrinho_recibo = document.getElementById("cart-list");
    carrinho_recibo.innerHTML = ""; // Limpa a lista de itens do recibo atual

    const itensCarrinho = obterCarrinhoDoNavegador(); // Le os cookies do navegador
    // Para cada itens do carrinho
    itensCarrinho.forEach(itemId => {
        // O cookie retorna apenas o ID  do item no carrinho,
        // Precissamos puxar suas informaçoes do vetor de acatalogo
        const item = CATALOG_ITEMS.find(i => i.id === itemId);
        
        // Adiciona o item do carrinho ao recibo
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "aling-items-center");
        li.innerHTML = `
        <div>
        <h6 class="mb-1">${item.titulo}</h6>
        </div>
        <span class="fw-bold text-success">${formatCurrency(item.preco)}</span> 
        `;

        carrinho_recibo.appendChild(li);
    });
});