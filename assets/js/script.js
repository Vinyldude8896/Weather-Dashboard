var CityNameInput = document.querySelector("#input-city");
var SearchCityButton = document.querySelector("#search-button");
var SearchCityHeader = document.querySelector("#search-city");
var currentTemperatureLi = document.querySelector("#current_temp");
var citySearchEntered = "";
var citySearchEnteredLong = "";
var citySearchEnteredLat = "";
var currentTemperature = "";
var currentHumidity = "";
var currentWind = "";
var currentUvIndex = "";
var apiKeyWeather = "feb921e24625822c8914d6709ecb623e";
var apiLongLat = "90229593ed55301c5055408148765137"
var longitude = "43.65";
var latitude = "79.38";
var date = $.datepicker.formatDate("(d/ m/ yy)", new Date())

var displayCurrentWeather = function(data){
    var searchCityHeader = citySearchEntered;
    SearchCityHeader.innerHTML = searchCityHeader + " " + date;
    document.getElementById("current_temp").innerHTML = "Temp: " + currentTemperature + '&#8451';
    document.getElementById("current_wind").innerHTML = "Wind: " + currentWind + 'MPH';
    document.getElementById("current_humidity").innerHTML = "Humidity: " + currentHumidity;
    document.getElementById("current_UV").innerHTML = "UV Index: " + currentUvIndex;


}
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

}

var getWeatherResults = function(citySearchEntered) {
    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + citySearchEnteredLat + "&lon=" + citySearchEnteredLong + "&units=metric&exclude=daily&appid=" + apiKeyWeather;
   
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
        response.json().then(function(data){
            console.log(data);
            var temperature = data.current.temp;
            currentTemperature = temperature;

            var wind = data.current.wind_speed;
            currentWind = wind;

            var humidty = data.current.humidity;
            currentHumidity = humidty;

            var UvIndex = data.current.uvi;
            currentUvIndex = UvIndex;

            
            
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
