import { inspect } from "../decorators/inspect.js";
import { logarTempodeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasSemana } from "../enums/dias-semana.js"
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class negociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes;
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this.inputData = <HTMLInputElement>document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }
    
    @logarTempodeExecucao()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if (!this.ehDiaUtil(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas!')
            return;
        }

        this.negociacoes.adiciona(negociacao)
        this.limparFormulario()
        this.atulizaView()
    }

    private ehDiaUtil(data: Date){
        return data.getDay() > DiasSemana.DOMINGO && data.getDay() < DiasSemana.SABADO
    }

    public limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atulizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso!")
    }
}