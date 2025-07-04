const base_url="https://v6.exchangerate-api.com/v6/d0d8af7f17301180a90ff788/latest"

const dropdowns = document.querySelectorAll(".dropdown select"); // Fixed typo in variable name
const btn= document.querySelector(".dropdown button")
const toCurr = document.querySelector(".to select")
const fromCurr=document.querySelector(".from select");
const msg = document.getElementById("convertedAmount");
for (let select of dropdowns) {
    for (let currCode of Object.keys(countryList)) { // Ensure proper iteration over countryList keys
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name=="from" && currCode==="USD"){
            newOption.selected="selected";
        } else if(select.name=="to" && currCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal= amount.value;
    if(amtVal==="" || amtVal<1){
        console.log("error")
    }
    const URL= `${base_url}/${fromCurr.value.toUpperCase()}`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value.toUpperCase()];
    console.log(rate);
    console.log(data);
    let finalAmount = amtVal * rate;
    msg.placeholder= `${finalAmount}`;

})

