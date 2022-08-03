export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderAllItems() {
        this._container.innerHtml = '';
        this._items.forEach(item => {
            addItem(item);
        });
    }

    addItem(item) {
        const element = this._renderer(item);
        this._container.append(element);
    }
}