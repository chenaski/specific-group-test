import { CompletedTodoList } from "./js/CompletedTodoList.js";
import { TodoList } from "./js/TodoList.js";
import { get } from "./js/utils.js";
import { AddTodoButton } from "./js/AddTodoButton.js";
import { Search } from "./js/Search.js";

const completedList = new CompletedTodoList(get(".todos-completed .todos__list"));

const list = new TodoList(get(".todos-active .todos__list"), {
  onComplete: completedList.add,
});

new AddTodoButton(get(".add-todo-button"), {
  handler: (...args) => list.add({ ...args, autoFocus: true }),
});

const search = new Search({
  form: get(".search"),
  input: get(".search__input"),
  onChange: list.filter,
});

list.restore();
completedList.restore();
