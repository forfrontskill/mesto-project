import Popup from "./Popup";


export default class PopupWithImage extends Popup{
    constructor(description, src, selector) {
        super(selector);
        this.textContent =textContent;
        this.src = src;
        this.description = description;
    }

    open(){
        this._prepareContent();
        super.open();
    }

    _prepareContent(){
        const imageElement = this.popup.querySelector('.popup__image');
        const descriptionElement = this.popup.querySelector('.popup__image-description');

        imageElement.src = this.src;
        imageElement.alt = this.description;
    
        descriptionElement.textContent = this.description;
    }
}