/*
Node Express Server (MEVN Stack)
Copyright (c) Jim Chen. All Rights Reserved.


NOTE: package.json should have "type": "module" to enable ES6 modules

*/
'use strict';

import { fileURLToPath } from 'url'
import Path, { dirname } from 'path'
import FileSystem from 'fs-extra'  // supports promses

const __filename = fileURLToPath( import.meta.url );
const __dirname = Path.resolve();

import Express from 'express'
import HTTP from 'http'
import CORS from 'cors'

// import Payload from '../server/Result'
// import LevelAPI from '../server/LevelAPI'

const PORT = 4000;

class Server {

    constructor( api, port = PORT ) {

        // this.api = (this.api === undefined ? api : Express());

        this.api = Express();
        this.router = Express.Router();
        this.port = port;
        this.title = "Angry Pigs";

        let corsOptions = {
            'allowedHeaders':['Content-Type'],
            'allowedMethods':['GET, POST, OPTIONS'],
            'origin':'*',
            'preflightContinue': true,
        }

        this.api
            .use( Express.json() )
            .use( Express.urlencoded({ extended: false }))
            .use( Express.static( Path.join(__dirname, '../AngryPig') ))
            .use( CORS( corsOptions )).options('/*', this.corsHandler )
            //.use('/api/level', LevelAPI );

        // GET index page
        this.api.get('/', ( request, response ) => {
            response.sendFile(`${Path.join(__dirname, './')}/index.html`, { title: this.title });
        });


        // Post response from server with address /get_level_list/JimChen
        this.api.post('/get_level_list/JimChen', ( request, response ) => {
            let result = {error: -1, payload:[]}
            
            let levels = FileSystem.readdirSync("./levels");
            
            // fetch('./levels/level_1.json')
            //     .then(result => result.json())
            //     .then(console.log)

            let testVar = request.body["payload[0][value]"]


            if(levels.length > 0)
            {
                for (let i = 0; i < levels.length; i++)
                {
                    result.payload[i] = {name: levels[i].replace(".json", ""), filename: levels[i]}
                }
            }

            const obj = {projectiles:testVar}
            const resString = JSON.stringify(obj);
            response.send(resString)
        });

        // GET the editor page
        this.api.get('/editor', ( request, response ) => {
            response.sendFile(`${Path.join(__dirname, './')}/editor/editor.html`, { title: this.title });
        });

        this.run();
    }

    corsHandler( request, response ) {
        // CORS Requests send and options request first, this is the response
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        response.sendStatus( 200 );
    }

    _dataPath( userid ) {
        return `${Path.dirname( FileSystem.realpathSync(__filename))}/data/${userid}`
    }

    _handleListenerError( error ) {
        /**
         * Listen on provided port, on all network interfaces.
        */
        if (error.syscall !== 'listen')
            throw error;

        // handle specific listen errors with friendly messages
        let bind = typeof this.port === `string`?`Pipe ${this.port}`:`Port ${this.port}`;
        switch (error.code) {

            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit (1 );
                break;

            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;

            default:
                throw error;
        }
    }

    _handleListenerListening() {

        let addr = this.listener.address();
        let bind = typeof addr === `string`?`pipe ${addr}`:`port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }

    run() {
        // Create HTTP server.
        this.api.set('port', this.port );

        this.listener = HTTP.createServer( this.api );
        this.listener.listen( PORT );

        this.listener.on('error', error => { this._handleListenerError( error ) });
        this.listener.on('listening', () => { this._handleListenerListening() });
    }
}

const server = new Server();
