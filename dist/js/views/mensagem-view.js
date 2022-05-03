export class MensagemView  {
    template(model) {
        return `
            <p class="alert alert-info">${model}</p>
        `;
    }
}
