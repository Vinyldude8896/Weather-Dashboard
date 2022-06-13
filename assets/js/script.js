
// variable that local storage will store all city searches
var citySearches = [];


// variable for the input element
var CityNameInput = document.querySelector("#input-city");

// variables for the search function and button 
var SearchCityButton = document.querySelector("#search-button");
var SearchCityHeader = document.querySelector("#search-city");

// global variables to target individidual elements to replace text or append elements
var currentTemperatureUL = document.querySelector("#current_temp_conditions");
var nextDayDate = document.querySelector("#next_day_date");
var secondDayDate = document.querySelector("#second_forecast_date");
var thirdDayDate = document.querySelector("#third_forecast_date");
var fourthDayDate = document.querySelector("#fourth_forecast_date");
var fifthDayDate = document.querySelector("#fifth_forecast_date");
var CurrentDate = document.querySelector("#current_date");

// variables for locations for search history results
var searchHistoryResults = document.querySelector("#search_history_results");
var clearSearchResults = document.querySelector("#clear_search_results");


// current and forecast icon positions in the document
var currentForecastIcon = document.querySelector("#main_Icon");
var NextForecastIcon = document.querySelector("#day_one_Icon");
var secondForecastIcon = document.querySelector("#second_Day_Icon");
var thirdForecastIcon = document.querySelector("#third_Day_Icon");
var fourthForecastIcon = document.querySelector("#fourth_day_Icon");
var fifthForecastIcon = document.querySelector("#fifth_day_Icon");

//variables for vity searched to create name longiytude and latitude
var cityNameConverted = "";
var citySearchEntered = "";
var citySearchEnteredLong = "";
var citySearchEnteredLat = "";

// current day variables for temperature, humidity, wind, UV index and conditions, conditions icon
var currentTemperature = "";
var currentHumidity = "";
var currentWind = "";
var currentUvIndex = "";
var CurrentDayConditions = "";
var currentDayIcon = "";

// variable locations for UV index and current conditions element locations
var currentUVIndexPElement = document.querySelector("#current_UV_Index");
var conditionsCurrentDay = document.querySelector("#current_temp_conditions")

// next day global variables for date, temp, wind, humidity, conditions, and conditions icon
var NextDayUnix = "";
var nextDateConverted = "";
var nextDateTemp = "";
var nextDateWind = "";
var nextDateHumidity = "";
var NextDayConditions = "";
var nextdayIcon = "";


// second forecast day variables for date, temp, wind, humidity, conditions, and conditions icon
var secondForecastDate = "";
var secondForecastTemp = "";
var secondForecastWind = "";
var secondForecastHumidity = "";
var secondForecastConditions = "";
var seconDayIcon = "";

// third forecast day variables for date, temp, wind, humidity, conditions, and conditions icon
var thirdForecastDate = "";
var thirdForecastTemp = "";
var thirdForecastWind = "";
var thirdForecastHumidity = "";
var thirdForecastConditions = "";
var thirdDayIcon = "";

// fourth forecast day variables for date, temp, wind, humidity, conditions, and conditions icon
var fourthForecastDate = "";
var fourthForecastTemp = "";
var fourthForecastWind = "";
var fourthForecastHumidity = "";
var fourthForecastConditions = "";
var fourthDayIcon = "";

// fifth forecast day variables for date, temp, wind, humidity, conditions, and conditions icon
var fifthForecastDate = "";
var fifthForecastTemp = "";
var fifthForecastWind = "";
var fifthForecastHumidity = "";
var fifthForecastConditions = "";
var fifthDayIcon = "";



// variables for openWeather API key
var apiKeyWeather = "feb921e24625822c8914d6709ecb623e";

// longtitude and latitude variables to send to API call for weather conditions
var longitude = "43.65";
var latitude = "79.38";

// date variable to choose a new date based on the format (d/ m/ yy)
var date = $.datepicker.formatDate("(d/ m/ yy)", new Date())



    // function to load previous searches from storage
    var loadCitySearches = function() {

     citySearches = JSON.parse(localStorage.getItem("citySearches"));


    // if nothing in localStorage, create a new object to track all task status arrays
        if (!citySearches) {
            citySearches = []
        };

    // loop over each item in storage and create the li elements again
        for (i=0; i < citySearches.length; i++) {
        //create the li elements again
        var search_results = document.querySelector("#search_history_results");
        var searchResultsCity = document.createElement("li")

        // create classes for the li element and set attributes
        searchResultsCity.classList = "d-flex search-results";
        searchResultsCity.setAttribute("id", citySearches[i]);

        // set the innerHTML for the li elemednts and append them to the search results
        searchResultsCity.innerHTML = citySearches[i];
        search_results.appendChild(searchResultsCity);
        }
    
}


    // funnction to get the text from the previous searches li element and return the information to the page
    $(".list-group").on("click", "li", function() {

        // get current text of li element that was clicked
        var text = $(this)
        .text()
        .trim();

        // setting global variable results to the tecxt in teh li element
        citySearchEntered = text;

        // getting longitute and latitute results again to display weather 
        getLongLatResults();
    });

    // function to convert a date from Unix format which is how the openweather app sends back a date
    var ConvertUnixDate = function()  {
    
        // UnixTimestamp setting to next dat variable
        var unixtimestamp = NextDayUnix;
    
        // Months array variable to set the month format
         var Months_arr = ['01','02','03','04','05','06','07','08','09','10','11','12'];

        // Convert timestamp to milliseconds
        var date = new Date(unixtimestamp*1000);

        // variable getting full year
        var year = date.getFullYear();

        // variable getting month from array 
        var month = Months_arr[date.getMonth()];

        // Day variables adding one for each day in forecast
        var day = date.getDate();
        var dayTwo = date.getDate()+1;
        var dayThree = date.getDate()+2;
        var dayFour = date.getDate()+3;
        var dayFive = date.getDate()+4;

        //Display date and time in DD-MM-yyyy format and set to global variable
        var convdataTime =  day +"/" + month + "/" + year ;
        nextDateConverted = convdataTime;

        // convert date for second day forecast and set to global variable
        var convertdateSecond = dayTwo +"/" + month + "/" + year ;
        secondForecastDate = convertdateSecond;

         // convert day for third day forecast and set to global variable
        var convertdateThird = dayThree +"/" + month + "/" + year ;
        thirdForecastDate = convertdateThird;
       

        // convert date for fourth day forecast and set to global variable
        var convertdatefourth = dayFour +"/" + month + "/" + year ;
        fourthForecastDate = convertdatefourth;
        

        // convert date for fifth day forecast and set to global variable
        var convertdatefifth = dayFive +"/" + month + "/" + year ;
        fifthForecastDate = convertdatefifth;
    }

    // function to display the current weather and the forecast weather
    var displayCurrentWeather = function(){

    // setting current day weather city name and date
    var searchCityHeader = cityNameConverted;
    SearchCityHeader.innerHTML = searchCityHeader + " " + date;

    // setting the current days temp, wind, humidity and UV index
    document.getElementById("current_temp").innerHTML = "Temp: " + " " + currentTemperature + '&#8451';
    document.getElementById("current_wind").innerHTML = "Wind: " + " " + currentWind + 'MPH';
    document.getElementById("current_humidity").innerHTML = "Humidity: " + " " + currentHumidity;
    document.getElementById("current_UV_Index").textContent = currentUvIndex;

    // checking the value of the UV index and changing the background based on value
    var compareUvIndex = parseInt(currentUvIndex);
    if (compareUvIndex <5) {
        currentUVIndexPElement.style.backgroundColor = "#8FBC8F";
    } else if (compareUvIndex>5 && compareUvIndex <8 ){
        currentUVIndexPElement.style.backgroundColor = "yellow";
    } else if (compareUvIndex >8) {
        currentUVIndexPElement.style.backgroundColor = "red";
    }

    // changing the icon for the weather based on results returned from weather search
   var iconUrl = "https://openweathermap.org/img/w/" + currentDayIcon + ".png";
   currentForecastIcon.src = iconUrl;

    // displaying first day weather results in 5 day forecast and setting innerHTML
    nextDayDate.innerHTML = nextDateConverted;
    document.getElementById("next_day_temp").innerHTML = "Temp: " + nextDateTemp + '&#8451';
    document.getElementById("next_day_wind").innerHTML = "Wind: " + nextDateWind + 'MPH';
    document.getElementById("next_day_humidity").innerHTML = "Humidity: " + nextDateHumidity;

    // setting first day in 5 day forecast weather icon
    var iconUrl = "https://openweathermap.org/img/w/" + nextdayIcon + ".png";
    NextForecastIcon.src = iconUrl;

    
    // displaying second day weather results in 5 day forecast and setting innerHTML
    secondDayDate.innerHTML = secondForecastDate;
    document.getElementById("second_forecast_temp").innerHTML = "Temp: " + secondForecastTemp + '&#8451';
    document.getElementById("second_forecast_wind").innerHTML = "Wind: " + secondForecastWind + 'MPH';
    document.getElementById("second_forecast_humidity").innerHTML = "Humidity: " + secondForecastHumidity;

    // setting second day in 5 day forecast weather icon
    var secondIconUrl = "https://openweathermap.org/img/w/" + seconDayIcon + ".png";
    secondForecastIcon.src = secondIconUrl;
   
    // displaying third day weather results in 5 day forecast and setting innerHTML
    thirdDayDate.innerHTML = thirdForecastDate;
    document.getElementById("third_forecast_temp").innerHTML = "Temp: " + thirdForecastTemp + '&#8451';
    document.getElementById("third_forecast_wind").innerHTML = "Wind: " + thirdForecastWind + 'MPH';
    document.getElementById("third_forecast_humidity").innerHTML = "Humidity: " + thirdForecastHumidity;

    // setting third day in 5 day forecast weather icon
    var thirdIconUrl = "https://openweathermap.org/img/w/" + thirdDayIcon + ".png";
    thirdForecastIcon.src = thirdIconUrl;
    
     // displaying fourth day weather results in 5 day forecast and setting innerHTML
    fourthDayDate.innerHTML = fourthForecastDate;
    document.getElementById("fourth_forecast_temp").innerHTML = "Temp: " + fourthForecastTemp + '&#8451';
    document.getElementById("fourth_forecast_wind").innerHTML = "Wind: " + fourthForecastWind+ 'MPH';
    document.getElementById("fourth_forecast_humidity").innerHTML = "Humidity: " + fourthForecastHumidity;

    // setting fourth day in 5 day forecast weather icon
    var fourthIconUrl = "https://openweathermap.org/img/w/" + fourthDayIcon + ".png";
    fourthForecastIcon.src = fourthIconUrl;

    // displaying fifth day weather results in 5 day forecast and setting innerHTML
    fifthDayDate.innerHTML = fifthForecastDate;
    document.getElementById("fifth_forecast_temp").innerHTML = "Temp: " + fifthForecastTemp + '&#8451';
    document.getElementById("fifth_forecast_wind").innerHTML = "Wind: " + fifthForecastWind+ 'MPH';
    document.getElementById("fifth_forecast_humidity").innerHTML = "Humidity: " + fifthForecastHumidity;

    // setting fifth day in 5 day forecast weather icon
    var fifthIconUrl = "https://openweathermap.org/img/w/" + fifthDayIcon + ".png";
    fifthForecastIcon.src = fifthIconUrl;    
};


    // function to prevent page from refreshing
    var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault(); 
    }

    // function to call openweather API get weather information by city provided
    var getWeatherResults = function(citySearchEntered) {
    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + citySearchEnteredLat + "&lon=" + citySearchEnteredLong + "&units=metric&exclude=minutely&appid=" + apiKeyWeather;
   
    // fethcing data and JSON the data
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
        response.json().then(function(data){
            console.log(data);

            // set values for current day temperature, wind, humidity, UV index and conditions icon being pulled and set
            var temperature = data.current.temp;
            currentTemperature = temperature;

            var wind = data.current.wind_speed;
            currentWind = wind;

            var humidty = data.current.humidity;
            currentHumidity = humidty;

            var UvIndex = data.current.uvi;
            currentUvIndex = UvIndex;

            var currentIcon = data.current.weather[0].icon;
            currentDayIcon = currentIcon;

        
           
            // setting first day date in the 5 day forecast
            var NextDay = data.daily[1].dt;
            NextDayUnix = NextDay;
            ConvertUnixDate();

            // set values for next day in forecast temperature, wind, humidity and conditions icon being pulled and set
            var NextDayTemp = data.daily[1].temp.day;
            nextDateTemp = NextDayTemp;

            var NextDayWind = data.daily[1].wind_speed;
            nextDateWind = NextDayWind;

            var NextDayHumidity = data.daily[1].humidity;
            nextDateHumidity = NextDayHumidity;

            var nextdayconditions = data.daily[1].weather[0].icon;
            nextdayIcon = nextdayconditions;


            
            // setting second day date in the 5 day forecast
            var second_forecast = data.daily[2].dt;
           
             // set values for second day in forecast temperature, wind, humidity and conditions icon being pulled and set
            var secondDaytemp = data.daily[2].temp.day;
            secondForecastTemp = secondDaytemp;

            var secondDayWind = data.daily[2].wind_speed;
            secondForecastWind = secondDayWind;

            var secondDayHumidity = data.daily[2].humidity;
            secondForecastHumidity = secondDayHumidity;

            var secondDayConditions = data.daily[2].weather[0].icon;
            seconDayIcon = secondDayConditions;

            // setting third day date in the 5 day forecast
            var third_forecast = data.daily[3].dt;
            
             // set values for third day in forecast temperature, wind, humidity and conditions icon being pulled and set
            var thirdDayTemp = data.daily[3].temp.day;
            thirdForecastTemp = thirdDayTemp;

            var thirdDayWind = data.daily[3].wind_speed;
            thirdForecastWind = thirdDayWind;

            var thirdDayHumidity = data.daily[3].humidity;
            thirdForecastHumidity = thirdDayHumidity;

            var thirdDayConditions = data.daily[3].weather[0].icon;
            thirdDayIcon = thirdDayConditions;

            // fourth day forecast temperatures being pulled and set
            var fourth_forecast = data.daily[4].dt;
            
            // set values for fourth day in forecast temperature, wind, humidity and conditions icon being pulled and set
            var fourthDayTemp = data.daily[4].temp.day;
            fourthForecastTemp = fourthDayTemp;
   
            var fourthDayWind = data.daily[4].wind_speed;
            fourthForecastWind = fourthDayWind;
   
            var fourthDayHumidity = data.daily[4].humidity;
            fourthForecastHumidity = fourthDayHumidity;

            var fourthDayConditions = data.daily[4].weather[0].icon;
            fourthDayIcon = fourthDayConditions;

            // fourth day forecast temperatures being pulled and set
            var fifth_forecast = data.daily[5].dt;
        
            // set values for fourth day in forecast temperature, wind, humidity and conditions icon being pulled and set
            var fifthDayTemp = data.daily[5].temp.day;
            fifthForecastTemp = fifthDayTemp;
                   
            var fifthDayWind = data.daily[5].wind_speed;
            fifthForecastWind = fifthDayWind;
    
            var fifthDayHumidity = data.daily[5].humidity;
            fifthForecastHumidity = fifthDayHumidity;

            var fifthDayConditions = data.daily[5].weather[0].icon;
            fifthDayIcon = fifthDayConditions;

            // calling display weather results to page function
            displayCurrentWeather();
        });
        
    }
});
};

    // function call to API to get Longitude and Latitude of city entered
    var getLongLatResults = function(){
    var apiUrl="https://api.openweathermap.org/geo/1.0/direct?q=" + citySearchEntered +"&limit=1&appid=" + "feb921e24625822c8914d6709ecb623e";

    // fetching response and then storing into variables and setting to global variables
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
        response.json().then(function(data){
            console.log(data);
         var longitude = data[0].lon;
         citySearchEnteredLong = longitude;
         var latitude = data[0].lat;
         citySearchEnteredLat = latitude;

         // also fethcing city name, country and setting to variable
         var cityNameLabel = data[0].name;
         var cityCountry = data[0].country;
         cityNameConverted = cityNameLabel + ", " + cityCountry;

        // calling function to get weather information 
        getWeatherResults();
        });
    }
});

}

    // function to clear local storage search results

    var clearSavedSearchResults = function () {
     window.localStorage.clear();
        searchHistoryResults.innerHTML = "";
        window.alert("Search Results Cleared");
    }

    // function to handle button click and asign city name
    var buttonClickHandler = function() {
        // setting city name searched to variables
        var cityName = CityNameInput.value.trim();
        citySearchEntered = cityName
    
        // creating new li element with classes and setting innerHTML to city searched
        var search_results = document.createElement("li");
        search_results.classList = "d-flex search-results";
        search_results.setAttribute("id", cityName);
        search_results.innerHTML = cityName;
        searchHistoryResults.appendChild(search_results);

        // sending search city to local storage
        citySearches.push(cityName);
        localStorage.setItem("citySearches", JSON.stringify(citySearches));

    // calling API to get longitutude and latitude of city searched
    getLongLatResults();
}

// loading city searched results on page load
loadCitySearches();

// searchHistoryResults.addEventListener("click", loadcityresults);
CityNameInput.addEventListener("submit", formSubmitHandler);
SearchCityButton.addEventListener("click", buttonClickHandler);
clearSearchResults.addEventListener("click", clearSavedSearchResults);
