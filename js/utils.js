let lastId = 0;

export function getId() {
  return lastId++;
}

export function get(selector, all = false) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}
