// DOM
const currencyList = document.getElementsByClassName('currency-list');
const currencies = document.getElementsByClassName('currencies');


// Function highlight only active currency
for(let i = 0; i < currencies.length; i++){
    currencies[i].addEventListener('click', function(){
        const current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace( " active", "");
        this.className += " active";
    });
}