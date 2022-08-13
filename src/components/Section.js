export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    setItems(items){
        this._items = items;
    }

    renderAllItems() {
        this._container.innerHtml = '';
        this._items.forEach(item => {
            this.addItem(item);
        });
    }

    addItem(item) {
        const element = this._renderer(item);
        this._container.prepend(element);
    }
}