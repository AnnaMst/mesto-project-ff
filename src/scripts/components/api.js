const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24/',
    headers: {
      authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c',
      "Content-Type": 'application/json',
    },
};

const handleResult = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`)
}

//загрузка информации о пользователе с сервера
export const getUserName = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then( (result) => {
        return handleResult(result)
    })
} 

//отправка изменений данных профиля
export const editUserProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method:'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then( (result) => {
        return handleResult(result)
    })
}

//загрузка карточек с сервера
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
    .then( (result) => {
        return handleResult(result)
    })
}

//отправка данных о новой карточке
export const postNewCard = ({name, link}) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then( (result) => {
        return handleResult(result)
    })
}

//ставим лайк
export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then( (result) => {
        return handleResult(result)
    })
}

//удаляем лайк
export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then( (result) => {
        return handleResult(result)
    })
}

//удаляем карточку
export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then( (result) => {
        return handleResult(result)
    })
}

//меняем аватар
export const changeAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar `, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then( (result) => {
        return handleResult(result)
    })
}