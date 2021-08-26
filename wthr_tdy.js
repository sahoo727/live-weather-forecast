
// ##################### calling the graph function for next 8 days [area graph] ###################
let Graph = function(week_array , hour_array , time){

  google.charts.load('current', {'packages':['corechart']});
  if( time == 0 ){
    google.charts.setOnLoadCallback(Chart_8days);
    google.charts.setOnLoadCallback(Chart_36hours);
  }
  else if( time == 1){
    google.charts.setOnLoadCallback(Chart_8days);
  }
  else if(time == 2){
    google.charts.setOnLoadCallback(Chart_36hours);
  }
  
  function Chart_8days() {

    var data = google.visualization.arrayToDataTable(week_array);

    var options = {
      title: '',
      hAxis: {title: 'Days',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div1'));
    chart.draw(data, options);
  }

  function Chart_36hours() {

    var data = google.visualization.arrayToDataTable(hour_array);

    var options = {
      title: '',
      hAxis: {title: 'Time',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
  }
}



// ########################## finding the weather data for a period of time ##########################

function future_weather(latitude , longitude , time){

  let api_key = 'Your API key';
  let api_url = 'https://api.openweathermap.org/data/2.5/onecall?lat=';

  let request_url = api_url
  + latitude
  + '&lon='
  + longitude
  + '&exclude=minutely&units=metric&appid='
  + api_key;

  let request = new XMLHttpRequest();
  request.open('GET',request_url, true);


  request.onload = function() {               // loading the requesting 

    if(request.status == 200){
      var data = JSON.parse(request.responseText);
      console.log(data);

      // ####### for next 8 days ########
      let week_array = [['Days', 'Temperature' ]];
      let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      for(let i=0; i<data.daily.length; i++){
        let date = new Date((data.daily[i].dt) * 1000);
        let day = date.getDay();
      
        week_array.push([date.getDate()+'/'+days[day] , data.daily[i].temp.day ] );
      }

      // ######## for next 36hrs ##########
      let hour_array = [['Time', 'Temperature' ]];

      for(let i=0; i<12; i++){
        let date = new Date((data.hourly[i*3].dt) * 1000);
        let hour = date.getHours().toString().padStart(2,0);

        hour_array.push([hour+':00' ,data.hourly[i*3].temp  ]);
      }
   
      Graph(week_array , hour_array , time);                        // calling the graph function

    }

    else if (request.status <= 500){            // We reached our target server, but it returned an error
        
      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } 
      
    else {
      console.log("server error");
    }
  
  };

  request.onerror = function() {              // There was a connection error of some sort   
    console.log("unable to connect to server");  
  };

  request.send();                            //sendind request

}



// ############################ function to get latitide & longitude ################################

function lat_long(city , time){

  let api_key = 'Your API key';
  let api_url = 'http://api.openweathermap.org/geo/1.0/direct?q=';

  let request_url = api_url
  +city
  +'&limit=1&appid='
  +api_key;

  let request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function(){

    if(request.status = 200){
      var data = JSON.parse(request.responseText);
      console.log(data);
      console.log(data[0].lat , data[0].lon)
      future_weather(data[0].lat , data[0].lon , time);
    }

    else if(request.status <= 500){
      console.log("Unable to load : "+ request.status);
      var data = JSON.parse(request.responseText);
      console.log('eroor msg : ' + data.status.message);
    }

    else{
      console.log("server error");
    }

  };

  request.onerror = function(){
    console.log("unable to connect t server ");
  };

  request.send();
}




// ############################# getting the latitude and longitude and passing it to the website ################
var successCallback = function(position){
  var x = position.coords.latitude;
  var y = position.coords.longitude;
  console.log(x,y);
//   displayLocation(x,y);
  future_weather( x,y,0);
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


//  calling search 

function search(num) {
  console.log(document.querySelector(`.chart${num}`).value+'js') ;
  lat_long(document.querySelector(`.chart${num}`).value , num) ;

}

document
  .querySelector(`.charts1 button`)
  .addEventListener("click", function(){
  search(1);
});

document.querySelector(`.chart1`).addEventListener("keyup", function(event){
  if(event.key == "Enter"){
    search(1);
  }
})


document
  .querySelector(`.charts2 button`)
  .addEventListener("click", function(){
  search(2);
});

document.querySelector(`.chart2`).addEventListener("keyup", function(event){
  if(event.key == "Enter"){
    search(2);
  }
})



















