let todos = ['morning walk', 'prepare breakfast', 'go to library', 'visit friend', 'buy groceris']
let iscompleted = [true, true, false, false, false]

// console.log(`Todo: ${todos[0]}`)
// console.log(`Todo: ${todos[todos.length - 2]}`)

// todos.splice(2,1)
// console.log(todos)
// todos.push("excercise")
// console.log(todos)
// todos.shift()
// console.log(todos)
// todos.forEach(function (item, index){
//    console.log(`${index+1}: ${item}`)
// })

// for (count=0; count<todos.length; count++){
//     console.log(`${count}: ${todos[count]}`)
// }

// console.log(todos.indexOf('prepare breakfast'))

// const index = todos.findIndex(function (item){
//       return item==='prepare breakfast'
// })

todos.forEach(function (item, index){
    todos[index] =   { text : todos[index], completed: iscompleted[index] }
})

const tocomplete = todos.filter(function (item) {
    return !item.completed
})

todos.sort(function (a, b) {
    if (a.completed < b.completed) {
        return -1
    }
    else if (a.completed > b.completed) {
        return 1
    }
    else {
        return 0
    }
})

console.log(todos)
//console.log(tocomplete)

const deleteTodo = function (todos, title) {
        const index = todos.findIndex( function (item){
                return item.text === title
        })
        todos.splice(index, 1)
}

deleteTodo(todos, 'morning walk')

// console.log(todos)