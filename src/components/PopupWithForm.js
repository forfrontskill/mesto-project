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

    setInputValues(callback){
        callback(this._form);
    }

    setEventListeners() {
        console.log(this._form);
        super.setEventListeners();
        this._getInputValues();
        this._form.addEventListener('submit', (event)=>{
            console.log('Submit in popup');
            event.preventDefault();
            this._submit( event, this._getInputValues());
            this.close();
        }); 
    }

    close() {
        super.close();
        this._form.reset();
    }
}