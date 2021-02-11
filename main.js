let button= document.querySelector('#close_btn');
let inputValue= document.querySelector('#inputClass');

let parent = document.querySelector('.item3');
button.addEventListener('click', function(){
    
fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=ee6dd9a7c626a42fc312a735b559fe70&units=metric")
.then(response=>response.json())
//.then(data=> console.log(data))

.then(data=> {
 let nameValaue= data['name'];
 let tempValue= data['main']['temp'];
 let conditionValue= data['weather'][0]['description'];

let namn = document.createElement('h2');
let temp = document.createElement('p');
let condition = document.createElement('p');

 namn.innerHTML = nameValaue;
 temp.innerHTML = tempValue + " °C";
 condition.innerHTML = conditionValue;

 parent.appendChild(namn);
 parent.appendChild(temp);
 parent.appendChild(condition);
})

.catch(err=> alert("No City found!"))

})