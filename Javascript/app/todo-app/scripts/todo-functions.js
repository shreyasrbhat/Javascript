// get object from local storage
const getSavedTodos = (key) => {
    todosJson = localStorage.getItem(key)
    return (todosJson !== null) ?  JSON.parse(todosJson) : []
}

//save todos to local storage
const saveTodos = (todos, key) => {
    todosJson = JSON.stringify(todos)
    localStorage.setItem(key, todosJson)
}

//Render application todos based on filters
const renderTodos = (todos, parent, filter) => {
    sortTodos(filter.sortBy, todos)
    parent.innerHTML = ""
    const filtered_todos = todos.filter(function (item) {
        const textMatchFilter = item.text.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompletedMatch = !filter.hideCompleted || !item.completed
        return textMatchFilter && hideCompletedMatch
    })


    summary_tag = document.createElement('h2')
    const todo_str = generateSummary(filtered_todos)
    summary_tag.textContent = `You have ${todo_str} left`
    summary_tag.classList.add('list-title')
    parent.appendChild(summary_tag)

    if (filtered_todos.length>0){
        
         filtered_todos.forEach(function (item) {
        parent.appendChild(generateDom(item, parent, filter))
    })
        }
        
        else {
            
            const p_tag = document.createElement('p')
            p_tag.classList.add('empty-message')
            p_tag.textContent = "No to-dos to show"
            parent.appendChild(p_tag)
        }

   

}

const generateDom = (todo, parent, filter) => {
    const div_tag = document.createElement('label')
    const containerEL = document.createElement('div')
    const delete_button = document.createElement('button')

    
    delete_button.textContent = 'remove'
    delete_button.classList.add('button', 'button--text')
    delete_button.addEventListener('click', function () {
        removeTodo(todo.id)
        renderTodos(todos, parent, filter)

    })

    const check_button = document.createElement('input')
    containerEL.appendChild(check_button)
    check_button.setAttribute('type', 'checkbox')
    check_button.checked = todo.completed
    check_button.addEventListener('change', function (e) {
        changeTodoState(todo.id, e.target.checked)
        renderTodos(todos, parent, filter)
    })

    div_tag.classList.add('list-item')
    containerEL.classList.add('list-item__container')
    
    div_tag.appendChild(containerEL)

    const span_tag = document.createElement('a')
    span_tag.textContent = todo.text  
    containerEL.appendChild(span_tag)
    span_tag.setAttribute('href', `/edit.html#${todo.id}`)
    containerEL.appendChild(check_button)
    containerEL.appendChild(span_tag)
    div_tag.appendChild(delete_button)
    
    return div_tag
}

const generateSummary = (todos) => {
    num_todos = todos.filter(function (todo) { return !todo.completed }).length
    todo_str = (num_todos > 1)? `${num_todos} tasks`:`${num_todos} task`
    return todo_str

}

const removeTodo = (id)=> {
    let todoId = todos.findIndex(function (todo) {
        return todo.id === id
    })
    if (todoId > -1) {
        todos.splice(todoId, 1)
        saveTodos(todos, 'todos')
    }

}

const changeTodoState = (id, checked)=> {
    let todoId = todos.findIndex(function (todo) {
        return todo.id === id
    })
    if (todoId > -1) {
        todos[todoId].completed = checked
        saveTodos(todos, 'todos')
    }
}

const sortTodos = (sortby, todos) => {
    if (sortby === 'created') {
        todos.sort(function (a, b) {
            if (a.created_at < b.created_at) {
                return 1
            }
            else if (a.createdAt > b.createdAt) {
                return -1
            }
            else {
                return 0
            }
        })
    }

    else if (sortby == "updated") {
        todos.sort(function (a, b) {
            if (a.updated_at < b.updated_at) {
                return 1
            }
            else if (a.updated_at > b.updated_at) {
                return -1
            }
            else {
                return 0
            }
        })

    }
}
