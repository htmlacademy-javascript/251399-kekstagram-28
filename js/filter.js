import { renderPictures } from './render-pictures.js';
import { getUniqueIntegerFromRange } from './util.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 5000;
const MAX_RANDOM_IMAGES = 10;
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imgSortingContainer = document.querySelector('.img-filters');
const imgSortingButtons = imgSortingContainer.querySelectorAll('.img-filters__button');
let pictures;

const getUniqueRandomPictures = (quantity) => {
  const randomPictureIndex = getUniqueIntegerFromRange(0, pictures.length - 1);
  const randomPictures = [];

  while (quantity) {
    randomPictures.push(pictures[randomPictureIndex()]);
    quantity--;
  }

  return randomPictures;
};

const getMostСommentedPictures = (pictureA, pictureB) => {
  const commentsA = pictureA.comments.length;
  const commentsB = pictureB.comments.length;

  return commentsB - commentsA;
};

const sortingPictures = (filter) => {
  if (filter === Filters.RANDOM) {
    debounce(renderPictures(getUniqueRandomPictures(MAX_RANDOM_IMAGES)), RERENDER_DELAY);
  }

  if (filter === Filters.DISCUSSED) {
    debounce(renderPictures(pictures.slice().sort(getMostСommentedPictures)), RERENDER_DELAY);
  }

  if (filter === Filters.DEFAULT) {
    debounce(renderPictures(pictures), RERENDER_DELAY);
  }
};

const onFilterButtonClick = (evt) => {
  imgSortingButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');

  sortingPictures(evt.target.id);
};

const activateSorting = (picturesData) => {
  pictures = picturesData;
  renderPictures(pictures);

  imgSortingContainer.classList.remove('img-filters--inactive');
  imgSortingButtons.forEach((button) => {
    button.addEventListener('click', onFilterButtonClick);
  });
};

export { activateSorting };
