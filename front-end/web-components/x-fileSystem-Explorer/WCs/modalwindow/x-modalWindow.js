class ModalWindowView extends HTMLElement {
  /*  #onouterclick(event) {
    if (event.target == this) {
      this.close();
    }
  } */

  #_innerContent = undefined;

  constructor(elements = []) {
    super();

    this.classList.add("mainContainer");
    const style = document.createElement("style");
    style.innerHTML = `@import 'web-components/x-fileSystem-Explorer/WCs/modalwindow/style/style.css';`;
    this.contentChild = document.createElement("div");
    if (elements.length > 0) {
      this.appendChild(elements[0]);
    }
    this.contentChild.classList.add("constentChill");
    this.appendChild(style);

    this.appendChild(this.contentChild);
  }

  connectedCallback() {
    /* this.addEventListener("click", this.#onouterclick.bind(this)); */
  }

  disconnectedCallback() {
    /*   this.removeEventListener("click", this.#onouterclick); */
  }

  set content(innerContentElement) {
    if (innerContentElement instanceof HTMLElement) {
      this.#_innerContent = innerContentElement;
      this.contentChild.innerHTML = "";
      this.contentChild.appendChild(innerContentElement);
    }
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
