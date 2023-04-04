const URL = 'https://28.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) =>
  fetch(`${URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });

const uploadData = (onSuccess, onError, body) =>
  fetch(`${URL}/`, { method: 'POST', body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      onSuccess();
    })
    .catch(() => {
      onError();
    });


export { getData, uploadData };
