import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles"
import './RestaurantList.css';

const styles = {
  fullHeightCard: {
    height: "100%",
  },
}

const renderSwitch = (price) => {
  switch (price) {
    case 0:
      return "";
    case 1:
      return "$";
    case 2:
      return "$$";
    case 3:
      return "$$$";
    case 4:
      return "$$$$";
    case 5:
      return "$$$$$";
    default:
      return "";
  }
}

const RestaurantList = ({ restaurants }) => (

	<React.Fragment>
	<Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {restaurants.map((restaurant) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={restaurant.name} id={restaurant.id} xs={12} sm={restaurant.name === 'Enterprise' ? 12 : 6} md={4}>
              <Card className="fullHeightCard">
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                      {restaurant.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Address: {restaurant.address}
                    </Typography>
                    <Typography variant="body2" component="p">
                      City: {restaurant.city}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Area: {restaurant.area}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Tel: {restaurant.phone}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Price: $$$$
                    </Typography>
                  </CardContent>
                  <CardMedia
                    className="media"
                    style={{
                      width: 'auto',
                      height: '180px',
                    }}
                    image={restaurant.image_url}
                    title={restaurant.name}
                  />
                </CardActionArea>
                <CardActions>
                  <div className="buttonAlignCenter">
                    <Button variant="outlined" color="primary" href={restaurant.reserve_url}>
                      Reserve Table
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
  restaurants: state.shownRestaurants,
});

RestaurantList.propTypes = {
	restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
	addRestaurantToBasket: PropTypes.func.isRequired,
};

//export default connect(mapStateToProps)(RestaurantList);
export default compose(
  withStyles(styles, {
    name: 'RestaurantList',
  }),
  connect(mapStateToProps),
)(RestaurantList);