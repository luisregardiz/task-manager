//Creando los elementos HTML

const taskManager = document.getElementById('app');

const taskTitle = document.createElement('h1');
const taskForm = document.createElement('form');
const taskInput = document.createElement('input');
const taskSubmit = document.createElement('button');
const taskBoard = document.createElement('div');

taskTitle.innerText = 'Task Manager';
taskTitle.classList.add('task-title');
taskInput.type = 'text';
taskInput.classList.add('input-task')
taskSubmit.classList.add('btn-submit')
taskForm.classList.add('form-task')
taskBoard.classList.add('task-board');



taskInput.placeholder = 'Enter a task';
taskSubmit.innerText = 'Submit';

taskForm.appendChild(taskInput);
taskForm.appendChild(taskSubmit);

taskManager.appendChild(taskTitle);
taskManager.appendChild(taskForm);
taskManager.appendChild(taskBoard);

//Creando el task Manager

let tasks = [];

//Event Listeners
eventListeners();

function eventListeners() {
  taskForm.addEventListener('submit', addTask);

  //Acceder a las task almacenadas en el localStorage al cargar la pagina
  document.addEventListener('DOMContentLoaded', () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    createTask();
  });
}

//funciones

function addTask(e) {
  e.preventDefault();
  
  const taskValue = taskInput.value;
  const task = taskValue.replace(/\s/g, ' ');

  if (task === '') {
    showError('Task cannot be empty');

    return; //Esto hace que si no se cumple no se siga ejecutando la funcion
  }
  //Creamos el objetos para agregar la id y  y la tarea

  taskObj = {
    id: Date.now(),
    text: task,
    done: false //esto es igual a task : task para mandar la tarea
  };

  tasks = [...tasks, taskObj];
  
  //Creamos el HTML
  createTask();

  addAnimation();

  taskForm.reset();
}

//Mostrar errores

function showError(error) {
  const messageError = document.createElement('div');
  const messageErrorText = document.createElement('p')
  const iconError = document.createElement('i');
  iconError.classList.add('fas','fa-times-circle', 'fa-lg')


  messageError.appendChild(messageErrorText);
  messageError.appendChild(iconError);

  messageError.classList.add('error');

  taskBoard.appendChild(messageError);


  messageErrorText.textContent = error;

  setTimeout(() => {
    messageError.remove();
  }, 3000);
}


//Crear las tareas

function createTask() {
  clearHTML();

  if (tasks.length > 0) {

    tasks.forEach(task => {

      const {id, text } = task

      const taskContent = document.createElement('div');
      const taskText = document.createElement('p');
      const taskCheck = document.createElement('input');
      const taskBtnDelete = document.createElement('button');


      //Agregar funcion de eliminar
      taskBtnDelete.onclick = () => {
        deleteTask(id)
        //Animacion de borrar
        const taskDelete = taskBtnDelete.parentElement

        taskDelete.classList.add('animate__animated', 'animate__fadeOutRight', 'animate__faster')
        
      }


      //verificar si se cumplio la tarea
      taskCheck.onchange = () => {
        task.done = !task.done
        if(task.done) {
          //Estilos cuando sea checked
          taskContent.style.backgroundColor = "#F7DBF0";
          taskText.style.textDecoration = "line-through";
          taskText.style.opacity = "70%";

        } else {
          taskContent.style.backgroundColor = "#f8f4e5";
          taskText.style.textDecoration = "none";
          taskText.style.opacity = "100%";
        }
        syncStorage();
      }
      
      if(task.done) {
        taskCheck.checked = true
        taskContent.style.backgroundColor = "#F7DBF0";
        taskText.style.textDecoration = "line-through";
        taskText.style.opacity = "70%";
      }
      

      taskText.innerText = text;
      taskText.classList.add('task-text')
      taskCheck.type = 'checkbox';
      taskCheck.classList.add('task-checkbox');
      
      taskBtnDelete.innerText = 'X';
      taskBtnDelete.classList.add('btn-delete');

      taskContent.classList.add('task-content');
      taskBoard.classList.add('box', 'new-box');


      taskContent.appendChild(taskText);
      taskContent.appendChild(taskCheck);
      taskContent.appendChild(taskBtnDelete)
      

      taskBoard.appendChild(taskContent);

    });
  }

  //Agregar las tareas al localStorage
  syncStorage();
}

function syncStorage() {
  //Guardamos en el localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  
  setTimeout(() => {
    
    createTask();
  }, 500);
}



function clearHTML() {
  while (taskBoard.firstChild) {
    taskBoard.removeChild(taskBoard.firstChild);
  }
}

function addAnimation() {
  taskBoard.lastChild.classList.add('animate__animated', 'animate__fadeInDown', 'animate__faster');
}
