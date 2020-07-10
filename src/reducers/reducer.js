import {  
  RESTAURANTS_RECEIVED,
  FILTER_RESTAURANTS,
  SORT_BY,
} from '../actions';

const initialState = {
  citySelected: "Toronto",
  restaurants: [],
  shownRestaurants: [],
  isLoadedRestaurants: false,
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    
    case RESTAURANTS_RECEIVED:
      return {
        ...state,
        isLoadedRestaurants: true,
        restaurants: action.restaurants,
        shownRestaurants: action.restaurants,
      };
  
    case FILTER_RESTAURANTS:
      return {
        ...state,
        shownRestaurants: state.restaurants.filter(restaurant => (
          restaurant.name.toLowerCase().includes((action.value).toLowerCase())
        )),
      };

    case SORT_BY:
      if (action.value === 'alphabetical') {
        return {
          ...state,
          shownRestaurants: [...state.shownRestaurants].sort((a, b) => (
            a.name.localeCompare(b.name)
          )),
        };
      }

      return {
        ...state,
        shownRestaurants: [...state.shownRestaurants].sort((a, b) => a.age - b.age),
      };

    default:
      return state;
  }
};

export default reducer;