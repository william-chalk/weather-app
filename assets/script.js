// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//Date 
//Temp main.temp
//Wind wind.speed
//Humidity main.humidity
//UV Index 


function searchBtnClick (){

    $(".searchBtn").on("click",function(){
        var userInput = document.getElementById("searchCity").value;
        localStorage.setItem("city",userInput);
        let weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&cnt=6&units=imperial&appid=ed9ef953ef6521e093fab28917034f9e";

        var date = moment(new Date());
        var displayDate = date.format("MMMM Do YYYY")
        console.log(displayDate);
        var weatherDisplay = document.getElementById("weatherDisplayPanel");
        var weatherCard = document.getElementById("weatherCard");
        console.log(JSON.stringify(userInput));
    
        fetch(weatherAPI)
        .then(function(response){
            return response.json();
        })
        .then((weather)=> 
        console.log(weather),
        );

    });
}

searchBtnClick();