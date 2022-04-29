export class Negociacao {
    constructor(
        private _data: Date,
        public readonly valor: number,
        public readonly quantidade: number
    ) { }

    get volume(): Number {
        return this.quantidade * this.valor;
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return this._data;
    }
}