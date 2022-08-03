const validationClassNames = {
    inputSelector: '',
    submitButtonSelector: '',
    inactiveButtonClass: '',
    inputErrorClass: '',
    errorClass: '',
}


export default class FormValidator {
    constructor({
        inputSelector = '.form-popup__text-input',
        submitButtonSelector = '.form-popup__button-save',
        inactiveButtonClass = 'form-popup__button-save_disable',
        inputErrorClass = 'form-popup__text-input_error',
        errorClass = 'form-popup__input-error_active'
    }, formElement) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._formElement = formElement;
    }

    enableValidation() {
        const inputs = this._formElement.querySelectorAll(this._inputSelector);
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._subscribeInputListeners(inputs, submitButton);
    }

    initValidationSubmitButton() {
        const inputs = this._formElement.querySelectorAll(this._inputSelector);
        const validationResult = this._isFormValid(inputs);
        if (validationResult) {
            const submitButton = form.querySelector(this._submitButtonSelector);
            this._disableSubmitButton(submitButton);
        }
    }

    _subscribeInputListeners(inputs, submitButton) {
        inputs.forEach(input => {
            input.addEventListener('input', evt => {
                this._isValid(evt.target);
                this._toggleFormSubmitButton(inputs, submitButton);
            });
        });
    }

    _isValid(input) {
        const isValid = input.validity.valid;
        if (isValid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    };

    _toggleFormSubmitButton(inputs, button) {
        if (this._isFormValid(inputs)) {
            this._disableSubmitButton(button);
        } else {
            this._activeSubmitButton(button);
        }

    };

    _showError(input) {
        const id = input.id;
        const errorElement = document.querySelector(`.${id}-error`);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._errorClass)
        input.classList.add(this._inputErrorClass);
    };

    _hideError(input) {
        const id = input.id;
        const errorElement = document.querySelector(`.${id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    };

    _isFormValid(inputs) {
        Array.from(inputs).some((input) => !input.validity.valid)
    };

    _disableSubmitButton(submitButton) {
        submitButton.classList.add(this._inactiveButtonClass);
        // submitButton.setAttribute("disabled", "");
        //TODO: проверить работу переключения2
        submitButton.disabled = true;
    }

    _activeSubmitButton(submitButton) {
        submitButton.classList.remove(this._inactiveButtonClass);
        // submitButton.removeAttribute("disabled", "");
        submitButton.disabled = true;
    }
}