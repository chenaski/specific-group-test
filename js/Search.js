export class Search {
  form = null;
  input = null;

  getValue() {
    return this.input.value.trim();
  }

  constructor({ form, input, onSubmit, onChange }) {
    this.form = form;
    this.input = input;

    if (onSubmit) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        onSubmit(this.getValue());
      });
    }

    if (onChange) {
      this.input.addEventListener("input", (e) => {
        onChange(this.getValue());
      });
    }
  }
}
