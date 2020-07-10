import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadRestaurants, filterBy, sortBy } from '../../actions';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Filter.css';

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiInputBase: {
      // Name of the rule
      input: {
        color: 'black',
        height: '1.32em',
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
        marginBttom: 0,
      }
    },
  },
});

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citySelected: "Toronto",
      cities: [],
      isLoaded: false,
      inputValue: '',
      selectValue: '',
    };
    this.handleSelectCity = this.handleSelectCity.bind(this);
  }

  componentDidMount() {
    fetch('http://opentable.herokuapp.com/api/cities')
    .then(res => res.json())
    .then((data) => {
        this.setState({ cities: data.cities, isLoaded: true, })
    })
    .catch(console.log);
  }

  handleSelectCity = (event, values) => {
    this.setState({
      citySelected: values,
    }, () => {
      // Update State With Redux
      const { loadRestaurantsByValue } = this.props;
      
      loadRestaurantsByValue(this.state.citySelected);
    });
  }

  handleInputValue = (event) => {
    const { value } = event.target;
    const { filterByValue, sortByValue } = this.props;
    const { selectValue } = this.state;

    this.setState({ inputValue: value });

    filterByValue(value);
    sortByValue(selectValue);
  };

  handleSelect = (event) => {
    const { value } = event.target;
    const { sortByValue } = this.props;

    this.setState({ selectValue: value });

    sortByValue(value);
  }

  render() {
    const { isLoaded, citySelected, inputValue, selectValue } = this.state;
    //const { classes } = this.props;

    if ( !isLoaded) {
      return <div className="filter-wrap"> Loading ... </div>;
    } else {
      let cities = this.state.cities;

      return (
        <div className="filter-wrap">
          <ThemeProvider theme={theme}>
            <Autocomplete
              disableClearable
              style={{
                width: '300px',
                height: '58px',
                backgroundColor: 'white',
                marginTop: '15px',
                paddingTop: 0,
              }}
              onChange={this.handleSelectCity}
              options={cities}
              renderInput={(params) => (
                <TextField
                    {...params}
                    className="field filter-field without-padding"
                    placeholder={citySelected}
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search', }}
                />
              )}
            />
          </ThemeProvider>
          <input
            className="field filter-field without-padding"
            placeholder="Filter"
            value={inputValue}
            onChange={this.handleInputValue}
            margin="normal"
            variant="outlined"
          />
          <select
            className="field sort-field"
            value={selectValue}
            onChange={this.handleSelect}
          >
            <option
              className="sort-field__option"
              disabled
              value=""
            >
              Sort by
            </option>
            <option className="sort-field__option" value="age">Newest</option>
            <option
              className="sort-field__option"
              value="alphabetical"
            >
              Alphabetical
            </option>
          </select>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  citySelected: state.citySelected,
  isLoaded: state.isLoaded,
});

const mapDispatchToProps = dispatch => ({
  loadRestaurantsByValue: value => dispatch(loadRestaurants(value)),
  filterByValue: value => dispatch(filterBy(value)),
  sortByValue: value => dispatch(sortBy(value)),
});

Filter.propTypes = {
  loadRestaurantsByValue: PropTypes.func.isRequired,
  filterByValue: PropTypes.func.isRequired,
  sortByValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);