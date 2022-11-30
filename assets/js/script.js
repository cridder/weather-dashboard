// 20221129
function listCityCreate(listCitySearch) {
  //   empty list
  $("#list-of-cities").empty();
  // get
  var keys = Object.keys(listCitySearch);
  for (var i = 0; i < keys.length; i++) {
    var listCityEntry = $("<button>");
    // add classes
    listCityEntry.addClass("list-group-item list-group-item-action");
    // split and case
    var strSplit = keys[i].toLowerCase().split(" ");
    for (var j = 0; j < strSplit.length; j++) {
      strSplit[j] =
        strSplit[j].charAt(0).toUpperCase() + strSplit[j].substring(1);
    }
    var cityCasedTitle = strSplit.join(" ");
    // change to title case
    listCityEntry.text(cityCasedTitle);
    // append list
    $("#list-of-cities").append(listCityEntry);
  }
  //   end for
}
// end function
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
      }).then(function (uvIndex) {
        var displayUvIndex = $("<button>");
        displayUvIndex.addClass("btn btn-danger");
        $("#uvIndexCur").text("UV Index: ");
        $("#uvIndexCur").append(displayUvIndex.text(uvIndex[0].value));
        $.ajax({
          url: apiPath2,
          method: "GET",
        }).then(function (forecast) {
          for (var i = 6; i < forecast.list.length; i += 8) {
            var forecastDate = $("<h5>");
            var forecastPosition = (i + 2) / 8;
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
            $("#temp-forecast" + forecastPosition).text(
              "Temp: " + forecast.list[i].main.temp + " °F"
            );
            $("#humid-forecast" + forecastPosition).text(
              "Humidity: " + forecast.list[i].main.humidity + "%"
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