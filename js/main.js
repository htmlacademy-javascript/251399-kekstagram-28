import { createArrayOfObjects } from './data.js';
import { renderPictures } from './render-pictures.js';
import './upload-form.js';

const picturesData = createArrayOfObjects();
renderPictures(picturesData);
