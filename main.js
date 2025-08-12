
const APIKEY = '';


const statusVal = 'Stormy';
const degree = 23;
const wind = 40 ;
const humidity = 40;
const searchBtn = document.querySelector('.search-box img');
const inputEle = document.querySelector('.search-box input');
const cityEle = document.querySelector('.city p');
const statusImg = document.querySelector('.status img');
const statusTxt = document.querySelector('.status-text');
const degreeEle = document.querySelector('.degree');
const humidityEle = document.querySelector('.humidity p');
const windEle = document.querySelector('.wind p');

searchBtn.addEventListener('click', function () {
    const cityName = inputEle.value;

    getWeather(cityName).then(apiData => {

        cityEle.innerText = apiData.name;
        statusTxt.innerText = apiData.weather[0].main;
        // degreeEle.innerText = degree+'°';
        windEle.innerText = Math.round(apiData.wind.speed)+' km/h';
        humidityEle.innerText = apiData.main.humidity+'%';
    })
    .catch(error => {
        console.error('Failed', error);
    })
    
    switch (statusVal) {
        case 'Cloudy':
            statusImg.setAttribute('src', 'Assets/cloudy.gif');
            break;
            case 'Sunny':
            statusImg.setAttribute('src', 'Assets/sunny.gif');
            
            break;
            case 'Foggy':
            statusImg.setAttribute('src', 'Assets/foggy.gif');
            
            break;
            case 'Rainy':
            statusImg.setAttribute('src', 'Assets/rainy.gif');
            
            break;
            case 'Snow':
            statusImg.setAttribute('src', 'Assets/snow.gif');
            
            break;
            case 'Stormy':
            statusImg.setAttribute('src', 'Assets/stormy.gif');
            
            break;
    
        default:
            break;
    }
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
