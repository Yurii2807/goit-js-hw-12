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
