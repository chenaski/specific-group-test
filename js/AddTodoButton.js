export class AddTodoButton {
  constructor(button, { handler }) {
    button.addEventListener("click", handler);
  }
}
