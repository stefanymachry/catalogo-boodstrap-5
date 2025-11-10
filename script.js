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
            <p class="mb-1"><strong>Categoria:</strtong> <span class="badge bg-secondary">${item.categoria}</span></p>
            <p class="fs-4 fw-bold text-success mb-3">Preço: ${item.preco}</P>
            <hr>
            <p>${item.detalhes}</p>
        `;
    }
});