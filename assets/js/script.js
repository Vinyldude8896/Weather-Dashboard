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
var conditionsCurrentDay = document.querySelector("#current_temp_conditions")

// next day global variables for date, temp, wind, humidity, conditions
var NextDayUnix = "";
var nextDateConverted = "";
var nextDateTemp = "";
var nextDateWind = "";
var nextDateHumidity = "";
var NextDayConditions = "";
var apiKeyWeather = "feb921e24625822c8914d6709ecb623e";
var apiLongLat = "90229593ed55301c5055408148765137"
var longitude = "43.65";
var latitude = "79.38";
var date = $.datepicker.formatDate("(d/ m/ yy)", new Date())


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

    // Hours
    var hours = date.getHours();

    //minutes
    var minutes = "0" + date.getMinutes();

    //seconds
    var seconds = "0" + date.getSeconds();

    //Display date and time in DD-MM-yyyy format

    var convdataTime =  day +"/" + month + "/" + year ;
    nextDateConverted = convdataTime;
    console.log("the converted date is now" +convdataTime); 


}


var displayCurrentWeather = function(data){

    // displaying weather results for today
    var searchCityHeader = citySearchEntered;
    SearchCityHeader.innerHTML = searchCityHeader + " " + date;
    document.getElementById("current_temp").innerHTML = "Temp: " + " " + currentTemperature + '&#8451';
    document.getElementById("current_wind").innerHTML = "Wind: " + " " + currentWind + 'MPH';
    document.getElementById("current_humidity").innerHTML = "Humidity: " + " " + currentHumidity;
    document.getElementById("current_UV").innerHTML = "UV Index: " + " " + currentUvIndex;
    // var currentTempConditions = document.createElement("Li")
    // currentTempConditions.classList = "d-flex";
    // currentTempConditions.appendChild(currentTemperatureUL);
    // currentTempConditions.innerHTML = "Rainy Day";
    // //  "<span class='iconify' data-icon='fa-solid:cloud-rain'></span>"
  

    // displaying next day weather results
    nextDayDate.innerHTML = nextDateConverted;
    document.getElementById("next_day_temp").innerHTML = "Temp: " + nextDateTemp + '&#8451';
    document.getElementById("next_day_wind").innerHTML = "Wind: " + nextDateWind + 'MPH';
    document.getElementById("next_day_humidity").innerHTML = "Humidity: " + nextDateHumidity;




}
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

}

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
            var nextDayRain = parseInt(data.daily[1].pop);

            if (nextDayClouds >50) {
                NextDayConditions ="cloudy";
            } else if (nextDayRain > 50) {
                NextDayConditions = "rain"
            } else NextDayConditions = "sunny"
            console.log("Cloudiness is " + nextDayClouds + ". Next Day Rain is " + nextDayRain + ". Next Day conditions are " + NextDayConditions );








            
            
            console.log("The curent temperature is " + data.current.temp);
            displayCurrentWeather();
        });
        
    }
});
};


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

var buttonClickHandler = function() {
    var cityName = CityNameInput.value.trim();
    citySearchEntered = cityName
    console.log("The city entered is " + cityName); 
    console.log("The city name variable is " + citySearchEntered);
    getLongLatResults();
}




CityNameInput.addEventListener("submit", formSubmitHandler);
SearchCityButton.addEventListener("click", buttonClickHandler);
