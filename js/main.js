import {getData} from './server.js';
import { onGetDataError } from './data.js';
import { renderPictures } from './render-pictures.js';
import './upload-form.js';

getData(renderPictures, onGetDataError);
