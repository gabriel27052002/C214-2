class Filme {
    constructor(ano, titulo, genero, duracao) {
        this.ano = ano;
        this.titulo = titulo;
        this.genero = genero;
        this.duracao = duracao;
        this.assistido = false;
        this.avaliacao = -1;
    }

    exibirDetalhes() {
        console.log("Título: " + this.titulo);
        console.log("Ano: " + this.ano);
        console.log("Gênero: " + this.genero);
        console.log("Duração: " + this.duracao + " minutos");
        console.log("Assistido: " + (this.assistido ? "Sim" : "Não"));
        if (this.avaliacao >= 0 && this.avaliacao <= 5) {
            console.log("Avaliação: " + this.avaliacao + "/5");
        } else {
            console.log("Avaliação: Não avaliado");
        }
    }

    marcarComoAssistido() {
        this.assistido = true;
    }

    avaliarFilme(avaliacao) {
        if (avaliacao >= 0 && avaliacao <= 5) {
            this.avaliacao = avaliacao;
        } else {
            console.log("Erro: A avaliação deve estar no intervalo de 0 a 5.");
        }
    }
}

// Lista de filmes
const listaDeFilmes = [];

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function exibirMenu() {
    console.log("\nOpções:");
    console.log("1. Adicionar Novo Filme");
    console.log("2. Marcar Filme como Assistido");
    console.log("3. Avaliar Filme");
    console.log("4. Exibir Lista de Filmes");
    console.log("5. Sair");
    readline.question("Escolha uma opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                adicionarFilme();
                break;
            case "2":
                marcarComoAssistido();
                break;
            case "3":
                avaliarFilme();
                break;
            case "4":
                exibirListaDeFilmes();
                break;
            case "5":
                console.log("Saindo...");
                readline.close();
                break;
            default:
                console.log("Erro: Opção inválida. Tente novamente.");
                exibirMenu();
                break;
        }
    });
}

function adicionarFilme() {
    readline.question("Digite o ano do filme: ", (ano) => {
        readline.question("Digite o título do filme: ", (titulo) => {
            readline.question("Digite o gênero do filme: ", (genero) => {
                readline.question("Digite a duração do filme (minutos): ", (duracao) => {
                    const novoFilme = new Filme(parseInt(ano), titulo, genero, parseInt(duracao));
                    listaDeFilmes.push(novoFilme);
                    console.log("Filme adicionado com sucesso!");
                    exibirMenu();
                });
            });
        });
    });
}

function marcarComoAssistido() {
    exibirListaDeFilmes();
    readline.question("Digite o número do filme a ser marcado como assistido: ", (indice) => {
        if (isNaN(indice) || indice < 1 || indice > listaDeFilmes.length) {
            console.log("Erro: Índice inválido. Tente novamente.");
            marcarComoAssistido();
            return;
        }
        listaDeFilmes[indice - 1].marcarComoAssistido();
        console.log("Filme marcado como assistido.");
        exibirMenu();
    });
}

function avaliarFilme() {
    exibirListaDeFilmes();
    readline.question("Digite o número do filme a ser avaliado: ", (indice) => {
        if (isNaN(indice) || indice < 1 || indice > listaDeFilmes.length) {
            console.log("Erro: Índice inválido. Tente novamente.");
            avaliarFilme();
            return;
        }
        readline.question("Digite a avaliação (de 0 a 5): ", (avaliacao) => {
            if (isNaN(avaliacao) || avaliacao < 0 || avaliacao > 5) {
                console.log("Erro: A avaliação deve estar no intervalo de 0 a 5. Tente novamente.");
                avaliarFilme();
                return;
            }
            listaDeFilmes[indice - 1].avaliarFilme(parseInt(avaliacao));
            console.log("Filme avaliado com sucesso.");
            exibirMenu();
        });
    });
}

function exibirListaDeFilmes() {
    console.log("\nLista de Filmes:");
    listaDeFilmes.forEach((filme, index) => {
        console.log("Filme #" + (index + 1));
        filme.exibirDetalhes();
    });
    exibirMenu();
}

// Iniciar o programa
exibirMenu();
