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

film.addEventListener("click",function(){
    //Checa se o vídeo está tocando, 1 = Tocando
    if(player.getPlayerState() === 1){
        //Pausa o vídeo
        player.pauseVideo();

        //Mostra o texto "CONTINUAR ASSISTINDO"
        var keep_watching = document.getElementsByClassName("keep-watching");
        for (var i = 0; i < keep_watching.length; i++) {
            keep_watching[i].style.display = "block";
        }
    }else{ // Pausado
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

        //Toca o vídeo
        player.playVideo();
    }
});

function stopVideo() {
    player.stopVideo();
}