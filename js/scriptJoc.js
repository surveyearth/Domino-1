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
var pieces = [];
var playedPiece;
var id_interval;

window.onload = function () {
    var xhr;
    var dada;
    cridaAJAXJoc('/start?idJugador=' + id);
    /*id_interval = setInterval(function () {
        //amb aixo creem el JSON amb les dades del servidor
        cridaAJAXinicial('/index?idJugador=' + id);
    }, 3000);*/

};

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
        b.id = pieces[i];
        var srcImg ="/imatge?img="+pieces[i]+".png";
        var idImg = "p"+pieces[i];
        b.innerHTML = '<img src='+srcImg+' id='+idImg+' height="90" width="45">';
        //"<img src=img\\"+pieces[i]+">";
        b.className = "piece";
        b.onclick = function(e) {
            //onClickPiece(b.id);
            playedPiece = e.target.id;
            cridarAJAXjugada('/playedPiece?piece='+ playedPiece + "&idJugador=" + id);
        };
        document.getElementById('domino').appendChild(b);

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
            mostrarJoc();
        } else {
            console.log('problemes amb l\'AJAX');
        }
    }

}

function mostrarJoc2() {
    pieces = dada.pieces;
    for (var i=0;i<pieces.length;i++) {
        var b = document.createElement('button');
        b.id = pieces[i];
        b.innerText = pieces[i];
        b.className = "piece";
        b.onclick = function(e) {
            //onClickPiece(b.id);
            playedPiece = e.target.id;
            cridarAJAXjugada('/playedPiece?piece='+ playedPiece + "&idJugador=" + id);
        };
        document.getElementById('domino').appendChild(b);

        console.log(pieces[i]);
    }
}


    /*function dibuixarGrafic() {

        var data = new google.visualization.DataTable(dades);
        var options = {
            'title': 'cotització setmanal',
            'width': 800,
            'height': 400
        };

        var chart = new google.charts.Line(document.getElementById('grafic'));
        chart.draw(data, options);
    }
google.charts.load('current', { 'packages': ['line'] });
google.charts.setOnLoadCallback(dibuixarGrafic);*/
