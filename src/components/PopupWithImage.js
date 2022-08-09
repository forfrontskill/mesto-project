import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(card) {
        this._prepareContent(card);
        super.open();
    }

    _prepareContent({ description, src }) {
        const imageElement = this.popup.querySelector('.popup__image');
        const descriptionElement = this.popup.querySelector('.popup__image-description');

        imageElement.src = src;
        imageElement.alt = description;

        descriptionElement.textContent = description;
    }
}