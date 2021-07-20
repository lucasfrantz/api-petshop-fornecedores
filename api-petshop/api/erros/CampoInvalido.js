class CampoInvalido extends Error {
    constructor(campo) {
        super(`O campo ${campo} esta invalido`)
        this.name = 'CampoInvalido'
        this.idErro = 1
    }
}

module.exports = CampoInvalido