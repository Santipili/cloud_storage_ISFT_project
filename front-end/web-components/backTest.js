import {createElement} from '../src/createHTMLElement.js';

class BackTest extends HTMLElement {
    constructor() {
      super();
  
     this.container = document.createElement('div');
     this.input = createElement('input');
     this.button = createElement('button', 'ENVIAR');


      this.appendChild(this.container);


    }
    connectedCallback() {
        this.container.appendChild(this.button); 
        
        
        this.button.addEventListener('click', ()=> {
            this.newDirectorie();
        })
    }

    async newDirectorie(){
        
        let data = {
            userDir : "/" + "userNameSanti",
            newDir : "/fotos/2010"
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
            alert(error.message);
        }

    }
  
    disconnectedCallback() {
      
    }


}
  
customElements.define("x-back-test", BackTest);

export { BackTest };
  