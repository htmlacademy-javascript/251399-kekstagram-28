import { isAcceptKey, isEscapeKey } from './util.js';

const pictureModal = document.querySelector('.big-picture');
const pictureModalCloseButton = document.querySelector('.big-picture__cancel');
const bigPicture = pictureModal.querySelector('.big-picture__img img');
const pictureDescription = pictureModal.querySelector('.social__caption');
const likesCount = pictureModal.querySelector('.likes-count');
const commentsCountContainer = pictureModal.querySelector('.social__comment-count');
const currentCommentsCount = commentsCountContainer.querySelector('.current-comments-count');
const summaryCommentsCount = commentsCountContainer.querySelector('.comments-count');
const commentsList = pictureModal.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('template#social-comment').content.querySelector('.social__comment');
const COMMENTS_STEP = 5;

const makeSequence = (step) => {
  let index = 0;
  return () => {
    index += step;
    return index;
  };
};

const createCommentItem = ({ avatar, name, message }) => {
  const commentElement = commentTemplateElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const clearElement = (element) => (element.innerHTML = '');

const createModalComments = (comments, stepSequence, commentsLoader) => {
  const index = stepSequence();

  if (comments.length === 0) {
    commentsCountContainer.classList.add('hidden');
  } else {
    commentsCountContainer.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');

    currentCommentsCount.textContent = index;

    if (currentCommentsCount.textContent >= comments.length) {
      currentCommentsCount.textContent = comments.length;
      commentsLoader.classList.add('hidden');
    }

    summaryCommentsCount.textContent = comments.length;
  }

  commentsList.append(...comments.map(createCommentItem).slice(0, index));
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

const makeCommentsLoaderElement = () => {
  const commentsLoader = pictureModal.querySelector('.comments-loader');
  const newCommentsLoader = commentsLoader.cloneNode(true);
  commentsLoader.replaceWith(newCommentsLoader);

  return newCommentsLoader;
};

const openPictureModal = (url, likes, comments, description) => {
  const stepSequence = makeSequence(COMMENTS_STEP);
  const commentsLoader = makeCommentsLoaderElement();

  bigPicture.src = url;
  pictureDescription.textContent = description;
  likesCount.textContent = likes;

  clearElement(commentsList);
  createModalComments(comments, stepSequence, commentsLoader);

  document.body.classList.add('modal-open');
  pictureModal.classList.remove('hidden');

  commentsLoader.addEventListener('click', () => {
    clearElement(commentsList);
    createModalComments(comments, stepSequence, commentsLoader);
  });
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
