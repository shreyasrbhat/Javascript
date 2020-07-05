let todos = getSavedTodos('todos')

parent_tag = document.querySelector('div#notes')
sort_tag = document.querySelector('select#sortby')

const filter = {
    searchText: "",
    hideCompleted: false,
    sortBy: "created"
}


renderTodos(todos, parent_tag, filter)



const filter_todo = document.querySelector('input#filter-task').addEventListener('input', function (e){
    filter.searchText = e.target.value
    renderTodos(todos, parent_tag, filter)

})

sort_tag.addEventListener('change', function (e) {
    filter.sortBy = e.target.value
    renderTodos(todos, parent_tag, filter)
    })


const add_task = document.querySelector("form#add-task").addEventListener('submit', function (e){
    text = e.target.elements.inputTask.value
    if (text.length > 0){

    
    e.preventDefault()
    const todoId = uuidv4()
    todos.push({
        id: todoId,
        text: e.target.elements.inputTask.value,
        completed: false,
        created_at: moment().valueOf(),
        updated_at: moment().valueOf()
    })  
        saveTodos(todos, 'todos')
        //renderTodos(todos, parent_tag, filter)
        e.target.elements.inputTask.value = ""
        location.assign(`/edit.html#${todoId}`)
    
 }
}
 
 
 )
 const hideCompleted = document.querySelector('input#hideCompleted').addEventListener('change',
     function (e){
        filter.hideCompleted = e.target.checked
         if (filter.hideCompleted){
             notCompleted_list = todos.filter(function (item){
                 return !item.completed
             })
             renderTodos(notCompleted_list, parent_tag, filter)
         }
         else {
             renderTodos(todos, parent_tag, filter)
         } 
     }
 )


 window.addEventListener('storage', function(e){
     todos = getSavedTodos('todos')
     renderTodos(todos,parent_tag, filter)
 })