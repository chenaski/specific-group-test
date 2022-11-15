import { TodoItem } from "./TodoItem.js";
import { Storage } from "./Storage.js";

export class TodoList {
  items = [];
  list = null;

  onComplete = null;

  storage = new Storage();

  constructor(list, { onComplete }) {
    this.list = list;
    this.onComplete = onComplete;
  }

  add = ({ text, autoFocus } = {}) => {
    const item = new TodoItem({
      hooks: {
        onChange: this.save.bind(this),
        onComplete: (data) => {
          this.onComplete && this.onComplete(data);
          this.save();
        },
        onMoveTop: (item) => {
          const id = item.id;
          const index = this.items.findIndex((i) => i.id === id);
          if (index === -1) return;
          this.items.splice(index, 1);
          this.items.splice(index - 1, 0, item);
          this.save();
        },
        onMoveBottom: (item) => {
          const id = item.id;
          const index = this.items.findIndex((i) => i.id === id);
          if (index === -1) return;
          this.items.splice(index, 1);
          this.items.splice(index + 1, 0, item);
          this.save();
        },
        onDelete: (item) => {
          this.items = this.items.filter((i) => i.id !== item.id);
          this.save();
        },
      },
    });
    const itemNode = item.create({ text });
    this.items.push(item);
    this.list.appendChild(itemNode);
    this.save();
    autoFocus && item.select();
  };

  showAll() {
    this.items.forEach((item) => {
      item.show();
    });
  }

  filter = (search) => {
    this.showAll();
    if (!search) return;
    this.items.forEach((item) => {
      if (!item.getText().toLowerCase().includes(search)) {
        item.hide();
      }
    });
  };

  save() {
    const data = this.items.map((item) => ({ text: item.getText() }));
    this.storage.save(Storage.TODOS_KEY, data);
  }

  restore() {
    const todos = this.storage.restore(Storage.TODOS_KEY);
    if (!todos) return;
    todos.forEach(this.add);
  }
}
