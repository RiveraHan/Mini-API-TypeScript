

import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;

    connection: mysql.Connection;
    conectado: boolean = false;

    constructor(){

        console.log('Clase inicializada');

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });

        this.conectarDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function) {
        this.instance.connection.query(query, (err, results: Object[], fields ) => {

            if(err) {
                console.log(err);
                
                return callback(err);
            }

            results.length === 0 ? callback('El registro solicitado no existe') : callback(null, results);
            
        }); 
    }

    private conectarDB() {
        this.connection.connect((err: mysql.MysqlError) => {

            if(err) return console.log(err.message);

            this.conectado = true;

            console.log('Hola mundo');
            
        })
    }
}