class Arena {
    constructor() {
        this.arena = document.getElementById("arena");
        this.jogadores = [];
        this.comidasArena = [];
        this.tempoDestroier = 3000;
        this.tempoAlimento = 12000;
        this.placar = {
            score: document.getElementById("score"),
            total_jogadores: document.getElementById("jogadores")
        }
        this.rangeArena = {
            x_min: 0,
            x_max: 440,
            y_min: 0,
            y_max: 470
        };

        this.start = false;
        this.current = {};
    }

    inicializaJogador() {
        // const { x, y, direcao } = this.getRandomAndDirection();
        const myArena = this;

        const {x, y, direcao} = { x: 220, y: 230, direcao: "cima"};
        const element_jogador = document.createElement("div");

        element_jogador.classList.add("jogador");

        element_jogador.style.top = y + "px";
        element_jogador.style.left = x + "px";

        const player = new Jogador({
            elemento: element_jogador,
            x,
            y,
            direcao,
            arena: myArena  
        });

        const arena = this.addJogadorArena( player );

        player.start();
        this.startArena();
    }

    startArena() {
        const that = this;
        if( !this.start ) {
            this.start = true;
            that.addAlimento();
        }
    }

    clearArena() {
        this.start = false;
        this.jogadores.forEach( jogador => jogador.remove() );
        this.comidasArena.forEach( alimento => alimento.remove() );
        this.placar.score.innerText = 0;
        this.placar.total_jogadores.innerText = 0;
    }

    addAlimento() {
        const alimento = document.createElement("div");
        alimento.classList.add("alimento");

        const x = this.randomNumber( this.rangeArena.x_min, this.rangeArena.x_max );
        const y = this.randomNumber( this.rangeArena.y_min, this.rangeArena.y_max);

        alimento.style.top = y + "px";
        alimento.style.left = x + "px";

        const tamanho_elemento_y = alimento.offsetHeight;
        const tamanho_elemento_x = alimento.offsetWidth;

        const colisao = {
            x_min: (x - tamanho_elemento_x),
            x_max: (x + tamanho_elemento_x),
            y_min: (y - tamanho_elemento_y),
            y_max: (y + tamanho_elemento_y)
        }

        alimento.setAttribute("colisao", JSON.stringify( colisao ));

        this.arena.appendChild( alimento );
        this.comidasArena.push( alimento );

        const index_array = this.comidasArena.length - 1;

        this.destruirAlimento( alimento, index_array );
    }

    destruirAlimento( alimento, posicaoArr ) {
        const total_remove = 1;
        setTimeout(() => {
            if( this.comidasArena[ posicaoArr ] ){
                alimento.remove();
                this.comidasArena.splice(posicaoArr, total_remove);
                this.addAlimento();
            }
        }, this.tempoDestroier);
    }

    addJogadorArena(jogador) {
        this.jogadores.push( jogador );
        this.arena.appendChild( jogador.cabeca );
        
        return this.arena;
    }

    getRandomAndDirection(){
        const minX = 0;
        const maxX = 440;

        const minY = 0;
        const maxY = 470;

        const x = this.randomNumber(minX, maxX);
        const y = this.randomNumber(minY, maxY);

        let direcao = "cima";

        if( y === 0 ) direcao = "baixo";
        
        return {
            direcao,
            x,
            y
        }
    }

    randomNumber(max, min){
        const number = Math.floor(Math.random() * (max - min)) + min;
        return number;
    }
}