class VerifyView extends HTMLElement {
  constructor() {
    super();

    const form = document.createElement("form");
    form.className = "otp-Form";

    const mainHeading = document.createElement("span");
    mainHeading.className = "mainHeading";
    mainHeading.textContent = "Enter OTP";

    const otpSubheading = document.createElement("p");
    otpSubheading.className = "otpSubheading";
    otpSubheading.textContent =
      "We have sent a verification code to your email";

    const inputContainer = document.createElement("div");
    inputContainer.className = "inputContainer";

    const input1 = document.createElement("input");

    input1.maxLength = 1;
    input1.type = "text";
    input1.className = "otp-input";
    input1.id = "otp-input1";

    const input2 = document.createElement("input");

    input2.maxLength = 1;
    input2.type = "text";
    input2.className = "otp-input";
    input2.id = "otp-input2";

    const input3 = document.createElement("input");

    input3.maxLength = 1;
    input3.type = "text";
    input3.className = "otp-input";
    input3.id = "otp-input3";

    const input4 = document.createElement("input");

    input4.maxLength = 1;
    input4.type = "text";
    input4.className = "otp-input";
    input4.id = "otp-input4";

    const verifyButton = document.createElement("button");
    verifyButton.className = "verifyButton";
    verifyButton.type = "submit";
    verifyButton.textContent = "Verify";

    const exitBtn = document.createElement("button");
    exitBtn.className = "exitBtn";
    exitBtn.textContent = "×";

    const resendNote = document.createElement("p");
    resendNote.className = "resendNote";

    const resendText = document.createTextNode("Didn't receive the code? ");
    const resendBtn = document.createElement("button");
    resendBtn.className = "resendBtn";
    resendBtn.textContent = "Resend Code";

    resendNote.appendChild(resendText);
    resendNote.appendChild(resendBtn);

    inputContainer.append(input1, input2, input3, input4);
    form.append(
      mainHeading,
      otpSubheading,
      inputContainer,
      verifyButton,
      exitBtn,
      resendNote
    );
    this.append(form);
    let style = document.createElement("style");
    style.innerText = `@import './web-components/x-verify/style/style.css'`;
    this.appendChild(style);
  }
}

customElements.define("verify-component", VerifyView);

export { VerifyView };
