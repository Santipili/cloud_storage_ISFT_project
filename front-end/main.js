import { FileUploader } from "./web-components/x-File-Uploader/FileUploader.js";

import { HTMLDataTable } from "./web-components/x-dataTable/controller/HTMLDataTable.js";
import { HTMLTextCell } from "./web-components/x-dataTable/view/HTMLTextCell.js";
import { HTMLEmailCell } from "./web-components/x-dataTable/view/HTMLEmailCell.js";

function main() {
  let fileUploader = new FileUploader();

  let dt = new HTMLDataTable();

  dt.appendColumn({
    name: "name",
    sortable: true,
    type: HTMLTextCell,
    title: "Name",
    reader: (x) => x.name,
  });
  dt.appendColumn({
    name: "email",
    sortable: true,
    type: HTMLEmailCell,
    title: "Email",
    reader: (x) => x.email.toString().toLowerCase(),
  });
  dt.appendColumn({
    name: "birthday",
    sortable: true,
    type: HTMLTextCell,
    title: "Birthday",
    reader: (x) => x.birthday,
  });
  dt.appendColumn({
    name: "salary",
    sortable: true,
    type: HTMLTextCell,
    title: "Salary",
    reader: (x) => x.salary,
  });
  dt.appendColumn({
    name: "discount",
    sortable: true,
    type: HTMLTextCell,
    title: "Discount",
    reader: (x) => "???",
  });

  document.body.appendChild(fileUploader);
  document.body.appendChild(dt);
}

window.addEventListener("load", main);
