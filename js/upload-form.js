import { isAcceptKey, isEscapeKey } from './util.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_COUNT = 140;
const COMMENT_HASHTAG_MESSAGE = `Максимальная длина 20 символов, максимум ${MAX_HASHTAG_COUNT} тэгов`;
const COMMENT_ERROR_MESSAGE = `Максимальная длина ${MAX_COMMENT_COUNT} символов`;
const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;
const EFFECT_DEFAULT = 'none';

const filters = {
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    units: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    units: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    units: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    units: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    units: '',
  },
};

const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadFileInput = imageUploadForm.querySelector('#upload-file');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadScaleValue = imageUploadOverlay.querySelector('.scale__control--value');
const imageUploadScaleSmaller = imageUploadOverlay.querySelector('.scale__control--smaller');
const imageUploadScaleBigger = imageUploadOverlay.querySelector('.scale__control--bigger');
const imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview img');
const imageUploadEffectLevel = imageUploadOverlay.querySelector('.img-upload__effect-level');
const imageUploadEffectLevelValue = imageUploadOverlay.querySelector('.effect-level__value');
const imageUploadEffectLevelSlider = imageUploadOverlay.querySelector('.effect-level__slider');
const imageUploadEffectButtons = imageUploadOverlay.querySelectorAll('.effects__radio');
const imageUploadHashtagInput = imageUploadOverlay.querySelector('.text__hashtags');
const imageUploadCommentInput = imageUploadOverlay.querySelector('.text__description');
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

const onScaleSmallerButtonClick = () => {
  const currentScale = parseInt(imageUploadScaleValue.value, 10);

  if (currentScale > 0) {
    imageUploadScaleValue.value = `${currentScale - SCALE_STEP}%`;
    updateImageScale(currentScale - SCALE_STEP);
  }
};

const onScaleBiggerButtonClick = () => {
  const currentScale = parseInt(imageUploadScaleValue.value, 10);

  if (currentScale < 100) {
    imageUploadScaleValue.value = `${currentScale + SCALE_STEP}%`;
    updateImageScale(currentScale + SCALE_STEP);
  }
};

const onEffectButtonClick = (evt) => {
  updateImageEffect(evt.target.value);
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

function updateImageScale(value) {
  imageUploadPreview.style.transform = `scale(${value / 100})`;
}

function updateImageEffect(value) {
  imageUploadPreview.classList = '';
  imageUploadPreview.classList.add(`effects__preview--${value}`);

  if (imageUploadEffectLevelSlider.noUiSlider) {
    imageUploadEffectLevelSlider.noUiSlider.destroy();
  }

  if (value !== 'none') {
    imageUploadEffectLevel.classList.remove('hidden');
    createImageEffectSlider(filters[value]);
  } else {
    imageUploadPreview.style.filter = '';
    imageUploadEffectLevel.classList.add('hidden');
  }
}

function createImageEffectSlider({ filter, min, max, start, step, units }) {
  imageUploadEffectLevelValue.setAttribute('value', `${start}`);

  noUiSlider.create(imageUploadEffectLevelSlider, {
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });

  imageUploadEffectLevelSlider.noUiSlider.on('update', () => {
    imageUploadEffectLevelValue.setAttribute('value', imageUploadEffectLevelSlider.noUiSlider.get());
    imageUploadPreview.style.filter = `${filter}(${imageUploadEffectLevelValue.value}${units})`;
  });
}

function openUploadModal() {
  const file = imageUploadFileInput.files[0];

  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  imageUploadScaleValue.value = `${SCALE_DEFAULT}%`;
  updateImageScale(SCALE_DEFAULT);
  updateImageEffect(EFFECT_DEFAULT);
  imageUploadPreview.src = URL.createObjectURL(file);

  imageUploadEffectButtons.forEach((button) => {
    button.addEventListener('click', onEffectButtonClick);
  });
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
imageUploadScaleSmaller.addEventListener('click', onScaleSmallerButtonClick);
imageUploadScaleBigger.addEventListener('click', onScaleBiggerButtonClick);
imageUploadForm.addEventListener('submit', onFormSubmit);
