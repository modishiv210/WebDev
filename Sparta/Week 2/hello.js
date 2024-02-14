function costCalculation(price, quantity){
    let discount = 0

    if(quantity>=10 && quantity<20){
        discount = 10
    }
    else if(quantity>=20){
        discount = 50
    }

    let cost = price*quantity*(1-discount/100)
    if(price >=100){
        cost = cost*0.9
    }

    return cost;
}

console.log(costCalculation(100,100))