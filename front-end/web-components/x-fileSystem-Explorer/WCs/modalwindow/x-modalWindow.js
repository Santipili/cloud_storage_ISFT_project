class ModalWindowView extends HTMLElement {
  #onouterclick(event) {
    if (event.target == this) {
      this.close();
    }
  }

  #_innerContent = undefined;
  #clickBlockedStatus = false;

  constructor(innerclickedblockStatus = false) {
    super();
    this.#clickBlockedStatus = innerclickedblockStatus;

    this.classList.add("mainContainer");
    const style = document.createElement("style");
    style.innerHTML = `@import 'web-components/x-fileSystem-Explorer/WCs/modalwindow/style/style.css';`;
    this.contentChild = document.createElement("div");
    this.contentChild.classList.add("constentChill");
    this.appendChild(style);

    this.appendChild(this.contentChild);
  }

  connectedCallback() {
    if (this.clickBlockedStatus == false) {
      this.addEventListener("click", this.#onouterclick.bind(this));
    }
  }

  disconnectedCallback() {
    if (this.clickBlockedStatus == true) {
      this.removeEventListener("click", this.#onouterclick);
    }
  }

  set content(innerContentElement) {
    if (innerContentElement instanceof HTMLElement) {
      this.#_innerContent = innerContentElement;
      this.contentChild.innerHTML = "";
      this.contentChild.appendChild(innerContentElement);
    }
  }

  set clickBlockedStatus(status) {
    if (typeof status === "boolean") {
      this.#clickBlockedStatus = status;
    }
  }

  get clickBlockedStatus() {
    return this.#clickBlockedStatus;
  }

  get content() {
    return this.#_innerContent;
  }

  open() {
    if (!document.body.contains(this)) {
      document.body.appendChild(this);
    }
  }

  close() {
    if (document.body.contains(this)) {
      document.body.removeChild(this);
    }
  }
}

customElements.define("x-modal-view", ModalWindowView);

export { ModalWindowView };
