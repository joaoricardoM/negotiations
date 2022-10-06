export class View {
    constructor(seletor) {
        const element = document.querySelector(seletor);
        if (element) {
            this.element = element;
        }
        else {
            throw Error("Invalid");
        }
    }
    update(model) {
        let template = this.template(model);
        this.element.innerHTML = template;
    }
}
