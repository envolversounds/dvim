// Carrega a API do YouTube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Variável para receber o vídeo do iFrame
var player;

// Função chamada quando a API estiver pronta
function onYouTubeIframeAPIReady() {
    player = new YT.Player('myPlayer', {
        events: {
        'onStateChange': onPlayerStateChange,
        'onReady': onPlayerReady
        }
    });
}

// Função chamada quando o vídeo estiver pronto
function onPlayerReady(event) {
    isReady = true;
}

if(isReady = true){
    console.log('O player está pronto!');
}

// Funções para controlar o vídeo através da película
var film = document.getElementById("film");
var myPlayer = document.getElementById("myPlayer");
var playButton = document.getElementById("playButton");

//Controla o vídeo ao tocar na película (ela não some, somente retiramos a foto de fundo e ela fica transparente)
film.addEventListener("click",function(){
    if (!isReady) return;

    if(player.getPlayerState() === 1 || player.getPlayerState() === 3){ // Foi Pausado (O vídeo estava tocando) - Checa se o vídeo estava tocando para pausá-lo
        //Pausa o vídeo
        player.pauseVideo();
        //Mostra o texto "CONTINUAR ASSISTINDO"
        var keep_watching = document.getElementsByClassName("keep-watching");
        for (var i = 0; i < keep_watching.length; i++) {
            keep_watching[i].style.display = "block";
        }
        //Mostra o botão play
        playButton.style.display = "block";
        //Adiciona a imagem de fundo novamente
        film.style.backgroundImage = "url('images/screen.png')"

    }else if(player.getPlayerState() === -1){
        player.cueVideoById({ videoId: 'l591-ALtxlg' });
        setTimeout(() => {
            player.playVideo();
        }, 100);
    }else{ // Apertou Play (O vídeo estava pausado)
        //Remove o texto "CONTINUAR ASSISTINDO"
        var keep_watching = document.getElementsByClassName("keep-watching");
        for (var i = 0; i < keep_watching.length; i++) {
            keep_watching[i].style.display = "none";
        }

        // Remove o texto "CLIQUE PARA ASSISTIR" se estiver visível
        var keep_watching = document.querySelectorAll(".click-watch");
        
        keep_watching.forEach(function(element) {
            if(window.getComputedStyle(element).display == "block"){
                element.style.display = "none";
            }
        });

        //Remove o botão play
        playButton.style.display = "none";
        //Remove a imagem de fundo
        film.style.backgroundImage = "none";
        //Torna a película invisível
        film.style.backgroundColor = "#00000000";
        //Toca o vídeo
        player.playVideo();
    }
});

let cw = document.getElementById('cw');
let kw = document.getElementById('kw');

film.addEventListener("mouseover",function(){
    cw.style.animation = 'growFont 0.1s linear forwards';
    playButton.style.animation = "grow 0.1s linear forwards";
});

film.addEventListener("mouseout",function(){
    cw.style.animation = 'shrinkFont 0.1s linear forwards';
    playButton.style.animation = "shrink 0.1s linear forwards"; 
});

//Quando o vídeo acabar, muda a imagem do film
function onPlayerStateChange(event) {
    debbuger.innerHTML = player.getPlayerState();
    if (event.data === YT.PlayerState.ENDED) {
        //Mostra a imagem
        film.style.backgroundImage = "url('images/screen.png')"
        //Mostra o botão play
        playButton.style.display = "block";
        //Mostra o texto "CLIQUE PARA ASSISTIR"
        var click_watch = document.getElementsByClassName("click-watch");
        for (var i = 0; i < click_watch.length; i++) {
            click_watch[i].style.display = "block";
        }
    }
}

/* Q&A */

//Faz a cor do botão do Accordion voltar para a cor original após o painel ser colapsado
document.querySelectorAll(".accordion .accordion-collapse").forEach(panel => {    
    panel.addEventListener('hidden.bs.collapse',function(){
        //Seleciona o respectivo botão
        const accButton = document.querySelector(`[data-bs-target="#${panel.id}"]`);
        if(accButton){
            accButton.blur();
            accButton.style.background = "linear-gradient(to right, #3d0067ff,#000d46ff)";
            accButton.style.boxShadow = "none";
        }
    })
});

// Força o fundo a permanecer com a cor de foco mesmo após perder o foco
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('blur', function () {
        this.style.setProperty("background", "linear-gradient(to right,rgb(105, 0, 176),rgb(0, 34, 186))");
        this.style.setProperty("box-shadow", "0px 4px 10px -5px #747077", "important");
    });
});

// Fecha todos os painéis do Accordion quando você clica fora da tela
document.addEventListener("click", function(event) {
    // Seleciona todos os painéis abertos do accordion
    let accordions = document.querySelectorAll(".accordion-collapse.show");

    accordions.forEach(function(accordion) {
        // Verifica se o clique foi fora do accordion
        if (!accordion.closest(".accordion").contains(event.target)) {
            //Fecha o accordion
            let bsCollapse = new bootstrap.Collapse(accordion, {
                toggle: true
            });
        }
    });
});