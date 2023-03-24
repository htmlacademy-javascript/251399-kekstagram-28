import { isAcceptKey, isEscapeKey } from './util.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_COUNT = 140;
const COMMENT_HASHTAG_MESSAGE = `Максимальная длина 20 символов, максимум ${MAX_HASHTAG_COUNT} тэгов`;
const COMMENT_ERROR_MESSAGE = `Максимальная длина ${MAX_COMMENT_COUNT} символов`;

const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadFileInput = imageUploadForm.querySelector('#upload-file');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
// const imageUploadScaleValue = imageUploadOverlay.querySelector('.scale__control--value');
// const imageUploadScaleSmaller = imageUploadOverlay.querySelector('.scale__control--smaller');
// const imageUploadScaleBigger = imageUploadOverlay.querySelector('.scale__control--bigger');
const imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview img');
// const imageUploadEffectLevel = imageUploadOverlay.querySelector('.img-upload__effect-level');
// const imageUploadEffectButtons = imageUploadOverlay.querySelectorAll('.effects__radio');
const imageUploadHashtagInput = imageUploadOverlay.querySelector('.text__hashtags');
const imageUploadCommentInput = imageUploadOverlay.querySelector('.text__description');
// const imageUploadOverlaySubmitButton = imageUploadOverlay.querySelector('.img-upload__submit');
const imageUploadOverlayCloseButton = imageUploadOverlay.querySelector('.img-upload__cancel');


const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
}, false);

const onFileUpload = openUploadModal;

const onEscapeKeydown = (evt) => {
  if (document.activeElement === imageUploadHashtagInput || document.activeElement === imageUploadCommentInput) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const onCloseButtonClick = closeUploadModal;
const onCloseButtonKeydown = (evt) => {
  if (isAcceptKey(evt)) {
    closeUploadModal();
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    imageUploadForm.submit();
  }
};

const checkValidTag = (tag) => HASHTAG_REGEX.test(tag);

const checkUniqueTag = (array) => {
  const result = [];

  array.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });

  return array.length === result.length;
};

const checkArrayLength = (array, maxLength) => array.length <= maxLength;

function validateHashtag(value) {
  const tags = value.toLowerCase().trim().split(' ').filter((tag) => tag.trim());
  return value.length === 0 || tags.every(checkValidTag) && checkUniqueTag(tags) && checkArrayLength(tags, MAX_HASHTAG_COUNT);
}

function validateComment(value) {
  const symbols = value.trim().split('');
  return value.length === 0 || checkArrayLength(symbols, MAX_COMMENT_COUNT);
}

function openUploadModal() {
  const file = imageUploadFileInput.files[0];

  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  imageUploadPreview.src = URL.createObjectURL(file);

  document.addEventListener('keydown', onEscapeKeydown);
}

function closeUploadModal() {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.add('modal-open');
  imageUploadPreview.src = 'img/upload-default-image.jpg';

  imageUploadForm.reset();
  pristine.reset();

  document.removeEventListener('keydown', onEscapeKeydown);
}

pristine.addValidator(imageUploadHashtagInput, validateHashtag, COMMENT_HASHTAG_MESSAGE);
pristine.addValidator(imageUploadCommentInput, validateComment, COMMENT_ERROR_MESSAGE);

imageUploadFileInput.addEventListener('change', onFileUpload);
imageUploadOverlayCloseButton.addEventListener('click', onCloseButtonClick);
imageUploadOverlayCloseButton.addEventListener('keydown', onCloseButtonKeydown);

imageUploadForm.addEventListener('submit', onFormSubmit);
