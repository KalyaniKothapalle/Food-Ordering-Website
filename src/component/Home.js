import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurants,
  sortByRatings,
  sortByReviews,
  toggleVegOnly,
} from "../actions/restaurantAction";
import Restaurant from "../component/Restaurant";
import Loader from "../component/layout/Loader";
import Message from "../component/Message";
import CountRestaurant from "../component/CountRestaurant";
import { useParams } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  // Access data from the Redux store using useSelector
  const {
    loading: restaurantsLoading,
    error: restaurantsError,
    restaurants,
    showVegOnly,
  } = useSelector((state) => state.restaurants);

  /// useEffect hook to dispatch an action when the component mounts
  useEffect(() => {
    // Check if there's an error from a previous action
    if (restaurantsError) {
      return alert.error(restaurantsError);
    }
    dispatch(getRestaurants(keyword));
  }, [dispatch, restaurantsError, keyword]);

  const handlleSortByReviews = () => {
    dispatch(sortByReviews());
  };

  const handlleSortByRatings = () => {
    dispatch(sortByRatings());
  };
  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
  };

  return (
    <>
      <CountRestaurant />
      {restaurantsLoading ? (
        <Loader />
      ) : restaurantsError ? (
        <Message variant="danger">{restaurantsError}</Message>
      ) : (
        <>
          <section>
            <div className="sort">
              <button className="sort_veg p-3" onClick={handleToggleVegOnly}>
                {showVegOnly ? "Show All" : "Pure Veg"}
              </button>
              <button className="sort_rev p-3" onClick={handlleSortByReviews}>
                SortByReviews
              </button>
              <button className="sort_rate p-3" onClick={handlleSortByRatings}>
                SortByRatings
              </button>
            </div>
            <div className="row mt-4">
              {restaurants && restaurants.restaurants ? (
                restaurants.restaurants.map((restaurant) =>
                  !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                    <Restaurant key={restaurant._id} restaurant={restaurant} />
                  ) : null
                )
              ) : (
                <Message variant="info">No restaurants found.</Message>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
