class FileUploaderView extends HTMLElement {
  constructor() {
    super();

    this.container = document.createElement("div");
    this.container.classList.add("container");

    this.header = document.createElement("div");
    this.header.classList.add("header");

    this.svgHeader = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.svgHeader.setAttribute("viewBox", "0 0 24 24");

    this.pathHeader = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.pathHeader.setAttribute(
      "d",
      "M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5"
    );
    this.pathHeader.setAttribute("stroke", "#000000");
    this.pathHeader.setAttribute("stroke-width", "1.5");
    this.pathHeader.setAttribute("stroke-linecap", "round");
    this.pathHeader.setAttribute("stroke-linejoin", "round");

    this.svgHeader.appendChild(this.pathHeader);

    this.pHeader = document.createElement("p");
    this.pHeader.textContent = "Browse File to upload!";

    this.header.appendChild(this.svgHeader);
    this.header.appendChild(this.pHeader);
    this.container.appendChild(this.header);

    this.label = document.createElement("label");
    this.label.setAttribute("for", "file");
    this.label.classList.add("footer");

    this.svgLabelStart = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.svgLabelStart.setAttribute("fill", "#000000");
    this.svgLabelStart.setAttribute("viewBox", "0 0 32 32");

    this.pathLabelStart = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.pathLabelStart.setAttribute("d", "M15.331 6H8.5v20h15V14.154h-8.169z");
    this.svgLabelStart.appendChild(this.pathLabelStart);

    this.label.appendChild(this.svgLabelStart);

    this.pLabel = document.createElement("p");
    this.pLabel.textContent = "Not selected file";
    this.label.appendChild(this.pLabel);

    this.svgLabelEnd = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    this.pathLabelEnd = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.pathLabelEnd.setAttribute("d", "M18.153 6h-.009v5.342H23.5v-.002z");
    this.svgLabelEnd.appendChild(this.pathLabelEnd);

    this.label.appendChild(this.svgLabelEnd);

    this.container.appendChild(this.label);

    this.input = document.createElement("input");
    this.input.setAttribute("id", "file");
    this.input.setAttribute("type", "file");
    this.container.appendChild(this.input);

    this.appendChild(this.container);
  }
}

customElements.define("file-uploader-view", FileUploaderView);

export { FileUploaderView };
