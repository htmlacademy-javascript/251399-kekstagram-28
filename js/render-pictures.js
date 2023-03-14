import { openPictureModal } from './picture-modal.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('template#picture').content.querySelector('.picture');

const createPictureElement = ({ url, likes, comments }) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderPictures = (picturesData) => {
  picturesElement.querySelectorAll('.picture').forEach((element) => element.remove());
  const picturesFragment = document.createDocumentFragment();

  for (const pictureItemData of picturesData) {
    const pictureItem = createPictureElement(pictureItemData);
    pictureItem.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPictureModal(pictureItemData);
    });
    picturesFragment.append(pictureItem);
  }

  picturesElement.append(picturesFragment);
};

export { renderPictures };
