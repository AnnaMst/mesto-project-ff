// @todo: Функция удаления карточки
export const removeCard = (card) => {
    card.remove()
}

//функция лайка карточки
export const likeCard = (element) => {
    element.classList.toggle('card__like-button_is-active')
}

// @todo: Функция создания карточки
export const createCard = (cardElement, params) => {
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

    handleLiking(params.ownerId, cardLikeButton)


    //слушатель лайка
    cardLikeButton.addEventListener('click', () => params.handleLikeCard(cardLikeButton, cardElement._id, cardLikeCounter))

    //увеличить картинку
    cardImage.addEventListener('click', () => params.increaseImage(cardImage, cardTitle));
    
    //удалить карточку

    function handleDeleteCard (cardElement, ownerId, cardDeleteButton) {
        if (cardElement.owner._id !== ownerId) {
            cardDeleteButton.remove()
        } else {
            cardDeleteButton.addEventListener('click', () => {
                params.deleteCard(cardElement._id)
                .then ((data) => {
                    console.log(data)
                    params.removeCard(card)
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        }
    }
    handleDeleteCard(cardElement, params.ownerId, cardDeleteButton)

    return card;

}

