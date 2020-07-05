// const createCallback=((callback)=>{
//     callback(undefined, "Yes")
//     callback(undefined, "yes")
//   })

// createCallback((error, value)=>{
//     setTimeout(()=>{
//         if (error){
//             console.log(error)
//         }
//         else if(value){
//             console.log(value)
//         }
//     }, 2000)
    
// })

// const myPromise = new Promise((resolve, reject)=>{
//      if(false){
//         reject('Rejected')
//         reject('Rejected')
//     }
//     else if(true){
//         resolve('resolve')
//     }
// })

// myPromise.then((data)=>{
//     console.log(data)
// }, (err)=>{
//     console.log(err)
// }, 2000)

const getCountryInfo = (countryCode) =>{
    const promise = new Promise((resolve, reject)=>{
        request = new XMLHttpRequest()
        request.addEventListener('readystatechange', (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
               data = JSON.parse(e.target.responseText)
               country = data.find(function (c) {
                   return c.alpha2Code===countryCode
                        })
               resolve(country)
            }
            else if (e.target.readyState === 4){
                reject("error occured")
            }
        })
        request.open('GET', 'https://restcountries.eu/rest/v2/all')
        request.send()
    })
   return promise
}

const getCountryUsingFetch=(code)=>{
    return fetch('https://restcountries.eu/rest/v2/all', {}).then((response)=>{
        
        if (response.status===200){
            return response.json()
        }
        else {
            throw Error("unable the fetch data")
        }
    }).then((response)=>{
       return response.find((country)=>{return country.alpha2Code === code}) 
    //    if (data){console.log(`This is from fetch ${data.name}`)}
    //    else {throw Error("No country found")}

    })}
    // }).catch((error)=>{
    //  console.log(error)
    // })
    

getCountryUsingFetch('US').then((country)=>{
    console.log(`This is from fetch ${country.name}`)
}).catch((error)=>{
    console.log(error)
})
console.log("check")

// const promise = getCountryInfo('AF')
// promise.then((country)=>{
//    console.log(country.name)
// },
// (error)=>{
//     console.log(error)
// })

//promise chaining

const multiplyNum=(num)=>{
    return new Promise((resolve, reject)=>{
        (typeof num === 'number')?resolve(num*2):reject("error occured")
    }).then((data)=>{
        return data * 2
    })
}

// multiplyNum(2).then((data)=>{
//     return multiplyNum(data).then((data)=>{
//         console.log(data)
//     }, (error)=>{
//         console.log(error)
//     })
// }, (error)=>{
//     console.log(error)
// })

// multiplyNum('2').then((data)=>{
//     return multiplyNum(data)
// }).then((data)=>{
//     console.log(data)
// }).catch((error)=>{
//     console.log(error)
// })
multiplyNum(16).then((data)=>{
    return multiplyNum(data).then((c)=>{
        console.log(c)
    })
}).catch((error)=>{
    console.log(error)
})

// const getipInfo=()=>{
//     return fetch('http://ipinfo.io/json?token=c371abb554910d', {}).then((response)=>{
//         if (response.status === 200){
           
//             return response.json()
//         }
//         else {
//             throw Error("No data found")
//         }
//     }).then((response)=>{
//         return getCountryUsingFetch(response.country)
//     })
// }

const getipInfo= async ()=>{
    let response = await fetch('http://ipinfo.io/json?token=c371abb554910d', {})
        if (response.status === 200){
           
            data = await response.json()
            country = await getCountryUsingFetch(data.country)
            return country
        }
        else {
            throw Error("No data found")
        }
   
}

getipInfo().then((response)=>{
    console.log(response.name)
    // console.log(`${response.city} ${response.region}`)
}).catch((error)=>{
    console.log(error)
})


const asyncFunc=(data)=>{
   return new Promise((resolve, reject)=>{
       data?resolve(data * 2):reject("async_error")
   })
}

const callAsyncFunc= async ()=>{
    data = await asyncFunc()
    console.log("asdfqwf efeqfqef efef")
    data = asyncFunc(data)
    console.log(data)
    // asyncFunc(2).then((data)=>{
    //     console.log(data)
    // })
}

callAsyncFunc()
