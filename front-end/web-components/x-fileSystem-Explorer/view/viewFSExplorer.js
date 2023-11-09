class ViewFSExplorer extends HTMLElement {
  constructor() {
    super();

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
    this.downloadBtn = document.createElement("button");
    this.downloadBtn.textContent = "Download";
    this.downloadBtn.id = "downloadBtn";
    this.downloadBtn.addEventListener("click", () => this.downloadSelected());

    this.moveBtn = document.createElement("button");
    this.moveBtn.textContent = "Move";
    this.moveBtn.id = "moveBtn";
    this.moveBtn.addEventListener("click", () => this.moveSelected());

    this.renameBtn = document.createElement("button");
    this.renameBtn.textContent = "Rename";
    this.renameBtn.id = "renameBtn";
    this.renameBtn.addEventListener("click", () => this.renameSelected());

    this.deleteBtn = document.createElement("button");
    this.deleteBtn.textContent = "Delete";
    this.deleteBtn.classList.add("deleteBtn");
    this.deleteBtn.id = "deleteBtn";
    this.deleteBtn.addEventListener("click", () => this.deleteSelected());

    this.newFolderBtn = document.createElement("button");
    this.newFolderBtn.textContent = "New Folder";
    this.newFolderBtn.id = "newFolderBtn";
    this.newFolderBtn.addEventListener("click", () => this.createFolder());

    this.uploadBtn = document.createElement("button");
    this.uploadBtn.textContent = "Upload file";
    this.uploadBtn.id = "uploadBtn";
    this.uploadBtn.addEventListener("click", () => this.uploadFile());

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

    /* ------------------------------------------------------ */

    this.fileSystemTree;

    this.selectPath = [];
  }

  connectedCallback() {}

  renderFileSystem(data, basePath = "/") {
    this.tbody.innerHTML = "";

    for (const [name, fileInfo] of Object.entries(data)) {
      if (fileInfo.type) {
        const row = document.createElement("tr");
        const checkBox = document.createElement("td");
        const inputCheckbox = document.createElement("input");
        inputCheckbox.setAttribute("type", "checkbox");
        checkBox.appendChild(inputCheckbox);

        const typeCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const sizeCell = document.createElement("td");
        const timeCell = document.createElement("td");
        const pathCell = document.createElement("td");

        const extension = name.split(".").pop();
        const icon =
          this.extensionIcons[extension] ||
          "./web-components/x-fileSystem-Explorer/style/icon-png/icon-folder.png";

        const iconImage = document.createElement("img");
        iconImage.src = icon;
        iconImage.style.width = "25px";
        iconImage.style.height = "25px";
        iconImage.style.marginRight = "auto";

        typeCell.appendChild(iconImage);

        const nameLink = document.createElement("a");
        nameLink.textContent = name;
        nameLink.setAttribute("x-type", fileInfo.type);
        nameLink.href = "#";

        inputCheckbox.setAttribute("x-type", fileInfo.type);

        const path = basePath + name + "/";

        inputCheckbox.setAttribute("x-path", path);

        inputCheckbox.addEventListener("change", (event) => {
          const path = event.target.getAttribute("x-path");
          this.selectPath.push(path);
          console.log(this.selectPath);
        });

        nameCell.appendChild(nameLink);
        sizeCell.textContent = fileInfo.size ? fileInfo.size + " KB" : "";
        timeCell.textContent = fileInfo.date || "";

        // ... (otros detalles como el enlace al directorio padre)

        row.appendChild(checkBox);
        row.appendChild(typeCell);
        row.appendChild(nameCell);
        row.appendChild(sizeCell);
        row.appendChild(timeCell);
        row.appendChild(pathCell);

        this.tbody.appendChild(row);
      }
    }

    this.tbody.querySelectorAll("tr").forEach((row) => {
      const name = row.querySelector("td:nth-child(3) a").textContent;
      if (data[name] && typeof data[name] === "object") {
        row
          .querySelector("td:nth-child(3) a")
          .addEventListener("click", (event) => {
            const attribute = event.target.getAttribute("x-type");

            if (attribute == "directory") {
              const path = event.target.getAttribute("x-path");
              event.preventDefault();

              this.openFolder(name, path);
            }
          });
      }
    });
  }

  openFolder(name, basePath) {
    if (
      this.fileSystemTree[name] &&
      typeof this.fileSystemTree[name] === "object"
    ) {
      this.fileSystemTree = this.fileSystemTree[name];
      this.renderFileSystem(this.fileSystemTree, basePath);
    }
  }

  __setFileSystemTree(FStree) {
    this.fileSystemTree = FStree;
  }

  downloadSelected() {
    // Implementa la lógica para descargar los elementos seleccionados
    alert("Descargando elementos seleccionados");
  }

  moveSelected() {
    // Implementa la lógica para mover los elementos seleccionados
    alert("Moviendo elementos seleccionados");
  }

  renameSelected() {
    // Implementa la lógica para renombrar los elementos seleccionados
    alert("Renombrando elementos seleccionados");
  }

  deleteSelected() {
    console.log(this.selectPath);
    this.dispatchEvent(
      new CustomEvent("click-delete-button", { detail: this.selectPath })
    );
    // Implementa la lógica para borrar los elementos seleccionados
    alert("Borrando elementos seleccionados");
  }

  showFiles() {
    // Implementa la lógica para mostrar los archivos
    alert("Mostrando archivos");
  }

  createFolder() {
    // Implementa la lógica para crear una nueva carpeta
    alert("Creando una nueva carpeta");
  }

  uploadFile() {
    // Implementa la lógica para subir un archivo
    alert("Subiendo un archivo");
  }
}

// Definir el web component
customElements.define("x-fs-explorer", ViewFSExplorer);

export { ViewFSExplorer };
