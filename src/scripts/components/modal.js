// функция попап ОТРКЫТИЕ
function openModal (element) {
    element.classList.add('popup_is-opened')
}

// функция попап ЗАКРЫТИЕ
function closeModal (element) {
    element.classList.remove('popup_is-opened')
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
const handleFormSubmit = (evt) => {
    evt.preventDefault();
    //формы
    const editProfile = document.forms.editProfile;
    //РАБОТА С ФОРМОЙ ЗАПОЛНЕНИЯ ФОРМЫ
    const nameInput = editProfile.name;
    const jobInput = editProfile.description;
    //изменине значения плейсхолдера в редактировании имени и инфы о себе
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    nameInput.placeholder = profileTitle.textContent;
    jobInput.placeholder = profileDescription.textContent;
    // Получите значение полей jobInput и nameInput из свойства value
    const userName = nameInput.value;
    const userJob = jobInput.value;
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = userName;
    profileDescription.textContent = userJob;

    closeModal(document.querySelector('.popup_is-opened'));
    editProfile.reset();
}

//закрытие попапа кликом вне элемента
const closeModalOverlay = (evt) => {
    if (evt.target === document.querySelector('.popup_is-opened')) {
        closeModal(document.querySelector('.popup_is-opened'))
    }
}

//закрытие попапа с помощью Esc
const closeModalEscape = (evt) => {
    if (evt.key === 'Escape') {
        closeModal(element)
    }
    evt.target.removeEventListener('keydown', closeModalEscape)
}

export { openModal, closeModal, handleFormSubmit, closeModalOverlay, closeModalEscape }