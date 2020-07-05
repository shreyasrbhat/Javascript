let convertFahrenheitToCelsius = function(fahrenheit){
     let celsius = (fahrenheit - 32) * 5 / 9
     return celsius
}

let calculateTip = function (total, tip){
    tip_amount = (tip/100) * total
    return tip_amount
}

value1 = convertFahrenheitToCelsius(32)
value2 = convertFahrenheitToCelsius(68)
console.log(value1, value2)

//parameters are strcly positional, passing parameters by name dosent
// explicitly the parameters value
tip_amount = calculateTip(2)
console.log(tip_amount)
