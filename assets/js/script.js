var CityNameInput = document.querySelector("#input-city");
var SearchCityButton = document.querySelector("#search-button");
var SearchCityHeader = document.querySelector("#search-city");
var currentTemperatureLi = document.querySelector("#current_temp");
var citySearchEntered = "";
var currentTemperature = "";
var currentHumidity = "";
var currentWind = "";
var currentUvIndex = "";
var apiKey = "feb921e24625822c8914d6709ecb623e";
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
    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=43.65&lon=-79.38&units=metric&exclude=hourly,daily&appid=feb921e24625822c8914d6709ecb623e";
    // "https://api.openweathermap.org/data/2.5/onecall?" + "lat={" +latitude + "}" + "+&lon={"+ longitude + "}" + "&exclude={minutely}" + "&appid={" + apiKey + "}";

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


var buttonClickHandler = function() {
    var cityName = CityNameInput.value.trim();
    citySearchEntered = cityName
    console.log("The city entered is " + cityName); 
    console.log("The city name variable is " + citySearchEntered);
    getWeatherResults();
}




CityNameInput.addEventListener("submit", formSubmitHandler);
SearchCityButton.addEventListener("click", buttonClickHandler);
