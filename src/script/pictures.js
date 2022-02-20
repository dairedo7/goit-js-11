import { fetchPictures } from './API/pixabay';
import { LoadMoreBtn } from './loadMoreButton';
import { Notify } from 'notiflix';
import Loader from './loader';
import SimpleLightbox from 'simplelightbox';
import { onDocScroll, onMoveTopBtnClick } from './moveToTop';

import 'simplelightbox/dist/simple-lightbox.min.css';
import picturesTemplate from '../templates/renderPictures.hbs';

const formEl = document.querySelector('#search-form');
const galleryWrap = document.querySelector('.gallery');

let formData = '';
const perPage = 40;
let page = 1;

const onLoadMore = new LoadMoreBtn({
    selector: '.load-more',
    className: 'is-hidden',
    isHidden: true,
    onClick() {
        loadPictures(formData);
    }
});

const loaderInstance = new Loader({
    selector: '.loader',
})

const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, captionPosition: 'bottom' });

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
    evt.preventDefault();

    if (evt.currentTarget.elements.searchQuery.value === '') {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        onLoadMore.hide();
    }
    formData = evt.currentTarget.elements.searchQuery.value;
    page = 1;
    galleryWrap.innerHTML = '';
    onLoadMore.hide();

    const dataTrimmed = formData.trim();
    if (dataTrimmed !== '') {
        loadPictures(formData);
    }
}

async function loadPictures(formData) {
    onLoadMore.disable();
    loaderInstance.onShow();
    const data = await fetchPictures(formData, page, perPage);

    renderPictures(data.hits);
    onLoadMore.show();
    onLoadMore.enable();
    loaderInstance.onHide();

    if (page === 1 && data.hits.length !== 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    if (page !== 1) {
        behaviorScroll();
    }

    const totalPages = data.totalHits / perPage;
    console.log(totalPages);
    const hasNextPage = page < totalPages;
    page++;

    lightbox.refresh();

    if (data.hits.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        onLoadMore.hide();
    }
    if (!hasNextPage && data.hits.length !== 0) {
        Notify.warning("We're sorry, but you've reached the end of search results.");
        onLoadMore.hide();
    }
}

function renderPictures(pictures) {
    galleryWrap.insertAdjacentHTML('beforeend', picturesTemplate(pictures));
}

function behaviorScroll() {
    const { height: cardHeight } = galleryWrap.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}
