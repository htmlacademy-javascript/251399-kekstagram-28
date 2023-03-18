import {isAcceptKey, isEscapeKey} from './util.js';

const pictureModal = document.querySelector('.big-picture');
const pictureModalCloseButton = document.querySelector('.big-picture__cancel');
const bigPicture = pictureModal.querySelector('.big-picture__img img');
const pictureDescription = pictureModal.querySelector('.social__caption');
const likesCount = pictureModal.querySelector('.likes-count');
const commentsCount = pictureModal.querySelector('.comments-count');
const commentsContainer = pictureModal.querySelector('.social__comments');
const commentsCountContainer = pictureModal.querySelector('.social__comment-count');
const commentsLoader = pictureModal.querySelector('.comments-loader');
const commentTemplateElement = document.querySelector('template#social-comment').content.querySelector('.social__comment');

const createCommentItem = ({ avatar, name, message }) => {
  const commentElement = commentTemplateElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const createModalComments = (comments) => {
  commentsContainer.innerHTML = '';
  commentsContainer.append(...comments.map(createCommentItem));
};

const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const onCloseButtonClick = closePictureModal;
const onCloseButtonKeydown = (evt) => {
  if (isAcceptKey(evt)) {
    closePictureModal();
  }
};

const openPictureModal = (url, likes, comments, description) => {
  bigPicture.src = url;
  pictureDescription.textContent = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;

  createModalComments(comments);

  commentsCountContainer.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');
  pictureModal.classList.remove('hidden');

  document.addEventListener('keydown', onEscapeKeydown);
};

function closePictureModal() {
  document.body.classList.remove('modal-open');
  pictureModal.classList.add('hidden');

  document.removeEventListener('keydown', onEscapeKeydown);
}

pictureModalCloseButton.addEventListener('click', onCloseButtonClick);
pictureModalCloseButton.addEventListener('click', onCloseButtonKeydown);

export { openPictureModal };
