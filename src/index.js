import '/src/pages/index.css';

import { openModal, closeModal, handleFormSubmit, closeModalOverlay, closeModalEscape } from '/src/scripts/components/modal.js';
import {createCard, likeCard, deleteCard, increaseImage} from '/src/scripts/components/card.js';
import {initialCards} from '/src/scripts/cards.js'

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
//элементы
const popup = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
//формы
const newPlace = document.forms.newPlace;

// @todo: Вывести карточки на страницу
initialCards.forEach ((cardElement) => {
    placesList.append(createCard(cardElement, deleteCard, likeCard, increaseImage))
})

// открытие попапов кликом по кнопкам
editButton.addEventListener('click', () => openModal(popupTypeEdit));
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

//перебор массива popup и процесс закрытия попапов
popup.forEach((element) => {
    //закрытие попапа кнопкой
    const closeButton = element.querySelector('.popup__close')
    closeButton.addEventListener('click', () => {
        closeModal(element);
        editProfile.reset()
    })
    //закрытие попапа кликом вне элемента
    document.addEventListener('click', closeModalOverlay)

    //закрытие попапа с помощью Esc
    document.addEventListener('keydown', closeModalEscape)
})

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
editProfile.addEventListener('submit', handleFormSubmit); 

//функция добавления карточки в разметку через попап
const editCardSubmit = (evt) => {
    evt.preventDefault();
    const newPlaceCard = {
        name: newPlace.name.value,
        link: newPlace.link.value
    }
    
    document.querySelector('.places__list').prepend(createCard(newPlaceCard, deleteCard, likeCard, increaseImage));
    closeModal(document.querySelector('.popup_is-opened'))    
    newPlace.reset();
}

//слушатель добавления новой карточки через форму
newPlace.addEventListener('submit', editCardSubmit);

