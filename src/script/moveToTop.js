export { onDocScroll, onMoveTopBtnClick };
const moveTopBtn = document.querySelector('.move-top');

window.addEventListener('scroll', onDocScroll);
moveTopBtn.addEventListener('click', onMoveTopBtnClick);


function onDocScroll() {
    const windowPosition = window.pageYOffset;

    if (windowPosition > 0) {
        moveTopBtn.classList.remove('is-hidden');
    }
    if (windowPosition === 0) {
        moveTopBtn.classList.add('is-hidden');
    }
}

function onMoveTopBtnClick() {
    if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

