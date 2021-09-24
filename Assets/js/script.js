let searchBtnEl = document.querySelector("#search-button")






//////////////: Global Variables Above ://////////////////////////


function searchBtnHandler() {
    fetch("https://api.getsongbpm.com/tempo/?api_key=d6d1431d02fa9c2f938ab2a8074ef686&bpm=130")
    .then(response => {return response.json()})
    .then(data => {
        console.log("Song Title: ", data.tempo[0].song_title)
        console.log("Artists Name: ", data.tempo[0].artist.name)
        console.log("Album cover art ref: ", data.tempo[0].artist.img)
        console.log("Genre: ", data.tempo[0].artist.genres[0])
        console.log("Tempo: ", data.tempo[0].tempo)
    })
    .catch(err => {console.error(err)});
}





//////////////: Event Listeners Below ://////////////////////////

searchBtnEl.addEventListener("click", searchBtnHandler)