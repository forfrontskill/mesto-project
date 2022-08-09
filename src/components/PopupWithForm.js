import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector);
        this.submit = submit;
        /* this.form = this.popup.querySelector('.form-popup'); */
    }

    _getInputValues() {

    }

    setEventListeners() {
        super.setEventListeners();
        const addBtn = document.querySelector('.profile__button-add');
        addBtn.addEventListener('click', this.open.bind(this));
        /*  this.form.addEventListener('submit', this.submit); */
    }

    close() {
        super.close();
        /* this.form.reset(); */
    }
}