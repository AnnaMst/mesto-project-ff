import { deleteCard, deleteLike, putLike } from "./api.js"

// @todo: Функция убирания карточки
const removeCard = (card) => {
    card.remove()
}

//функция лайка карточки
const likeCard = (element) => {
    element.classList.toggle('card__like-button_is-active')
}

//общая функция лайка
export const handleLikeCard = (cardLikeButton, id, cardLikeCounter) => {
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

//функция удаления карточки
export const handleDeleteCard = (cardElement, removeCard, card) => {
    deleteCard(cardElement._id)
.then ((data) => {
    console.log(data)
    removeCard(card)
})
.catch((err) => {
    console.log(err)
})
}

// @todo: Функция создания карточки
export const createCard = (cardElement, params, ownerId) => {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeCounter = card.querySelector('.card__like-counter')
    const cardDeleteButton = card.querySelector('.card__delete-button');

    //попробовать переделать функцию с распознаванием, 
    //является ли cardElement частью формы
    cardImage.src = cardElement.link;
    cardImage.alt = cardElement.name;
    cardTitle.textContent = cardElement.name;
    cardLikeCounter.textContent = cardElement.likes.length

    //лайкнуть карточку
    //сохранить цвет лайка на мною лайкнутых карточках
    const cardLikeButton = card.querySelector('.card__like-button');
    function handleLiking (ownerId, element) {
        if (cardElement.likes.find(item => item._id === ownerId)) {
            element.classList.add('card__like-button_is-active')
        }
    }

    handleLiking(ownerId, cardLikeButton)


    //слушатель лайка
    cardLikeButton.addEventListener('click', () => params.handleLikeCard(cardLikeButton, cardElement._id, cardLikeCounter))

    //увеличить картинку
    cardImage.addEventListener('click', () => params.increaseImage(cardImage, cardTitle));
    
    //удалить карточку
    if (cardElement.owner._id !== ownerId) {
        cardDeleteButton.remove()
    } else {
        cardDeleteButton.addEventListener('click', () => {
            handleDeleteCard(cardElement, removeCard, card)
        })
    }  

    return card;
}

