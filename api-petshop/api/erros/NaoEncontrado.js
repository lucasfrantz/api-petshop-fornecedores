class NaoEncontrado extends Error {
    constructor() {
        super('Fornecedor nao encontrado')
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado