class VerifyController {
  constructor(viewReference) {
    this.view = viewReference;
  }
  enable() {
    this.view.exitBtn.addEventListener("click", this.onBtnExitclick);
  }

  disable() {
    this.view.exitBtn = null;
  }

  onBtnExitclick() {
    const event = new CustomEvent("exit-verify");
    dispatchEvent(event);
  }
}
