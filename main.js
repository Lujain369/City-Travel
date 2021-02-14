let button= document.querySelector('#close_btn');
let inputValue= document.querySelector('#inputClass');

let checkboxWeather = document.querySelector("#check1");
let checkboxAttractions = document.querySelector("#check2");
let checkboxAlpha = document.querySelector("#check3");

let Item3= document.querySelector('.item3');

//dsgs

button.addEventListener("click", function () {
  removeElement();
    if (checkboxWeather.checked === false && checkboxAttractions.checked === false) {
      let Nothing2show = document.createElement("h2");
      Nothing2show.innerHTML =
        "No information to show. Check somthing in!";
      Nothing2show.id = "noId";
      Item3.appendChild(Nothing2show);
    }

  fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=ee6dd9a7c626a42fc312a735b559fe70&units=metric")
    .then(response=>response.json())
    .then(data=> console.log(data))
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

        cityName.id = "cityName";
        cityName.innerHTML = nameValaue;

        temp.id = "cityTemp";
        temp.innerHTML = tempValue + " °C";

        condition.id = "condition";
        condition.innerHTML = conditionValue;
 
        weatherOutput.appendChild(cityName);
        weatherOutput.appendChild(temp);
        weatherOutput.appendChild(condition);
        Item3.appendChild(weatherOutput);
 
      } else {
        alert("Press weather checkbox to get weather information.");
        
        let removeDivWeather = document.querySelector("#weatherOutput");
        Item3.removeChild(removeDivWeather);   
      }
    })

    .catch(err=> alert("No City found!"))

  //foursqure men i XMLHttpRequest istället för fetch
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

  if (checkboxAttractions.checked === true) {

    venueRequest.onload = function () {

      const venues = venueRequest.response.response.groups[0].items;
      let attractiosnOutPut= document.createElement("div");
      attractiosnOutPut.className = "attractionsDiv";

      let attractionsH2 = document.createElement("h2");
      attractionsH2.id = "attractionsH2";
      attractionsH2.innerHTML = "Attractions";

      let sortVenue = [];
      for (let i = 0; i < 10; i++) {
        sortVenue[i] = {
          Namn: venues[i].venue.name,
          Address: venues[i].venue.location,
        };
        console.log(sortVenue[i]);
      }
      
     if (checkboxAlpha.checked === true) {
            sortVenue.sort(function (a, b) {
            var x = a.Namn.toLowerCase();
            var y = b.Namn.toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
             return 0;
          });
           console.log(sortVenue);

          for (let i = 0; i < 10; i++) {
            let venuePick = sortVenue[i].Namn;
            let venueAddress = sortVenue[i].Address;
  
            let div = document.createElement("div");
            let attractionsH4 = document.createElement("h4");
            let address = document.createElement("p");
  
            div.id = "attractions";
            address.innerHTML = "<br>Address: <br>" + venueAddress.address;
            attractionsH4.innerHTML = sortVenue[i].Namn;
  
            Item3.appendChild(attractionsH2);
            div.appendChild(attractionsH4);
            div.appendChild(address);
            attractiosnOutPut.appendChild(div);
            Item3.appendChild(attractiosnOutPut);
            console.log(`${venuePick.name}`);
          }

        } else {
            for (let i = 0; i < 10; i++) {
              let venuePick = venues[i].venue;
              let venueAddress = venues[i].venue.location;
    
              let div = document.createElement("div");
              let attractionsH4 = document.createElement("h4");
              let address = document.createElement("p");
    
              
              div.id = "attractions";
              address.innerHTML = "<br>Address: <br>" + venueAddress.address;
              attractionsH4.innerHTML = venuePick.name;
    
              Item3.appendChild(attractionsH2);
              div.appendChild(attractionsH4);
              div.appendChild(address);
              attractiosnOutPut.appendChild(div);
              Item3.appendChild(attractiosnOutPut);
              console.log(`${venuePick.name}`);
            }
          }
        };

        venueRequest.send();

    } else {
      alert("Press attraction checkbox to get attractions.");
      let removeAttrHeader = document.querySelector("#attractionsH2");
      let removeAttrOutput = document.querySelector(".attractionsDiv");
      Item3.removeChild(removeAttrOutput);
      Item3.removeChild(removeAttrHeader);
    }
  });  
  checkboxAlpha.addEventListener("click", function () {
    if (checkboxAlpha.checked === true) {
        checkboxAttractions.checked = true;
    }
  });
  
  function removeElement() {
    let removeWeather = document.querySelectorAll("#weatherOutput");
    let removeHeader = document.querySelectorAll("#attractionsH2");
    let topattr = document.querySelectorAll("#attractions");
    let removeAttrDiv = document.querySelectorAll(".attractionsDiv");
    let removeNoOptions = document.querySelectorAll("#noId");
    for (var i = 0; i < topattr.length; i++) {
      topattr[i].remove();
    }
    for (var x = 0; x < removeWeather.length; x++) {
      removeWeather[x].remove();
    }
    for (var y = 0; y < removeHeader.length; y++) {
      removeHeader[y].remove();
    }
    for (var y = 0; y < removeAttrDiv.length; y++) {
      removeAttrDiv[y].remove();
    }
    for (var y = 0; y < removeNoOptions.length; y++) {
      removeNoOptions[y].remove();
    }
  }
  