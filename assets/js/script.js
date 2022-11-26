// fillout form with search
//  C:\Users\cjrid\Dropbox\__bootcampuofo\UofO-VIRT-FSF-PT-10-2022-U-LOLC\01-Class-Content\05-Third-Party-APIs\01-Activities\22-Stu_jQuery-UI-Widgets\Solved\assets\js

// var obj = "./assets/json/city.list.json";
// console.log(obj);
// var json = JSON.stringify(obj);
// console.log(json);

// get city list data from json file
          // var request = new XMLHttpRequest();
          // request.open("GET", "../assets/json/city.list.json", false);
          // request.send(null);
          // var jsonData = JSON.parse(request.responseText);
          // console.log(jsonData);
          // console.log("spacer");
          // console.log("spacer");
          // console.log("spacer");
          // console.log("spacer");
          // var json = JSON.stringify(jsonData);
          // console.log(json);
          // console.log("spacer");
          // console.log("spacer");
          // console.log("spacer");
          // console.log("spacer");

          // var request = new XMLHttpRequest();
          // request.open("GET", "../assets/json/city.list.json", false);
          // request.send(null);
          // request.onreadystatechange = function () {
          //   if (request.readyState === 4 && request.status === 200) {
          //     var my_JSON_object = JSON.parse(request.responseText);
          //     console.log(my_JSON_object);
          //   }
          // };

//
// search state example
// const search = document.getElementById("search");
// const matchList = document.getElementById("match-list");

// search json file and filter it
// const searchStates = async (searchText) => {
//   const res = await fetch("../assets/json/state_capitals.json");
//   const states = await res.json();
//   // get matches to current text input
//   let matches = states.filter((state) => {
//     const regex = new RegExp(`^${searchText}`, "gi");
//     return state.name.match(regex) || state.abbr.match(regex);
//   });
//   // if length 0 then array is empty
//   if (searchText.length === 0) {
//     matches = [];
//     matchList.innerHTML = "";
//   }
//   console.log(matches);
//   outputHtml(matches);
// };

//
// search api example
const search = document.getElementById("search");
const matchListApi = document.getElementById("match-list");

// search json file and filter it
const searchApi = async (searchText) => {
  const resApi = await fetch("../assets/json/city.list.json");
  const statesApi = await resApi.json();
  // get matches to current text input
  let matches = statesApi.filter((city) => {
    const regexApi = new RegExp(`^${searchText}`, "gi");
    // return city.name.match(regexApi) || city.state.match(regexApi);
    return city.name.match(regexApi);
  });
  // if length 0 then array is empty
  if (searchText.length === 0) {
    matches = [];
    // matchListApi.innerHTML = "";
  }
  console.log(matches);
  // outputHtml(matches);
};

//  show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>lat: ${match.lat} / long: ${match.long}</small>
        </div>
        `
      )
      .join("");
    console.log(html);
    // matchList.innerHTML = html;
  }
};

// Autocomplete widget
$(function () {
  var cityNames = [
    'Bootstrap',
    'C',
    'C++',
    'CSS',
    'Express.js',
    'Git',
    'HTML',
    'Java',
    'JavaScript',
    'jQuery',
    'JSON',
    'MySQL',
    'Node.js',
    'NoSQL',
    'PHP',
    'Python',
    'React',
    'Ruby',
  ];
  $("#search").autocomplete({
    source: cityNames,
  });
});

search.addEventListener("input", () => searchApi(search.value));
