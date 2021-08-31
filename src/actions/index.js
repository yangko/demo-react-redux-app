export const RESTAURANTS_RECEIVED = 'RESTAURANTS_RECEIVED';
export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const BASKET_ITEM_INCREASED = 'BASKET_ITEM_INCREASED';
export const BASKET_ITEM_DECREASED = 'BASKET_ITEM_DECREASED';
export const BASKET_ITEM_REMOVED = 'BASKET_ITEM_REMOVED';
export const LIST_RESTAURANTS = 'LIST_RESTAURANTS';
export const FILTER_RESTAURANTS = 'FILTER_RESTAURANTS';
export const SORT_BY = 'SORT_BY';

export const loadRestaurants = citySelected => (dispatch) => {
  console.log('citySelected='+ citySelected);
  let characterId = {
    'Luke Skywalker': 1,
    'C-3PO': 2,
    'R2-D2': 3,
    'Darth Vader': 4,
    'Leia Organa': 5,
    'Owen Lars': 6,
    'Beru Whitesun lars': 7,
    'R5-D4': 8,
    'Biggs Darklighter': 9,
    'Obi-Wan Kenobi': 10
  };
  let characterNo = citySelected ? characterId[citySelected] : 1;
  console.log('characterNo= ' + characterNo);
  const endpoint = `https://swapi.dev/api/people/${characterNo}`;
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      //let restaurants = data.restaurants;
      //dispatch(receiveRestaurants(restaurants))
      let character = data;
      console.log(character.name);
      console.log(character.films);
      let filmArr = [];
      for (let i = 0; i < character.films.length; i++) {
        const request = async () => {
          const response = await fetch(character.films[i]);
          const json = await response.json();
          
          filmArr[i] = json;
        }
        request();
      }
      setTimeout(() => {
        let restaurants = filmArr;;
        dispatch(receiveRestaurants(restaurants));
      }, 5000);
    })
    .catch(console.log);
};

export const receiveRestaurants = restaurants => ({
  type: RESTAURANTS_RECEIVED,
  restaurants,
});

export const addToBasket = restaurantName => ({
  type: ADD_TO_BASKET,
  restaurantName,
});

export const increaseBasketItem = restaurantName => ({
  type: BASKET_ITEM_INCREASED,
  restaurantName,
});

export const decreaseBasketItem = restaurantName => ({
  type: BASKET_ITEM_DECREASED,
  restaurantName,
});

export const removeBasketItem = restaurantName => ({
  type: BASKET_ITEM_REMOVED,
  restaurantName,
});

export const listRestaurantsBy = citySelected => ({
  type: LIST_RESTAURANTS,
  citySelected
});

export const filterBy = value => ({
  type: FILTER_RESTAURANTS,
  value,
});

export const sortBy = value => ({
  type: SORT_BY,
  value,
});