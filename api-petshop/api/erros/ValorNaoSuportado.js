class ValorNaoSuportado extends Error {
    constructor(contentType) {
        super(`O tipo de conteudo ${contentType} nao e suportado`)
        this.idErro = 3
        this.name = "ValorNaoSuportado"
    }
}

module.exports = ValorNaoSuportado