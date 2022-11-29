// fillout form with search
//  C:\Users\cjrid\Dropbox\__bootcampuofo\UofO-VIRT-FSF-PT-10-2022-U-LOLC\01-Class-Content\05-Third-Party-APIs\01-Activities\22-Stu_jQuery-UI-Widgets\Solved\assets\js


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
    return city.name.match(regexApi) || city.state.match(regexApi);
    // return city.name.match(regexApi);
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