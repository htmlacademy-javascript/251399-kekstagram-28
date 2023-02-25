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

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomInteger = (min, max) => {
  const previousResults = [];

  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  let currentResult = Math.floor(Math.random() * (upper - lower + 1) + lower);

  if (previousResults.length >= (max - min + 1)) {
    return null;
  }
  while (previousResults.includes(currentResult)) {
    currentResult = Math.floor(Math.random() * (upper - lower + 1) + lower);
  }
  previousResults.push(currentResult);
  return currentResult;
};

const createCommentMessage = () => getRandomInteger(0, 1) ?
  `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]} ${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]}` :
  `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]}`;

const createComment = (quantity) => {
  const comments = new Array;

  while (quantity) {
    const comment = new Object;
    comment.id = getRandomInteger(1, 500);
    comment.avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    comment.message = createCommentMessage();
    comment.name = `${NAMES[getRandomInteger(0, NAMES.length - 1)]} ${SURNAMES[getRandomInteger(0, SURNAMES.length - 1)]}`;

    comments.push(comment);
    quantity--;
  }

  return comments;
};

const createArrayOfObjects = (count) => {
  const generatePhotoId = createIdGenerator();
  const arrayOfObjects = new Array;

  while (count) {
    const object = new Object;
    object.id = generatePhotoId();
    object.url = `photos/${object.id}.jpg`;
    object.description = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
    object.likes = getRandomInteger(15, 200);
    object.comments = createComment(getRandomInteger(1, 5));

    arrayOfObjects.push(object);
    count--;
  }

  return arrayOfObjects;
};

createArrayOfObjects(OBJECTS_COUNT);
