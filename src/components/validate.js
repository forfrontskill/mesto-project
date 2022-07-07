const forms = document.forms;


export const run = ()=>{
    Array.from(forms).forEach(form => {
        const inputs = form.querySelectorAll('.form-popup__text-input');
        const submitButton = form.querySelector('.form-popup__button-save');
        subscribeInputListeners(inputs,submitButton);
        
    });
}


const subscribeInputListeners = (inputs,submitButton)=>{
    inputs.forEach(input =>{
        input.addEventListener('input', evt => {
            isValid(evt.target);
            toggleFormSubmitButton(inputs,submitButton);
        });
    });
    
}

const isValid = (input) => {
    const isValid = input.validity.valid;
    if(isValid){
        hideError(input);
    }else{
        showError(input);
    }
};

const validationForm = (inputs)=> Array.from(inputs).some((input)=> !input.validity.valid);

const toggleFormSubmitButton = (inputs,button)=>{
    console.log(validationForm(inputs));
    if(validationForm(inputs)){
        button.classList.add('form-popup__button-save_disable');
    } else{
        button.classList.remove('form-popup__button-save_disable');
    }
    
};

const showError = (input)=>{
    const id = input.id;
    //TODO: добавить проверку наличия подсказки
    const errorElement = document.querySelector(`.${id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add('form-popup__input-error_active')
    input.classList.add('form-popup__text-input_error');
};

const hideError = (input)=>{
    const id = input.id;
    //TODO: добавить проверку наличия подсказки
    const errorElement = document.querySelector(`.${id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('form-popup__input-error_active');
    input.classList.remove('form-popup__text-input_error');
};