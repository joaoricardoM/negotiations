var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempodeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasSemana } from "../enums/dias-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class negociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView");
        this.mensagemView = new MensagemView("#mensagemView");
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update("Apenas negociações em dias úteis são aceitas!");
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atulizaView();
    }
    importarDados() {
        fetch("http://localhost:8080/dados")
            .then((res) => res.json())
            .then((dados) => {
            return dados.map((dadoHoje) => {
                return new Negociacao(new Date(), dadoHoje.vezes, dadoHoje.montante);
            });
        })
            .then((negociacoesDeHoje) => {
            for (let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }
    ehDiaUtil(data) {
        return (data.getDay() > DiasSemana.DOMINGO && data.getDay() < DiasSemana.SABADO);
    }
    limparFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    atulizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso!");
    }
}
__decorate([
    domInjector("#data")
], negociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector("#quantidade")
], negociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector("#valor")
], negociacaoController.prototype, "inputValor", void 0);
__decorate([
    inspect,
    logarTempodeExecucao()
], negociacaoController.prototype, "adiciona", null);
