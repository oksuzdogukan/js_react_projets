const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const countryInfo = document.querySelector(".country-info");

async function searchCountry(country){
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
        let data = await res.json();
        console.log(data);

        document.querySelector(".country-img").src = data[0].flags.png;
        document.querySelector(".country-name").innerHTML = data[0].name.common;
        document.querySelector(".country-capital").innerHTML = data[0].capital;
        if(data[0].continents.length > 1){
            document.querySelector(".country-continents").innerHTML = data[0].continents[0] + ", " + data[0].continents[1];
        }else{
            document.querySelector(".country-continents").innerHTML = data[0].continents;
        }
        document.querySelector(".country-population").innerHTML = data[0].population;
        document.querySelector(".country-currencies").innerHTML = data[0].currencies[Object.keys(data[0].currencies)].name + " - " + Object.keys(data[0].currencies);
        document.querySelector(".country-languages").innerHTML = Object.values(data[0].languages).toString().split(",").join(", ");

        countryInfo.style.display = "block";
        document.querySelector(".search-error").style.display = "none";
    }

    
     catch (error) {
        document.querySelector(".search-error").style.display = "block";
        console.log(error);
    }
   
}

searchBtn.addEventListener("click", () => {
    searchCountry(searchInput.value);
});
searchInput.addEventListener("keyup", (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
        searchBtn.click();
    }
})