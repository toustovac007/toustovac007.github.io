const listOfCountries = document.getElementById("listOfCountries");
const continent = document.getElementById("continent");
const modalBody = document.getElementById("modalBodyContent");
const modalHeader = document.getElementById("modalHeaderContent");
const modal = new bootstrap.Modal(document.getElementById("one-country"));



function loadCountries(region) {
    listOfCountries.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let allCountiesArray = data;
        data.forEach((country) => {
            let blockCountry = `<div class=" col-xl-2 col-lg-3 col-md-4 col-sm-6">
                        <div class="card">
                                <img class="card-img-top" src="${country.flags.png}" alt="Vlajka ${country.name.common}" />
                            <div class="card-body">
                                <h4 class="card-title"><a href="#">${country.name.common}</a></h4>
                                <p class="card-text">Hlavní město: <b>${country.capital[0]}</b></p>
                                <p><button class="btn btn-info"  data-name = "${country.name.common}" >Informace</button></p>
                                
                            </div>
                        </div>
                        </div> `
            listOfCountries.innerHTML += blockCountry;
        });

        document.querySelectorAll('button[data-name]').forEach(button => {
            button.addEventListener("click", () => {
                const countryName = button.getAttribute("data-name");
                modal.show();
                fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText-true`)
                .then(res => res.json())
                .then(data => {console.log(data);
                    const country = data[0];
                    const firstCurrency = Object.values(country.currencies)[0];
                    const firstCurrencyName = firstCurrency.name;
                    const firstCurrencySymbol = firstCurrency.symbol;
                    let flagInfo = country.flags.alt;
                    modalBody.innerHTML = `  <p> <strong>Main currency:</strong>         ${firstCurrencyName}        <strong>(${firstCurrencySymbol})</strong></p>`


                    if (flagInfo) {
                        modalBody.innerHTML += `<p> <strong>Info about flag:</strong>       ${flagInfo}</p>`
                    }


                    modalBody.innerHTML += `<p> <strong>Neighbours:</strong>`





                    for (let i = 0; i < country.borders.length; i++) {
                        const param = country.borders[i];
                        let neighboursName;

                        for (let j = 0; j < allCountiesArray.length; j++) {
                            if (param == allCountiesArray[j].cca3) {
                                modalBody.innerHTML += `${allCountiesArray[j].name.common}`;
                                break;
                            }
                        }

                        if (i != country.borders.length - 1) {
                            modalBody.innerHTML += `, `;
                        }
                        
                    }
      
                    modalBody.innerHTML += `</p>`

                    modalBody.innerHTML += `<p> <strong>Area:</strong></p><p> Area of ${country.name.common} is ${country.area} Km&sup2;</p>`;

                    modalBody.innerHTML += `<p> <strong>Population:</strong></p><p> There live aproximatly ${country.population} people in ${country.name.common}.</p>`;

                    let officialName = country.name.official;
                    let commonName = country.name.common;

                    if (officialName) {
                                       modalHeader.innerHTML= `<h4 class="modal-title">${officialName}</h4>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>`     
                    }else { modalHeader.innerHTML= `<h4 class="modal-title">${commonName}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>` }










                })
                .catch(error => {
                    console.log(error);})
            });
        });
    }).catch(error => {
        console.log(error);
    })
}



loadCountries("europe");

continent.addEventListener("change", function(event) {
   console.log( event.target.value);
   loadCountries( event.target.value);
});