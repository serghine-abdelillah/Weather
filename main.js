const statusVal = 'Foggy';
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
    cityEle.innerText = cityName;
    statusTxt.innerText = statusVal;
    degreeEle.innerText = degree+'°';
    windEle.innerText = wind+' km/h';
    humidityEle.innerText = humidity+'%';
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


})