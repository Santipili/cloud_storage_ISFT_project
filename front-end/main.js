import { FileUploader } from "./web-components/x-File-Uploader/FileUploader.js";

import { ConstrollerDataTable } from "./web-components/x-dataTable/controller/controllerDataTable.js";
import { HTMLTextCellView } from "./web-components/x-dataTable/view/HTMLTextCellView.js";
import { HTMLEmailCellView } from "./web-components/x-dataTable/view/HTMLEmailCell.js";

function main() {
  let fileUploader = new FileUploader();

  let dt = new ConstrollerDataTable();

  dt.appendColumn({
    name: "name",
    sortable: true,
    type: HTMLTextCellView,
    title: "Name",
    reader: (x) => x.name,
  });
  dt.appendColumn({
    name: "email",
    sortable: true,
    type: HTMLEmailCellView,
    title: "Email",
    reader: (x) => x.email.toString().toLowerCase(),
  });
  dt.appendColumn({
    name: "birthday",
    sortable: true,
    type: HTMLTextCellView,
    title: "Birthday",
    reader: (x) => x.birthday,
  });
  dt.appendColumn({
    name: "salary",
    sortable: true,
    type: HTMLTextCellView,
    title: "Salary",
    reader: (x) => x.salary,
  });
  dt.appendColumn({
    name: "discount",
    sortable: true,
    type: HTMLTextCellView,
    title: "Discount",
    reader: (x) => "???",
  });

  document.body.appendChild(fileUploader);
  /* document.body.appendChild(dt); */
}

window.addEventListener("load", main);
