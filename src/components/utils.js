export const showLoading = (submitButton) => {
    submitButton.textContent = 'Сохранение...'
}

export const hideLoading = (submitButton) => {
    submitButton.textContent = 'Сохранить'
}