class App {


  constructor() {
    // this.DB = new Database();
    this.formEl = document.getElementById('todos-form');
    this.formEl.addEventListener('submit', this.formSubmitHandler);
    TodosList.configure();
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const inputEl = document.getElementById('todo-input');
    const inputValue = inputEl.value;
    if(inputValue) {
      DB.operationCheck({id: Math.random(), value: inputValue, operation: 'add'});
    }
  }
  
  
  
}



class TodosList {
  constructor(todosList) {
    this.renderList(todosList);
    document.getElementById('todo-input').value = '';
  }
  
  renderList(todosArray) {
    const todosListEl = document.getElementById('todos-list');
    todosListEl.innerHTML = '';
    todosArray.forEach(el => {
      const todoEl = this.listElRenderHandler(el);
      todosListEl.append(todoEl);
    })
  }
  
  
  listElRenderHandler(todoItem) {
    const listEl = document.createElement('li');
    listEl.classList.add('todo-item');
    listEl.id = todoItem.id;
    listEl.innerHTML = `
    <p class="text">${todoItem.value}</p>
    <i class="fas fa-times" title="delet this item"></i>
    `;
    return listEl;
  }

  static configure() {
    const todosListEl = document.getElementById('todos-list');

    todosListEl.addEventListener('click', event => {
      if(event.target.closest('i')) {
        const listElId = event.target.closest('i').parentElement.id;
        DB.operationCheck({id: listElId ,value: '', operation: 'delete'});
      }
    });

    todosListEl.addEventListener('click', event => {
      event.target.closest('li').classList.toggle('complite');
    });
  }
}






class Database {
  todosList = [
    // {id: 1, value: 'angular course'},
    // {id: 2, value: 'typescript Implmention'},
    // {id: 3, value: 'javascript Implmention'},
    // {id: 4, value: 'css Implmention'},
    // {id: 5, value: 'volleyball practice'},
    // {id: 6, value: 'gym'}
  ]
  
  operationCheck (todoItemObj) {
    if(todoItemObj.operation === 'add') {
      this.addItemHandler(todoItemObj);
    }else if(todoItemObj.operation === 'delete') { 
      this.deleteItemHandler(todoItemObj);
    }
  }
  
  addItemHandler(item) {
    const newListItem = {id: item.id, value: item.value};
    this.todosList.push(newListItem);
    this.updateUI(this.todosList);

  }
  
  deleteItemHandler(deletedItem) {
    
    let filteredArray = this.todosList.filter( arrayItem => arrayItem.id.toString() !== deletedItem.id.toString());
    this.todosList = [...filteredArray];
    this.updateUI(this.todosList);
  }
  
  updateUI(updatedTodosList) {
    new TodosList(updatedTodosList);
  }
}
new App();
const DB = new Database();