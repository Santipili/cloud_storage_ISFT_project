class ViewPathSelector extends HTMLElement {
  constructor() {
    super();

    // Crear un shadow DOM
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Crear un título y una tabla en el shadow DOM
    this.mainContainer = document.createElement("div");
    this.mainContainer.classList.add("main-container");

    this.h1 = document.createElement("h1");
    this.h1.textContent = "Select Path";

    this.table = document.createElement("table");
    this.table.classList.add("table");
    this.thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");

    // Definir las columnas de la tabla
    this.columns = ["", "Type", "Name"];

    // Crear la fila de encabezado de la tabla
    this.headerRow = document.createElement("tr");
    this.columns.forEach((columnText) => {
      this.th = document.createElement("th");
      this.th.textContent = columnText;
      this.headerRow.appendChild(this.th);
    });
    this.thead.appendChild(this.headerRow);

    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);

    this.actionButtons = document.createElement("div");
    this.actionButtons.classList.add("actionButtons");

    this.backButton = document.createElement("button");
    this.backButton.classList.add("buttonBack");

    const buttonBox = document.createElement("div");
    buttonBox.classList.add("buttonBack-box");

    const buttonElem1 = document.createElement("span");
    buttonElem1.classList.add("buttonBack-elem");

    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("viewBox", "0 0 46 40");

    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute(
      "d",
      "M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9"
    );

    svg1.appendChild(path1);

    buttonElem1.appendChild(svg1);

    const buttonElem2 = document.createElement("span");
    buttonElem2.classList.add("buttonBack-elem");

    const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg2.setAttribute("viewBox", "0 0 46 40");

    const path2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path2.setAttribute(
      "d",
      "M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9"
    );

    svg2.appendChild(path2);
    buttonElem2.appendChild(svg2);

    buttonBox.appendChild(buttonElem1);
    buttonBox.appendChild(buttonElem2);

    this.backButton.appendChild(buttonBox);
    /* ----------------------------------------------------------------------------------  */

    this.actionButtons.appendChild(this.backButton);

    this.mainContainer.appendChild(this.h1);
    this.mainContainer.appendChild(this.actionButtons);
    this.mainContainer.appendChild(this.table);

    shadowRoot.appendChild(this.mainContainer);

    const style = document.createElement("style");
    style.textContent = `@import './web-components/x-fileSystem-Explorer/WCs/selectPath/style/style.css'`;

    shadowRoot.appendChild(style);
    /* ------------------------------------------------------ */

    this.selectPath = [];
    this.currentPath = "";
    this.basePath = "/";

    /* ------------------------------------------------------ */

    this.backButton.addEventListener("click", this.onButtnBack.bind(this));
  }

  connectedCallback() {}

  renderFileSystem(data) {
    this.tbody.innerHTML = "";
    this.selectPath = [];

    data.forEach((fileInfo) => {
      if (fileInfo.type === "folder") {
        const name = fileInfo.name;
        const type = fileInfo.type;

        const row = document.createElement("tr");
        const checkBox = document.createElement("td");
        const inputCheckbox = document.createElement("input");
        inputCheckbox.setAttribute("type", "checkbox");
        checkBox.appendChild(inputCheckbox);

        const typeCell = document.createElement("td");
        const nameCell = document.createElement("td");

        let icon =
          "./web-components/x-fileSystem-Explorer/style/icon-png/icon-folder.png";

        const iconImage = document.createElement("img");
        iconImage.src = icon;
        iconImage.style.width = "25px";
        iconImage.style.height = "25px";
        iconImage.style.marginRight = "auto";

        typeCell.appendChild(iconImage);

        const nameLink = document.createElement("a");
        nameLink.textContent = name;
        nameLink.setAttribute("x-type", type);
        nameLink.href = "#";

        inputCheckbox.setAttribute("x-type", type);

        const path = this.basePath + name;

        inputCheckbox.setAttribute("x-path", path);
        if (this.selectPath.includes(path)) {
          console.log(" fund");
          inputCheckbox.checked = true;
        }
        nameLink.setAttribute("x-path", path);

        nameCell.appendChild(nameLink);

        row.appendChild(checkBox);
        row.appendChild(typeCell);
        row.appendChild(nameCell);

        this.tbody.appendChild(row);

        inputCheckbox.addEventListener("change", (event) => {
          const filename = event.target.getAttribute("x-path");
          let path = this.currentPath + filename;
          if (!this.selectPath.includes(path) && this.selectPath.length < 1) {
            this.selectPath.push(path);
          } else {
            const index = this.selectPath.indexOf(path);
            if (index !== -1) {
              this.selectPath.splice(index, 1);
            }
          }
        });

        nameCell.style.cursor = "pointer";
        nameLink.addEventListener("click", (event) => {
          event.preventDefault();
          const path = event.target.getAttribute("x-path");
          this.addPathToCurrentPath(path);
          this.openFolder(this.currentPath + this.basePath);
        });
      }
    });
  }

  openFolder(Path) {
    this.dispatchEvent(new CustomEvent("click-folder", { detail: Path }));
  }

  getCurrentPath() {
    return this.currentPath;
  }

  addPathToCurrentPath(addedPath) {
    this.currentPath += addedPath;
  }

  __removeLastPath() {
    const segments = this.currentPath.split("/");
    if (segments.length > 1) {
      this.currentPath = segments.slice(0, segments.length - 1).join("/");
    }
  }

  onButtnBack() {
    this.__removeLastPath();

    this.openFolder(this.currentPath + this.basePath);
  }

  __refreshCurrentPath() {
    this.openFolder(this.currentPath + this.basePath);
  }

  getSelectedPath() {
    return this.selectPath[0];
  }
}

// Definir el web component
customElements.define("x-view-path-selector", ViewPathSelector);

export { ViewPathSelector };
