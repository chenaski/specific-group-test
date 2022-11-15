export class Search {
  form = null;
  input = null;

  getValue() {
    return this.input.value.trim();
  }

  constructor({ form, input, onSubmit, onChange }) {
    this.form = form;
    this.input = input;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      onSubmit && onSubmit(this.getValue());
    });

    this.input.addEventListener("input", (e) => {
      onChange && onChange(this.getValue());
    });
  }
}
