class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._getResponseData)
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._getResponseData)
  }

  deleteCard(data, id) {
    const cardId = id;
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._getResponseData)
  }

  addLike(id) {
    const cardId = id;
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  removeLike(id) {
    const cardId = id;
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._getResponseData)
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'a300aec3-6e18-4e7b-8fa3-4618f0df7f74',
    'Content-Type': 'application/json'
  }
});

export default api;

