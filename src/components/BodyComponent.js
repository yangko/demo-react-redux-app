import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { loadFilms } from '../actions';
import Filter from './Filter/Filter';
import RestaurantList from './FilmList/FilmList';
import Loader from './Loader/Loader';
import './BodyComponent.css';
import './Filter/Filter.css';

const HeroContent = () => (
  <React.Fragment>
    <Container maxWidth="lg" component="main" className="heroContent">
      <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
      </Typography>
      <Typography variant="h4" align="center" color="textSecondary" component="p">
        A Demo of The Star Wars API (https://swapi.dev/) SPA App
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
        Select character from the dropdown ('Luke Skywalker' as the default), then show a list of movies the character casted. filtering and sorting feature enabled. Using RESTful API, Redux store, Webpack, Material-UI.
      </Typography>
    </Container>
  </React.Fragment>
);

class BodyComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      characterSelected: "Luke Skywalker",
      characters: [],
      films: [],
      isLoaded: false,
    };
  }
  async componentDidMount() {
    this.props.payLoad(); // Default character: Luke Skywalker
  }

  render() {
    const { isLoaded } = this.props;
    return (
      <div>
        <HeroContent />
        <Filter />
        { isLoaded
          ? 
          <FilmList />
          : <Loader />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoaded: state.isLoadedFilms,
});

const mapDispatchToProps = dispatch => ({
  payLoad: () => dispatch(loadFilms()),
});

BodyComponent.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  payLoad: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyComponent);