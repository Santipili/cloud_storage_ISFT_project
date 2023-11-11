class navBarView extends HTMLElement {
  constructor() {
    super();

    this.navBar = document.createElement("div");
    this.navBar.classList.add("nav-bar");

    this.leftContainer = document.createElement("div");
    this.leftContainer.classList.add("left-container");

    this.homeLink = document.createElement("a");
    this.homeLink.classList.add("nav-link");
    this.homeLink.textContent = "Home";

    this.rightContainer = document.createElement("div");
    this.rightContainer.classList.add("right-container");

    this.appendChild(this.navBar);
    this.navBar.appendChild(this.leftContainer);
    this.navBar.appendChild(this.rightContainer);
    this.leftContainer.appendChild(this.homeLink);
  }
}

customElements.define("navbar-view", navBarView);
export { navBarView };
