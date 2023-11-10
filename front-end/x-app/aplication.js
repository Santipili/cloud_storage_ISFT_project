import { LoginForm } from "../web-components/x-Loginform/LoginForm.js";
import { navBar } from "../web-components/x-nav-bar/NavBar.js";
import { AppView } from "../x-app/view/appView.js";
import { navBarView2 } from "../web-components/x-nav-bar/views/nabBar-view2.js";
import { navBarModel2 } from "../web-components/x-nav-bar/model/navBarModel2.js";
import { navBarController2 } from "../web-components/x-nav-bar/controller/nabBarController2.js";
import { Alert } from "../web-components/x-alert/x-alert.js";
import { ServerErrors } from "../web-components/ServerErrors/x-serverErrors.js";
import { FSexplorer } from "../web-components/x-fileSystem-Explorer/x-fileSystemExplorer.js";

class Application extends HTMLElement {
  constructor() {
    super();
    this.view = new AppView();
    ////////////////////////////////
    this.error = new ServerErrors();
    this.nv = new navBar();
    this.nv2 = new navBar(navBarView2, navBarController2, navBarModel2);

    this.loginForm = new LoginForm();

    this.fsExplorer = new FSexplorer();

    this.alert = new Alert();

    this.currentState = null;

    let style = document.createElement("style");
    style.innerText = `@import './x-app/style/style.css'`;
    this.appendChild(this.view);
    this.appendChild(style);
  }

  changeState(newState) {
    if (this.currentState) {
      this.currentState.remove();
    }

    this.currentState = newState;
    this.view.contentSlot.appendChild(this.currentState);
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.view.headerSlot.appendChild(this.nv);
    this.changeState(this.loginForm);
  }

  setupEventListeners() {
    window.addEventListener("exit-verify", () => {
      this.changeState(null);
    });

    window.addEventListener("trigger-login-instance", () => {
      this.changeState(this.loginForm);
    });

    window.addEventListener("trigger-loggedIn-instance", () => {
      this.view.headerSlot.removeChild(this.nv);
      this.view.headerSlot.appendChild(this.nv2);
      this.changeState(this.fsExplorer);
    });
    window.addEventListener("trigger-logout-instance", () => {
      this.view.headerSlot.removeChild(this.nv2);
      this.view.headerSlot.appendChild(this.nv);
      this.changeState(this.loginForm);
    });
    window.addEventListener("trigger-alert-instance", (e) => {
      this.alert.controller.showMessage(e.detail);
      this.view.footerSlot.appendChild(this.alert);
    });
    window.addEventListener("trigger-delete-alert-instance", (e) => {
      this.view.footerSlot.removeChild(this.alert);
    });

    window.addEventListener("home-instance", () => {
      this.view.headerSlot.appendChild(this.nv);
      this.changeState(this.loginForm);
    });
  }
}

customElements.define("x-application", Application);

export { Application };
