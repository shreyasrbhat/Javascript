let grade_calculator = function (score, max_score){  
    if (!(typeof score === 'number') || (typeof max_score === 'number')){
        throw Error("The arguments has to be number")
    }
    let grade = undefined
    let percent = (score/max_score) * 100
     
     if (score <= 100 && score >= 90){
         grade = 'A'
     }
     else if (score <= 89 && score >= 80){
         grade = 'B'
     }
     else if (score <= 79 && score >= 70){
        grade = 'C'
    }
    else if (score <= 69 && score >= 60){
        grade = 'D'
    }
    else {
        grade = 'F'
    }
    let templet = `you got ${grade} (${percent})`

    console.log(templet)
}

// try {
//     grade_calculator("50", 100)
// }
// catch (e){
//     console.log(e)
// }

const assign = () =>{
     data = "1244"
}
assign()
console.log(data)