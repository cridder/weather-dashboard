function listCityCreate(listCitySearch) {
  $("#list-of-cities").empty();

  var keys = Object.keys(listCitySearch);
  for (var i = 0; i < keys.length; i++) {
    var listCityEntry = $("<button>");
    listCityEntry.addClass("list-group-item list-group-item-action");

    var strSplit = keys[i].toLowerCase().split(" ");
    for (var j = 0; j < strSplit.length; j++) {
      strSplit[j] =
        strSplit[j].charAt(0).toUpperCase() + strSplit[j].substring(1);
    }
    var cityCasedTitle = strSplit.join(" ");
    listCityEntry.text(cityCasedTitle);

    $("#list-of-cities").append(listCityEntry);
  }
}

function cityWeatherPopulate(city, listCitySearch) {
  listCityCreate(listCitySearch);

  var apiPath =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=25e022a68ce9b9dd4feb0b7c12b233fc&q=" +
    city;

  var apiPath2 =
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=25e022a68ce9b9dd4feb0b7c12b233fc&q=" +
    city;

  var cityLatitude;

  var cityLongitude;

  $.ajax({
    url: apiPath,
    method: "GET",
  })
    // Store all of the retrieved data inside of an object called "weather"
    .then(function (weather) {
      // Log the apiPath
      console.log(apiPath);

      // Log the resulting object
      console.log(weather);

      var nowMoment = moment();

      var displayMoment = $("<h3>");
      $("#city-name").empty();
      $("#city-name").append(
        displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
      );

      var nameCity = $("<h3>").text(weather.name);
      $("#city-name").prepend(nameCity);

      var iconWeather = $("<img>");
      iconWeather.attr(
        "src",
        "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
      );
      $("#cur-icon").empty();
      $("#cur-icon").append(iconWeather);

      $("#cur-temp").text("Temperature: " + weather.main.temp + " °F");
      $("#cur-humid").text("Humidity: " + weather.main.humidity + "%");
      $("#cur-wind").text("Wind Speed: " + weather.wind.speed + " MPH");

      cityLatitude = weather.coord.lat;
      cityLongitude = weather.coord.lon;

      var apiPath3 =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=25e022a68ce9b9dd4feb0b7c12b233fc&q=" +
        "&lat=" +
        cityLatitude +
        "&lon=" +
        cityLongitude;

      $.ajax({
        url: apiPath3,
        method: "GET",
        // Store all of the retrieved data inside of an object called "uvIndex"
      }).then(function (uvIndex) {
        console.log(uvIndex);

        var displayUvIndex = $("<button>");
        displayUvIndex.addClass("btn btn-danger");

        $("#uvIndexCur").text("UV Index: ");
        $("#uvIndexCur").append(displayUvIndex.text(uvIndex[0].value));
        console.log(uvIndex[0].value);

        $.ajax({
          url: apiPath2,
          method: "GET",
          // Store all of the retrieved data inside of an object called "forecast"
        }).then(function (forecast) {
          console.log(apiPath2);

          console.log(forecast);
          // Loop through the forecast list array and display a single forecast entry/time (5th entry of each day which is close to the highest temp/time of the day) from each of the 5 days
          for (var i = 6; i < forecast.list.length; i += 8) {
            // 6, 14, 22, 30, 38
            var forecastDate = $("<h5>");

            var forecastPosition = (i + 2) / 8;

            console.log("#forecast-date" + forecastPosition);

            $("#forecast-date" + forecastPosition).empty();
            $("#forecast-date" + forecastPosition).append(
              forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
            );

            var forecastIcon = $("<img>");
            forecastIcon.attr(
              "src",
              "https://openweathermap.org/img/w/" +
                forecast.list[i].weather[0].icon +
                ".png"
            );

            $("#icon-forecast" + forecastPosition).empty();
            $("#icon-forecast" + forecastPosition).append(forecastIcon);

            console.log(forecast.list[i].weather[0].icon);

            $("#temp-forecast" + forecastPosition).text(
              "Temp: " + forecast.list[i].main.temp + " °F"
            );
            $("#humid-forecast" + forecastPosition).text(
              "Humidity: " + forecast.list[i].main.humidity + "%"
            );

            $(".forecast").attr(
              "style",
              "background-color:dodgerblue; color:white"
            );
          }
        });
      });
    });
}

$(document).ready(function () {
  var stringSearchCityList = localStorage.getItem("listCitySearch");

  var listCitySearch = JSON.parse(stringSearchCityList);

  if (listCitySearch == null) {
    listCitySearch = {};
  }

  listCityCreate(listCitySearch);

  $("#cur-weather").hide();
  $("#forecast-weather").hide();

  $("#srchbutton").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim().toLowerCase();

    if (city != "") {
      //Check to see if there is any text entered

      listCitySearch[city] = true;
      localStorage.setItem("listCitySearch", JSON.stringify(listCitySearch));

      cityWeatherPopulate(city, listCitySearch);

      $("#cur-weather").show();
      $("#forecast-weather").show();
    }
  });

  $("#list-of-cities").on("click", "button", function (event) {
    event.preventDefault();
    var city = $(this).text();

    cityWeatherPopulate(city, listCitySearch);

    $("#cur-weather").show();
    $("#forecast-weather").show();
  });
});
