// $(document).ready(function() {
//   navigator.geolocation.getCurrentPosition(success, error);

//   function success(pos) {
//     var lat = pos.coords.latitude;
//     var long = pos.coords.longitude;
//     weather(lat, long);
//   }

//   function error() {
//     console.log("There was an error");
//   }

//   function weather(lat, long) {
//     var URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;
//     $.getJSON(URL, function(data) {
//       display(data);
//     });
//   }

//   function display(data) {
//     var city = data.name.toUpperCase();
//     var temp =
//       Math.round(data.main.temp_max) +
//       "&deg; C | " +
//       Math.round(Math.round(data.main.temp_max) * 1.8 + 32) +
//       "&deg; F";
//     var desc = data.weather[0].description;
//     var date = new Date();

//     var months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December"
//     ];

//     var weekday = new Array(7);
//     weekday[0] = "Sunday";
//     weekday[1] = "Monday";
//     weekday[2] = "Tuesday";
//     weekday[3] = "Wednesday";
//     weekday[4] = "Thursday";
//     weekday[5] = "Friday";
//     weekday[6] = "Saturday";

//     var font_color;
//     var bg_color;
//     if (Math.round(data.main.temp_max) > 25) {
//       font_color = "#d36326";
//       bg_color = "#f3f5d2";
//     } else {
//       font_color = "#44c3de";
//       bg_color = "#eff3f9";
//     }

//     if (data.weather[0].main == "Sunny" || data.weather[0].main == "sunny") {
//       $(".weathercon").html(
//         "<i class='fas fa-sun' style='color: #d36326;'></i>"
//       );
//     } else {
//       $(".weathercon").html(
//         "<i class='fas fa-cloud' style='color: #44c3de;'></i>"
//       );
//     }

//     var minutes =
//       date.getMinutes() < 11 ? "0" + date.getMinutes() : date.getMinutes();
//     var date =
//       weekday[date.getDay()].toUpperCase() +
//       " | " +
//       months[date.getMonth()].toUpperCase().substring(0, 3) +
//       " " +
//       date.getDate() +
//       " | " +
//       date.getHours() +
//       ":" +
//       minutes;
//     $(".location").html(city);
//     $(".temp").html(temp);
//     $(".date").html(date);
//     $(".box").css("background", bg_color);
//     $(".location").css("color", font_color);
//     $(".temp").css("color", font_color);
//   }
// });


// #################################################################

// $(window).scroll(
//   function()
//   {
//     var topheight = $('header').height();
//     var ypos = $(document).scrollTop();

//     if(ypos <= topheight){
//       var effectfactor = ypos / topheight;
//       var rotation = effectfactor * (Math.PI / 2 - Math.asin((topheight - ypos) / topheight));
    
//       $('.top_sec').css({
//         '-webkit-transform' : 'rotateX('+rotation+'rad)',
//         'transform' : 'rotateX('+rotation+'rad)',
//       })
    
//       .find('ovelay').css('opacity',effectfactor);
//     }
    
//     if(ypos <= topheight){
//       $('.pages').removeclass('fixed');
//     }
//     else{
//       $('.pages').addclass('fixed');
//     }
    
//   }
// );

// ##########################################################

// displaying time
let dt = new Date()
let day = dt.getUTCDate();
let month = dt.getUTCMonth()
let year = dt.getUTCFullYear()

document.getElementById("showdate").innerText = day +" - "+ month +" - "+ year ;


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

    const { name } = data;
    const { temp } = data.main;
    const { speed } = data.wind;

    document.querySelector(`.city${num}`).innerText = name;
    document.querySelector(`.temp${num}`).innerText = temp + " °C";
    document.querySelector(`.speed${num}`).innerText = speed + "km/hr";

  },

  
}



for(ele of cities){
  weather.fetchWeather(ele,i);
  // console.log(`cities `+ ele + i );
  i++;
}












