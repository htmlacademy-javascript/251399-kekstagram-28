const OBJECTS_COUNT = 25;

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

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueIntegerFromRange = (min = 1, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomItemOfArray = (array) => array[getRandomInteger(0, array.length - 1)];

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
    comment.avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    comment.message = createCommentMessage();
    comment.name = `${name} ${surname}`;

    comments.push(comment);
    quantity--;
  }

  return comments;
};

const createArrayOfObjects = (count) => {
  const arrayOfObjects = new Array;
  const generatePhotoId = getUniqueIntegerFromRange(undefined, OBJECTS_COUNT);

  while (count) {
    const object = new Object;
    object.id = generatePhotoId();
    object.url = `photos/${object.id}.jpg`;
    object.description = getRandomItemOfArray(DESCRIPTIONS);
    object.likes = getRandomInteger(15, 200);
    object.comments = createComment(getRandomInteger(1, 5));

    arrayOfObjects.push(object);
    count--;
  }

  return arrayOfObjects;
};

createArrayOfObjects(OBJECTS_COUNT);
