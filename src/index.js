import '/src/pages/index.css';

import { openModal, closeModal, closeModalOverlay } from '/src/scripts/components/modal.js';
import {createCard, likeCard, removeCard} from '/src/scripts/components/card.js';
import {enableValidation, clearValidation} from '../src/scripts/components/validation.js'
import {getUserName, getInitialCards, editUserProfile, postNewCard, putLike, deleteLike, deleteCard, changeAvatar } from '../src/scripts/components/api.js'


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
//элементы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__caption');
const popupTypeImage = document.querySelector('.popup_type_image');
const avatarChangePopup = document.querySelector('.popup_change_avatar');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
//кнопки
const editButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const buttons = document.querySelectorAll('#button');
//формы
const newPlaceForm = document.forms.newPlace;
const editProfileForm = document.forms.editProfile
const nameInput = editProfileForm.name;
const jobInput = editProfileForm.description;
const profileImageForm = document.forms.profileImage;
//объект с настройками валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}


//загрузка
function renderLoading (isLoading) {
    if (isLoading) {
        buttons.forEach((buttonElement) => buttonElement.innerText = 'Загружается...')
    } else {
        buttons.forEach((buttonElement) => buttonElement.innerText = 'Сохранить')
        
    }
}

//общая функция лайка
const handleLikeCard = (cardLikeButton, id, cardLikeCounter) => {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
        deleteLike(id)
        .then (data => {
            //отображение лайков карточки
            cardLikeCounter.textContent = data.likes.length
            likeCard(cardLikeButton)
        })
        .catch((err) => {
            console.log(err)
        })
    } else {
        putLike(id)
        .then (data => {
            //отображение лайков карточки
            cardLikeCounter.textContent = data.likes.length
            likeCard(cardLikeButton)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

//открытие попапа формы изменения профиля
const openPopupProfileForm = () => {
    //изменине значения плейсхолдера в редактировании имени и инфы о себе
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    // включение валидации вызовом enableValidation
    // все настройки передаются при вызове
    enableValidation(validationConfig);
    clearValidation(editProfileForm, validationConfig)
    openModal(popupProfile)
}

// отправка формы изменения профиля
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    renderLoading(true)
    
    // Получите значение полей jobInput и nameInput из свойства value
    const userName = nameInput.value;
    const userJob = jobInput.value;

    // Вставьте новые значения
    editUserProfile(userName, userJob)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;

        closeModal(popupProfile);
        editProfileForm.reset();
    })
    .catch ((err) => {
        console.log(err);
    })
    .finally (() => renderLoading(false))

    
}
//функция клика по изображению
const increaseImage = (image, text) => {
    
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupImageText.textContent = text.textContent;

    openModal(popupTypeImage)
}

//объект параметров для createCard
const params = {
    removeCard: removeCard, 
    deleteCard: deleteCard, 
    ownerId: '1f9f7c9071d9a15cea3537ff', 
    openModal: openModal,
    closeModal: closeModal,
    handleLikeCard: handleLikeCard,
    increaseImage: increaseImage,
}

//функция добавления карточки в разметку через попап
const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const newPlaceCard = {
        name: newPlaceForm.name.value,
        link: newPlaceForm.link.value
    }

    renderLoading(true)

    postNewCard(newPlaceCard)
    .then((data) => {
        placesList.prepend(createCard(
            data,
            params
        ));
    })
    .then (() => {
        clearValidation(newPlaceForm, validationConfig);
        closeModal(popupNewCard)    
        newPlaceForm.reset();
    })
    .catch((err) => {
        console.log(err)
    })
    .finally (() => renderLoading(false))
}

//вывожу инфу о профиле и все карточки
Promise.all([getUserName(), getInitialCards()])
.then ((data) => {
    profileTitle.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileImage.style = `background-image: url("${data[0].avatar}")`
    return data[1].forEach ((cardElement) => {
        placesList.append(createCard(cardElement, params));
    });
})
.catch ((err) => {
    console.log(err);
})

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
editProfileForm.addEventListener('submit', handleProfileFormSubmit); 

//слушатель добавления новой карточки через форму
newPlaceForm.addEventListener('submit', handleCardFormSubmit);

//перебор массива popup и процесс закрытия попапов
popups.forEach((element) => {
    //закрытие попапа кнопкой
    const closeButton = element.querySelector('.popup__close')
    closeButton.addEventListener('click', () => closeModal(element))
    //закрытие попапа кликом вне элемента
    element.addEventListener('click', closeModalOverlay)
})

// открытие попапов в шапке сайта
//(изменение профиля, добавление карточки, изменение аватара)
editButton.addEventListener('click', openPopupProfileForm);
profileAddButton.addEventListener('click', () => {
    openModal(popupNewCard);
    enableValidation(validationConfig);
});
profileImage.addEventListener('click', () => {
    clearValidation(profileImageForm, validationConfig)
    openModal(avatarChangePopup);
    enableValidation(validationConfig)
})

//изменение аватара
profileImageForm.addEventListener('submit', () => {
    renderLoading(true)
    changeAvatar(profileImageForm.image.value)
    .then (data => {
        profileImage.style = `background-image: url("${data.avatar}")`;
        closeModal(avatarChangePopup)
        profileImageForm.reset();
    })
    .catch ((err) => {
        console.log(err);
    })
    .finally (() => renderLoading(false))

})
