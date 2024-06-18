export function renderMarkup(images) {
    const markup = images.hits
      .map(image => {
        return `<li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}">
          <div class="cards-wrapper">
          <div class="card-wrapper">
            <strong>Likes</strong>
            <p>${image.likes}</p>
          </div>
          <div class="card-wrapper">
            <strong>Views</strong>
            <p>${image.views}</p>
          </div>
          <div class="card-wrapper">
            <strong>Comments</strong>
            <p>${image.comments}</p>
          </div>
          <div class="card-wrapper">
            <strong>Downloads</strong>
            <p>${image.downloads}</p>
          </div>
        </div>
        </a>
      </li>`;
      })
      .join('');
    return markup;
  }

  const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.query.value;
  page = 1;
  gallery.innerHTML = '';
  loadMoreButton.classList.add('hidden');
  
  const data = await fetchImages(query, page);
  renderImages(data.hits);
  if (data.totalHits > per_page) {
    loadMoreButton.classList.remove('hidden');
  }
}

async function onLoadMore() {
  page += 1;
  const data = await fetchImages(query, page);
  renderImages(data.hits);
  if (page * per_page >= data.totalHits) {
    loadMoreButton.classList.add('hidden');
    alert("We're sorry, but you've reached the end of search results.");
  }
  scrollPage();
}

function renderImages(images) {
  const markup = images.map(image => {
    return `<div class="photo-card">
              <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
              <div class="info">
                <p><b>Likes</b> ${image.likes}</p>
                <p><b>Views</b> ${image.views}</p>
                <p><b>Comments</b> ${image.comments}</p>
                <p><b>Downloads</b> ${image.downloads}</p>
              </div>
            </div>`;
  }).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
