import { ModalWindowView } from "../WCs/modalwindow/x-modalWindow.js";
import { QuestionDialog } from "../WCs/questionDialog/x-questionDialog.js";

class ViewFSExplorer extends HTMLElement {
  constructor() {
    super();

    this.modal = new ModalWindowView();
    this.questionDialog = new QuestionDialog();

    this.questionDialog.options = {};

    // Crear un shadow DOM
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Crear un título y una tabla en el shadow DOM
    this.mainContainer = document.createElement("div");
    this.mainContainer.classList.add("main-container");

    this.h1 = document.createElement("h1");
    this.h1.textContent = "Explorador de Archivos";

    this.table = document.createElement("table");
    this.thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");

    // Definir las columnas de la tabla
    this.columns = ["", "Type", "Name", "Size", "Date"];

    // Crear la fila de encabezado de la tabla
    this.headerRow = document.createElement("tr");
    this.columns.forEach((columnText) => {
      this.th = document.createElement("th");
      this.th.textContent = columnText;
      this.headerRow.appendChild(this.th);
    });
    this.thead.appendChild(this.headerRow);

    // Agregar la tabla al shadow DOM
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);

    // Botones para realizar acciones
    this.actionButtons = document.createElement("div");
    this.actionButtons.classList.add("actionButtons");

    this.backButton = document.createElement("button");
    this.backButton.classList.add("buttonBack");

    // Crea el elemento contenedor div
    const buttonBox = document.createElement("div");
    buttonBox.classList.add("buttonBack-box");

    // Primer elemento span con el primer svg
    const buttonElem1 = document.createElement("span");
    buttonElem1.classList.add("buttonBack-elem");

    // Crea el primer elemento `svg`
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("viewBox", "0 0 46 40");

    // Crea el primer elemento `path` y establece sus atributos
    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute(
      "d",
      "M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9"
    );

    // Agrega el elemento `path` al primer `svg`
    svg1.appendChild(path1);

    // Agrega el primer `svg` al primer elemento span
    buttonElem1.appendChild(svg1);

    // Segundo elemento span con el segundo svg (repite el proceso similar al primero)
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

    // Agrega ambos elementos span al elemento contenedor div
    buttonBox.appendChild(buttonElem1);
    buttonBox.appendChild(buttonElem2);

    // Agrega el elemento contenedor div al botón
    this.backButton.appendChild(buttonBox);

    this.downloadBtn = document.createElement("button");
    this.downloadBtn.textContent = "Download";
    this.downloadBtn.id = "downloadBtn";

    this.moveBtn = document.createElement("button");
    this.moveBtn.textContent = "Move";
    this.moveBtn.id = "moveBtn";

    this.renameBtn = document.createElement("button");
    this.renameBtn.textContent = "Rename";
    this.renameBtn.id = "renameBtn";

    this.deleteBtn = document.createElement("button");
    this.deleteBtn.textContent = "Delete";
    this.deleteBtn.classList.add("deleteBtn");
    this.deleteBtn.id = "deleteBtn";

    this.newFolderBtn = document.createElement("button");
    this.newFolderBtn.textContent = "New Folder";
    this.newFolderBtn.id = "newFolderBtn";

    this.uploadBtn = document.createElement("button");
    this.uploadBtn.textContent = "Upload file";
    this.uploadBtn.id = "uploadBtn";

    this.actionButtons.appendChild(this.backButton);
    this.actionButtons.appendChild(this.downloadBtn);
    this.actionButtons.appendChild(this.moveBtn);
    this.actionButtons.appendChild(this.renameBtn);
    this.actionButtons.appendChild(this.deleteBtn);
    this.actionButtons.appendChild(this.newFolderBtn);
    this.actionButtons.appendChild(this.uploadBtn);

    this.mainContainer.appendChild(this.h1);
    this.mainContainer.appendChild(this.actionButtons);
    this.mainContainer.appendChild(this.table);

    shadowRoot.appendChild(this.mainContainer);

    const style = document.createElement("style");
    style.textContent = `@import './web-components/x-fileSystem-Explorer/style/style.css'`;

    shadowRoot.appendChild(style);

    /* --------------------------------------------------- */

    this.extensionIcons = {
      default:
        "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-file-50.png",
      txt: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-txt-50.png",
      doc: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-doc-48.png",
      jpg: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-jpg-48.png",
      json: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-curly-brackets-50.png",
      js: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-js-48.png",
      pdf: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-pdf-60.png",
      css: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-css-48.png",
      html: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-html-48.png",
      py: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-python-48.png",
      jpeg: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-jpeg-60.png",
      rtf: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-microsoft-word-48.png",
      png: "./web-components/x-fileSystem-Explorer/style/icon-png/icons8-png-64.png",
    };

    this.basePath = "/";
    /* ------------------------------------------------------ */

    this.selectPath = [];

    /* ------------------------------------------------------ */

    this.currentPath = "";

    /* ------------------------------------------------------ */

    this.backButton.addEventListener("click", this.onButtnBack.bind(this));
    this.uploadBtn.addEventListener("click", this.uploadFile.bind(this));
    this.newFolderBtn.addEventListener("click", this.createFolder.bind(this));

    /* ------------------------------------------------------ */
    this.downloadSelectedHandler = this.downloadSelected.bind(this);
    this.moveSelectedHandler = this.moveSelected.bind(this);
    this.renameSelectedHandler = this.renameSelected.bind(this);
    this.deleteSelectedHandler = this.deleteSelected.bind(this);

    /* ------------------------------------------------------ */
  }

  connectedCallback() {}

  renderFileSystem(data) {
    this.tbody.innerHTML = "";

    data.forEach((fileInfo) => {
      const name = fileInfo.name;
      const type = fileInfo.type;

      const row = document.createElement("tr");
      const checkBox = document.createElement("td");
      const inputCheckbox = document.createElement("input");
      inputCheckbox.setAttribute("type", "checkbox");
      checkBox.appendChild(inputCheckbox);

      const typeCell = document.createElement("td");
      const nameCell = document.createElement("td");
      const sizeCell = document.createElement("td");
      const timeCell = document.createElement("td");

      let icon;

      if (fileInfo.type === "folder") {
        icon =
          "./web-components/x-fileSystem-Explorer/style/icon-png/icon-folder.png";
      } else {
        const extension = name.split(".").pop();
        icon = this.extensionIcons[extension] || this.extensionIcons.default;
      }

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
      nameLink.setAttribute("x-path", path);

      nameCell.appendChild(nameLink);
      sizeCell.textContent = fileInfo.size ? fileInfo.size + " KB" : "";
      timeCell.textContent = fileInfo.date || "";

      row.appendChild(checkBox);
      row.appendChild(typeCell);
      row.appendChild(nameCell);
      row.appendChild(sizeCell);
      row.appendChild(timeCell);

      this.tbody.appendChild(row);

      inputCheckbox.addEventListener("change", (event) => {
        const filename = event.target.getAttribute("x-path");
        let path = this.currentPath + filename;
        if (event.target.checked) {
          this.selectPath.push(path);
        } else {
          const index = this.selectPath.indexOf(path);
          if (index !== -1) {
            this.selectPath.splice(index, 1);
          }
        }

        if (this.selectPath.length > 0) {
          this.__setEventListeners();
        } else {
          this.__removeEventListeners();
        }
      });

      if (fileInfo.type == "folder") {
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

  removeLastPath() {
    const segments = this.currentPath.split("/");
    if (segments.length > 1) {
      this.currentPath = segments.slice(0, segments.length - 1).join("/");
    }
  }

  onButtnBack() {
    this.removeLastPath();

    this.openFolder(this.currentPath + this.basePath);
  }

  async downloadSelected() {
    this.questionDialog.options = {
      titleText: "Alert",
      questionText: "Do you want to download  files?",
      confirmText: "Confirm",
      cancelText: "Cancel",
    };
    this.modal.content = this.questionDialog;

    this.modal.open();
    const response = await this.questionDialog.response;

    if (response == true) {
      this.dispatchEvent(
        new CustomEvent("click-download-button", { detail: this.selectPath })
      );
      this.modal.close();
    } else {
      this.modal.close();
    }
  }

  async moveSelected() {
    this.questionDialog.options = {
      titleText: "Alert",
      questionText: "Do you want to move these files?",
      confirmText: "Confirm",
      cancelText: "Cancel",
    };
    this.modal.content = this.questionDialog;

    this.modal.open();
    const response = await this.questionDialog.response;

    if (response == true) {
      this.dispatchEvent(
        new CustomEvent("click-move-button", { detail: this.selectPath })
      );
      this.modal.close();
    } else {
      this.modal.close();
    }
  }

  async renameSelected() {
    this.questionDialog.options = {
      titleText: "Alert",
      questionText: "Do you want to rename ?",
      confirmText: "Confirm",
      cancelText: "Cancel",
    };
    this.modal.content = this.questionDialog;

    this.modal.open();
    const response = await this.questionDialog.response;

    if (response == true) {
      this.dispatchEvent(
        new CustomEvent("click-rename-button", { detail: this.selectPath })
      );
      this.modal.close();
    } else {
      this.modal.close();
    }
  }

  async deleteSelected() {
    this.questionDialog.options = {
      titleText: "Alert",
      questionText: "Do you want to delete these files?",
      confirmText: "Confirm",
      cancelText: "Cancel",
    };
    this.modal.content = this.questionDialog;

    this.modal.open();
    const response = await this.questionDialog.response;

    if (response == true) {
      this.dispatchEvent(
        new CustomEvent("click-delete-button", { detail: this.selectPath })
      );
      this.modal.close();
    } else {
      this.modal.close();
    }
  }

  async createFolder() {
    this.questionDialog.options = {
      titleText: "Alert",
      questionText: "Do you want to crete a folder?",
      confirmText: "Confirm",
      cancelText: "Cancel",
    };
    this.modal.content = this.questionDialog;

    this.modal.open();
    const response = await this.questionDialog.response;

    if (response == true) {
      this.dispatchEvent(
        new CustomEvent("click-create-button", { detail: this.selectPath })
      );
      this.modal.close();
    } else {
      this.modal.close();
    }
  }

  async uploadFile() {
    this.dispatchEvent(new CustomEvent("click-upload-button"));
  }

  __setEventListeners() {
    this.downloadBtn.addEventListener("click", this.downloadSelectedHandler);
    this.moveBtn.addEventListener("click", this.moveSelectedHandler);
    this.renameBtn.addEventListener("click", this.renameSelectedHandler);
    this.deleteBtn.addEventListener("click", this.deleteSelectedHandler);
  }

  __removeEventListeners() {
    console.log("removeEventListeners");
    this.downloadBtn.removeEventListener("click", this.downloadSelectedHandler);
    this.moveBtn.removeEventListener("click", this.moveSelectedHandler);
    this.renameBtn.removeEventListener("click", this.renameSelectedHandler);
    this.deleteBtn.removeEventListener("click", this.deleteSelectedHandler);
  }
}

// Definir el web component
customElements.define("x-fs-explorer", ViewFSExplorer);

export { ViewFSExplorer };
