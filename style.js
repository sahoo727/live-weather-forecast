
//  ############## displaying time ####################

let dt = new Date()
let day = dt.getDate().toString().padStart(2,0);
let month = (dt.getMonth()+1).toString().padStart(2,0);
let year = dt.getFullYear();
console.log(dt);

document.getElementById("showdate").innerText = day +" - "+ month +" - "+ year ;

function realtime(){
  let dt = new Date();
  let hour = dt.getHours().toString().padStart(2,0);          //tostring and padstart is to make numbers always in two digit
  let minute = dt.getMinutes().toString().padStart(2,0);
  let second = dt.getSeconds().toString().padStart(2,0);
  document.getElementById("showtime").innerText = hour +" : "+minute+" : "+second;
}

setInterval(realtime,1000);     // to display the updated time after every 1 sec



// ############### adding the cities,temp,wind speed ####################

let cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Ahmedabad", "kolkata", "Bhubaneswar", "Ranchi", "Lucknow"];
let i = 1;

let weather ={
  "apikey" : "79a906e5a48f5d0e463f26621860e188",
  fetchWeather : function(city,num) {
      console.log(city);
      console.log(num);
      fetch(
          "http://api.openweathermap.org/data/2.5/weather?q=" 
          + city 
          + "&units=metric&appid="
          + this.apikey
      )
          .then((response) => response.json())
          .then((data) => this.displayWeather(data,num)) ;
      
  },



  displayWeather : function(data,num){

    const { name }      = data;
    const { temp }      = data.main;
    const { main }      = data.weather[0];
    const { country }   = data.sys;
    const { humidity }  = data.main;
    const { icon }      = data.weather[0];
    
    if (num > 0) {
      document.querySelector(`.city${num}`).innerText = name;
      document.querySelector(`.temp${num}`).innerText = temp + " °C";
      document.querySelector(`.speed${num}`).innerText = main ;
      document.querySelector(`.cond_img${num}`).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }
    else if(num == 0){

      document.querySelector(`.info_specs_1`).innerText = "Country : " + country;
      document.querySelector(`.info_specs_2`).innerText = "Place : " + name;
      document.querySelector(`.info_specs_3`).innerText = "Temperature : " + temp + " °C";
      document.querySelector(`.info_specs_4`).innerText = "Condtion : " + main ;
      document.querySelector(`.info_specs_5`).innerText = "Humidity : " + humidity + "%";
      document.querySelector('.cond_img_all').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }
    else if(num == -1){
      document.querySelector('.box_temp').innerText = temp + " °C";
      document.querySelector('.box_img').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }

  },

  
}

for(ele of cities){
  weather.fetchWeather(ele,i);
  // console.log(`cities `+ ele + i );
  i++;
}



// ################################ by reverse coding getting the location of place ###########################

function displayLocation(latitude,longitude){

  var api_key = 'b0c2b02f554f46179c47784140913ab6';

  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
  + '?'
  + 'key=' + api_key
  + '&q=' + encodeURIComponent(latitude + ',' + longitude)
  + '&pretty=1'
  + '&no_annotations=1';

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {

  if (request.status === 200){ 
    // Success!
    var data = JSON.parse(request.responseText);
    console.log(data);
    let location = data.results[0].components.city;      // getting location
    document.querySelector('.location').innerHTML = location.toUpperCase();
    weather.fetchWeather(location , 0);
    weather.fetchWeather(location , -1);
    // document.getElementById('fas fa-sun').className = 'fas fa-cloud';
    // weather.fetchWeather(location , 0);
  } 
    
  else if (request.status <= 500){                      // We reached our target server, but it returned an error              
    console.log("unable to geocode! Response code: " + request.status);
    var data = JSON.parse(request.responseText);
    console.log('error msg: ' + data.status.message);
  } 
    
  else {
    console.log("server error");
  }
  };

  request.onerror = function() {
  console.log("unable to connect to server");        // There was a connection error of some sort
  };

  request.send();  // make the request
}


// ############################# getting the latitude and longitude and passing it to the website ################
var successCallback = function(position){
  var x = position.coords.latitude;
  var y = position.coords.longitude;
  console.log(x,y);
  displayLocation(x,y);
  // future_weather( x,y,0);
};
  
var errorCallback = function(error){
  var errorMessage = 'Unknown error';
  switch(error.code) {
    case 1:
      errorMessage = 'Permission denied';
      break;
    case 2:
      errorMessage = 'Position unavailable';
      break;
    case 3:
      errorMessage = 'Timeout';
      break;
  }
  document.write(errorMessage);
};
  
var options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
};
  
navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);



function search(num) {
  console.log(document.querySelector(`.chart${num}`).value+'js') ;
  lat_long(document.querySelector(`.chart${num}`).value , num) ;

}



document
  .querySelector(`.search_info button`)
  .addEventListener("click", function(){
  weather.fetchWeather(document.querySelector('.city_information').value , 0);
});

document.querySelector(`.city_information`).addEventListener("keyup", function(event){
  if(event.key == "Enter"){
    console.log(document.querySelector('.city_information').value + "srch")
    weather.fetchWeather(document.querySelector('.city_information').value , 0);
  }
})






















