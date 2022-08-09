export default class Popup {
    constructor(selector) {
        this.selector = selector;
        this.popup = document.querySelector(selector);
    }

    open() {
        const x = document.querySelector("#popup-card");
        x.classList.add('popup_visible');
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

        this.popup.addEventListener('mousedown', this._closePopupOutside.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
}