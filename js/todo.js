const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = []; // +obj LS에도 투두를 저장해야 함

function deleteToDo(event) { // 지우고 '저장', html에서도 지우기
  // console.dir(event.target); delete child element mdn
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // 1+JSON obj->str
}

function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1; // 따로
  delBtn.innerText = 'X';
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId; // li에도 id
  toDoList.appendChild(li); // 추가 후 append?
  const toDoObj = {
    text: text,
    id: newId
  }
  toDos.push(toDoObj);
  saveToDos(); // push한 이후에 호출!
  // [object Object] ls에는 js의 data를 string으로 저장
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
  toDoInput.focus();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // console.log(loadedtToDos); {"text":"Go eat","id":1},{"text":"","id":2}
    const parsedToDos = JSON.parse(loadedToDos); // 2+JSON str -> obj
    // console.log(parsedToDos); [{...}, {...}]
    parsedToDos.forEach(function (toDo) { // arr 담긴 것들 각각에 한 번씩 실행
      paintToDo(toDo.text);
    })
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit); // ?
}

init();