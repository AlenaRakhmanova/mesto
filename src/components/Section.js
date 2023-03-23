export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      const cardElement = this._renderer(item);
      this.addItem(cardElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
