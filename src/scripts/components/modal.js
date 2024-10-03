//закрытие попапа с помощью Esc
const closeModalEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened')
        closeModal(openedPopup)
    }
}

// функция попап ОТРКЫТИЕ
const openModal = (element) => {
    element.classList.add('popup_is-opened')
    //вешаю обработчик для Esc
    document.addEventListener('keydown', closeModalEscape)
    
}

// функция попап ЗАКРЫТИЕ
const closeModal = (element) => {
    element.classList.remove('popup_is-opened')
    //снимаю обработчки для Esc
    document.removeEventListener('keydown', closeModalEscape)
}

//закрытие попапа кликом вне элемента
const closeModalOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target)
    }
}

export { openModal, closeModal, closeModalOverlay }