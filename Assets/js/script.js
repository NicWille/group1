let searchBtnEl = document.querySelector("#search-button")
let searchInputEl = document.querySelector("#search-value")
let mainEl = document.querySelector("main")

let bpmApi = {
    url: "https://api.getsongbpm.com/tempo/",
    api_key: "d6d1431d02fa9c2f938ab2a8074ef686"
}




//////////////: Global Variables Above ://////////////////////////

function searchBtnHandler() {
    fetch(`${bpmApi.url}?api_key=${bpmApi.api_key}&bpm=${searchInputEl.value}`)
    .then(response => {return response.json()})
    .then(data => {
        // console.log("Song Title: ", data.tempo[0].song_title)
        // console.log("Artists Name: ", data.tempo[0].artist.name)
        // console.log("Album cover art ref: ", data.tempo[0].artist.img)
        // console.log("Genre: ", data.tempo[0].artist.genres[0])
        // console.log("Tempo: ", data.tempo[0].tempo)
        populateMainSection(data.tempo)
    })
    .catch(err => {console.error(err)});
}

function populateMainSection(songs) {

    let songList = ""
    let numOfSongs = 5
    for (let i=0; i<numOfSongs; i++) {

        let tempSection = 
            `<section>
            <img class="main-album-art" src="${songs[i].artist.img}">
            <div class="right-half">
                <div class="title-container">
                    <h3>${songs[i].song_title}</h3>
                    <p>+</p>
                </div>
                <ul>
                    <li>Artist: <span>${songs[i].artist.name}</span></li>
                    <li>BPM: <span>${songs[i].tempo}</span></li>
                    <li>Genres: <span>${songs[i].artist.genres}</span></li>
                </ul>
            </div>
            </section>`
        songList = songList + tempSection
    }
    mainEl.innerHTML = songList
}


//////////////: Event Listeners Below ://////////////////////////

searchBtnEl.addEventListener("click", searchBtnHandler)


//////////////// Gigi /////////////////
// Add real-time year
const date = dayjs(year.dataset.YYYY).format("YYYY");
const yearEl = document.querySelector("#year");
    yearEl.innerText = date;
    console.log(date);