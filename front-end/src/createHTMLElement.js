
function createElement(type, texto, attributes){
    let element = document.createElement(type);
    element.innerText = texto;

    for (let attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
          let attributeValue = attributes[attribute];
          element.setAttribute(attribute, attributeValue);
        }
      }

    return element;
}

export { createElement };