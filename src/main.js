import { makeSearch, pageLimit } from "./js/pixabay-api";
import { createMarkup, clearGallery, toggleLoader, loadBttn } from "./js/render-functions"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconError from "./img/error.svg"
import iconInfo from "./img/info.svg"

const form = document.querySelector('.form');
let page;
let search = '';

form.addEventListener('submit', searchSubmit);
loadBttn.bttn.addEventListener('click', loadMore);

iziToast.settings({
    messageColor: '#fafafb',
    titleColor: '#fafafb',
    backgroundColor: '#ef4040',
    iconUrl: iconError,
    closeOnEscape: true,
    closeOnClick: true,
    position: 'bottomCenter',
});

async function searchSubmit(evt) {
    evt.preventDefault();
    page = 1;
    loadBttn.hideBttn();

    const searchInput = evt.target.elements['search-text'];
    search = searchInput.value.trim();

    if (!search) {
        iziToast.error({
            title: 'Error',
            message: 'Please, enter a valid image name!',
        })
        return;
    }
    clearGallery();
    toggleLoader();

    try {
        const resp = await makeSearch(search);
        if (resp.data.total === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching<br>your search query. Please try again!',
            })
            return;
        };
        createMarkup(resp.data.hits);
        resp.data.totalHits < pageLimit ? loadBttn.hideBttn() : loadBttn.showBttn();
        page += 1;
    } catch (error) {
        iziToast.error({
            title: "Oh no!",
            message: `${error.message}`,
        });
    } finally {
        toggleLoader();
    }
    form.reset();
};

async function loadMore() {
    toggleLoader();

    try {
        const resp = await makeSearch(search, page)
        if (resp.data.totalHits < Math.ceil(pageLimit * page)) {
            loadBttn.hideBttn();
            iziToast.info({
                message: `We're sorry, but you've reached the end of search results.`,
                backgroundColor: '#09',
                icon: iconInfo,
            });
        }
        createMarkup(resp.data.hits);
        page += 1;
        smoothScroll();
    } catch (error) {
        iziToast.error({
            title: "Oh no!",
            message: `${error.message}`,
        });
    } finally {
        toggleLoader()
    };
};

function smoothScroll() {
    const galleryCard = document.querySelector('.gallery_item').getBoundingClientRect();
    window.scrollBy({
        top: galleryCard.height * 2,
        behavior: 'smooth',
    })
}