//start screen fade effect
let splash = document.querySelector(".splash");

document.addEventListener("DOMContentLoaded" , (e)=>{
    setTimeout(()=>{
        splash.classList.add('display-none');
    }, 2000)
})


//main geoLocation funciton
const button = document.querySelector("button");
const apiKEY = "cae773336c1749b38bfcea6874a6813c";

button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerText = "Your browser not support";
    }
});

function onSuccess(position){
    button.innerText = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKEY}`)
    .then(response => response.json()).then(response => {
         let allDetails = response.results[0].components;
         console.table(allDetails);
         let {county, postcode, country} = allDetails;
         button.innerText = `${county} ${postcode} , ${postcode}`;
    }).catch(() => {
        button.innerText = "Something went wrong :(";
    })
}

function onError(error){
    if(error.code == 1){
        button.innerText = "You denied the request.";
    }
    else if(error.code == 2){
        button.innerText = "Location is unavailable";
    }else{
        button.innerHTML = "Something went wrong :(";
    }
    button.setAttribute("disabled", "true");
}