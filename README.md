# Domino
Dominoes game using AJAX, Javascript(without JQuery), HTML and NodeJS

AJAX CALLS:
INDEX - in -> id | out -> id, jugadors
(per esperar a que siguin dos jugadors)
START - in -> id | out -> id, torn, pieces, pieces1,pieces2
(per repartir les peces i entrar a la pantalla del joc)
PLAYEDPIECE - in -> id, torn, costat, piece | out -> id, torn, tirada, correct, playedPieces
(per enviar la peça jugada)
UPDATETORN - in -> id | out -> id, torn, playedPieces
(comproba si es el torn del jugador)
