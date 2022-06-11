var citySearches = [];

var CityNameInput = document.querySelector("#input-city");
var SearchCityButton = document.querySelector("#search-button");
var SearchCityHeader = document.querySelector("#search-city");
var currentTemperatureUL = document.querySelector("#current_temp_conditions");
var nextDayDate = document.querySelector("#next_day_date");
var secondDayDate = document.querySelector("#second_forecast_date");
var thirdDayDate = document.querySelector("#third_forecast_date");
var fourthDayDate = document.querySelector("#fourth_forecast_date");
var fifthDayDate = document.querySelector("#fifth_forecast_date");
var CurrentDate = document.querySelector("#current_date");
var searchHistoryResults = document.querySelector("#search_history_results");


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

// third forecast day variables
var thirdForecastDate = "";
var thirdForecastTemp = "";
var thirdForecastWind = "";
var thirdForecastHumidity = "";
var thirdForecastConditions = "";

// fourth forecast day variables
var fourthForecastDate = "";
var fourthForecastTemp = "";
var fourthForecastWind = "";
var fourthForecastHumidity = "";
var fourthForecastConditions = "";

// fifth forecast day variables
var fifthForecastDate = "";
var fifthForecastTemp = "";
var fifthForecastWind = "";
var fifthForecastHumidity = "";
var fifthForecastConditions = "";



// variables for API keys
var apiKeyWeather = "feb921e24625822c8914d6709ecb623e";
var apiLongLat = "90229593ed55301c5055408148765137"

// longtitude and latitude variables
var longitude = "43.65";
var latitude = "79.38";

// date format
var date = $.datepicker.formatDate("(d/ m/ yy)", new Date())



    // function to load previous search results
    // task text was clicked
    $(".list-group").on("click", "li", function() {
        // get current text of li element
        var text = $(this)
        .text()
        .trim();

        citySearchEntered = text;
        getLongLatResults();
    });

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
    var dayThree = date.getDate()+2;
    var dayFour = date.getDate()+3;
    var dayFive = date.getDate()+4;

    //Display date and time in DD-MM-yyyy format

    var convdataTime =  day +"/" + month + "/" + year ;
        nextDateConverted = convdataTime;
        console.log("the converted date is now" +convdataTime); 

    // convert date for second day forecast
    var convertdateSecond = dayTwo +"/" + month + "/" + year ;
        secondForecastDate = convertdateSecond;
        console.log("the converted second date is now" + convertdateSecond); 

    // convert daye for third day forecast
    var convertdateThird = dayThree +"/" + month + "/" + year ;
        thirdForecastDate = convertdateThird;
        console.log("the converted third date is now" + convertdateThird); 

    // convert date for fourth day forecast
    var convertdatefourth = dayFour +"/" + month + "/" + year ;
        fourthForecastDate = convertdatefourth;
        console.log("the converted fourth date is now" + convertdatefourth);

    // convert date for fifth day forecast
    var convertdatefifth = dayFive +"/" + month + "/" + year ;
        fifthForecastDate = convertdatefifth;
        console.log("the converted fifth date is now" + convertdatefifth);


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

    secondDayDate.innerHTML = secondForecastDate;
    document.getElementById("second_forecast_temp").innerHTML = "Temp: " + secondForecastTemp + '&#8451';
    document.getElementById("second_forecast_wind").innerHTML = "Wind: " + secondForecastWind + 'MPH';
    document.getElementById("second_forecast_humidity").innerHTML = "Humidity: " + secondForecastHumidity;

    var secondForecastIcon = document.getElementById("second_forecast_icon")
    if (secondForecastConditions === "rain"){
         secondForecastIcon.dataset.icon = "fa-solid:cloud-rain";
    } else if (secondForecastConditions === "cloudy"){
        secondForecastIcon.dataset.icon = "fluent:weather-cloudy-48-filled";
    } else  secondForecastIcon.dataset.icon ="material-symbols:wb-sunny-outline-rounded";


    // displaying day 3 of 5 day forecast

    thirdDayDate.innerHTML = thirdForecastDate;
    document.getElementById("third_forecast_temp").innerHTML = "Temp: " + thirdForecastTemp + '&#8451';
    document.getElementById("third_forecast_wind").innerHTML = "Wind: " + thirdForecastWind + 'MPH';
    document.getElementById("third_forecast_humidity").innerHTML = "Humidity: " + thirdForecastHumidity;

    var thirdForecastIcon = document.getElementById("third_forecast_icon")
    if (thirdForecastConditions === "rain"){
         thirdForecastIcon.dataset.icon = "fa-solid:cloud-rain";
    } else if (thirdForecastConditions === "cloudy"){
        thirdForecastIcon.dataset.icon = "fluent:weather-cloudy-48-filled";
    } else  thirdForecastIcon.dataset.icon ="material-symbols:wb-sunny-outline-rounded";

    // displaying day 4 of 5 forecast

    fourthDayDate.innerHTML = fourthForecastDate;
    document.getElementById("fourth_forecast_temp").innerHTML = "Temp: " + fourthForecastTemp + '&#8451';
    document.getElementById("fourth_forecast_wind").innerHTML = "Wind: " + fourthForecastWind+ 'MPH';
    document.getElementById("fourth_forecast_humidity").innerHTML = "Humidity: " + fourthForecastHumidity;

    var fourthForecastIcon = document.getElementById("fourth_forecast_icon")
    if (fourthForecastConditions === "rain"){
         fourthForecastIcon.dataset.icon = "fa-solid:cloud-rain";
    } else if (fourthForecastConditions === "cloudy"){
        fourthForecastIcon.dataset.icon = "fluent:weather-cloudy-48-filled";
    } else  fourthForecastIcon.dataset.icon ="material-symbols:wb-sunny-outline-rounded";

    // displaying day 5 of 5 forecast
    fifthDayDate.innerHTML = fifthForecastDate;
    document.getElementById("fifth_forecast_temp").innerHTML = "Temp: " + fifthForecastTemp + '&#8451';
    document.getElementById("fifth_forecast_wind").innerHTML = "Wind: " + fifthForecastWind+ 'MPH';
    document.getElementById("fifth_forecast_humidity").innerHTML = "Humidity: " + fifthForecastHumidity;

    var fifthForecastIcon = document.getElementById("fifth_forecast_icon")
    if (fifthForecastConditions === "rain"){
         fifthForecastIcon.dataset.icon = "fa-solid:cloud-rain";
    } else if (fifthForecastConditions === "cloudy"){
        fifthForecastIcon.dataset.icon = "fluent:weather-cloudy-48-filled";
    } else  fifthForecastIcon.dataset.icon ="material-symbols:wb-sunny-outline-rounded";

};

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

            // third day forecast temperatures being pulled and set

            var third_forecast = data.daily[3].dt;
            console.log("The Third Day in Unix format is" + third_forecast);
            
            var thirdDayTemp = data.daily[3].temp.day;
            thirdForecastTemp = thirdDayTemp;
            console.log("the third day tempearture is " + thirdDayTemp);

            var thirdDayWind = data.daily[3].wind_speed;
            thirdForecastWind = thirdDayWind;
            console.log("The third day wind is " + thirdDayWind);

            var thirdDayHumidity = data.daily[3].humidity;
            thirdForecastHumidity = thirdDayHumidity;
            console.log("The third day humidity is " + thirdDayHumidity);

            var thirdDayClouds = parseInt(data.daily[3].clouds);
            var thirdDayRain = parseFloat((data.daily[3].pop).toFixed(2));

            // checking to see chance of clouds, rain or sun
            if (thirdDayClouds >50) {
                thirdForecastConditions ="cloudy";
            } else if (thirdDayRain > 0.60) {
                thirdForecastConditions = "rain";
            } else thirdForecastConditions = "sunny";
            console.log("Cloudiness is " + thirdDayClouds + ". Third Day Rain is " + thirdDayRain + ". Third Day conditions are " + thirdForecastConditions );


               // fourth day forecast temperatures being pulled and set

               var fourth_forecast = data.daily[4].dt;
               console.log("The Fourth Day in Unix format is" + fourth_forecast);
               
               var fourthDayTemp = data.daily[4].temp.day;
               fourthForecastTemp = fourthDayTemp;
               console.log("the fourth day tempearture is " + fourthDayTemp);
   
               var fourthDayWind = data.daily[4].wind_speed;
               fourthForecastWind = fourthDayWind;
               console.log("The fourth day wind is " + fourthDayWind);
   
               var fourthDayHumidity = data.daily[4].humidity;
               fourthForecastHumidity = fourthDayHumidity;
               console.log("The fourth day humidity is " + fourthDayHumidity);
   
               var fourthDayClouds = parseInt(data.daily[4].clouds);
               var fourthDayRain = parseFloat((data.daily[4].pop).toFixed(2));
   
               // checking to see chance of clouds, rain or sun
               if (fourthDayClouds >50) {
                   fourthForecastConditions ="cloudy";
               } else if (fourthDayRain > 0.60) {
                   fourthForecastConditions = "rain";
               } else fourthForecastConditions = "sunny";
               console.log("Cloudiness is " + fourthDayClouds + ". Fourth Day Rain is " + fourthDayRain + ". Fourth Day conditions are " + fourthForecastConditions );
            
            
                // fifth day forecast temperatures being pulled and set

                var fifth_forecast = data.daily[5].dt;
                console.log("The Fifth Day in Unix format is" + fifth_forecast);
                
                var fifthDayTemp = data.daily[5].temp.day;
                fifthForecastTemp = fifthDayTemp;
                console.log("the fifth day tempearture is " + fifthDayTemp);
    
                var fifthDayWind = data.daily[5].wind_speed;
                fifthForecastWind = fifthDayWind;
                console.log("The fifth day wind is " + fifthDayWind);
    
                var fifthDayHumidity = data.daily[5].humidity;
                fifthForecastHumidity = fifthDayHumidity;
                console.log("The fifth day humidity is " + fifthDayHumidity);
    
                var fifthDayClouds = parseInt(data.daily[5].clouds);
                var fifthDayRain = parseFloat((data.daily[5].pop).toFixed(2));
    
                // checking to see chance of clouds, rain or sun
                if (fifthDayClouds >50) {
                    fifthForecastConditions ="cloudy";
                } else if (fifthDayRain > 0.60) {
                    fifthForecastConditions = "rain";
                } else fifthForecastConditions = "sunny";
                console.log("Cloudiness is " + fifthDayClouds + ". fifth Day Rain is " + fifthDayRain + ". Fifth Day conditions are " + fifthForecastConditions );
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
    var search_results = document.createElement("li");
    search_results.classList = "d-flex search-results";
    search_results.setAttribute("id", cityName);
    search_results.innerHTML = cityName;
    searchHistoryResults.appendChild(search_results);
    citySearches.push(cityName);
    localStorage.setItem("citySearches", JSON.stringify(citySearches));

    getLongLatResults();
}



// searchHistoryResults.addEventListener("click", loadcityresults);
CityNameInput.addEventListener("submit", formSubmitHandler);
SearchCityButton.addEventListener("click", buttonClickHandler);
