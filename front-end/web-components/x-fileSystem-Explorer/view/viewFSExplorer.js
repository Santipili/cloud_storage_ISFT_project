import { ModalWindowView } from "../WCs/modalwindow/x-modalWindow.js";
import { QuestionDialog } from "../WCs/questionDialog/x-questionDialog.js";
import { FileUploader } from "../WCs/x-File-Uploader/FileUploader.js";
import { PathSelector } from "../WCs/selectPath/x-PathSelector.js";

class ViewFSExplorer extends HTMLElement {
  constructor() {
    super();

    this.fileUploader = new FileUploader();

    // Crear un shadow DOM
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Crear un título y una tabla en el shadow DOM
    this.mainContainer = document.createElement("div");
    this.mainContainer.classList.add("main-container");

    this.h1 = document.createElement("h1");
    this.h1.textContent = "Explorador de Archivos";

    this.table = document.createElement("table");
    this.table.classList.add("table");
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
    this.customDownloadBtn = document.createElement("button");
    this.customDownloadBtn.classList.add("botao");

    const svgIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgIcon.setAttribute("width", "24px");
    svgIcon.setAttribute("height", "24px");
    svgIcon.setAttribute("viewBox", "0 0 24 24");
    svgIcon.setAttribute("fill", "none");
    svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgIcon.classList.add("mysvg");

    const pathIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathIcon.setAttribute("id", "Vector");
    pathIcon.setAttribute("d", "M6 21H18M12 3V17M12 17L17 12M12 17L7 12");
    pathIcon.setAttribute("stroke", "#f1f1f1");
    pathIcon.setAttribute("stroke-width", "2");
    pathIcon.setAttribute("stroke-linecap", "round");
    pathIcon.setAttribute("stroke-linejoin", "round");

    svgIcon.appendChild(pathIcon);

    const spanTexto = document.createElement("span");
    spanTexto.classList.add("texto");
    spanTexto.textContent = "Download";

    this.customDownloadBtn.appendChild(svgIcon);
    this.customDownloadBtn.appendChild(spanTexto);

    this.moveBtn = document.createElement("button");
    this.moveBtn.classList.add("move-btn");
    this.moveBtn.textContent = "Move";
    this.moveBtn.id = "moveBtn";

    this.renameBtn = document.createElement("button");
    this.renameBtn.classList.add("move-btn");
    this.renameBtn.textContent = "Rename";
    this.renameBtn.id = "renameBtn";

    this.deleteBtn = document.createElement("button");
    this.deleteBtn.classList.add("move-btn");
    this.deleteBtn.textContent = "Delete";
    this.deleteBtn.classList.add("deleteBtn");
    this.deleteBtn.id = "deleteBtn";

    this.newFolderBtn = document.createElement("button");
    this.newFolderBtn.classList.add("newFolder-buton");
    this.newFolderBtn.textContent = "New Folder";
    this.newFolderBtn.id = "newFolderBtn";
    /* ------------------------------------------------------------------------------------- */
    this.customUploadBtn = document.createElement("button");
    this.customUploadBtn.classList.add("cssbuttons-io-button");

    const svgUpload = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgUpload.setAttribute("viewBox", "0 0 640 512");
    svgUpload.setAttribute("fill", "white");
    svgUpload.setAttribute("height", "1em");

    const pathUpload = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathUpload.setAttribute(
      "d",
      "M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
    );

    svgUpload.appendChild(pathUpload);

    const spanUpload = document.createElement("span");
    spanUpload.textContent = "Upload";

    this.customUploadBtn.appendChild(svgUpload);
    this.customUploadBtn.appendChild(spanUpload);

    this.actionButtons.appendChild(this.backButton);
    this.actionButtons.appendChild(this.customDownloadBtn);
    this.actionButtons.appendChild(this.moveBtn);
    this.actionButtons.appendChild(this.renameBtn);
    this.actionButtons.appendChild(this.deleteBtn);
    this.actionButtons.appendChild(this.newFolderBtn);
    this.actionButtons.appendChild(this.customUploadBtn);

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
    this.customUploadBtn.addEventListener("click", this.uploadFile.bind(this));
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
    this.selectPath = [];

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
      if (this.selectPath.includes(path)) {
        console.log(" fund");
        inputCheckbox.checked = true;
      }
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

      if (this.selectPath.length <= 0) {
        this.__removeEventListeners();
      }
      inputCheckbox.addEventListener("change", (event) => {
        const filename = event.target.getAttribute("x-path");
        let path = this.currentPath + filename;
        if (!this.selectPath.includes(path)) {
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

  __removeLastPath() {
    const segments = this.currentPath.split("/");
    if (segments.length > 1) {
      this.currentPath = segments.slice(0, segments.length - 1).join("/");
    }
  }

  __keepAfterLastSlash(inputPath) {
    const segments = inputPath.split("/");
    if (segments.length > 1) {
      return segments[segments.length - 1];
    } else {
      return inputPath;
    }
  }

  onButtnBack() {
    this.__removeLastPath();

    this.openFolder(this.currentPath + this.basePath);
  }

  __refreshCurrentPath() {
    this.openFolder(this.currentPath + this.basePath);
  }

  async downloadSelected() {
    this.modal = new ModalWindowView();
    this.questionDialog = new QuestionDialog();
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
    this.modal = new ModalWindowView();
    const pathSelector = new PathSelector();
    this.questionDialog = new QuestionDialog(true, [pathSelector]);

    this.questionDialog.options = {
      questionText: "chose where to move",
      confirmText: "Confirm",
      cancelText: "Cancel",
    };
    this.modal.content = this.questionDialog;

    this.modal.open();

    const response = await this.questionDialog.response;

    if (response == true) {
      const selectedPathClipped = this.__keepAfterLastSlash(this.selectPath[0]);

      const destinationPath =
        pathSelector.view.getSelectedPath() + "/" + selectedPathClipped;

      const originPath = this.selectPath[0];

      this.dispatchEvent(
        new CustomEvent("click-move-button", {
          detail: { originPath, destinationPath },
        })
      );
      this.modal.close();
      this.__refreshCurrentPath();
    } else {
      this.modal.close();
    }
  }

  async renameSelected() {
    let input = document.createElement("input");

    if (this.selectPath.length == 1) {
      const modal = new ModalWindowView(true);

      this.questionDialog = new QuestionDialog(true, [input]);

      this.questionDialog.options = {
        titleText: "Alert",
        questionText: "Do you want to rename ?",
        confirmText: "Confirm",
        cancelText: "Cancel",
      };

      modal.content = this.questionDialog;
      modal.open();

      const response = await this.questionDialog.response;

      if (response == true) {
        const newName = this.currentPath + this.basePath + input.value;
        const oldName = this.selectPath[0];
        console.log(oldName);
        console.log(newName);
        this.dispatchEvent(
          new CustomEvent("click-rename-button", {
            detail: { oldName, newName },
          })
        );
        modal.close();
      } else {
        modal.close();
      }
    } else if (this.selectPath.length > 1) {
      const modal2 = new ModalWindowView();
      this.questionDialog = new QuestionDialog(false);

      this.questionDialog.options = {
        titleText: "Alert",
        questionText: "no se puede seleccionar varios elementos a renombrar",
      };
      modal2.content = this.questionDialog;
      modal2.open();
    }
  }

  async deleteSelected() {
    this.modal = new ModalWindowView();
    this.questionDialog = new QuestionDialog();
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
    this.__refreshCurrentPath();
  }

  async createFolder() {
    let input = document.createElement("input");
    this.modal = new ModalWindowView();
    this.questionDialog = new QuestionDialog(true, [input]);

    this.questionDialog.options = {
      titleText: "Create Folder",
      questionText: "Write the name of the folder",
      confirmText: "Confirm",
      cancelText: "Cancel",
    };

    this.modal.content = this.questionDialog;

    this.modal.open();
    const response = await this.questionDialog.response;

    if (response == true) {
      this.dispatchEvent(
        new CustomEvent("click-createFolder-button", {
          detail: this.currentPath + "/" + input.value,
        })
      );
      this.__refreshCurrentPath();
      this.modal.close();
    } else {
      this.modal.close();
    }
  }

  async uploadFile() {
    this.modal = new ModalWindowView();
    this.questionDialog = new QuestionDialog(false, [this.fileUploader]);

    this.modal.content = this.questionDialog;
    this.__refreshCurrentPath();
    this.modal.open();
  }

  __setEventListeners() {
    this.customDownloadBtn.addEventListener(
      "click",
      this.downloadSelectedHandler
    );
    this.moveBtn.addEventListener("click", this.moveSelectedHandler);
    this.renameBtn.addEventListener("click", this.renameSelectedHandler);
    this.deleteBtn.addEventListener("click", this.deleteSelectedHandler);
  }

  __removeEventListeners() {
    this.customDownloadBtn.removeEventListener(
      "click",
      this.downloadSelectedHandler
    );
    this.moveBtn.removeEventListener("click", this.moveSelectedHandler);
    this.renameBtn.removeEventListener("click", this.renameSelectedHandler);
    this.deleteBtn.removeEventListener("click", this.deleteSelectedHandler);
  }
}

// Definir el web component
customElements.define("x-fs-explorer", ViewFSExplorer);

export { ViewFSExplorer };
