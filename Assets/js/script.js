let searchBtnEl = document.querySelector("#search-button")
let searchInputEl = document.querySelector("#search-value")
let mainEl = document.querySelector("main")

let bpmApi = {
    url: "https://api.getsongbpm.com/tempo/",
    api_key: "d6d1431d02fa9c2f938ab2a8074ef686"
}

////START WEATHER FUNCTION////

//Weater Variables//
var weatherBtnEl = document.querySelector("#weather-button")
var weatherInputEl = document.querySelector("#weather-value")
var oneCallAPIKey = '9234bf92e34e7602754600bc3607c0dc';
var googleAPIKey = 'AIzaSyCfm9Ok_M-qzamFmAAcDIVFNVKKTjpRvis';
var searchCity;
var curentWeather;
var CityName;
var iconPath = "http://openweathermap.org/img/wn/";

//Start Get Lat Lon From City Name
function weatherBtnHandler() {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?key=' + googleAPIKey +'&address='+ weatherInputEl.value)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(cityData) {
                cityLocation = (cityData.results[0].geometry.location);
                console.log(cityLocation);
                getCityName();
                getWeather();
            });
        } else {
            alert("Something went wrong.  Please try again");
        }
    })
    .catch(function(error) {
        alert("Unable to complete City Search function")
    });
}
//End Get Lat Lon From City Name

 function getCityName () {
     cityNfo = weatherInputEl.value;
     cityInfo = cityNfo.split(",");
    cityName = cityInfo[0];
}

//Start Get Weather From Lat Lon
function getWeather(){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLocation.lat +'&lon=' + cityLocation.lng +'&units=imperial&excludeminutely,alerts&appid=' + oneCallAPIKey)
    .then(function(response){
        console.log(response);
        return response.json();
    }).then(function(weatherData){
        currentWeather = (weatherData.current);
        console.log(weatherData);
        console.log(currentWeather);
        populateWeather();
    })
}
function populateWeather() {
    var uvIn = currentWeather.uvi;
    var iconCurrent = currentWeather.weather[0].icon;
    var currentIcon = $(document.createElement('img'));
    currentIcon.attr('src', iconPath + iconCurrent + ".png");
    currentIcon.addClass("iconImage");

    $('#weatherTitle').text("Current " + cityName + " Weather");
    $('#weatherTitle').append(currentIcon);
    $('#temp').text("Temp: " + currentWeather.temp +String.fromCharCode(176) + "F");
    $('#wind').text("Wind: " + currentWeather.wind_speed + " MPH");
    $('#humidity').text("Humidity: " + currentWeather.humidity + "%");
    var uvEl = $('#currentUV');
    uvEl.text(uvIn);
    if(uvIn < 6) {
        uvEl.removeClass("uVModerate uVHigh").addClass("uVLow");
    } else if (uvIn <8){
        uvEl.removeClass("uVLow uVHigh").addClass("uVModerate")
        } else {
            uvEl.removeClass("uVLow uVModerate").addClass("uVHigh")
        }
}
//End Get Weather From Lat Lon




////END WEATHER FUNCTION////




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
    let numOfSongs = 12
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
weatherBtnEl.addEventListener("click", weatherBtnHandler)