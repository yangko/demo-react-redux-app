export const FILMS_RECEIVED = 'FILMS_RECEIVED';
export const LIST_FILMS = 'LIST_FILMS';
export const FILTER_FILMS = 'FILTER_FILMS';
export const SORT_BY = 'SORT_BY';

export const loadFilms = characterSelected => (dispatch) => {
  let characterName = characterSelected ? characterSelected : "Luke Skywalker";
  console.log('characterName= ' + characterName);
  const endpoint = `/api/films?character=${characterName}`;
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      let films = data.films;
      dispatch(receiveFilms(films))
    })
    .catch(console.log);
};

export const receiveFilms = films => ({
  type: FILMS_RECEIVED,
  films,
});

export const listFilmsBy = characterSelected => ({
  type: LIST_FILMS,
  characterSelected
});

export const filterBy = value => ({
  type: FILTER_FILMS,
  value,
});

export const sortBy = value => ({
  type: SORT_BY,
  value,
});