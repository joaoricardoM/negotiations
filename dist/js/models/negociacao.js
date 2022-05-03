export class Negociacao {
    constructor(data, valor, quantidade) {
        this._data = data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get volume() {
        return this._quantidade * this._valor;
    }
    get data() {
        const data = new Date(this._data.getTime());
        return data;
    }

    static criaDe(dataString, quantidadeString, valorString) {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }
}
