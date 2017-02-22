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

window.onload = function () {
    var xhr;
    var dada;

    var id_interval = setInterval(function () {
        //amb aixo creem el JSON amb les dades del servidor
        cridaAJAXinicial('/index?idJugador=' + id);
    }, 30000);

};

//Crida AJAX que només s'executa al entrar a la pàgina
    function cridaAJAXinicial(url) {
        xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('problemes amb XHR');
            return false;
        }
        xhr.onreadystatechange = callbackAJAXinicial;
        xhr.open('POST', url, true); // el 3r paràmetre indica que és asíncron
        xhr.send(null);
    }
//Callback AJAX que només s'executa al entrar a la pàgina
    function callbackAJAXinicial() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                //dades = xhr.response;
                dada = JSON.parse(xhr.response);
                mostrarInici();
            } else {
                console.log('problemes amb l\'AJAX');
            }
        }

    }

/**
 * Method that creates the pieces
 */
function mostrarInici() {
    var jugadors = dada.jugadors;
    id = dada.id;
    if(jugadors.length < 2){
        document.getElementById("missatge").innerText = labels.missatgeinici_wait;
    } else if(jugadors.length == 2){
        document.getElementById("missatge").innerText = labels.missatgeinici_play;
        document.getElementById("btnJugar").attributes.removeNamedItem("hidden");
    }
}

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

function mostrarJoc() {
    pieces = dada.pieces;
    for (var i=0;i<pieces.length;i++) {
        var b = document.createElement('button');
        b.id = pieces[i];
        b.innerText = peces[i];
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
