let button= document.querySelector('#close_btn');
let inputValue= document.querySelector('#inputClass');

let checkboxWeather = document.querySelector("#check1");
let checkboxAttractions = document.querySelector("#check2");
let checkboxAlpha = document.querySelector("#check3t");

let Item3= document.querySelector('.item3');

//dsgs
let parent = document.querySelector('.item3');
button.addEventListener('click', function(){
fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=ee6dd9a7c626a42fc312a735b559fe70&units=metric")
.then(response=>response.json())
//.then(data=> console.log(data))

.then(data=> {
 let nameValaue= data['name'];
 let tempValue= data['main']['temp'];
 let conditionValue= data['weather'][0]['description'];


 if (checkboxWeather.checked === true) {
    let cityName = document.createElement('h1');
    let temp = document.createElement('p');
    let condition = document.createElement('p');
    let weatherOutput = document.createElement("div");


    weatherOutput.id = "weatherOutput";

    cityName.id = "Cname";
    cityNames.innerHTML = nameValaue;

    temp.id = "Ctemp";
    temp.innerHTML = tempValue + " °C";

    condition.id = "CC";
    condition.innerHTML = conditionValue;

        
        
    weatherOutput.appendChild(cityName);
    weatherOutput.appendChild(temp);
     weatherOutput.appendChild(condition);
    Item3.appendChild(weatherOutput);
 
 }else {
        alert("Press weather checkbox to get weather information.");
        
        let removeDivWeather = document.querySelector("#weatherOutput");

        
        Item3.removeChild(removeDivWeather);   
    }

 
})

.catch(err=> alert("No City found!"))

})

//foursqure men i XMLHttpRequest
const clientId = "J4MCXX0FXC0OB4DOCLMF3CMPUSWK3FXDQLWNPQFRN4Y3SGM3";
const clientSecret = "KI5OXWD21JUZLOGVHTPSFJRCPQD1YC5XU0BLYK5AAYC1YYVQ";

const todaysDate = "20210212";

const venueUrl = new URL("https://api.foursquare.com/v2/venues/explore");
venueUrl.searchParams.append("client_id", clientId);
venueUrl.searchParams.append("client_secret", clientSecret);
venueUrl.searchParams.append("near", inputValue.value);
venueUrl.searchParams.append("v", todaysDate);
venueUrl.searchParams.append("limit", 10);
console.log(venueUrl);

const venueRequest = new XMLHttpRequest();
venueRequest.open("GET", venueUrl);
venueRequest.responseType = "json";

