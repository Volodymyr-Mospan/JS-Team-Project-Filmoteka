function getGenresById(ids) {
  const genresList = JSON.parse(localStorage.getItem('genres'));
  genresList.find(genre => genre.name === 'Science Fiction').name = 'Sci-Fi';
  let genres = ids.map(id => genresList.find(genre => genre.id === id).name);
  if (genres.length > 3) {
    genres = genres.slice(0, 2);
    genres.push('Other');
  }
  return genres.join(', ');
}

export { getGenresById };
