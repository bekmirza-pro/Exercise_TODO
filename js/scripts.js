const elForm = document.querySelector('.todo-form');
const elInputTodo = document.querySelector('.todo-input');
const elTodoLIst = document.querySelector('.todo-list');
const elTodoBtn = document.querySelector('.todo-item-delete-btn');
const elTodoTemplate = document.querySelector('#todo-item--template').content;


//=========> All Complate  UnComplate <============
const elAll = document.querySelector('.all-count');
const elComplate = document.querySelector('.complated-count');
const elUncomlate = document.querySelector('.uncomplated-count');

// ===========>  functions
const localTodos = JSON.parse(window.localStorage.getItem('todos'))

const todosArr = localTodos || [];

function deleteTodo(evt){

  const todoId = evt.target.dataset.todo_id;
  
  const foundTodoIndex = todosArr.findIndex((item)=> item.id == todoId);
  todosArr.splice(foundTodoIndex, 1)

  window.localStorage.setItem('todos', JSON.stringify(todosArr));
  renderTodos(todosArr, elTodoLIst)
}

function completeTodo(evt){
  const todoId = evt.target.dataset.todo_id;
  
  const foundTodo = todosArr.find((item)=> item.id == todoId);
  foundTodo.isCompleted = !foundTodo.isCompleted;

  window.localStorage.setItem('todos', JSON.stringify(todosArr));
  renderTodos(todosArr, elTodoLIst);
}

elForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  
  const elTodoInput = elInputTodo.value.trim();
  elInputTodo.value = null;
  
  const uniqueId = todosArr[todosArr.length - 1] ? todosArr[todosArr.length - 1].id+1 : 1;

  todosArr.push({
    id: uniqueId,
    title: elTodoInput,
    isCompleted: false,
  });
  
  window.localStorage.setItem('todos', JSON.stringify(todosArr));
  renderTodos(todosArr, elTodoLIst);
})

//=============> RenderTodos <================

function renderTodos(todosArr, element){
    element.innerHTML = null;

    let Complete = 0;
    let UnComplate = 0;

    todosArr.filter(todos => {
     if(todos.isCompleted === true){
       Complete += 1;
     } else {
       UnComplate += 1
     }
   })
     elUncomlate.textContent = UnComplate
     elComplate.textContent = Complete;
     elAll.textContent = todosArr.length;
  
    todosArr.forEach(todo => {
    
    const todoTemplate = elTodoTemplate.cloneNode(true);
    const todoTitleSpan = todoTemplate.querySelector('.todo-item-complete-text');
    const todoComplateInput = todoTemplate.querySelector('.todo-input-complete');
    const todoDeleteBtn = todoTemplate.querySelector('.todo-item-delete-btn');
    
    todoTitleSpan.textContent = todo.title;
    todoDeleteBtn.dataset.todo_id = todo.id;
    todoComplateInput.checked = todo.isCompleted;
    todoComplateInput.dataset.todo_id = todo.id;
  
    todoDeleteBtn.addEventListener('click', deleteTodo);
    todoComplateInput.addEventListener('click', completeTodo);
    
    if(todo.isCompleted){
      todoTitleSpan.classList.add('checked');
    } 
    element.appendChild(todoTemplate);

  });
}

    renderTodos(todosArr, elTodoLIst);



























// const elForm = document.querySelector(".todo-form");
// const elInputTodo = elForm.querySelector(".todo-input");
// const elTodoList = document.querySelector(".todo-list");
// const elTodoTemplate = document.querySelector("#todo-item--template").content;

// const todosArr = [];

// function deleteTodo(evt) {
//   const todoId = evt.target.dataset.todoId;

//   const foundTodoIndex = todosArr.findIndex((item) => item.id == todoId);

//   todosArr.splice(foundTodoIndex, 1);

//   renderTodos(todosArr, elTodoList);
// }

// function completeTodo(evt) {}

// function renderTodos(todosArr, element) {
//   element.innerHTML = null;

//   todosArr.forEach((todo) => {
//     const todoTemplate = elTodoTemplate.cloneNode(true);

//     const todoTitleSpan = todoTemplate.querySelector(
//       ".todo-item-complete-text"
//     );
//     const todoDeleteBtn = todoTemplate.querySelector(".todo-item-delete-btn");
//     const todoCompleteInput = todoTemplate.querySelector(
//       ".todo-input-complete"
//     );

//     todoTitleSpan.textContent = todo.title;
//     todoDeleteBtn.dataset.todoId = todo.id;
//     todoCompleteInput.checked = todo.isCompleted;

//     todoDeleteBtn.addEventListener("click", deleteTodo);
//     todoCompleteInput.addEventListener("click", completeTodo);

//     element.appendChild(todoTemplate);
//   });
// }

// elForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   const inputTodo = elInputTodo.value.trim();

//   todosArr.push({
//     id: todosArr.length,
//     title: inputTodo,
//     isCompleted: false,
//   });

//   console.log(todosArr);
//   renderTodos(todosArr, elTodoList);
//   elInputTodo.value = null;
// });
