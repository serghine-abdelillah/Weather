/* 
 TO DO : 
    Add keyboard navigation
    Make a revision for all the project 
*/

const APIKEY = 'e7d5382aa3d6728a13e12f0585df06e1'; // Just Free and public key 
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
const suggestions = document.getElementById('suggestions');


document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        suggestions.innerHTML = '';
        searchBtn.click();
    }
})

searchBtn.addEventListener('click', function () {
    if (!navigator.onLine) {
        suggestions.innerHTML = '';
            hideConten();
            card.style.display = 'flex';
            statusImg.setAttribute('src', 'Assets/no-data.gif');
            statusTxt.innerText = 'Network Error';
    }
    suggestions.innerHTML = '';
    searchBoxEle.style.opacity = 0.1;
    const cityName = inputEle.value;
    getWeather(cityName).then(apiData => {
        cityEle.innerText = apiData.name + ', ' + apiData.sys.country;
        degreeEle.innerText = Math.round(apiData.main.temp - 273.15 )+'°C';
        windEle.innerText = Math.round(apiData.wind.speed)+' km/h';
        humidityEle.innerText = apiData.main.humidity+'%';
        statusVal = apiData.weather[0].id;
        console.log('status', statusVal);
        switch (true) {          // use code ids 
            case (statusVal >= 801 && statusVal <= 804):
                statusTxt.innerText = 'Cloudy';
                statusImg.setAttribute('src', 'Assets/cloudy.gif');
                break;
            case (statusVal == 800):
                statusTxt.innerText = 'Sunny';
                statusImg.setAttribute('src', 'Assets/sunny.gif');
                break;
            case (statusVal >= 701 && statusVal <= 781):
                statusTxt.innerText = 'Foggy';
                statusImg.setAttribute('src', 'Assets/foggy.gif');
                break;
            case (statusVal >= 300 && statusVal <= 321):
                statusTxt.innerText = 'Drizzle';
                statusImg.setAttribute('src', 'Assets/drizzle.gif');
                break;
            case (statusVal >= 500 && statusVal <= 531):
                statusTxt.innerText = 'Rainy';
                statusImg.setAttribute('src', 'Assets/rainy.gif');    
                break;
            case (statusVal >= 600 && statusVal <= 622):
                statusTxt.innerText = 'Snowy';
                statusImg.setAttribute('src', 'Assets/snow.gif');
                break;
                case (statusVal >= 200 && statusVal <= 232):
                statusTxt.innerText = 'Stormy';
                statusImg.setAttribute('src', 'Assets/stormy.gif');
            break;
            
            default:
                break;
            }
            searchBoxEle.style.opacity = 1;
            card.style.display = 'flex';
            suggestions.innerHTML = '';
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
     suggestions.style.zIndex = -1;
     suggestions.innerHTML = '';

}

inputEle.addEventListener('input', ()=>{
    const query = inputEle.value.toLowerCase();
    suggestions.innerHTML = '';
    if (query.length < 2) {
        suggestions.innerHTML = '';
        return
    }
    
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${APIKEY}`)
    .then(res => res.json())
    .then(data => {
        data.forEach(city => {
            const li = document.createElement('li');
            suggestions.style.display = 'block'
            console.log('query :', city)
            li.textContent = `${city.name}, ${city.country}`;
            li.onclick = () => {
                inputEle.value = `${city.name}, ${city.country}`;
                suggestions.innerHTML = '';
            }
            suggestions.appendChild(li);
        })
    })
})


async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}` 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                suggestions.innerHTML = '';
                card.style.display = 'flex';
                hideConten();
                statusImg.setAttribute('src', 'Assets/no-data.gif');
                statusTxt.innerText = 'Data Invalid';
                throw new Error('Data not found');
            } else if (response.status === 500) {
                suggestions.innerHTML = '';
                hideConten();
                statusImg.setAttribute('src', 'Assets/no-data.gif');
                statusTxt.innerText = 'Server Error';
                throw new Error('server error');
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


let index = -1 ;

inputEle.addEventListener('keydown', (e) => {
    const items = document.querySelectorAll('li')
    if (e.key === "ArrowDown") {
        index = (index + 1 ) % items.length;
        updateActive(items);
        e.preventDefault(); 
    }
    if (e.key === "ArrowUp") {
        index = (index - 1 + items.length ) % items.length;
        updateActive(items);
        e.preventDefault();
        
    }
})

function updateActive(items){
    items.forEach((item, i) => {
        item.classList.toggle('active', i == index);
    })
}