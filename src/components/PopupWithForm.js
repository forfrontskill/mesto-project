import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        this.selector = selector;
        this.submit = submit;
        this.form = popup.querySelector('.form-popup');
    }

    _getInputValues(){

    }

    setEventListeners(){
        super.setEventListeners();
        this.form.addEventListener('submit',this.submit);
    }

    close(){
        this.form.reset();
    }
}