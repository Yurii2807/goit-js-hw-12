import { fetchImages } from './js/pixabay-api.js';
import { renderMarkup } from './js/render-functions.js';

import alert from './img/alert.svg';
import caution from './img/caution.svg';

// SimpleLightBox library
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// iziToast library
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


import axios from "axios";
axios.get("https://jsonplaceholder.typicode.com/users", {
    params: {
      _limit: 1,
      _sort: "name"
    }
  });
  
const searchFormElem = document.querySelector('.search-form');
const searchInputElem = document.querySelector('.search-input');
const searchBtnElem = document.querySelector('.search-btn');
const standBySpanElem = document.querySelector('.loader-hidden');
const galleryElem = document.querySelector('.gallery');
const axios = require('axios/dist/browser/axios.cjs');
const axios = require('axios/dist/node/axios.cjs');

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

searchBtnElem.addEventListener('click', event => {
  event.preventDefault();
  if (!searchInputElem.value.trim()) {
    searchFormElem.reset();
    return;
  }
  galleryElem.innerHTML = '';
  standBySpanElem.classList.remove('visually-hidden');
  fetchImages(searchInputElem.value.trim())
    .then(data => {
      if (!data.total) {
        iziToast.error({
          iconUrl: alert,
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      galleryElem.insertAdjacentHTML('afterbegin', renderMarkup(data));
      gallery.refresh();
      standBySpanElem.classList.add('visually-hidden');
    })
    .catch(error => {
      iziToast.warning({
        iconUrl: caution,
        position: 'topRight',
        message: `${error}`,
      });
      standBySpanElem.classList.add('visually-hidden');
    });
  searchFormElem.reset();
});