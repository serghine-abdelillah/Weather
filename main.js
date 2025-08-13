
const APIKEY = 'e7d5382aa3d6728a13e12f0585df06e1';
const degree = 23;
const wind = 40 ;
const humidity = 40;
let statusVal = '';
const searchBtn = document.querySelector('.search-box img');
const inputEle = document.querySelector('.search-box input');
const card = document.querySelector('.card-box');
searchBtn.addEventListener('click', function () {
    const cityName = inputEle.value;
    // card.innerHTML += `<div class="city"><img class="icon" src="Assets/pin.png" alt="location-icon"><p></p></div><div class="status">
    //         <!-- sunny cloudy  -->
    //         <img src="" alt="status"> 
    //         <p class="status-text"></p>
    //         <!-- degree -->
    //         <p class="degree"></p>
    //     </div>
    //     <div class="others">
    //         <div class="humidity">
    //             <!-- humidity -->
    //             <img class="icon" src="Assets/humidity.png" alt="humidity-icon">
    //             <p></p>
    //         </div>
    //         <div class="wind">
    //             <!-- wind -->
    //             <img class="icon" src="Assets/wind.png" alt="wind-icon">
    //             <p></p>
    //         </div>
    //     </div>`
    getWeather(cityName).then(apiData => {
        
        const cityEle = document.querySelector('.city p');
        const statusImg = document.querySelector('.status img');
        const statusTxt = document.querySelector('.status-text');
        const degreeEle = document.querySelector('.degree');
        const humidityEle = document.querySelector('.humidity p');
        const windEle = document.querySelector('.wind p');
        cityEle.innerText = apiData.name;
        degreeEle.innerText = Math.round(apiData.main.temp - 273.15 )+'°C';
        windEle.innerText = Math.round(apiData.wind.speed)+' km/h';
        humidityEle.innerText = apiData.main.humidity+'%';
        statusVal = apiData.weather[0].main;
        console.log('status', statusVal);
        switch (statusVal) {
            case 'Clouds':
                statusTxt.innerText = 'Cloudy';
                statusImg.setAttribute('src', 'Assets/cloudy.gif');
                break;
            case 'Clear':
                statusTxt.innerText = 'Sunny';
                statusImg.setAttribute('src', 'Assets/sunny.gif');
                break;
            case 'Mist' :
            statusTxt.innerText = 'Foggy';
            statusImg.setAttribute('src', 'Assets/foggy.gif');
            case 'Haze' :
            statusTxt.innerText = 'Foggy';
            statusImg.setAttribute('src', 'Assets/foggy.gif');
            
            break;
            case 'Drizzle':
                statusTxt.innerText = 'Drizzle';
                statusImg.setAttribute('src', 'Assets/drizzle.gif');
                
                break;
            case 'Rain':
                    statusTxt.innerText = 'Rainy';
                    statusImg.setAttribute('src', 'Assets/rainy.gif');    
                    break;
                    case 'Snow':
            statusTxt.innerText = 'Snowy';
            statusImg.setAttribute('src', 'Assets/snow.gif');
            
            break;
            case 'Thunderstorm':
            statusTxt.innerText = 'Stormy';
            statusImg.setAttribute('src', 'Assets/stormy.gif');
    
            break;
    
        default:
            break;
    }
    card.style.display = 'flex';
    }).catch(error => {
        console.error('Failed', error);
    })
    
    
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}` 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network ERROR');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error', error);
        throw Error;
    }
}
