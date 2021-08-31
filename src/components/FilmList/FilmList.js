import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardHeader from '@material-ui/core/CardHeader';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
//import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles"
import './FilmList.css';

const styles = {
  fullHeightCard: {
    height: "100%",
  },
}

const filmImage = {
  'A New Hope': '/assets/images/a-new-hope.jpg',
  'C-3PO': '/assets/images/c-3po.jpg',
  'R2-D2': '/assets/images/r2-d2.jpg',
  'Darth Vade': '/assets/images/darth-vade.jpg',
  'Leia Organa': '/assets/images/leia-organa.jpg',
  'Owen Lars': '/assets/images/owen-lars.jpg',
  'Beru Whitesun lars': '/assets/images/beru-whitesun-lars.jpg',
  'R5-D4': '/assets/images/r5-d4.jpg',
  'Biggs Darklighter': '/assets/images/biggs-darklighter.jpg',
  'Obi-Wan Kenobi': '/assets/images/obi-wan-kenobi.jpg',
  'The Empire Strikes Back': '/assets/images/the-empire-strikes-back.jpg',
  'Return of the Jedi': '/assets/images/return-of-the-Jedi.jpg',
  'Revenge of the Sith': '/assets/images/revenge-of-the-sith.jpg',
  'The Phantom Menace': '/assets/images/the-phantom-menace.jpg',
  'Attack of the Clones': '/assets/images/attack-of-the-clones.jpg'
}

const FilmList = ({ films }) => (

	<React.Fragment>
	<Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {films.map((film) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={film.title} id={film.spisode_id} xs={12} sm={film.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card className="fullHeightCard">
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                      {film.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <b>Episode ID:</b> {film.episode_id}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <b>Director:</b> {film.director}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <b>Producer:</b>Producer: {film.producer}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <b>Release Date:</b> <font color="red">{film.release_date}</font>
                    </Typography>
                    <Typography variant="body2" component="p">
                      <b>Opening Crawl:</b> {film.opening_crawl}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    className="media"
                    style={{
                      width: 'auto',
                      height: '200px',
                    }}
                    image={filmImage[film.title]}
                    title={film.title}
                  />
                </CardActionArea>
                <CardActions>
                  <div className="buttonAlignCenter">
                    <Button variant="outlined" color="primary" href={film.url}>
                      Watch
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

	  </React.Fragment>
)

const mapStateToProps = state => ({
  cities: state.cities,
  films: state.shownFilms,
});

FilmList.propTypes = {
	films: PropTypes.arrayOf(PropTypes.object).isRequired,
	addFilmToBasket: PropTypes.func.isRequired,
};

//export default connect(mapStateToProps)(FilmList);
export default compose(
  withStyles(styles, {
    name: 'FilmList',
  }),
  connect(mapStateToProps),
)(FilmList);