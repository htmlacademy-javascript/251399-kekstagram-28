import {getData} from './server.js';
import { renderPictures } from './render-pictures.js';
import './upload-form.js';

const onGetDataError = (error) => {
  const dataErrorTemplateElement = document.querySelector('template#data-error').content.querySelector('.data-error');
  const dataErrorElement = dataErrorTemplateElement.cloneNode(true);
  dataErrorElement.querySelector('.data-error__title').textContent = error;

  document.body.append(dataErrorElement);
};

getData(renderPictures, onGetDataError);
