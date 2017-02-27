/*
 * programa fa la gràfica d'una acció
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 23.01.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 23.01.2017
 * - programa inverteix una cadena utilitzant AJAX
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */
var id = 0;
var rightMove;
var pieces = [];
var playedPiece;
var id_interval;

/*window.onload = function () {
    var xhr;
    var dada;
    cridaAJAXJoc('/start?idJugador=' + id);
    //id_interval = setInterval(function () {
        //amb aixo creem el JSON amb les dades del servidor
        cridaAJAXinicial('/index?idJugador=' + id);
    //}, 3000);};*/



///////////////////////////////////////////////////////
//Crida AJAX que només s'executa al entrar al joc
function cridaAJAXJoc(url) {
    xhr = new XMLHttpRequest();

    if (!xhr) {
        alert('problemes amb XHR');
        return false;
    }
    xhr.onreadystatechange = callbackAJAXJoc;
    xhr.open('POST', url, true); // el 3r paràmetre indica que és asíncron
    xhr.send(null);
}
//Callback AJAX que només s'executa al entrar al joc
function callbackAJAXJoc() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            //dades = xhr.response;
            dada = JSON.parse(xhr.response);
            mostrarJoc();
        } else {
            console.log('problemes amb l\'AJAX');
        }
    }

}

/**
 * Method that shows game page
 */
function mostrarJoc() {
    var p=3;
    pieces = dada.pieces;
    for (var i=0;i<pieces.length;i++) {
        var b = document.createElement('button');
        b.id = "p"+pieces[i];
        b.draggable = true;
        var srcImg ="/imatge?img="+pieces[i]+".png";
        var idImg = pieces[i];
        b.innerHTML = '<img src='+srcImg+' id='+idImg+' height="90" width="45">';
        //"<img src=img\\"+pieces[i]+">";
        b.className = "piece";
        b.onclick = function(e) {
            //onClickPiece(b.id);
            playedPiece = e.target.id;
            cridarAJAXjugada('/playedPiece?piece='+ playedPiece + "&idJugador=" + id);
        };
        document.getElementById('domino').appendChild(b);
        document.getElementById('idDiv').innerText = "Piece: "+dada.id;
        console.log(pieces[i]);
    }
}

//////////////////////////////////////////////////////////////////////
//Crida AJAX que s'executa quan els jugadors tiren una fitxa
function cridarAJAXjugada(url) {
    xhr = new XMLHttpRequest();

    if (!xhr) {
        alert('problemes amb XHR');
        return false;
    }
    xhr.onreadystatechange = callbackAJAXjugada;
    xhr.open('POST', url, true); // el 3r paràmetre indica que és asíncron
    xhr.send(null);
}

//Callback AJAX que només s'executa al entrar a la pàgina
function callbackAJAXjugada() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            //dades = xhr.response;
            dada = JSON.parse(xhr.response);
            mostrarJugada();
        } else {
            console.log('problemes amb l\'AJAX');
        }
    }

}

function mostrarJugada() {
    piece = dada.tirada;
    id = dada.id;
    rightMove = dada.correct;
    document.getElementById('idDiv').innerText = "Jugador: "+id+" tirada: "+ piece +" correcte?: " + rightMove;


}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}