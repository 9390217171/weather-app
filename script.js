const API_KEY='292c0ca9e536b3b79944b60354571915';
const BASE_URL='https://api.openweathermap.org/data/2.5/'
const locate = document.querySelector(".main");

const liveLocationBtn=document.querySelector('.live-location-btn');
liveLocationBtn.addEventListener('click',getUserCoordinates);

function getUserCoordinates(){
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude.toFixed(2);
        let long = position.coords.longitude.toFixed(2);    
      getDataUsingLatLong(lat,long);
    })
}

getUserCoordinates()
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sarturday"];
let currentDate = new Date();
let cDay = currentDate.getDate();
let Day = currentDate.getDay(days);
let cHour = currentDate.getHours();
let cMinute = currentDate.getMinutes();
let month = currentDate.toLocaleString("default", { month: "long" });
const input=document.querySelector(".input-form input")
const search = document.querySelector(".input-form");
search.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = input.value;
  input.value=""
  fetch(
      `${BASE_URL}weather?q=${address}&appid=${API_KEY}`
      )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      getWeatherData1(data);
    });
});

function getWeatherData1(data) {
  
  let { lon, lat } = data.coord;

  fetch(
    `${BASE_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      
      showWeatherData(data);
    });
    fetch(
      `${BASE_URL}weather?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${API_KEY}`
    )
    .then((res) => res.json())
    .then((data) => {
      
      showWeatherData1(data);
    });
}

function showWeatherData1(data){
  document.querySelector(".city1 span").innerHTML=data.name;
}

function showWeatherData(data) {

   
  let { description,id } = data.current.weather[0];

  const wIcon=document.createElement("img");

//   console.log(wIcon);
  
  if(id == 800){
    wIcon.src = "icons/clear.svg";
}else if(id >= 200 && id <= 232){
    wIcon.src = "icons/storm.svg";  
}else if(id >= 600 && id <= 622){
    wIcon.src = "icons/snow.svg";
}else if(id >= 701 && id <= 781){
    wIcon.src = "icons/haze.svg";
}else if(id >= 801 && id <= 804){
    wIcon.src = "icons/cloud.svg";
}else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
    wIcon.src = "icons/rain.svg";
}

document.querySelector(".temperature span").innerHTML=data.current.temp;
document.querySelector(".hour").innerHTML=cHour;
document.querySelector(".minute").innerHTML=cMinute;
document.querySelector(".date").innerHTML=cDay;
document.querySelector(".month").innerHTML=month;
document.querySelector(".reading-cloudy span").innerHTML=data.current.clouds;
document.querySelector(".reading-humidity span").innerHTML=data.current.humidity;
document.querySelector(".reading-rain span").innerHTML=data.current.dew_point;
document.querySelector(".reading-pressure span").innerHTML=data.current.pressure;
document.querySelector(".reading-wind span").innerHTML=data.current.wind_speed;



data.daily.forEach((day,id) =>{
if(id==0){
  document.querySelector(".tempmax1 span").innerHTML=day.temp.max;
  document.querySelector(".tempmin1").innerHTML=day.temp.min;
  document.querySelector(".day").innerHTML=days[Day];
  document.querySelector(".rain2").innerHTML=day.clouds;
}else{
  if(id==1){
    document.querySelector(".tempmax2 span").innerHTML=day.temp.max;
    document.querySelector(".tempmin2").innerHTML=day.temp.min;
    document.querySelector(".day1").innerHTML=days[Day+1];
    document.querySelector(".rain3").innerHTML=day.clouds;
  }else{
    if(id==2){
  document.querySelector(".tempmax3 span").innerHTML=day.temp.max;
  document.querySelector(".tempmin3").innerHTML=day.temp.min;
  document.querySelector(".day2").innerHTML=days[Day+2];
  document.querySelector(".rain4").innerHTML=day.clouds;
}else{
if(id==3){
  document.querySelector(".tempmax4 span").innerHTML=day.temp.max;
  document.querySelector(".tempmin4").innerHTML=day.temp.min;
  document.querySelector(".day3").innerHTML=days[Day+3];
  document.querySelector(".rain5").innerHTML=day.clouds;
}else{
  if(id==4){
    document.querySelector(".tempmax5 span").innerHTML=day.temp.max;
    document.querySelector(".tempmin5").innerHTML=day.temp.min;
    document.querySelector(".day4").innerHTML=days[Day+4];
    document.querySelector(".rain6").innerHTML=day.clouds;
  }
}
}
  }
}
}

)

}


function getDataUsingLatLong(latitude,longitude){

  // console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}
  // &lon=${longitude}&units=metric&appid=${API_KEY}`);

    const url=new URL('https://api.openweathermap.org/data/2.5/onecall');

    url.searchParams.set("lat",latitude);
    url.searchParams.set('lon',longitude);
    url.searchParams.set("units","metric");
    url.searchParams.set("appid",API_KEY);

    fetch(url).then(res=>res.json()).then(showWeatherData)

}
