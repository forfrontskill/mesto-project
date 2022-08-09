import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector);
        this._submit = submit;
        this._form = this.popup.querySelector('.form-popup');
    }

    _getInputValues() {
        const inputs = this._form.querySelectorAll('.form-popup__text-input');
        return Object.values(inputs).reduce(
            (acc,field) => { 
                acc[field.name] = field.value; 
                return acc;
            }, {});
    }

    setEventListeners() {
        super.setEventListeners();
        this._getInputValues();
        this._form.addEventListener('submit', (event)=>{
            event.preventDefault();
            this._submit( event, this._getInputValues());
            this.close();
        }); 
    }

    close() {
        super.close();
        /* this.form.reset(); */
    }
}