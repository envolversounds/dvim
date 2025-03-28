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
    console.log("Player está pronto!");
}

// Funções para controlar o vídeo
var film = document.getElementById("film");
var playButton = document.getElementById("playButton");

film.addEventListener("click",function(){
    //Checa se o vídeo está tocando
    if(player.getPlayerState() === 1){ // Foi Pausado
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

    }else{ // Apertou Play
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

let cw = document.getElementById('cw1');
let kw = document.getElementById('kw1');

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

document.querySelectorAll(".accordion .accordion-collapse").forEach(panel => {
    //Ajusta a cor  do botão do Accordion após o painel ser colapsado
    panel.addEventListener('hidden.bs.collapse',function(){
        //Seleciona o respectivo botão
        const accButton = document.querySelector(`[data-bs-target="#${panel.id}"]`);
        if(accButton){
            accButton.blur();
            accButton.style.backgroundColor = '#f8eeff';
        }
    })
});

document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('blur', function () {
        this.style.backgroundColor = '#ecd1ff'; // Força o fundo roxo mesmo após perder o foco
    });
});

document.addEventListener("click", function(event) {
    // Seleciona todos os painéis abertos do accordion
    let accordions = document.querySelectorAll(".accordion-collapse.show");

    accordions.forEach(function(accordion) {
        // Verifica se o clique foi fora do accordion
        if (!accordion.closest(".accordion").contains(event.target)) {
            let bsCollapse = new bootstrap.Collapse(accordion, {
                toggle: true
            });
        }
    });
});