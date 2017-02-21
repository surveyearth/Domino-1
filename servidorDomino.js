/*
 * Servidor HTTP que genera un JSON amb les dades simulades d'una cotització
 * @author  sergi.grau@fje.edu
 * @version 1.0
 * date 31.1.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 31.1.2017
 * - Servidor HTTP que enera un JSON amb les dades simulades d'una cotització
 *
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require('fs');
var numPlayers = [];
var playedPieces = [];

function iniciar() {
    function onRequest(request, response) {
        var sortida;
        var pathname = url.parse(request.url).pathname;
        var consulta = url.parse(request.url, true).query;
        var nombre = consulta['caracter'];

        if (nombre != undefined )
            nombre = nombre.charCodeAt(0);
        console.log("Petició per a  " + pathname + " rebuda.");

        if (pathname == '/index') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./domino.html', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(sortida);
                response.end();
            });

        }
        else if (pathname == '/css/style.css') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./css/style.css', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });

                response.write(sortida);
                response.end();
            });

        }
        else if (pathname == '/js/script.js') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./js/script.js', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });

                response.write(sortida);
                response.end();
            });

        }

        else if (pathname == '/index') {
            response.writeHead(200, {
                "Content-Type": "application/json charset=utf-8"
            });
            var players = numPlayers.length;
            //playedPieces.push(consulta['piece']);
            if( players == 0){
                id = 1;
                numPlayers.push(1);
            }else if(players == 1){
                id = 2;
                numPlayers.push(2);
            }else{
                id = 999;
            }
            console.log("El jugador "+id+" ha entrat. Num players "+numPlayers.length);

            var objecteInicial = {
                "id" : id,
                "jugadors": numPlayers
            }

            response.write(JSON.stringify(objecteInicial));
            response.end();
        } else if(pathname == '/start') {
            response.writeHead(200, {
                "Content-Type": "application/json charset=utf-8"
            });

            var objecteJoc = {
                "id" : id,
                "pieces":[
                    "0:0","0:1","0:2","0:3","0:4","0:5","0:6",
                    "1:0","1:1","1:2","1:3","1:4","1:5","1:6",
                    "2:0","2:1","2:2","2:3","2:4","2:5","2:6",
                    "3:0","3:1","3:2","3:3","3:4","3:5","3:6",
                    "4:0","4:1","4:2","4:3","4:4","4:5","4:6",
                    "5:0","5:1","5:2","5:3","5:4","5:5","5:6",
                    "6:0","6:1","6:2","6:3","6:4","6:5","6:6"
                ]
            };

            response.write(JSON.stringify(objecteInicial));
            response.end();
        } else if(pathname == '/playedPiece') {
            response.writeHead(200, {
                "Content-Type": "text/xml; charset=utf-8"
            });
            playedPieces.push(consulta['piece']);

            var objecteJoc = {
                "id" : id,
                "pieces":[
                    "0:0","0:1","0:2","0:3","0:4","0:5","0:6",
                    "1:0","1:1","1:2","1:3","1:4","1:5","1:6",
                    "2:0","2:1","2:2","2:3","2:4","2:5","2:6",
                    "3:0","3:1","3:2","3:3","3:4","3:5","3:6",
                    "4:0","4:1","4:2","4:3","4:4","4:5","4:6",
                    "5:0","5:1","5:2","5:3","5:4","5:5","5:6",
                    "6:0","6:1","6:2","6:3","6:4","6:5","6:6"
                ]
            };

            console.log("El jugador "+consulta['idJugador']+" ha tirat "+consulta['piece']);
            response.write(JSON.stringify(objecteJoc));
            response.end();

        } else {
            response.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8"
            });
            sortida = "404 NOT FOUND";
            response.write(sortida);
            response.end();
        }

    }


    http.createServer(onRequest).listen(8887);
    console.log("Servidor iniciat. http://localhost:8887/index");
}

exports.iniciar = iniciar;