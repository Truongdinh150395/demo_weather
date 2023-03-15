var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var numberTerm = document.querySelector('.number');
var search = document.querySelector('.search');
var titleNotication = document.querySelector('.title-notication');
var country = document.querySelector('.country');
var time = document.querySelector('.time');
var clouds = document.querySelector('.clouds');
var changeTempF = document.querySelector('.changeTempF');
var changeTempC = document.querySelector('.changeTempC');
var img = document.querySelector('.image-weather img');
var search = document.querySelector('.search');
var main = document.querySelector('#main');
//get the day
const weekday = ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"];

var getTime = new Date();
var day = weekday[getTime.getDay()];

search.addEventListener('keypress' , function(event) {
    if (event.key === "Enter") {
        let location  = search.value.trim();
        getInformaionApi(location);
    }
})

document.getElementById('changeTempF').addEventListener('click', function () {
    numberTerm.innerHTML = Math.round((numberTerm.innerHTML * 9/5) + 32);
    document.getElementById('changeTempF').setAttribute('class', 'disabled-tag white');
    document.getElementById('changeTempC').removeAttribute('class');
});

document.getElementById('changeTempC').addEventListener('click', function () {
    numberTerm.innerHTML = Math.round((numberTerm.innerHTML - 32)/1.8);
    document.getElementById('changeTempC').setAttribute('class', 'disabled-tag white');
    document.getElementById('changeTempF').removeAttribute('class');
});

//event click img-footer
document.getElementById('show-temp').addEventListener('click', function() {
    document.getElementById('img-temp').setAttribute('class', 'show');
    document.getElementById('show-temp').setAttribute('class', 'text-decoration')
    document.getElementById('img-rain').setAttribute('class', 'hidden');
    document.getElementById('show-rain').setAttribute('class', 'none-decoration')
    document.getElementById('img-wind').setAttribute('class', 'hidden');
    document.getElementById('show-wind').setAttribute('class', 'none-decoration')
})

document.getElementById('show-rain').addEventListener('click', function() {
    document.getElementById('img-temp').setAttribute('class', 'hidden');
    document.getElementById('show-temp').setAttribute('class', 'none-decoration')
    document.getElementById('img-rain').setAttribute('class', 'show');
    document.getElementById('show-rain').setAttribute('class', 'text-decoration')
    document.getElementById('img-wind').setAttribute('class', 'hidden');
    document.getElementById('show-wind').setAttribute('class', 'none-decoration')
})

document.getElementById('show-wind').addEventListener('click', function() {
    document.getElementById('img-temp').setAttribute('class', 'hidden');
    document.getElementById('show-temp').setAttribute('class', 'none-decoration')
    document.getElementById('img-rain').setAttribute('class', 'hidden'); 
    document.getElementById('show-rain').setAttribute('class', 'none-decoration')
    document.getElementById('img-wind').setAttribute('class', 'show');
    document.getElementById('show-wind').setAttribute('class', 'text-decoration')
})

async function getInformaionApi(location) {
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3a6c978309ab0ddb12be17869d9ec9b3`;
    let data = await fetch(urlApi).then(res => res.json())
    console.log(data);
    if (data.cod == 200) {
        humidity.innerHTML = data.main.humidity + ' %';
        numberTerm.innerHTML = Math.round(data.main.temp - 272.15);
        wind.innerHTML = data.wind.speed + ' km/h';
        titleNotication.innerHTML = data.name;
        country.innerHTML = data.sys.country;
        clouds.innerHTML = data.weather ? data.weather[0].main : '';
        time.innerHTML = day;
        // time.innerHTML = getTime.getHours() + ':' + getTime.getMinutes() + ':' + getTime.getSeconds();

        switch (data.weather[0].main) {
            case "Clouds":
                img.src = 'https://openweathermap.org/img/wn/03d@2x.png';
                clouds.innerHTML = "Mây";
                break;
            case "Rain":
                img.src = 'https://openweathermap.org/img/wn/10d@2x.png';
                clouds.innerHTML = "Mưa";
                break;
            case "Thunderstorm":
                img.src = 'https://openweathermap.org/img/wn/11d@2x.png';
                clouds.innerHTML = "Dông";
                break;
            case "Clear":
                img.src = 'https://openweathermap.org/img/wn/01d@2x.png';
                clouds.innerHTML = "Bầu trời quang đãng";
                break;    
            default:
                img.src = '';           
        }

    } 
    
    if (data.cod == 400) {
        alert('Không có gi để mã hóa!!!');
    } 

    if (data.cod == 404) {
        alert('Không tìm thấy!!!');
    }
}

getInformaionApi('Ha noi');