class ModalUploaderView extends HTMLElement {

    constructor() {
      super();
    
    this.form = document.createElement("form");
    this.form.className = "form";
    this.form.enctype = "multipart/form-data";

    this.DivProgressBar = document.createElement("div");
    this.DivProgressBar.classList.add("Div");

    this.progressBar = document.createElement("progress");
    this.progressBar.setAttribute("max", "100");
    this.progressBar.setAttribute("value", "0");
    this.progressBar.setAttribute("style", "display: none;");

    this.progressSpan = document.createElement("span");
    this.progressSpan.className = "progress-span";
    this.progressSpan.textContent = "0%";
    this.progressSpan.setAttribute("style", "display: none;");

    this.DivProgressBar.appendChild(this.progressSpan);
    this.DivProgressBar.appendChild(this.progressBar);
    this.form.appendChild(this.DivProgressBar);
    
    
    }

    connectedCallback() {}

    disconnectedCallback() {}

    show() {
        this.progressBar.setAttribute("style", "display: block;");
        this.progressSpan.setAttribute("style", "display: block;");
        }

    hide() {
        this.progressBar.setAttribute("style", "display: none;");
        this.progressSpan.setAttribute("style", "display: none;");
        
        }

    updateProgressBar(percentCompleted) {
        this.progressBar.value = percentCompleted;
        this.progressSpan.innerText = `${Math.round(percentCompleted)}%`;
        this.appendChild(this.form);
        }
}

customElements.define("modal-uploader-view", ModalUploaderView);

export { ModalUploaderView };