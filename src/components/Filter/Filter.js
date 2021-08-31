import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadFilms, filterBy, sortBy } from '../../actions';
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
      characterSelected: "Luke Skywalker",
      characters: [],
      isLoaded: false,
      inputValue: '',
      selectValue: '',
    };
    this.handleSelectCity = this.handleSelectCity.bind(this);
  }

  componentDidMount() {
    fetch('https://swapi.dev/api/people')
    .then(res => res.json())
    .then((data) => {
        //this.setState({ characters: data.characters, isLoaded: true, })
        let results = data.results;
        console.log(results);
        let characters = [];

        results.forEach(element => {
          characters.push(element.name);
        });
        
        this.setState({ characters: characters, isLoaded: true, })
    })
    .catch(console.log);
  }

  handleSelectCity = (event, values) => {
    this.setState({
      characterSelected: values,
    }, () => {
      // Update State With Redux
      const { loadFilmsByValue } = this.props;
      
      loadFilmsByValue(this.state.characterSelected);
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
    const { isLoaded, characterSelected, inputValue, selectValue } = this.state;
    //const { classes } = this.props;

    if ( !isLoaded) {
      return <div className="filter-wrap"> Loading ... </div>;
    } else {
      let characters = this.state.characters;
      console.log(characters);
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
              options={characters}
              renderInput={(params) => (
                <TextField
                    {...params}
                    className="field filter-field without-padding"
                    placeholder={characterSelected}
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
            <option className="sort-field__option" value="release_date">Newest</option>
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
  characterSelected: state.characterSelected,
  isLoaded: state.isLoaded,
});

const mapDispatchToProps = dispatch => ({
  loadFilmsByValue: value => dispatch(loadFilms(value)),
  filterByValue: value => dispatch(filterBy(value)),
  sortByValue: value => dispatch(sortBy(value)),
});

Filter.propTypes = {
  loadFilmsByValue: PropTypes.func.isRequired,
  filterByValue: PropTypes.func.isRequired,
  sortByValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);