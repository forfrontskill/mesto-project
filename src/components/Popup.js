export default class Popup {
    constructor(selector) {
        this.selector = selector;
        this.popup = document.querySelector(selector);
        this._closePopupOutsideBinded = this._closePopupOutside.bind(this);
        this._handleEscCloseBinded = this._handleEscClose.bind(this);
    }

    open() {
        this.popup.classList.add('popup_visible');
        this.popup.addEventListener('mousedown', this._closePopupOutsideBinded);
        document.addEventListener('keydown', this._handleEscCloseBinded);
    }

    close() {
        this.popup.classList.remove('popup_visible');
        this.popup.removeEventListener('mousedown', this._closePopupOutside);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _closePopupOutside(event) {
        const isClosest = event.target.closest('.popup__container');
        if (!isClosest) {
            this.close();
        }
    }

    setEventListeners() {
        this.popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__button-close')) {
                this.close();
            }
        })
    }
}