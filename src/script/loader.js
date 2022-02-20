export default class Loader {
    constructor({ selector }) {
        this.loader = document.querySelector(selector);
    }

    onShow() {
        this.loader.classList.remove('is-hidden')
    }

    onHide() {
        this.loader.classList.add('is-hidden')
    }
}

// const loaderDone = new Loader({
//     selector: '.loader',
// })
// loaderDone.onShow();
// console.log(loaderDone);