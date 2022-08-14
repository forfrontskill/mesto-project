import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector);
        this._submit = submit;
        this._form = this.popup.querySelector('.form-popup');
        this._saveBtn = this._form.querySelector('.form-popup__button-save');
    }

    _getInputValues() {
        const inputs = this._form.querySelectorAll('.form-popup__text-input');
        return Object.values(inputs).reduce(
            (acc, field) => {
                acc[field.name] = field.value;
                return acc;
            }, {});
    }

    setInputValues(callback) {
        callback(this._form);
    }

    setEventListeners() {
        super.setEventListeners();
        this._getInputValues();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(event, this._getInputValues());
        });
    }

    showLoading(){
        this._saveBtn.textContent = 'Сохранение...';
    }

    hideLoading(){
        this._saveBtn.textContent = 'Сохранить';
    }

    close() {
        super.close();
        this._form.reset();
    }
}