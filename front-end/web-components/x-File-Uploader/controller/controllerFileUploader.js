class FileUploaderController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.button2.addEventListener("click", (e) => {
      e.preventDefault();
    });

    this.view.button3.addEventListener("click", (e) => {
      e.preventDefault();
      this.onbuttomForgotPasswordClick();
    });
  }

  disable() {
    this.view.btnSignUp = null;
    this.view.btnForgotPassw = null;
  }
}

export { FileUploaderController };
