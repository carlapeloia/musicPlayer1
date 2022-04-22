//Array de músicas
let musicas = [
    {titulo:'Campfire', artista:'Telecasted', src:'songs/Campfire - Telecasted.mp3', img:'images/rock1.jpg'},
    {titulo:'Inspired', artista:'NEFFEX', src:'songs/Inspired (Clean) - NEFFEX.mp3', img:'images/rock2.jpg'},
    {titulo:'No Turning Back', artista:'NEFFEX', src:'songs/No Turning Back (Instrumental) - NEFFEX.mp3', img:'images/rock3.jpg'},
    {titulo:'Sailing', artista:'Telecasted', src:'songs/Sailing - Telecasted.mp3', img:'images/alegre1.jpg'},
    {titulo:'That is What It Takes', artista:'NEFFEX', src:'songs/Thats What It Takes (Instrumental) - NEFFEX.mp3', img:'images/alternativa1.jpg'}
]

//Armazenando os parâmetros da música
let musica = document.querySelector('audio')
let indexMusica = 0
let duracaoMusica = document.querySelector('.fim')
let imagem = document.querySelector('img')
let nomeMusica = document.querySelector('.descricao h2')
let nomeArtista = document.querySelector('.descricao i')

//Renderização inicial, para carregar as informações da primeira música do meu Array
renderizarMusica(indexMusica)

//Evento para tocar a música, ao clicar no botão play
document.querySelector('.botao-play').addEventListener('click', tocarMusica)
//Evento para parar de tocar a música, ao clicar no botão pause
document.querySelector('.botao-pause').addEventListener('click', pararMusica)
//Evento para atualizar a barra de progresso, conforme a música toca
musica.addEventListener('timeupdate', atualizarBarra)

//Evento para voltar para a música anterior
document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--
    if (indexMusica < 0) {
        indexMusica = musicas.length
    }
    document.querySelector('.botao-pause').style.display = 'none'
    document.querySelector('.botao-play').style.display = 'block'
    renderizarMusica(indexMusica)
})
//Evento para passar para a próxima música
document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++
    if (indexMusica > musicas.length) {
        indexMusica = 0
    }
    document.querySelector('.botao-pause').style.display = 'none'
    document.querySelector('.botao-play').style.display = 'block'
    renderizarMusica(indexMusica)
})

//Função para renderização da música (troca os dados da música, conforme música atual)
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src)
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent =  musicas[index].titulo
        nomeArtista.textContent = musicas[index].artista
        imagem.src = musicas[index].img
        duracaoMusica.textContent = segParaMin(Math.floor(musica.duration))
  
    })
}

//Função para tocar a música e alterar o botão play para pause
function tocarMusica() {
    musica.play()
    document.querySelector('.botao-pause').style.display = 'block'
    document.querySelector('.botao-play').style.display = 'none'
}

//Funcção para para de tocar a música e alterar o botão pause para play
function pararMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none'
    document.querySelector('.botao-play').style.display = 'block'
}

//Função para a barra ser preenchida, conforme ocorre o progresso da música
function atualizarBarra() {
    let barra = document.querySelector('progress')
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%'

    //Parte da função para atualização do tempo de música, conforme ocorre o progresso da música
    let tempoDecorrido = document.querySelector('.inicio')
    tempoDecorrido.textContent = segParaMin(Math.floor(musica.currentTime))
}

//Função para configurar a parte visual do tempo de música corrente no formato 0:00
function segParaMin(segundos) {
    let campoMinutos = Math.floor(segundos / 60)
    let campoSegundos = segundos % 60
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos
    }

    return campoMinutos+':'+campoSegundos
}

