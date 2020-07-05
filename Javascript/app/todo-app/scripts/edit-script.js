let todo_id = location.hash.substring(1)
let title = document.getElementById('todo-title')
let last_update = document.getElementById('date')
let todo_text = document.getElementById('todo-text')
let todo_remove = document.getElementById('todo-remove')


todos = getSavedTodos('todos')

todoId = todos.findIndex((todo) => todo.id === todo_id)

if (todoId > -1) {
    title.textContent = todos[todoId].text
    todo_text.textContent = todos[todoId].details
    last_update.textContent = `${moment(todos[todoId].updated_at).fromNow()}`
}
else {
    location.assign('/index.html')
}

todo_text.addEventListener('input', function (e) {
    todos[todoId].details = e.target.value
    todos[todoId].updated_at = moment().valueOf()
    last_update.textContent = `${moment(todos[todoId].updated_at).fromNow()}`
    saveTodos(todos, 'todos')
})

todo_remove.addEventListener('click', function () {
    todos.splice(todoId, 1)
    saveTodos(todos, 'todos')
    location.assign('/index.html')
})

window.addEventListener("storage", function (e) {
    if (e.key == 'todos') {
        todos = JSON.parse(e.newValue)
        title.textContent = todos[todoId].text
        todo_text.textContent = todos[todoId].details
        last_update.textContent = `${moment(todos[todoId].updated_at).fromNow()}`
    }
})