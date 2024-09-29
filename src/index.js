import '/src/pages/index.css';

import { openModal, closeModal, closeModalOverlay, closeModalEscape } from '/src/scripts/components/modal.js';
import {createCard, likeCard, deleteCard} from '/src/scripts/components/card.js';
import {initialCards} from '/src/scripts/cards.js'

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
//элементы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__caption');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
//кнопки
const editButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
//формы
const newPlaceForm = document.forms.newPlace;
const editProfileForm = document.forms.editProfile

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    //формы
    //РАБОТА С ФОРМОЙ ЗАПОЛНЕНИЯ ФОРМЫ
    const nameInput = editProfileForm.name;
    const jobInput = editProfileForm.description;
    //изменине значения плейсхолдера в редактировании имени и инфы о себе
    nameInput.placeholder = profileTitle.textContent;
    jobInput.placeholder = profileDescription.textContent;
    // Получите значение полей jobInput и nameInput из свойства value
    const userName = nameInput.value;
    const userJob = jobInput.value;
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = userName;
    profileDescription.textContent = userJob;

    closeModal(document.querySelector('.popup_is-opened'));
    editProfileForm.reset();
}

//функция добавления карточки в разметку через попап
const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const newPlaceCard = {
        name: newPlace.name.value,
        link: newPlace.link.value
    }
    
    placesList.prepend(createCard(newPlaceCard, deleteCard, likeCard, increaseImage));
    closeModal(popupNewCard)    
    newPlaceForm.reset();
}

//функция клика по изображению
const increaseImage = (image, text) => {
    
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupImageText.textContent = text.textContent;

    openModal(popupTypeImage)
}

// @todo: Вывести карточки на страницу
initialCards.forEach ((cardElement) => {
    placesList.append(createCard(cardElement, deleteCard, likeCard, increaseImage))
})

// открытие попапов кликом по кнопкам
editButton.addEventListener('click', () => openModal(popupProfile));
profileAddButton.addEventListener('click', () => openModal(popupNewCard));

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
editProfileForm.addEventListener('submit', handleProfileFormSubmit); 

//слушатель добавления новой карточки через форму
newPlace.addEventListener('submit', handleCardFormSubmit);

//перебор массива popup и процесс закрытия попапов
popups.forEach((element) => {
    //закрытие попапа кнопкой
    const closeButton = element.querySelector('.popup__close')
    closeButton.addEventListener('click', () => closeModal(element))
    //закрытие попапа кликом вне элемента
    element.addEventListener('click', closeModalOverlay)
})