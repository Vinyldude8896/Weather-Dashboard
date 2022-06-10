var CityNameInput = document.querySelector("#input-city");
var SearchCityButton = document.querySelector("#search-button");
var SearchCityHeader = document.querySelector("#search-city");
var currentTemperatureUL = document.querySelector("#current_temp_conditions");
var nextDayDate = document.querySelector("#next_day_date");
var CurrentDate = document.querySelector("#current_date");

var citySearchEntered = "";
var citySearchEnteredLong = "";
var citySearchEnteredLat = "";
var currentTemperature = "";
var currentHumidity = "";
var currentWind = "";
var currentUvIndex = "";
var CurrentDayConditions = "";
var conditionsCurrentDay = document.querySelector("#current_temp_conditions")

// next day global variables for date, temp, wind, humidity, conditions
var NextDayUnix = "";
var nextDateConverted = "";
var nextDateTemp = "";
var nextDateWind = "";
var nextDateHumidity = "";
var NextDayConditions = "";


// second forecast day variables
var secondForecastDate = "";
var secondForecastTemp = "";
var secondForecastWind = "";
var secondForecastHumidity = "";
var secondForecastConditions = "";

// variables for API keys
var apiKeyWeather = "feb921e24625822c8914d6709ecb623e";
var apiLongLat = "90229593ed55301c5055408148765137"

// longtitude and latitude variables
var longitude = "43.65";
var latitude = "79.38";

// date format
var date = $.datepicker.formatDate("(d/ m/ yy)", new Date())

// function to convert a date from Unix format
var ConvertUnixDate = function()  {
    // UnixTimestamp
    var unixtimestamp = NextDayUnix;
    
    // Months array
    var Months_arr = ['01','02','03','04','05','06','07','08','09','10','11','12'];

    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);

    // year
    var year = date.getFullYear();

    // Month
    var month = Months_arr[date.getMonth()];

    // Day
    var day = date.getDate();
    var dayTwo = date.getDate()+1;

    //Display date and time in DD-MM-yyyy format

    var convdataTime =  day +"/" + month + "/" + year ;
    nextDateConverted = convdataTime;
    console.log("the converted date is now" +convdataTime); 

    var convertdateSecond = dayTwo +"/" + month + "/" + year ;
    secondForecastDate = convertdateSecond;
    console.log("the converted second date is now" + convertdateSecond); 



}

// function to display the current weather and the forecast weather
var displayCurrentWeather = function(data){

    // displaying weather results for today
    var searchCityHeader = citySearchEntered;
    SearchCityHeader.innerHTML = searchCityHeader + " " + date;
    document.getElementById("current_temp").innerHTML = "Temp: " + " " + currentTemperature + '&#8451';
    document.getElementById("current_wind").innerHTML = "Wind: " + " " + currentWind + 'MPH';
    document.getElementById("current_humidity").innerHTML = "Humidity: " + " " + currentHumidity;
    document.getElementById("current_UV").innerHTML = "UV Index: " + " " + currentUvIndex;
   
    var currentDayIcon = document.getElementById("current_forecast")
    if (CurrentDayConditions === "rain"){
         currentDayIcon.dataset.icon = "fa-solid:cloud-rain";
    } else if (CurrentDayConditions === "cloudy"){
        currentDayIcon.dataset.icon = "fluent:weather-cloudy-48-filled";
    } else  currentDayIcon.dataset.icon ="material-symbols:wb-sunny-outline-rounded";
   
  

    // displaying next day weather results
    nextDayDate.innerHTML = nextDateConverted;
    document.getElementById("next_day_temp").innerHTML = "Temp: " + nextDateTemp + '&#8451';
    document.getElementById("next_day_wind").innerHTML = "Wind: " + nextDateWind + 'MPH';
    document.getElementById("next_day_humidity").innerHTML = "Humidity: " + nextDateHumidity;

    var nextdayIcon = document.getElementById("forecast_day_one")
    if (NextDayConditions === "rain"){
         nextdayIcon.dataset.icon = "fa-solid:cloud-rain";
    } else if (NextDayConditions === "cloudy"){
        nextdayIcon.dataset.icon = "fluent:weather-cloudy-48-filled";
    } else  nextdayIcon.dataset.icon ="material-symbols:wb-sunny-outline-rounded";


    // displaying day 2 of 5 day forecast

    second_forecast_date.innerHTML = secondForecastDate;
    document.getElementById("second_forecast_temp").innerHTML = "Temp: " + secondForecastTemp + '&#8451';
    document.getElementById("second_forecast_wind").innerHTML = "Wind: " + secondForecastWind + 'MPH';
    document.getElementById("second_forecast_humidity").innerHTML = "Humidity: " + secondForecastHumidity;

    var secondForecastIcon = document.getElementById("second_forecast_icon")
    if (secondForecastConditions === "rain"){
         secondForecastIcon.dataset.icon = "fa-solid:cloud-rain";
    } else if (secondForecastConditions === "cloudy"){
        secondForecastIcon.dataset.icon = "fluent:weather-cloudy-48-filled";
    } else  secondForecastIcon.dataset.icon ="material-symbols:wb-sunny-outline-rounded";

}


var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

}

// function to get weather information by city provided
var getWeatherResults = function(citySearchEntered) {
    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + citySearchEnteredLat + "&lon=" + citySearchEnteredLong + "&units=metric&exclude=minutely&appid=" + apiKeyWeather;
   
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
        response.json().then(function(data){
            console.log(data);

            // values for current day temperatures being pulled and set
            var temperature = data.current.temp;
            currentTemperature = temperature;

            var wind = data.current.wind_speed;
            currentWind = wind;

            var humidty = data.current.humidity;
            currentHumidity = humidty;

            var UvIndex = data.current.uvi;
            currentUvIndex = UvIndex;

            var CurrentDayClouds = parseInt(data.daily[0].clouds);
            var CurrentDayRain = parseFloat((data.daily[0].pop).toFixed(2));

            // checking to see chance of clouds, rain or sun
            if (CurrentDayClouds >50) {
                CurrentDayConditions ="cloudy";
            } else if (CurrentDayRain > 0.60) {
                CurrentDayConditions = "rain"
            } else CurrentDayConditions = "sunny"
            console.log("Cloudiness is " + CurrentDayClouds + ". Current Day Rain is " + CurrentDayRain + ". Current Day conditions are " + CurrentDayConditions );

            // next day temperatures being pulled and set

            var NextDay = data.daily[1].dt;
            console.log("The Next Day in Unix format is" + NextDay);
            NextDayUnix = NextDay;
            ConvertUnixDate();
            
            var NextDayTemp = data.daily[1].temp.day;
            nextDateTemp = NextDayTemp;

            var NextDayWind = data.daily[1].wind_speed;
            nextDateWind = NextDayWind;

            var NextDayHumidity = data.daily[1].humidity;
            nextDateHumidity = NextDayHumidity;

            var nextDayClouds = parseInt(data.daily[1].clouds);
            var nextDayRain = parseFloat((data.daily[1].pop).toFixed(2));

            // checking to see chance of clouds, rain or sun
            if (nextDayClouds >50) {
                NextDayConditions ="cloudy";
            } else if (nextDayRain > 0.60) {
                NextDayConditions = "rain"
            } else NextDayConditions = "sunny"
            console.log("Cloudiness is " + nextDayClouds + ". Next Day Rain is " + nextDayRain + ". Next Day conditions are " + NextDayConditions );


            // second day forecast temperatures being pulled and set

            var second_forecast = data.daily[2].dt;
            console.log("The second Day in Unix format is" + second_forecast);
            
            var secondDaytemp = data.daily[2].temp.day;
            secondForecastTemp = secondDaytemp;
            console.log("the second day tempearture is " + secondDaytemp);

            var secondDayWind = data.daily[2].wind_speed;
            secondForecastWind = secondDayWind;
            console.log("The second day wind is " + secondDayWind);

            var secondDayHumidity = data.daily[2].humidity;
            secondForecastHumidity = secondDayHumidity;
            console.log("The second day humidity is " + secondDayHumidity);

            var secondDayClouds = parseInt(data.daily[2].clouds);
            var secondDayRain = parseFloat((data.daily[2].pop).toFixed(2));

            // checking to see chance of clouds, rain or sun
            if (secondDayClouds >50) {
                secondForecastConditions ="cloudy";
            } else if (secondDayRain > 0.60) {
                secondForecastConditions = "rain";
            } else secondForecastConditions = "sunny";
            console.log("Cloudiness is " + secondDayClouds + ". second Day Rain is " + secondDayRain + ". second Day conditions are " + secondForecastConditions );





            
            
            console.log("The curent temperature is " + data.current.temp);
            displayCurrentWeather();
        });
        
    }
});
};

    // function call to API to get Longitude and Latitude of city entered
    var getLongLatResults = function(){
    var apiUrl="http://api.positionstack.com/v1/forward?access_key=" + apiLongLat +"&query=" + citySearchEntered + "&limit1";

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
        response.json().then(function(data){
            console.log(data);
         var longitude = data.data[0].longitude;
         console.log(longitude);
         citySearchEnteredLong = longitude;
         var latitude = data.data[0].latitude;
         citySearchEnteredLat = latitude;
         console.log(latitude);
        getWeatherResults();
        });
    }
});

}

// function to handle button click and asign city name
var buttonClickHandler = function() {
    var cityName = CityNameInput.value.trim();
    citySearchEntered = cityName
    console.log("The city entered is " + cityName); 
    console.log("The city name variable is " + citySearchEntered);
    getLongLatResults();
}




CityNameInput.addEventListener("submit", formSubmitHandler);
SearchCityButton.addEventListener("click", buttonClickHandler);
