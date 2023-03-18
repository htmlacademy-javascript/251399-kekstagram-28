import { openPictureModal } from './picture-modal.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('template#picture').content.querySelector('.picture');

const createPictureElement = ({ url, likes, comments, description }) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.addEventListener('click', () => openPictureModal(url, likes, comments, description));

  return pictureElement;
};

const renderPictures = (picturesData) => {
  picturesElement.querySelectorAll('.picture').forEach((element) => element.remove());
  picturesElement.append(...picturesData.map(createPictureElement));
};

export { renderPictures };
