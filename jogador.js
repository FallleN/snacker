class Jogador {
    constructor({ elemento, x, y, direcao, arena }) {
        this.score = 0;
        this.corpo = [ elemento ];
        // As posiçoes que será utilizada para a movimentação do jogador será (top = y, rigth = x  )
        this.posicao = {
            'x': x, 
            'y': y
        }
        this.passo = 10; //px por movimento
        this.velocidade = 80;
        this.direcao = direcao;
        this.cabeca = this.corpo[0];
        this.movimentacao_jogador = {};
        this.arena = arena;
    }

    start( ) {
        this.movimentacao();
        this.observableKeys();
    }

    movimentacao( ) {
        const that = this;
        this.movimentacao_jogador =  setInterval( function(){
            const direcao = that.direcao;

            that.mover( direcao );
        }, this.velocidade);
    }

    mover(direcao ) {
        let nova_posicao = 0;
        let check = false;
        switch( direcao ) {
            case "cima":
                nova_posicao = this.posicao.y - this.passo;
                check = this.checarColisao( direcao, nova_posicao );

                if( check ){
                    this.gameOver( check );
                    break;
                }

                this.posicao.y = nova_posicao;            
                this.setPositionStyleElement("top", nova_posicao);

                break;
            case "direita":
                nova_posicao = this.posicao.x + this.passo;
                check = this.checarColisao( direcao, nova_posicao );

                if( check ) {
                    this.gameOver( check );
                    break;
                }

                this.posicao.x = nova_posicao;
                this.setPositionStyleElement("left", nova_posicao);

                break;
            case "baixo":
                nova_posicao = this.posicao.y + this.passo;
                check = this.checarColisao( direcao, nova_posicao );

                if( check ) {
                    this.gameOver( check );
                    break;
                }

                this.posicao.y = nova_posicao;
                this.setPositionStyleElement( "top", nova_posicao );

                break;
            case "esquerda":
                nova_posicao = this.posicao.x - this.passo;
                check = this.checarColisao( direcao, nova_posicao );

                if( check ) {
                    this.gameOver( check );
                    break;
                }

                this.posicao.x = nova_posicao;
                this.setPositionStyleElement( "left", nova_posicao );

                break;
        }
    }

    checarAlimentacao() {
        const comidas = this.arena.comidasArena;

        comidas.forEach(comida => {
            const comida_y = Number( comida.style.top.replace("px", "") );
            const comida_x = Number( comida.style.left.replace("px", "") );

           
        });
    }

    gameOver( check ) {
        if( check ) {
            clearInterval( this.movimentacao_jogador );
            alert("Game Over");
        }
    }

    // checa se houve alguma colisão com as paredes da arena
    checarColisao( direcao, nova_posicao ){
        const limiteArena = {
            "esquerda": function(){
                const limite = 0;

                if( nova_posicao < limite ){
                    // GameOver
                    return true;
                }
                return false;
            },
            "cima": function() {
                const limite = 0;

                if( nova_posicao < limite ){
                    // GameOver
                    return true;
                }

                return false;
            },
            "direita": function(){
                const limite = 440;

                if( nova_posicao > limite ){
                    // GameOver
                    return true;
                }
                return false;
            },
            "baixo": function() {
                const limite = 470;

                if( nova_posicao > limite ){
                    // GameOver
                    return true;
                }
                return false;
            }
        }

        return limiteArena[ direcao ]();
    }

    setPositionStyleElement( position, newValue ){
        this.cabeca.style[ position ] = newValue + "px";
    }


    observableKeys() {
        const telcado = document.addEventListener("keypress", teclasJogador.bind(this));

        function teclasJogador(event) {
            const key = event.key;

            switch(key){
                case 'a':
                    if( this.direcao != "esquerda" ) this.direcao = "esquerda"
                    break;
                case 'w':
                    if( this.direcao != "cima" ) this.direcao = "cima"
                    break;
                case 'd':
                    if( this.direcao != "direita" ) this.direcao = "direita"
                    break;
                case 's':
                    if( this.direcao != "baixo" ) this.direcao = "baixo"
                    break;
            }
        }
    }




}