import {createElement} from '../src/createHTMLElement.js';

class BackTest extends HTMLElement {
    constructor() {
        super();
        this.container = document.createElement('div');
        this.appendChild(this.container);
        this.buttonC = createElement('button', 'Crear');
        this.buttonD = createElement('button', 'Borrar');
    }
    connectedCallback() {
        this.container.appendChild(this.buttonC); 
        this.container.appendChild(this.buttonD); 
        this.buttonC.addEventListener('click', ()=> {
            this.newDirectorie();
        })
        this.buttonD.addEventListener('click', ()=> {
            this.deleteDirectorie();
        })
    }
    disconnectedCallback() {    

    }

    async newDirectorie(){
        let data = {
            userDir : "/" + "userNameSanti",
            newDir : "/0012assa0"
        }
        try {      
            let requestMetadata = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' 
                },
                body:JSON.stringify(data),
              };
            let result = await fetch ("http://localhost:3000/upload/newfolder", requestMetadata);    
            let jsonResult = await result.json();
            alert(jsonResult.message); 
            console.log(jsonResult);           
        } catch (error) {
            console.log("error");         
            alert(error);
        }
    }

    async deleteDirectorie(){
        let data = {
            userDir : "/" + "userNameSanti",
            newDir : "/0012assa0"
        }
        try {      
            let requestMetadata = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' 
                },
                body:JSON.stringify(data),
              };
            let result = await fetch ("http://localhost:3000/upload/deletefolder", requestMetadata);    
            let jsonResult = await result.json();
            alert(jsonResult.message); 
            console.log(jsonResult);           
        } catch (error) {
            console.log("error");         
            alert(error);
        }
    }
}
  
customElements.define("x-back-test", BackTest);
export { BackTest };
  