import {getRandomInteger, getUniqueIntegerFromRange, getRandomItemOfArray} from './util.js';

const COMMENTS_MIN_QUANTITY = 1;
const COMMENTS_MAX_QUANTITY = 10;
const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;
const PHOTO_MIN_ID = 1;
const PHOTO_MAX_ID = 25;
const PHOTO_MIN_LIKES = 15;
const PHOTO_MAX_LIKES = 200;

const DESCRIPTIONS = [
  'Фото из космоса',
  'Портрет',
  'Фото концерта',
  'Горный пейзаж',
  'Котики',
  'Фото моря',
  'Закат',
  'Мегаполис',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?',
];

const NAMES = [
  'Сильвестр',
  'Дмитрий',
  'Дарт',
  'Брендан',
  'Питер',
  'Гордон',
  'Лионель',
  'Брюс',
];

const SURNAMES = [
  'Сталоне',
  'Куплинов',
  'Вейдер',
  'Эйх',
  'Паркер',
  'Фримен',
  'Месси',
  'Уэйн',
];

const createCommentMessage = () => getRandomInteger(0, 1) ?
  `${getRandomItemOfArray(MESSAGES)} ${getRandomItemOfArray(MESSAGES)}` :
  `${getRandomItemOfArray(MESSAGES)}`;

const createComment = (quantity) => {
  const comments = new Array;
  const generateCommentId = getUniqueIntegerFromRange(1, 50);

  while (quantity) {
    const comment = new Object;
    const name = getRandomItemOfArray(NAMES);
    const surname = getRandomItemOfArray(SURNAMES);
    comment.id = generateCommentId();
    comment.avatar = `img/avatar-${getRandomInteger(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`;
    comment.message = createCommentMessage();
    comment.name = `${name} ${surname}`;

    comments.push(comment);
    quantity--;
  }

  return comments;
};

const createArrayOfObjects = (count = PHOTO_MAX_ID) => {
  const arrayOfObjects = new Array;
  const generatePhotoId = getUniqueIntegerFromRange(PHOTO_MIN_ID, PHOTO_MAX_ID);

  while (count) {
    const object = new Object;
    object.id = generatePhotoId();
    object.url = `photos/${object.id}.jpg`;
    object.description = getRandomItemOfArray(DESCRIPTIONS);
    object.likes = getRandomInteger(PHOTO_MIN_LIKES, PHOTO_MAX_LIKES);
    object.comments = createComment(getRandomInteger(COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY));

    arrayOfObjects.push(object);
    count--;
  }

  return arrayOfObjects;
};

export {createArrayOfObjects};
