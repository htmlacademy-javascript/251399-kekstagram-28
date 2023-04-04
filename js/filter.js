import { renderPictures } from './render-pictures.js';
import { getUniqueIntegerFromRange } from './util.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const MAX_RANDOM_IMAGES = 10;
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imgSortingContainer = document.querySelector('.img-filters');
const imgSortingForm = document.querySelector('.img-filters__form');
const imgSortingButtons = imgSortingContainer.querySelectorAll('.img-filters__button');
let pictures;

const getUniqueRandomPictures = (quantity) => {
  const randomPictureIndex = getUniqueIntegerFromRange(0, pictures.length - 1);
  const randomPictures = pictures.map(() => pictures[randomPictureIndex()]).slice(0, quantity);

  return randomPictures;
};

const getMostСommentedPictures = (pictureA, pictureB) => {
  const commentsA = pictureA.comments.length;
  const commentsB = pictureB.comments.length;

  return commentsB - commentsA;
};

const sortingPictures = (filter = Filters.DEFAULT) => {
  if (filter === Filters.RANDOM) {
    renderPictures(getUniqueRandomPictures(MAX_RANDOM_IMAGES));
  }

  if (filter === Filters.DISCUSSED) {
    renderPictures(pictures.slice().sort(getMostСommentedPictures));
  }

  if (filter === Filters.DEFAULT) {
    renderPictures(pictures);
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
  imgSortingForm.addEventListener('click', debounce(onFilterButtonClick, RERENDER_DELAY));
};

export { activateSorting };
