class LoginFormController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.button1.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomLogInClick();
    });

    this.view.button3.addEventListener("click", (e) => {
      e.preventDefault();
      this.onbuttomForgotPasswordClick();
    });
  }

  disable() {
    this.view.button1 = null;
    this.view.button3 = null;
  }

  async onButtomLogInClick(e) {
    let DATA = {
      userName: this.view.input1.value,
      password: this.view.input2.value,
    };
    let res = await this.model.login(DATA);
    if (res.status) {
      window.dispatchEvent(
        new CustomEvent("trigger-alert-instance", { detail: res.message })
      );

      window.dispatchEvent(new Event("trigger-loggedIn-instance"));
    } else {
      window.dispatchEvent(
        new CustomEvent("trigger-alert-instance", { detail: res.message })
      );
    }
  }
  onbuttomForgotPasswordClick() {
    window.dispatchEvent(new Event("trigger-verify"));
  }
}

export { LoginFormController };
