// Definição da classe Livro
class Livro {
    constructor(titulo, editora, numPaginas, capa = '') {
        this.titulo = titulo;
        this.editora = editora;
        this.numPaginas = numPaginas;
        this.capa = capa;
    }

    // Método para exibir os detalhes do livro
    exibirDetalhes() {
        return `Título: ${this.titulo}, Editora: ${this.editora}, Páginas: ${this.numPaginas}`;
    }
}

// Função para carregar livros do localStorage
function carregarLivros() {
    const livrosSalvos = localStorage.getItem('livros');
    if (livrosSalvos) {
        const livrosData = JSON.parse(livrosSalvos);
        return livrosData.map(livro => new Livro(livro.titulo, livro.editora, livro.numPaginas, livro.capa || ''));
    } else {
        // Livros iniciais caso não haja nada salvo
        return [
            new Livro("Dom Casmurro", "Editora XYZ", 300, "https://via.placeholder.com/150x200?text=Dom+Casmurro"),
            new Livro("O Primo Basílio", "Editora ABC", 400, "https://via.placeholder.com/150x200?text=O+Primo+Basílio"),
            new Livro("Memórias Póstumas de Brás Cubas", "Editora 123", 200, "https://via.placeholder.com/150x200?text=Memórias+Póstumas")
        ];
    }
}

// Função para salvar livros no localStorage
function salvarLivros() {
    localStorage.setItem('livros', JSON.stringify(livros));
}

// Vetor de livros carregado do localStorage
let livros = carregarLivros();
console.log('Livros carregados:', livros);

// Função para incluir um novo livro
function incluirLivro(vetor, livro) {
    vetor.push(livro);
    salvarLivros(); // Salva após adicionar
}

// Função para listar todos os livros
function listarLivros(vetor) {
    vetor.forEach(livro => {
        console.log(livro.exibirDetalhes());
    });
}

// Função para remover um livro pelo título
function removerLivro(vetor, titulo) {
    const indice = vetor.findIndex(livro => livro.titulo === titulo);
    if (indice !== -1) {
        vetor.splice(indice, 1); // Remove o livro do vetor
        salvarLivros(); // Salva após remover
        return true;
    } else {
        console.log("Livro não encontrado.");
        return false;
    }
}
