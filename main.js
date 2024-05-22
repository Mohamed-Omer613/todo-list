//Handle tasks loaded from storage
let storageData = JSON.parse(localStorage.getItem('todoList'))
window.onload = function () {
    if(storageData && Array.isArray(storageData)) {
        storageData.forEach ((item) => {
            taskList.innerHTML += getListItem(item.title)
        })
    }
    
}
//Even for add task & validate
addTask.onclick = function () {
    const inputs = document.querySelector('input')
    if(inputs.value.trim()) {
        //Task will be added
        taskList.innerHTML += getListItem(inputs.value)
        hideErr ()
        if(storageData && Array.isArray(storageData)) {
            storageData.push({
                task : inputs.value
            })
        } else {
            storageData = [
                {
                    task : inputs.value
                }
            ]
        }
        setStorage('todoList', storageData)
        inputs.value = ''
    } else if (!inputs.value.trim()) {
        //Task is empty
        showErr('Input is required')
    }
}
function setStorage(key, val) {
    let JsonStorage = JSON.stringify(val)
    localStorage.getItem(key, JsonStorage)
}

function showErr (msg) {
    msgValidate.innerText = msg
    msgValidate.classList.remove('hide')
}
function hideErr () {
    msgValidate.innerText = ''
    msgValidate.classList.add('hide')
}
function getListItem(title) {
    return`<li class="task-item">
    <span>${title}</span>
    <span class="close" data-task="${title}">x</span>
    </li>`
}
//Event for remove task item
document.onclick = function(e) {
    if( e.target.tagName == 'SPAN' &&
        e.target.parentElement.classList.contains('task-item') && 
        e.target.classList.contains('close')) {
            e.target.parentElement.remove()
            let newData = storageData.filter((item) => {
                if(e.target.dataset.title == item.title) {
                    return false
                }
                return true
            })
            setStorage('todoList', newData  )
        }
}

