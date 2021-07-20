class DadosNaoFornecidos extends Error {
    constructor() {
        super('Nao foram fornecidos dados para atualizar')
        this.idErro = 2
        this.name = "DadosNaoFornecidos"
    }
}

module.exports = DadosNaoFornecidos