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
var pieces = ["0,0.png","0,1.png","0,2.png","0,3.png","0,4.png","0,5.png","0,6.png","1,1.png","1,2.png","1,3.png","1,4.png","1,5.png","1,6.png",
              "2,2.png","2,3.png","2,4.png", "2,5.png", "2,6.png", "3,3.png", "3,4.png", "3,5.png","3,6.png","4,4.png", "4,5.png", "4,6.png",
              "5,5.png", "5,6.png", "6,6.png"];

function iniciar() {
    function onRequest(request, response) {
        var sortida;
        var pathname = url.parse(request.url).pathname;
        var consulta = url.parse(request.url, true).query;
        var nombre = consulta['caracter'];

        if (nombre != undefined )
            nombre = nombre.charCodeAt(0);
        console.log("Petició per a  " + pathname + " rebuda.");

        if (pathname == '/home') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./home.html', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(sortida);
                response.end();
            });

        } else if (pathname == '/domino') {
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

        }else if (pathname == '/css/style.css') {
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

        } else if (pathname == '/js/properties.js') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./js/properties.js', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });

                response.write(sortida);
                response.end();
            });

        }  else if (pathname == '/js/scriptHome.js') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./js/scriptHome.js', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });

                response.write(sortida);
                response.end();
            });

        } else if (pathname == '/js/scriptJoc.js') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./js/scriptJoc.js', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });

                response.write(sortida);
                response.end();
            });

        } else if (pathname == '/imatge') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./img/'+consulta['img'], function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'image/png'
                });

                response.write(sortida);
                response.end();
            });
            /*for(var i = 0; i < pieces.length; i++){
                response.writeHead(200, {
                    "Content-Type": "img/png; charset=utf-8"
                });

                fs.readFile('./img/'+pieces, function (err, sortida) {
                    response.writeHead(200, {
                        'Content-Type': 'img/png'
                    });

                    response.write(sortida);
                    response.end();
                });
            }*/
        } else if (pathname == '/index') {
            response.writeHead(200, {
                "Content-Type": "application/json charset=utf-8"
            });

            var players = numPlayers.length;
            var id = consulta['idJugador'];
            if(id == 0 && players == 0){
                id = 1;
                numPlayers.push(1);
                //problemaaa
            }else if(id == 0 && players == 1){
                id = 2;
                numPlayers.push(2);
            }/*else if(id != 0){
                id = 999;
            }*/else {
                id;
            }
            console.log("El jugador "+id+" ha entrat. Num players "+numPlayers.length);

            var objecteInicial = {
                "id" : id,
                "jugadors": numPlayers
            };

            response.write(JSON.stringify(objecteInicial));
            response.end();
        } else if(pathname == '/start') {
            response.writeHead(200, {
                "Content-Type": "application/json charset=utf-8"
            });

            var objecteJoc = {
                "id" : id,
                "pieces":[
                    "0,0","0,1","0,2","0,3","0,4","0,5","0,6",
                    "1,1","1,2","1,3","1,4","1,5","1,6",
                    "2,2","2,3","2,4","2,5","2,6",
                    "3,3","3,4","3,5","3,6",
                    "4,4","4,5","4,6",
                    "5,5","5,6",
                    "6,6"
                ],
                "p00": {
                    "u": 0,
                    "d": 0
                },
                "p01": {
                    "u": 0,
                    "d": 1
                },
                "p02": {
                    "u": 0,
                    "d": 2
                },
                "p03": {
                    "u": 0,
                    "d": 3
                },
                "p04": {
                    "u": 0,
                    "d": 4
                },
                "p05": {
                    "u": 0,
                    "d": 5
                },
                "p06": {
                    "u": 0,
                    "d": 6
                },
                "p11": {
                    "u": 1,
                    "d": 1
                },
                "p12": {
                    "u": 1,
                    "d": 2
                },
                "p13": {
                    "u": 1,
                    "d": 3
                },
                "p14": {
                    "u": 1,
                    "d": 4
                },
                "p15": {
                    "u": 1,
                    "d": 5
                },
                "p16": {
                    "u": 1,
                    "d": 6
                },
                "p22": {
                    "u": 2,
                    "d": 2
                },
                "p23": {
                    "u": 2,
                    "d": 3
                },
                "p24": {
                    "u": 2,
                    "d": 4
                },
                "p25": {
                    "u": 2,
                    "d": 5
                },
                "p26": {
                    "u": 2,
                    "d": 6
                },
                "p33": {
                    "u": 3,
                    "d": 3
                },
                "p34": {
                    "u": 3,
                    "d": 4
                },
                "p35": {
                    "u": 3,
                    "d": 5
                },
                "p36": {
                    "u": 3,
                    "d": 6
                },
                "p44": {
                    "u": 4,
                    "d": 4
                },
                "p45": {
                    "u": 4,
                    "d": 5
                },
                "p46": {
                    "u": 4,
                    "d": 6
                },
                "p55": {
                    "u": 5,
                    "d": 5
                },
                "p56": {
                    "u": 5,
                    "d": 6
                },
                "p66": {
                    "u": 6,
                    "d": 6
                },
                "p24": {
                    "u": 2,
                    "d": 4
                }
                /*"pieces":[
                 "0:0","0:1","0:2","0:3","0:4","0:5","0:6",
                 "1:0","1:1","1:2","1:3","1:4","1:5","1:6",
                 "2:0","2:1","2:2","2:3","2:4","2:5","2:6",
                 "3:0","3:1","3:2","3:3","3:4","3:5","3:6",
                 "4:0","4:1","4:2","4:3","4:4","4:5","4:6",
                 "5:0","5:1","5:2","5:3","5:4","5:5","5:6",
                 "6:0","6:1","6:2","6:3","6:4","6:5","6:6"
                 ]*/
            };

            response.write(JSON.stringify(objecteJoc));
            response.end();
        } else if(pathname == '/playedPiece') {
            response.writeHead(200, {
                "Content-Type": "text/xml; charset=utf-8"
            });
            playedPieces.push(consulta['piece']);

            var objecteTirada = {
                "id" : id,
                "pieces":[
                    "0:0","0:1","0:2","0:3","0:4","0:5","0:6",
                    "1:1","1:2","1:3","1:4","1:5","1:6",
                    "2:2","2:3","2:4","2:5","2:6",
                    "3:3","3:4","3:5","3:6",
                    "4:4","4:5","4:6",
                    "5:5","5:6",
                    "6:6"
                ],
                "p00": {
                    "u": 0,
                    "d": 0
                },
                "p01": {
                    "u": 0,
                    "d": 1
                },
                "p02": {
                    "u": 0,
                    "d": 2
                },
                "p03": {
                    "u": 0,
                    "d": 3
                },
                "p04": {
                    "u": 0,
                    "d": 4
                },
                "p05": {
                    "u": 0,
                    "d": 5
                },
                "p06": {
                    "u": 0,
                    "d": 6
                },
                "p11": {
                    "u": 1,
                    "d": 1
                },
                "p12": {
                    "u": 1,
                    "d": 2
                },
                "p13": {
                    "u": 1,
                    "d": 3
                },
                "p14": {
                    "u": 1,
                    "d": 4
                },
                "p15": {
                    "u": 1,
                    "d": 5
                },
                "p16": {
                    "u": 1,
                    "d": 6
                },
                "p22": {
                    "u": 2,
                    "d": 2
                },
                "p23": {
                    "u": 2,
                    "d": 3
                },
                "p24": {
                    "u": 2,
                    "d": 4
                },
                "p25": {
                    "u": 2,
                    "d": 5
                },
                "p26": {
                    "u": 2,
                    "d": 6
                },
                "p33": {
                    "u": 3,
                    "d": 3
                },
                "p34": {
                    "u": 3,
                    "d": 4
                },
                "p35": {
                    "u": 3,
                    "d": 5
                },
                "p36": {
                    "u": 3,
                    "d": 6
                },
                "p44": {
                    "u": 4,
                    "d": 4
                },
                "p45": {
                    "u": 4,
                    "d": 5
                },
                "p46": {
                    "u": 4,
                    "d": 6
                },
                "p55": {
                    "u": 5,
                    "d": 5
                },
                "p56": {
                    "u": 5,
                    "d": 6
                },
                "p66": {
                    "u": 6,
                    "d": 6
                },
                "p24": {
                    "u": 2,
                    "d": 4
                }
                /*"pieces":[
                    "0:0","0:1","0:2","0:3","0:4","0:5","0:6",
                    "1:0","1:1","1:2","1:3","1:4","1:5","1:6",
                    "2:0","2:1","2:2","2:3","2:4","2:5","2:6",
                    "3:0","3:1","3:2","3:3","3:4","3:5","3:6",
                    "4:0","4:1","4:2","4:3","4:4","4:5","4:6",
                    "5:0","5:1","5:2","5:3","5:4","5:5","5:6",
                    "6:0","6:1","6:2","6:3","6:4","6:5","6:6"
                ]*/
            };

            console.log("El jugador "+consulta['idJugador']+" ha tirat "+consulta['piece']);
            response.write(JSON.stringify(objecteTirada));
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
    console.log("Servidor iniciat. http://localhost:8887/home");
}

exports.iniciar = iniciar;