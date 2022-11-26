// fillout form with search
//  C:\Users\cjrid\Dropbox\__bootcampuofo\UofO-VIRT-FSF-PT-10-2022-U-LOLC\01-Class-Content\05-Third-Party-APIs\01-Activities\22-Stu_jQuery-UI-Widgets\Solved\assets\js

// var obj = "./assets/json/city.list.json";
// console.log(obj);
// var json = JSON.stringify(obj);
// console.log(json);


var request = new XMLHttpRequest();
request.open("GET", "../assets/json/city.list.json", false);
request.send(null);
var jsonData = JSON.parse(request.responseText);
console.log(jsonData);
console.log("spacer");
console.log("spacer");
console.log("spacer");
console.log("spacer");
var json = JSON.stringify(jsonData);
console.log(json);
console.log("spacer");
console.log("spacer");
console.log("spacer");
console.log("spacer");


var request = new XMLHttpRequest();
request.open("GET", "../assets/json/city.list.json", false);
request.send(null);
request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    var my_JSON_object = JSON.parse(request.responseText);
    console.log(my_JSON_object);
  }
};
