class FilterValidFiles {
   constructor() {}
 
   filterFiles(fileInput) {
     return [...fileInput].filter((file) => {
       
       return file instanceof File && file.type !== '';
     });
   }
 }
 
 export { FilterValidFiles };
 