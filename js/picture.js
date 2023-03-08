import {createArrayOfObjects} from './data.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('template#picture').content.querySelector('.picture');
const picturesData = createArrayOfObjects();
const picturesFragment = document.createDocumentFragment();

picturesData.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  picturesFragment.append(pictureElement);
});

picturesElement.append(picturesFragment);
