import { $ } from "../utils/utils.js";
import * as TodoListStore from "../store/todoListStore.js";

const createHTML = () => {
  return /* html */ `
  <div class="delete">
    <h3 class="delete--title">선택한 카드를 삭제할까요?</h3>
    <div class="delete--button">
      <button class="delete--cancel-button">취소</button>
      <button class="delete--delete-button">삭제</button>
    </div>
  </div>`;
};

const render = () => {
  const deleteAlert = document.createElement("div");
  deleteAlert.classList.add("dimmed");
  deleteAlert.innerHTML = createHTML();
  document.body.appendChild(deleteAlert);
};

const setEvents = (taskInfo, cancelAlert) => {
  const cancelButton = $(".delete--cancel-button");
  const deleteButton = $(".delete--delete-button");
  cancelButton.addEventListener("click", (event) => handleCancelButtonClick(event, cancelAlert));
  deleteButton.addEventListener("click", (event) => handleDeleteButtonClick(event, taskInfo));
};

const handleCancelButtonClick = ({ target }, notify) => {
  removeAlert(target);
  notify();
};

const handleDeleteButtonClick = ({ target }, { listTitle, taskId }) => {
  TodoListStore.deleteListTask(listTitle, taskId);
  TodoListStore.update("newTask", listTitle);
  removeAlert(target);
};

const alertDeleteInit = (taskInfo, cancelAlert) => {
  render();
  setEvents(taskInfo, cancelAlert);
};

const removeAlert = (target) => {
  const alert = target.closest(".dimmed");
  alert.remove();
};

export { alertDeleteInit };
