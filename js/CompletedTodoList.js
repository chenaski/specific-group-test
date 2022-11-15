import { Storage } from "./Storage.js";
import { getId } from "./utils.js";

export class CompletedTodoList {
  items = [];
  list = null;

  storage = new Storage();

  constructor(list) {
    this.list = list;
  }

  add = ({ text }) => {
    const id = getId();

    const item = document.createElement("li");
    item.classList.add("todos__completed-item");

    const removeButton = document.createElement("button");
    removeButton.classList.add("todos__completed-item-remove");
    removeButton.setAttribute("aria-label", "Remove completed item");
    removeButton.addEventListener("click", () => this.remove(id, item));
    const buttonIcon = document.createElement("img");
    buttonIcon.src = "./assets/cross.svg";
    buttonIcon.setAttribute("aria-hidden", "");

    const itemTimestamp = document.createElement("span");
    itemTimestamp.classList.add("todos__completed-item-timestamp");
    const timestamp = new Date().toUTCString();
    itemTimestamp.textContent = timestamp;

    const itemText = document.createElement("span");
    itemText.classList.add("todos__completed-item-text");
    itemText.textContent = text;

    removeButton.appendChild(buttonIcon);

    item.appendChild(removeButton);
    item.appendChild(itemTimestamp);
    item.appendChild(itemText);

    this.items.push({ id, text, timestamp, node: item });
    this.list.appendChild(item);

    this.save();

    return item;
  };

  remove = (id, node) => {
    this.items = this.items.filter((i) => i.id !== id);
    node.remove();
    this.save();
  };

  save() {
    const data = this.items.map((item) => ({ text: item.text }));
    this.storage.save(Storage.COMPLETED_TODOS_KEY, data);
  }

  restore() {
    const todos = this.storage.restore(Storage.COMPLETED_TODOS_KEY);
    if (!todos) return;
    todos.forEach(this.add);
  }
}
