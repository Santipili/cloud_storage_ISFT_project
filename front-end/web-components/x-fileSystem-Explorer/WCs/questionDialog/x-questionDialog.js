class QuestionDialog extends HTMLElement {
  constructor(innerconfirmCancelBtnStatus = true, elements = []) {
    super();

    this.confirmCancelBtnStatus = innerconfirmCancelBtnStatus;

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

    if (this.confirmCancelBtnStatus == true) {
      this.confirmButton = document.createElement("button");
      this.confirmButton.innerText = "";
      this.confirmButton.classList.add("confirm-btn");

      this.cancelButton = document.createElement("button");
      this.cancelButton.classList.add("cancel-btn");

      this.cancelButton.innerText = "";

      this.footer.appendChild(this.confirmButton);
      this.footer.appendChild(this.cancelButton);
    }

    const style = document.createElement("style");
    style.innerHTML = `@import 'web-components/x-fileSystem-Explorer/WCs/questionDialog/style/style.css';`;

    this.header.appendChild(this.dialogTitle);
    this.bodyContent.appendChild(this.question);

    if (elements.length > 0) {
      this.bodyContent.appendChild(elements[0]);
    }

    this.appendChild(style);

    this.appendChild(this.header);
    this.appendChild(this.bodyContent);
    this.appendChild(this.footer);
  }

  set options(options) {
    this.dialogTitle.innerText = options.titleText ?? "";
    this.question.innerText = options.questionText ?? "";
    if (this.confirmCancelBtnStatus == true) {
      this.confirmButton.innerText = options.confirmText ?? "";
      this.cancelButton.innerText = options.cancelText ?? "";
    }
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
