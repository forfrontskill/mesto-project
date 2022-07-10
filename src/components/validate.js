var validationClassNames = {
    inputSelector: '',
    submitButtonSelector: '',
    inactiveButtonClass: '',
    inputErrorClass: '',
    errorClass:'',
}

export const enableValidation = ({
    inputSelector = '.form-popup__text-input',
    submitButtonSelector = '.form-popup__button-save',
    inactiveButtonClass = 'form-popup__button-save_disable',
    inputErrorClass = 'form-popup__text-input_error',
    errorClass = 'form-popup__input-error_active'
})=>{
    validationClassNames = {...validationClassNames, inputSelector, submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass};
    
    const forms = document.forms;
    Array.from(forms).forEach(form => {
        const inputs = form.querySelectorAll(validationClassNames.inputSelector);
        const submitButton = form.querySelector(validationClassNames.submitButtonSelector);
        subscribeInputListeners(inputs, submitButton);

    });
}

const subscribeInputListeners = (inputs, submitButton) => {
    inputs.forEach(input => {
        input.addEventListener('input', evt => {
            isValid(evt.target);
            toggleFormSubmitButton(inputs, submitButton);
        });
    });
}

const isValid = (input) => {
    const isValid = input.validity.valid;
    if (isValid) {
        hideError(input);
    } else {
        showError(input);
    }
};

const validationForm = (inputs) => Array.from(inputs).some((input) => !input.validity.valid);

const toggleFormSubmitButton = (inputs, button) => {
    if (validationForm(inputs)) {
        disableSubmitButton(button);
    } else {
        activeSubmitButton(button);
    }

};

const showError = (input) => {
    const id = input.id;
    const errorElement = document.querySelector(`.${id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(validationClassNames.errorClass)
    input.classList.add(validationClassNames.inputErrorClass);
};

const hideError = (input) => {
    const id = input.id;
    const errorElement = document.querySelector(`.${id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(validationClassNames.errorClass);
    input.classList.remove(validationClassNames.inputErrorClass);
};

export const initValidationSubmitButton = (form)=>{
    const inputs = form.querySelectorAll(validationClassNames.inputSelector);
    const validationResult = validationForm(inputs);
    if(validationResult){
        const submitButton = form.querySelector(validationClassNames.submitButtonSelector);
        disableSubmitButton(submitButton);
    }
}

const disableSubmitButton = (submitButton) =>{
    submitButton.classList.add(validationClassNames.inactiveButtonClass);
    submitButton.setAttribute("disabled", "");
}

const activeSubmitButton = (submitButton) => {
    submitButton.classList.remove(validationClassNames.inactiveButtonClass);
    submitButton.removeAttribute("disabled", "");
}

