class Negociacao {
    #data;
    #quantidade;
    #valor;

    constructor(data, valor, quantidade) {
        this.#data = data;
        this.#quantidade = quantidade;
        this.#valor = valor;
    }

    get data() {
        return this.#data
    }

    get quantidade() {
        return this.#quantidade
    }

    get valor() {
        return this.#valor
    }
}  