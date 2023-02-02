import { searchByGenre } from './get-movies-by-genre';
import { gallery } from './templates.js/gallery-markup';
let options = document.querySelector('.filter__list');
let filterBtn;
let genreID;

function addFilter() {
  options = document.querySelector('.filter__list');
  filterBtn = document.querySelector('.filter__button');
  filterBtn.addEventListener('click', showHideFilter);
}

function showHideFilter(e) {
  e.target.classList.toggle('active');
  options.classList.toggle('is-hidden');
  gallery.scrollIntoView();
  const genresList = JSON.parse(localStorage.getItem('genres'));
  const optionsMarkup = genresList
    .map(
      ({ id, name }) =>
        `<li class="filter__item"><button class="filter__option" type="button" data-id="${id}">${name}</button></li>`
    )
    .join('');
  options.innerHTML = optionsMarkup;
  options.addEventListener('click', showFilteredMovies);
}

function showFilteredMovies(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  try {
    switchOptions(e);
    genreID = e.target.dataset.id;
    searchByGenre(genreID);
    gallery.scrollIntoView();
  } catch (error) {}
}

function switchOptions(e) {
  const currentActive = document.querySelector('.filter__option.active');
  currentActive && currentActive.classList.remove('active');
  e.target.classList.add('active');
}

export { addFilter };
