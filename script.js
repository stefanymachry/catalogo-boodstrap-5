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
            console.log(`Ação: Item '${item.titulo}'' (ID: ${item.id}) adicionado ao carrinho.`);
            // Em uma aplicação real, você faria uma chamada de API aqui.
            // Para este exemplo, apenas fechamos o modal e fechamos o log.
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide(); 
        }
    }
});

// 2. ouvinte para afuncionalidade de busca (simples)
const searchInput = document.getElementById('serch-input');
const searchButton = document.getElementById('search-button');
const items = document.querySelectorAll('item-catalogo'); 

function executarPesquisa(event) {

}

// Adiciona evento ao clicar no botão "buscar"
searchButton.addEventListener('click', executarPesquisa);
// Adiciona evento ao pressionar qualquer tecla no campo "buscar item"
searchInput.addEventListener('keyup', (event) => {
    // Permite buscar ao pressionar Enter
    if (event.key === 'Enter') {
        executarPesquisa(event);
    } else if (searchInput.ariaValueMax.trim() === "") {
        // Mostra todos os itens se a busca for apagada
        executarPesquisa(event);
    }
})