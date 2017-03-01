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
var playedPieces = [];
var tornActual = 0;
var id_canviTorn;

function startActu(){
 setInterval(canviTorn(), 3000);
}

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
    id = dada.id;
    tornActual = dada.torn;

    if(id == 1){
        pieces = dada.pieces1;
    }else if(id ==2){
        pieces = dada.pieces2;
    }

    for (var i=0;i<pieces.length;i++) {
        var b = document.createElement('img');
        b.id = pieces[i];
        b.height = 90;
        b.width = 45;
        b.draggable = true;
        var srcImg ="/imatge?img="+pieces[i]+".png";
        b.src = srcImg;
        //"<img src=img\\"+pieces[i]+">";
        b.className = "piece";
        b.onclick = function(e) {
            //onClickPiece(b.id);
            //playedPiece = e.target.id;
            //cridarAJAXjugada('/playedPiece?piece='+ playedPiece + "&idJugador=" + id);
        };
        b.ondragstart = function(e) {
           drag(e);
        };
        document.getElementById('domino').appendChild(b);
        document.getElementById('idDiv').innerText = "Piece: "+id;
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
    document.getElementById('jugades').innerHTML = "";
    piece = dada.tirada;
    id = dada.id;
    rightMove = dada.correct;
    playedPieces = dada.playedPieces;
    tornActual = dada.torn;
    document.getElementById('idDiv').innerText = "Jugador: "+id+" tirada: "+ piece +" correcte?: " + rightMove + "pecesJugades: "+ playedPieces.toString();
        for(var i = 0; i < playedPieces.length ; i++){
            var b = document.createElement('img');
            b.id = playedPieces[i];
            b.height = 90;
            b.width = 45;
            b.draggable = false;
            var srcImg ="/imatge?img="+playedPieces[i]+".png";
            b.src = srcImg;
            b.className = "piece";
            b.title =  playedPieces[i]+": J"+id;
            document.getElementById('jugades').appendChild(b);
    }


}
///////////////////////////////////////////////////////////////////////////

//Crida AJAX que només s'executa al entrar a la pàgina
function cridaAJAXcanviTorn(url) {
    xhr = new XMLHttpRequest();

    if (!xhr) {
        alert('problemes amb XHR');
        return false;
    }
    xhr.onreadystatechange = callbackAJAXcanviTorn;
    xhr.open('POST', url, true); // el 3r paràmetre indica que és asíncron
    xhr.send(null);
}

//Callback AJAX que només s'executa al entrar a la pàgina
function callbackAJAXcanviTorn() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            //dades = xhr.response;
            dada = JSON.parse(xhr.response);
            canviTorn();
        } else {
            console.log('problemes amb l\'AJAX');
        }
    }
}

/**
 * Method that shows index page
 */
function canviTorn(a) {
    id = dada.id;
    tornActual = dada.torn;
    if(tornActual != id) {
        cridaAJAXcanviTorn('/playedPiece?idJugador=' + id +'&torn='+tornActual);
        //clearInterval(id_canviTorn);
    }else{
        a = true;
    }
}
///////////////////////////////////////////////////////////////////////////
/**
 * Métode que marca quina es la zona de "drop" de les peces
 * @param ev
 */
function allowDrop(ev) {

    if(tornActual == id){
        ev.preventDefault();
    }else {
        return false;
    }
}

/**
 * Métode que marca que haura de realitzar el objecte al ser arrossegat
 * @param ev
 */
function drag(ev) {
    ev.dataTransfer.setData("piece", ev.target.id);

}

/**
 * Métode que marca que haura de realitzar el objecte al ser deixat
 * @param ev
 */
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("piece");
    document.getElementById(data).draggable = false;
    var div = document.getElementById("piecesdDivEsq");
    div.appendChild(document.getElementById(data));
    playedPiece = data;
    cridarAJAXjugada('/playedPiece?idJugador=' + id +'&piece='+ playedPiece + '&costat='+ev.target.id + '&torn='+tornActual);
    //ev.target.appendChild(document.getElementById(data));
}