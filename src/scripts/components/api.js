const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24/',
    headers: {
      authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c',
      'Content-Type': 'application/json'
    }
}

//загрузка информации о пользователе с сервера
export const getUserName = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c'
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`)
    })
} 

//отправка изменений данных пор
export const editUserProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method:'PATCH',
        headers: {
            authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

//загрузка карточек с сервера
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: {
            authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

//отправка данных о новой карточке
export const postNewCard = ({name, link}) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c',
            'Content-Type': 'application/json'
        },
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c',
            'Content-Type': 'application/json'
        },
    })
    .then(res => {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c',
            'Content-Type': 'application/json'
        },
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export const changeAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar `, {
        method: 'PATCH',
        headers: {
            authorization: 'c430b10e-6e02-4ef6-8316-b9743be3525c',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}