import { makeSearch } from "./js/pixabay-api";
import { createMarkup, clearGallery, toggleLoader } from "./js/render-functions"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconPath from "./img/Group.svg"

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

iziToast.settings({
    messageColor: '#fafafb',
    titleColor: '#fafafb',
    backgroundColor: '#ef4040',
    iconUrl: iconPath,
    closeOnEscape: true,
    closeOnClick: true,
    position: 'topRight',
});

function handleSubmit(evt) {
    evt.preventDefault();
    const searchInput = evt.target.elements['search-text'];
    const search = searchInput.value.trim();

    if (!searchInput.value || !search) {
        iziToast.error({
            title: 'Error',
            message: 'Please, enter a valid image name!',
        })
        return;
    }
    clearGallery();
    toggleLoader();
    makeSearch(search)
        .then(resp => {
            if (resp.data.total === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching<br>your search query. Please try again!',
                })
                return toggleLoader();
            };
            toggleLoader();
            createMarkup(resp.data.hits);
        })
        .catch(error => {
            iziToast.error({
                title: "Oh no!",
                message: `${error.message}`,
            });
            return toggleLoader();
        });
    form.reset();
};