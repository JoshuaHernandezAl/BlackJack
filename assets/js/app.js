const blackJack =(()=>{//patron modulo
    'use strict'
    let deck=[];
    
    let  puntosJugadores=[];
    
    const tipos=['C','D','H','S'],
        especiales=['A','J','Q','K'];

    const btnPedir=document.getElementById('pedir'),
        btnStop=document.getElementById('stop'),
        btnNg=document.getElementById('ng'),
        smalls=document.querySelectorAll('small'),
        divCartasJugadores=document.querySelectorAll('.divCartas');

    const inicializarJuego = (numJugadores=2)=>{
        deck= crearDeck();
        puntosJugadores=[];
        for(let i=0; i<numJugadores; i++){
            puntosJugadores.push(0);
        }
        smalls.forEach(elemeto=>elemeto.innerText=0);
        divCartasJugadores.forEach(elemeto=>elemeto.innerHTML='');
        btnPedir.disabled = false;
        btnStop.disabled = false;
    };
    
    const crearDeck=()=>{
        deck=[];
        for(let i=2;i<=10;i++){
            for(let tipo of tipos){
                deck.push(i+tipo);
            }
        }
        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push(especial+tipo);
            }
        }
        
        return _.shuffle(deck);;
    };

    const pedirCarta=()=>{
        if(deck.length===0){
            throw "Deck vacio" ;
        }
        return deck.pop();
    }
    const valorCarta=(cartaEnvida)=>{
        const valores={
            '1':1,
            '2':2,
            '3':3,
            '4':4,
            '5':5,
            '6':6,
            '7':7,
            '8':8,
            '9':9,
            '10':10,
            'J':10,
            'Q':10,
            'K':10,
            'A':11,
        }
        const valor=valores[cartaEnvida.substring(0,cartaEnvida.length-1)];
        return valor*1;
    };

    const acumularPuntos=(carta,turno)=>{//inidica de que jugador es turno,donde el ultimo es el turno de la  pc
        puntosJugadores[turno]+=valorCarta(carta);
        smalls[turno].innerText=puntosJugadores[turno];
        return puntosJugadores[turno];
    };
    //creacion de cartas
    const crearCarta=(carta,turno)=>{
        const imgCarta= document.createElement('img');
        imgCarta.src="assets/cartas/"+carta+".png";
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    //turno PC
    const turnoPC=(puntosMinimos)=>{
        let puntosPC=0;
        do{
            const carta=pedirCarta();
            puntosPC=acumularPuntos(carta,puntosJugadores.length-1);
            crearCarta(carta,puntosJugadores.length-1);
            //seguridad extra
            if(puntosMinimos>21){
                break;
            }
            
        }while(puntosPC<puntosMinimos  && puntosMinimos<=21);
        ganador(puntosMinimos,puntosPC);
        
    }

    //ganador
    const ganador=(puntosMinimos,puntosPC)=>{
        setTimeout(function(){
            if(puntosMinimos===puntosPC){
                alert("Empate, nadie gana");
            }else if(puntosMinimos>21){
                alert("La PC gana");
            }else if(puntosPC>21){
                alert("El jugador gana");
            }else if(puntosMinimos<puntosPC){
                alert("La PC gana");
            }else if(puntosMinimos>puntosPC){
                alert("El jugador gana");
            }
        },200);
    };
    const desactivarBtns=()=>{
        btnPedir.disabled = true;
        btnStop.disabled = true;
    };

    btnPedir.addEventListener('click',()=>{
        const carta=pedirCarta();
        let puntosJ=acumularPuntos(carta,0);
        crearCarta(carta,0);
        if(puntosJ>21){
            desactivarBtns();
            turnoPC(puntosJ);
        }else if(puntosJ===21){
            desactivarBtns();
            turnoPC(puntosJ);
        }
    });
    btnStop.addEventListener('click',()=>{
        desactivarBtns();
        turnoPC(puntosJugadores[0]);
    });
    btnNg.addEventListener('click',()=>{
        inicializarJuego();
    });

    return {
        nuevoJuego:inicializarJuego
    };

})();