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
    this.columns = ["", "Type", "Name", "Size", "Time", "Path"];

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

    this.showFilesBtn = document.createElement("button");
    this.showFilesBtn.textContent = "Show files";
    this.showFilesBtn.id = "showFilesBtn";
    this.showFilesBtn.addEventListener("click", () => this.showFiles());

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
    this.actionButtons.appendChild(this.showFilesBtn);
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
    };
  }

  connectedCallback() {
    /* this.addTableRow(["File 1", "File 2", "File 3", "File 4", "File 5"]); */
  }

  addTableRow(files) {
    files.forEach((file) => {
      this.row = document.createElement("tr");
      this.checkBox = document.createElement("td");
      this.typeCell = document.createElement("td");
      this.nameCell = document.createElement("td");
      this.sizeCell = document.createElement("td");
      this.timeCell = document.createElement("td");
      this.Path = document.createElement("td");

      const extension = file.split(".").pop();

      const icon =
        this.extensionIcons[extension] ||
        "./web-components/x-fileSystem-Explorer/style/icon-png/icon-folder.png";

      const iconImage = document.createElement("img");
      iconImage.src = icon;
      iconImage.style.width = "25px";
      iconImage.style.height = "25px";
      iconImage.style.marginRight = "auto";

      this.typeCell.appendChild(iconImage);

      this.nameLink = document.createElement("a");
      this.nameLink.textContent = file;
      this.nameLink.href = "#";

      this.nameCell.appendChild(this.nameLink);

      this.sizeCell.textContent = "10 KB";

      this.timeCell.textContent = "10/10/2022";
      this.pathLink = document.createElement("a");
      this.pathLink.textContent = "../";
      this.pathLink.href = "#";

      this.Path.appendChild(this.pathLink);

      // Crear un elemento div con la clase "cntr"
      this.containerDiv = document.createElement("div");
      this.containerDiv.className = "cntr";

      const checkboxInput = document.createElement("input");
      checkboxInput.setAttribute("type", "checkbox");

      const labelElement = document.createElement("label");

      // Agregar el checkbox y la etiqueta al contenedor
      this.containerDiv.appendChild(checkboxInput);
      this.containerDiv.appendChild(labelElement);

      this.checkBox.appendChild(this.containerDiv);

      // Agregar las celdas a la fila
      this.row.appendChild(this.checkBox);
      this.row.appendChild(this.typeCell);
      this.row.appendChild(this.nameCell);
      this.row.appendChild(this.sizeCell);
      this.row.appendChild(this.timeCell);
      this.row.appendChild(this.Path);

      // Agregar la fila a la tabla
      this.tbody.appendChild(this.row);
    });
  }

  openFolder(name, event) {
    event.preventDefault();
    // Implementa la lógica para abrir la carpeta
    alert("Abriendo carpeta: " + name);
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
