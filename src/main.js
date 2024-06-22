import { fetchImages } from './js/pixabay-api';
import { renderMarkup } from './js/render-functions';

import alert from './img/alert.svg';
import caution from './img/caution.svg';
import informSvg from './img/inform.svg'; 


// SimpleLightBox library
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// iziToast library
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchFormElem = document.querySelector('.search-form');
const searchInputElem = document.querySelector('.search-input');
const standBySpanElem = document.querySelector('.loader');
const galleryElem = document.querySelector('.gallery');
const loadBtnElem = document.querySelector('.load-btn');

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const limit = 15;
let page = 1;
let totalPages = 0;
let requestValue = '';

searchFormElem.addEventListener('submit', async event => {
  event.preventDefault();
  if (!searchInputElem.value.trim()) {
    searchFormElem.reset();
    return;
  }
try {
  page = 1;
  requestValue = '';
  loadBtnElem.classList.add('visually-hidden');
  galleryElem.innerHTML = '';
  standBySpanElem.classList.remove('visually-hidden');
  const fetchData = await fetchImages(
    searchInputElem.value.trim(),
    page,
    limit
  );
        if (!fetchData.total) {
        standBySpanElem.classList.remove('visually-hidden');
        iziToast.error({
          iconUrl: alert,
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
    standBySpanElem.classList.add('visually-hidden');
    galleryElem.insertAdjacentHTML('beforeend', renderMarkup(fetchData));
    gallery.refresh();
    totalPages = Math.ceil(fetchData.totalHits / limit);
    requestValue = searchInputElem.value.trim();
    if (page < totalPages) {
      loadBtnElem.classList.remove('visually-hidden');
    }
  }
    catch (error) {
      standBySpanElem.classList.add('visually-hidden');
      iziToast.warning({
        iconUrl: caution,
        message: `${error}`,
        position: 'topRight',
        timeout: 5000,
      });
    }
  searchFormElem.reset();
});

loadBtnElem.addEventListener('click', async event => {
  page += 1;
  if (page === totalPages) {
    iziToast.info({
      iconUrl: informSvg,
      position: 'topRight',
      backgroundColor: '#09f',
      message: "We're sorry, but you've reached the end of search results.",
    });
    standBySpanElem.classList.add('visually-hidden');
    loadBtnElem.classList.add('visually-hidden');
  }
  try {
    standBySpanElem.classList.remove('visually-hidden');
    const fetchData = await fetchImages(requestValue, page, limit);
    standBySpanElem.classList.add('visually-hidden');
    galleryElem.insertAdjacentHTML('beforeend', renderMarkup(fetchData));
    gallery.refresh();
    window.scrollBy({
      top: galleryElem.firstChild.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    standBySpanElem.classList.add('visually-hidden');
    iziToast.warning({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  }
});