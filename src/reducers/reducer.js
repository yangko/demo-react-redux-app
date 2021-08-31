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
          restaurant.title.toLowerCase().includes((action.value).toLowerCase())
        )),
      };

    case SORT_BY:
      if (action.value === 'release_date') {
        return {
          ...state,
          shownRestaurants: [...state.shownRestaurants].sort((a, b) => (
            b.release_date.localeCompare(a.release_date)
          )),
        };
      }

      if (action.value === 'alphabetical') {
        return {
          ...state,
          shownRestaurants: [...state.shownRestaurants].sort((a, b) => (
            a.title.localeCompare(b.title)
          )),
        };
      }
      break;
    default:
      return state;
  }
};

export default reducer;