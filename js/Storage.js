export class Storage {
  static TODOS_KEY = "todos";
  static COMPLETED_TODOS_KEY = "completed";

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  restore(key) {
    const map = {
      [Storage.TODOS_KEY]: this.getTodos.bind(this),
      [Storage.COMPLETED_TODOS_KEY]: this.getCompletedTodos.bind(this),
    };
    const extract = map[key];

    return extract ? extract() : null;
  }

  getLocalStoreData(key) {
    const data = localStorage.getItem(key);

    try {
      return JSON.parse(data);
    } catch (e) {}

    return null;
  }

  getTodos() {
    const defaultTodos = [{ text: "Todo 1" }, { text: "Todo 2" }, { text: "Todo 3" }];
    const todos = this.getLocalStoreData(Storage.TODOS_KEY);

    if (Array.isArray(todos)) {
      return todos;
    }

    return defaultTodos;
  }

  getCompletedTodos() {
    const todos = this.getLocalStoreData(Storage.COMPLETED_TODOS_KEY);

    if (Array.isArray(todos) && todos.length > 0) {
      return todos;
    }

    return null;
  }
}
