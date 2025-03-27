import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export const loadBttn = {
  bttn: document.querySelector('button[name="load-more"]'),
  hideBttn() {
    loadBttn.bttn.classList.add("visually-hidden");
  },
  showBttn() {
    loadBttn.bttn.classList.remove("visually-hidden");
  }
};

export function createMarkup(hits) {
  const markUp = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<li class="gallery_item">
      <a class="gallery_img_link" href="${largeImageURL}">
      <img class="gallery_img"
        src="${webformatURL}" 
        alt="${tags}" 
        width="360" 
        height="200" /></a>
      <div class="gallery_item_box">
        <ul class="gallery_item_list">
          <li>
            <p>Likes</p>
            ${likes}
          </li>
          <li>
            <p>Views</p>
            ${views}
          </li>
          <li>
            <p>Comments</p>
            ${comments}
          </li>
          <li>
            <p>Downloads</p>
            ${downloads}
          </li>
        </ul>
      </div>
    </li>
    `).join("");

  gallery.insertAdjacentHTML('beforeend', markUp);
  modal.refresh();
};

const modal = new SimpleLightbox('.gallery a', {
  captionsData: "alt",
  captionDelay: 150,
});

export function clearGallery() {
  gallery.innerHTML = '';
};

export function toggleLoader() {
  loader.classList.toggle("visually-hidden");
}

