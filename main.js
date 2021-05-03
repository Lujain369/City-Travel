let button= document.querySelector('#close_btn');
let inputValue= document.querySelector('#inputID');

let checkboxWeather = document.querySelector("#check1");
let checkboxAttractions = document.querySelector("#check2");
let checkboxAlpha = document.querySelector("#check3");

let Item3= document.querySelector('.item3');

//Today= är dagens datum.
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = String(today.getFullYear());

today = yyyy + mm + dd;

// Button är kopplat till knappen "sök", när man söker utan att ha kryssat i boxarna så kommer inget fram förutom Nothing2show.
button.addEventListener("click", function () {

  removeElement();

    if (!checkboxWeather.checked && !checkboxAttractions.checked) {
      let Nothing2show = document.createElement("h2");
      Nothing2show.innerHTML =
        "Inget att visa, checka något i checkboxarna!";
      Nothing2show.id = "noId";

      Item3.appendChild(Nothing2show); // placeras i diven Item3.
    }



if (checkboxWeather.checked) {
  console.log("city"+ inputValue.value);
  //fetchar fram  urlen som behövs, inputValue är sökboxen och value är vad användaren skriver in i sökboxen.
 fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+
 "&appid=ee6dd9a7c626a42fc312a735b559fe70&units=metric&lang=sv")
    .then(response=>response.json())
    .then(data=> {
      
      let nameValaue= data['name'];
      let tempValue= data['main']['temp'];
      let conditionValue= data['weather'][0]['description'];

    
        let cityName = document.createElement('h2');
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
        weatherOutput.appendChild (temp);
        weatherOutput.appendChild(condition);
        Item3.appendChild(weatherOutput);
    })

    .catch(err=> alert(err)); //Om användaren skriver in något som inte går att hitta så kommer det upp en alert.
  } 

  //Om  attracktionboxen är checkad så funkar if stasten annars...läs längre ner.
  if (checkboxAttractions.checked) {
    
   //fixar fram urlen från Foursquare men i XMLHttpRequest istället för fetch.
   const clientId = "J4MCXX0FXC0OB4DOCLMF3CMPUSWK3FXDQLWNPQFRN4Y3SGM3";
    const clientSecret = "KI5OXWD21JUZLOGVHTPSFJRCPQD1YC5XU0BLYK5AAYC1YYVQ";
   const cityName2 = inputValue.value;
   const todaysDate = today; //Dagens datum för att api ska funka.

   const venueUrl = new URL("https://api.foursquare.com/v2/venues/explore");
   venueUrl.searchParams.append("client_id", clientId);
   venueUrl.searchParams.append("client_secret", clientSecret);
   venueUrl.searchParams.append("near", cityName2);
   venueUrl.searchParams.append("v", todaysDate);
   venueUrl.searchParams.append("limit", 10);
   console.log(venueUrl);

   const venueRequest = new XMLHttpRequest();
   venueRequest.open("GET", venueUrl);
   venueRequest.responseType = "json";

    venueRequest.onload = function () {

     

      const venues = venueRequest.response.response.groups[0].items;
      let attractiosnOutPut= document.createElement("div");
      attractiosnOutPut.className = "attractionsDiv";

      let attractionsH2 = document.createElement("h2");
      attractionsH2.id = "attractionsH2";
      attractionsH2.innerHTML = "Attraktioner";

      let sortVenue = [];
      for (let i = 0; i < 10; i++) {
        sortVenue[i] = {
          Namn: venues[i].venue.name,
          Address: venues[i].venue.location,
        };
        console.log(sortVenue[i]);
      }
      //Fixar så attraktioner hamar i bokstavsording. 
     if (checkboxAlpha.checked) {
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

        } else { //Annars om användaren inte kryssar i för få allt i bostavording så placeras attraktioner bara sårdär, 10 st.
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

    } 
  });  
  
  // Checkboxen som sorterar efter bostavsordingen funkar bara om attraktionsboxen är ikryssat.
 checkboxAlpha.addEventListener("click", function () {
    if (checkboxAlpha.checked === true) {
        checkboxAttractions.checked = true;
    }
  });
  //Funktion är skapad för att ropas upp, den tar bort allt, vädret, staden, attraktioner. Ropas upp när inget av checkboxarna är ikryssat.
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
  