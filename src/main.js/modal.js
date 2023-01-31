import {
  createModalMarkup,
  addTrailersMarkup,
} from './templates.js/modal-markup';
import { getMovie } from './get-movie';
/* import { setLocalStorage } from './local-storage'; */
import { themeSwitcherModals } from './theme-switcher';
import { themeSwitcherModalButtons } from './theme-switcher';
import { initBtns } from './library-manager';
import { gallery } from './templates.js/gallery-markup';
import { seeSimilar } from './similar';

const buttonClose = document.querySelector('.button__close');
const backdrop = document.querySelector('.modal__backdrop');
const modal = document.querySelector('.js-modal');
const modalContainer = document.querySelector('.modal');
let buttonTrailer;
let filmButtons;

gallery.addEventListener('click', openModal);

async function openModal(e) {
  if (e.target.className !== 'gallery__link') return;
  e.preventDefault();
  toggleClass();
  document.body.style.overflow = 'hidden';
  try {
    const data = await getMovie(e);
    createModalMarkup(data);
    /* setLocalStorage(data); */
    initBtns(data);

    buttonTrailer = document.querySelector('.js-film__button--trailer');
    filmButtons = document.querySelectorAll('.film__button');

    buttonTrailer?.addEventListener('click', openTrailers);
    buttonTrailer.data = data;
    buttonTrailer.disabled = false;
    document.addEventListener('keydown', onKeydownEscape);
    buttonClose.addEventListener('click', closeModal);
    backdrop.addEventListener('click', onBackdropClick);
    themeSwitcherModals(modalContainer);

    filmButtons.forEach(function (filmButton) {
      themeSwitcherModalButtons(filmButton);
    });
    seeSimilar(modal);
  } catch (error) {
    console.log(error);
  }
}
function openTrailers(e) {
  modal.insertAdjacentHTML(
    'beforeend',
    addTrailersMarkup(e.currentTarget.data)
  );
  buttonTrailer.disabled = true;
}
function onKeydownEscape(e) {
  e.code === 'Escape' && closeModal();
}
function closeModal() {
  toggleClass();
  modal.innerHTML = '';
  document.body.style.overflow = 'visible';
  document.removeEventListener('keydown', onKeydownEscape);
  buttonClose.removeEventListener('click', closeModal);
  backdrop.removeEventListener('click', closeModal);
  buttonTrailer.removeEventListener('click', openTrailers);
  modal?.removeEventListener('keydown', onKeydownEscape);
  modal?.removeEventListener('click', closeModal);
}
function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}
function toggleClass() {
  backdrop.classList.toggle('is-hidden');
}
export { closeModal };
