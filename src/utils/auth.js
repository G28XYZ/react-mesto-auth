import { addressAuth } from "./constants";

class Auth {
  constructor(address) {
    this._address = address;
    this._headers = {
      "Content-Type": "application/json",
      "Content-Type": "application/json",
    };
  }

  _handleResponse = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`);
  };

  registration({ email, password }) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._handleResponse);
  }

  authorization({ email, password }) {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._handleResponse);
  }

  getUser(jwt) {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: { ...this._headers, Authorization: `Bearer ${jwt}` },
    }).then(this._handleResponse);
  }
}

const auth = new Auth(addressAuth);

export default auth;
