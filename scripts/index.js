// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (cardElement, deleteCard) => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = cardElement.link;
    card.querySelector('.card__title').textContent = cardElement.name;

    card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card));

    return card;
}


// @todo: Функция удаления карточки

const deleteCard = (card) => {
    card.remove()
}

// @todo: Вывести карточки на страницу

initialCards.forEach ((cardElement) => {
    placesList.append(createCard(cardElement, deleteCard))
})
