import { isAcceptKey, isEscapeKey } from './util.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_COUNT = 140;
const COMMENT_HASHTAG_MESSAGE = `Максимальная длина 20 символов, максимум ${MAX_HASHTAG_COUNT} тэгов`;
const COMMENT_ERROR_MESSAGE = `Максимальная длина ${MAX_COMMENT_COUNT} символов`;
const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;
const EFFECT_DEFAULT = 'none';

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

const onScaleButtonClick = (evt) => {
  const currentScale = parseInt(imageUploadScaleValue.value, 10);

  if (evt.target === imageUploadScaleSmaller && currentScale > 0) {
    imageUploadScaleValue.value = `${currentScale - SCALE_STEP}%`;
    updateImageScale(currentScale - SCALE_STEP);
  }

  if (evt.target === imageUploadScaleBigger && currentScale < 100) {
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

    if (value === 'chrome') {
      createImageEffectSlider(0, 1, 1, 0.1, value);
    }

    if (value === 'sepia') {
      createImageEffectSlider(0, 1, 1, 0.1, value);
    }

    if (value === 'marvin') {
      createImageEffectSlider(0, 100, 100, 1, value);
    }

    if (value === 'phobos') {
      createImageEffectSlider(0, 3, 3, 0.1, value);
    }

    if (value === 'heat') {
      createImageEffectSlider(0, 3, 3, 0.1, value);
    }

  } else {
    imageUploadPreview.style.filter = '';
    imageUploadEffectLevel.classList.add('hidden');
  }
}

function createImageEffectSlider(min, max, start, step, effect) {
  imageUploadEffectLevelValue.setAttribute('value', `${start}`);

  noUiSlider.create(imageUploadEffectLevelSlider, {
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  imageUploadEffectLevelSlider.noUiSlider.on('update', () => {
    imageUploadEffectLevelValue.setAttribute('value', imageUploadEffectLevelSlider.noUiSlider.get());

    if (effect === 'chrome') {
      imageUploadPreview.style.filter = `grayscale(${imageUploadEffectLevelValue.value})`;
    }

    if (effect === 'sepia') {
      imageUploadPreview.style.filter = `sepia(${imageUploadEffectLevelValue.value})`;
    }

    if (effect === 'marvin') {
      imageUploadPreview.style.filter = `invert(${imageUploadEffectLevelValue.value}%)`;
    }

    if (effect === 'phobos') {
      imageUploadPreview.style.filter = `blur(${imageUploadEffectLevelValue.value}px)`;
    }

    if (effect === 'heat') {
      imageUploadPreview.style.filter = `brightness(${imageUploadEffectLevelValue.value})`;
    }
  });
}

function openUploadModal() {
  const file = imageUploadFileInput.files[0];

  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  imageUploadScaleValue.value = `${SCALE_DEFAULT} % `;
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

  imageUploadEffectButtons.forEach((button) => {
    button.removeEventListener('click', onEffectButtonClick);
  });
  document.removeEventListener('keydown', onEscapeKeydown);
}

pristine.addValidator(imageUploadHashtagInput, validateHashtag, COMMENT_HASHTAG_MESSAGE);
pristine.addValidator(imageUploadCommentInput, validateComment, COMMENT_ERROR_MESSAGE);

imageUploadFileInput.addEventListener('change', onFileUpload);
imageUploadOverlayCloseButton.addEventListener('click', onCloseButtonClick);
imageUploadOverlayCloseButton.addEventListener('keydown', onCloseButtonKeydown);
imageUploadScaleSmaller.addEventListener('click', onScaleButtonClick);
imageUploadScaleBigger.addEventListener('click', onScaleButtonClick);
imageUploadForm.addEventListener('submit', onFormSubmit);
