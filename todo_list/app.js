const form = document.querySelector("#todo-add-form");
const todoEnter = document.querySelector("#todo-enter");
const todos = document.querySelector(".todos");
const todoAdd = document.querySelector(".todo-add");
const todoList = document.querySelector(".todo-list");
const todoDellAllBtn = document.querySelector(".todo-del-all-btn");
const todoSearch = document.querySelector("#todo-search");

let todolar = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    todoList.addEventListener("click", todoDelUI);
    todoDellAllBtn.addEventListener("click",todoDellAllUI);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    todoSearch.addEventListener("keyup", searchTodo);
}

function pageLoaded(){
    checkTodoFromStorage();
    todolar.forEach(function(todo){
        addTodoUI(todo);
    }); 
}

function searchTodo(e){
    const todoValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".todo");

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(todoValue)){
                todo.setAttribute("style", "display : flex");
            }else{
                todo.setAttribute("style", "display : none");
            }
        });
    }else{
        alert("Hiçbir Todo Bulunamadi");
    }

}

function todoDelUI(e){
    if(e.target.className=="todo-del-btn"){
        const todo = e.target.parentElement;
        todo.remove();
        todoDelStorage(todo.textContent);
    }
}

function todoDelStorage(dellTodo){
    checkTodoFromStorage();
    todolar.forEach(function(todo,index){
        if(dellTodo===todo+"Sil"){
            todolar.splice(index,1);
        }
    });
    localStorage.setItem("todolar", JSON.stringify(todolar));

}

function todoDellAllUI(){
    const todoAll = document.querySelectorAll(".todo");
    if(todoAll.length>0){
        todoAll.forEach(function(todo){
        todo.remove();
            
        // Storage Silme
        todolar = [];
        localStorage.setItem("todolar",JSON.stringify(todolar));
        });
    }else{
        alert("Hiçbir Todo Bulunamadi");
    }
}

function addTodo(e){
    const inputText = todoEnter.value.trim();
    if(inputText==null || inputText==""){
        alert("Lütfen Geçerli Bir Todo Giriniz");
    }else{
    // arayüze ekleme
    addTodoUI(inputText);
    // stroge ekleme
    addTodoStorage(inputText);
    }
    e.preventDefault();
}

function addTodoUI(newTodo){
    // <li class="todo">Todo1 <button>Sil</button></li>
    const li = document.createElement("li");
    li.className="todo";
    li.textContent= newTodo;
    const button = document.createElement("button");
    button.className="todo-del-btn";
    button.textContent="Sil";
    li.appendChild(button);
    todos.appendChild(li);
    todoEnter.value="";
}

function addTodoStorage(newTodo){
    checkTodoFromStorage();
    todolar.push(newTodo);
    localStorage.setItem("todolar", JSON.stringify(todolar));
}

function checkTodoFromStorage(){
    if(localStorage.getItem("todolar")===null){
        todolar = [];
    }else{
        todolar = JSON.parse(localStorage.getItem("todolar"));
    }
}