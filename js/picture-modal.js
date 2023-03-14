import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const pictureModal = document.querySelector('.big-picture');
const pictureModalCloseButton = document.querySelector('.big-picture__cancel');

const createCommentItem = ({ avatar, name, message }) => {
  const commentElement = pictureModal.querySelector('.social__comment').cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const createPictureModal = (data) => {
  const bigPicture = pictureModal.querySelector('.big-picture__img img');
  const pictureDescription = pictureModal.querySelector('.social__caption');
  const likesCount = pictureModal.querySelector('.likes-count');
  const commentsCount = pictureModal.querySelector('.comments-count');
  const commentsContainer = pictureModal.querySelector('.social__comments');
  const commentsCountContainer = pictureModal.querySelector('.social__comment-count');
  const commentsLoader = pictureModal.querySelector('.comments-loader');
  const commentsFragment = document.createDocumentFragment();

  commentsCountContainer.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.src = data.url;
  pictureDescription.textContent = data.description;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;

  for (const comment of data.comments) {
    const commentItem = createCommentItem(comment);
    commentsFragment.append(commentItem);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const onCloseButtonClick = () => closePictureModal();

const openPictureModal = (data) => {
  createPictureModal(data);
  body.classList.add('modal-open');
  pictureModal.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  pictureModalCloseButton.addEventListener('click', onCloseButtonClick);
};

function closePictureModal() {
  body.classList.remove('modal-open');
  pictureModal.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  pictureModalCloseButton.removeEventListener('click', onCloseButtonClick);
}

export { openPictureModal };
