export const RESTAURANTS_RECEIVED = 'RESTAURANTS_RECEIVED';
export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const BASKET_ITEM_INCREASED = 'BASKET_ITEM_INCREASED';
export const BASKET_ITEM_DECREASED = 'BASKET_ITEM_DECREASED';
export const BASKET_ITEM_REMOVED = 'BASKET_ITEM_REMOVED';
export const LIST_RESTAURANTS = 'LIST_RESTAURANTS';
export const FILTER_RESTAURANTS = 'FILTER_RESTAURANTS';
export const SORT_BY = 'SORT_BY';

export const loadRestaurants = citySelected => (dispatch) => {
  let cityName = citySelected ? citySelected : "Toronto";
  console.log('cityName' + cityName);
  const endpoint = `http://opentable.herokuapp.com/api/restaurants?city=${cityName}`;
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      let restaurants = data.restaurants;
      dispatch(receiveRestaurants(restaurants))
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