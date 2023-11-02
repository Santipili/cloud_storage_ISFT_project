const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");
const mysql = require("mysql");


class DataBaseHandler{
    constructor () {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'mydb',
          });
    };

    createResourceFile(resourcePath, resourceName)
    {
        this.connection.connect((err) => {
        if (err) {
          console.error('Error connecting to the database:', err);
          return;
        }
    
        const query = 'CALL `create_resource_file` (?, ?, ?)';
        const values = [resourcePath, resourceName, 47];  //El valor donde iria el size del archivo es un numero fijo para probar ahora el metodo y como se guarda en la DB
    
        this.connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error inserting the resource:', err);
          } else {
            console.log('Resource inserted successfully',results);
          }
    
          this.connection.end();
        });
      });
    };

    createResourceFolder(resourcePath, resourceName)
    {
        this.connection.connect((err) => {
        if (err) {
          console.error('Error connecting to the database:', err);
          return;
        }
    
        const query = 'CALL `create_resource_folder` (?, ?, ?)';
        const values = [resourcePath, resourceName, 0]; //El valor donde iria el size del archivo es un numero fijo para probar ahora el metodo y como se guarda en la DB
    
        this.connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error inserting the resource:', err);
          } else {
            console.log('Resource inserted successfully',results);
          }
    
          this.connection.end();
        });
      });
    };

    deleteResource(resourceName)
    {};

    renameResource(currentName, newName)
    {};

    moveResource(currentPath, newPath)
    {};

    copyResource(currentPath, newPath)
    {};

    
}