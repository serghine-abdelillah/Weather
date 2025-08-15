/* 
 TO DO : 
switch the status with an id 
add the realtime in the search for any city 
*/

const APIKEY = 'e7d5382aa3d6728a13e12f0585df06e1';
const degree = null;
const wind = null;
const humidity = null;
let statusVal = '';
const searchBtn = document.querySelector('.search-box img');
const inputEle = document.querySelector('.search-box input');
const card = document.querySelector('.card-box');
const cityEle = document.querySelector('.city p');
const statusImg = document.querySelector('.status img');
const statusTxt = document.querySelector('.status-text');
const degreeEle = document.querySelector('.degree');
const humidityEle = document.querySelector('.humidity p');
const windEle = document.querySelector('.wind p');
const searchBoxEle = document.querySelector('.search-box');
const titleEle = document.querySelector('.title');


inputEle.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        searchBtn.click();
    }
})

searchBtn.addEventListener('click', function () {
    const cityName = inputEle.value;
    getWeather(cityName).then(apiData => {
        cityEle.innerText = apiData.name + ', ' + apiData.sys.country;
        degreeEle.innerText = Math.round(apiData.main.temp - 273.15 )+'°C';
        windEle.innerText = Math.round(apiData.wind.speed)+' km/h';
        humidityEle.innerText = apiData.main.humidity+'%';
        statusVal = apiData.weather[0].id;
        console.log('status', statusVal);
        switch (true) {          // use code ids 
            case statusVal >= 801 && statusVal <= 804:
                statusTxt.innerText = 'Cloudy';
                statusImg.setAttribute('src', 'Assets/cloudy.gif');
                break;
            case statusVal == 800:
                statusTxt.innerText = 'Sunny';
                statusImg.setAttribute('src', 'Assets/sunny.gif');
                break;
            case statusVal >= 701 && statusVal <= 781 :
                statusTxt.innerText = 'Foggy';
                statusImg.setAttribute('src', 'Assets/foggy.gif');
            case statusVal >= 300 && statusVal <= 321:
                statusTxt.innerText = 'Drizzle';
                statusImg.setAttribute('src', 'Assets/drizzle.gif');
                break;
            case statusVal >= 500 && statusVal <= 531:
                    statusTxt.innerText = 'Rainy';
                    statusImg.setAttribute('src', 'Assets/rainy.gif');    
                break;
            case statusVal >= 600 && statusVal <= 622:
            statusTxt.innerText = 'Snowy';
            statusImg.setAttribute('src', 'Assets/snow.gif');
            
            break;
            case statusVal >= 200 && statusVal <= 232:
            statusTxt.innerText = 'Stormy';
            statusImg.setAttribute('src', 'Assets/stormy.gif');
            
            break;
            
            default:
                break;
    }
    card.style.display = 'flex';
    document.querySelectorAll('.icon').forEach(icon =>{
        icon.style.visibility = 'visible'
    })
    searchBoxEle.style.animation = 'fadeUpse 1s ease-in forwards';
    titleEle.style.animation = 'fadeUpse 1s ease-in forwards';
}).catch(error => {
    console.error('Failed', error);
    })
});


function hideConten(){
    document.querySelectorAll('.icon').forEach(icon =>{
        icon.style.visibility = 'hidden'
    })
    searchBoxEle.style.animation = 'fadeUpse 1s ease-in forwards';
    titleEle.style.animation = 'fadeUpse 1s ease-in forwards';
    cityEle.innerText = '';
    degreeEle.innerText = '';
    windEle.innerText = ''
    humidityEle.innerText = '';

}
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}` 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                card.style.display = 'flex';
                hideConten();
                statusImg.setAttribute('src', 'Assets/no-data.gif');
                statusTxt.innerText = 'Data Invalid';
                throw new Error('Data not found');
            } else if (response.status === 500) {
                hideConten();
                statusImg.setAttribute('src', 'Assets/no-data.gif');
                statusTxt.innerText = 'Server Error';
                throw new Error('server error');
            } else {   
                hideConten();
                card.style.display = 'flex';
                statusImg.setAttribute('src', 'Assets/no-data.gif');
                statusTxt.innerText = 'Network Error';
                throw new Error('Network ERROR');
            }
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error', error);
        throw Error;

    }
}
