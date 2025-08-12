const cityName = 'Adrar';
const status = 'Cloudy';
const degree = 23;
const wind = 40 ;
const humidity = 40;
const searchBtn = document.querySelector('.search-box img');
const cityEle = document.querySelector('.city p');
const statusImg = document.querySelector('.status img');
const degreeEle = document.querySelector('.status p');
const humidityEle = document.querySelector('.humidity p');
const windEle = document.querySelector('.wind p');

searchBtn.addEventListener('click', function () {
    cityEle.innerText = cityName;
    degreeEle.innerText = degree+'°';
    windEle.innerText = wind+' km/h';
    humidityEle.innerText = humidity+'%';
    // statusImg.className.valueOf.;


})