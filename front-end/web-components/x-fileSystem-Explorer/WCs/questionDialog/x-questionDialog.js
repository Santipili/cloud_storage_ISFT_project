class QuestionDialog extends HTMLElement {
  constructor() {
    super();
    this.classList.add("Maincontainer");

    this.header = document.createElement("header");
    this.header.classList.add("header1");

    this.dialogTitle = document.createElement("h2");
    this.dialogTitle.innerText = "";

    this.bodyContent = document.createElement("div");
    this.bodyContent.classList.add("body-content");

    this.question = document.createElement("p");
    this.question.innerText = "";

    this.footer = document.createElement("footer");

    this.footer.classList.add("footer");

    this.confirmButton = document.createElement("button");
    this.confirmButton.innerText = "";
    this.confirmButton.classList.add("confirm-btn");

    this.cancelButton = document.createElement("button");
    this.cancelButton.classList.add("cancel-btn");

    this.cancelButton.innerText = "";

    const style = document.createElement("style");
    style.innerHTML = `@import 'web-components/x-fileSystem-Explorer/WCs/questionDialog/style/style.css';`;

    this.header.appendChild(this.dialogTitle);
    this.bodyContent.appendChild(this.question);
    this.footer.appendChild(this.confirmButton);
    this.footer.appendChild(this.cancelButton);

    this.appendChild(style);

    this.appendChild(this.header);
    this.appendChild(this.bodyContent);
    this.appendChild(this.footer);
  }

  set options(options) {
    this.dialogTitle.innerText = options.titleText;
    this.question.innerText = options.questionText;
    this.confirmButton.innerText = options.confirmText;
    this.cancelButton.innerText = options.cancelText;
  }

  get response() {
    return new Promise((resolve, reject) => {
      this.confirmButton.onclick = () => {
        resolve(true);
      };

      this.cancelButton.onclick = () => {
        resolve(false);
      };
    });
  }
}

customElements.define("x-question-dialog", QuestionDialog);

export { QuestionDialog };
