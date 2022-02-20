export class LoadMoreBtn {
    #element;
    #className;
    #onClickEvt;

    constructor({ selector, className = "hidden", isHidden = false, onClick = () => null }) {
        this.#element = document.querySelector(selector);
        this.#className = className;
        this.#onClickEvt = onClick;

        this.#bindEvents();

        if (isHidden) this.hide();
    }

    show() {
        this.#element.classList.remove(this.#className);
    }

    hide() {
        this.#element.classList.add(this.#className);
    }

    enable() {
        this.#element.disabled = false;
        this.#element.textContent = "Load more"
    }

    disable() {
        this.#element.disabled = true;
        this.#element.textContent = "Loading..."
    }

    #bindEvents() {
        this.#element.addEventListener('click', this.#onClickEvt)
    }
}