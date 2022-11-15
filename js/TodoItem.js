import { getId } from "./utils.js";

export class TodoItem {
  id = null;

  item = null;
  itemText = null;
  itemMoveTopButton = null;
  itemMoveBottomButton = null;
  itemRemoveButton = null;

  hooks = {};

  constructor({ hooks = {} }) {
    this.id = getId();

    this.hooks = hooks;
  }

  getText() {
    return this.itemText.textContent;
  }

  show() {
    this.item.classList.remove("todos__item--hidden");
  }

  hide() {
    this.item.classList.add("todos__item--hidden");
  }

  createButtonNode({ iconSrc, baseClass = "todos__item-button", extraClass, label, handler }) {
    const button = document.createElement("button");
    button.setAttribute("aria-label", label);
    button.classList.add(baseClass);
    extraClass && button.classList.add(extraClass);
    button.addEventListener("click", handler);

    const buttonIcon = document.createElement("img");
    buttonIcon.src = iconSrc;
    buttonIcon.setAttribute("aria-hidden", "");

    button.appendChild(buttonIcon);

    return button;
  }

  create({ text } = {}) {
    const item = document.createElement("li");
    item.classList.add("todos__item");

    const itemCompleteButton = this.createButtonNode({
      iconSrc: "./assets/check-mark.svg",
      baseClass: "todos__item-complete-button",
      label: "Mark as completed",
      handler: this.complete,
    });

    const itemText = document.createElement("span");
    itemText.classList.add("todos__item-text");
    itemText.textContent = text || "Your text here";
    itemText.setAttribute("contenteditable", "");
    itemText.addEventListener("input", this.hooks.onChange);

    const itemControls = document.createElement("span");
    itemControls.classList.add("todos__item-controls");

    const itemMoveTopButton = this.createButtonNode({
      iconSrc: "./assets/arrow.svg",
      extraClass: "todos__item-button--arrow-top",
      label: "Move top",
      handler: this.moveTop,
    });
    const itemMoveBottomButton = this.createButtonNode({
      iconSrc: "./assets/arrow.svg",
      extraClass: "todos__item-button--arrow-bottom",
      label: "Move bottom",
      handler: this.moveBottom,
    });
    const itemRemoveButton = this.createButtonNode({
      iconSrc: "./assets/cross.svg",
      extraClass: "todos__item-button--delete",
      label: "Delete todo",
      handler: this.delete,
    });

    itemControls.appendChild(itemMoveTopButton);
    itemControls.appendChild(itemMoveBottomButton);
    itemControls.appendChild(itemRemoveButton);

    item.appendChild(itemCompleteButton);
    item.appendChild(itemText);
    item.appendChild(itemControls);

    this.item = item;
    this.itemText = itemText;
    this.itemMoveTopButton = itemMoveTopButton;
    this.itemMoveBottomButton = itemMoveBottomButton;
    this.itemRemoveButton = itemRemoveButton;

    return item;
  }

  select() {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(this.itemText);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  moveTop = () => {
    if (!this.item) return;
    const prev = this.item.previousElementSibling;
    if (!prev) return;
    this.delete({ runHooks: false });
    prev.before(this.item);
    this.hooks.onMoveTop && this.hooks.onMoveTop(this);
  };

  moveBottom = () => {
    if (!this.item) return;
    const next = this.item.nextElementSibling;
    if (!next) return;
    this.delete({ runHooks: false });
    next.after(this.item);
    this.hooks.onMoveBottom && this.hooks.onMoveBottom(this);
  };

  delete = ({ runHooks = true } = { runHooks: true }) => {
    if (!this.item) return;
    this.item.remove();
    runHooks && this.hooks.onDelete && this.hooks.onDelete(this);
  };

  complete = () => {
    this.hooks.onComplete &&
      this.hooks.onComplete({
        id: this.id,
        text: this.getText(),
      });
    this.delete();
  };

  onChange = () => {
    this.hooks.onChange && this.hooks.onChange({ id: this.id, text: this.getText() });
  };
}
