// @todo: Функция создания карточки
const createCard = (cardElement, deleteCard, likeCard, increaseImage) => {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    //попробовать переделать функцию с распознаванием, 
    //является ли cardElement частью формы
    cardImage.src = cardElement.link;
    cardImage.alt = cardElement.name;
    cardTitle.textContent = cardElement.name;

    //лайкнуть карточку
    const cardLikeButton = card.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));

    //увеличить картинку
    cardImage.addEventListener('click', () => increaseImage(cardImage, cardTitle));
    
    //удалить карточку
    card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card));

    return card;
}

//функция лайка карточки
const likeCard = (element) => {
    element.classList.toggle('card__like-button_is-active')
}


// @todo: Функция удаления карточки
const deleteCard = (card) => {
    card.remove()
}

export {createCard, likeCard, deleteCard }