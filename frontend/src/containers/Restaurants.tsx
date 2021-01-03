import { Skeleton } from '@material-ui/lab';
import { FC, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchRestaurants } from '../apis/restaurants';
import { REQUEST_STATE } from '../constants';
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';
import RestaurantImage from '../images/restaurant-image.jpg';
import { initailState, restaurantsActionTypes, restaurantsReducer, RestaurantObejcts } from '../reducers/restaurants';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.2rem 1rem;
`;

const MainLogoImage = styled.img`
  height: 6rem;
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 36rem;
`;

const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 100px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 80%;
  height: 80%;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

export const Restaurants: FC = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initailState);

  useEffect(() => {
    dispatch({ type: restaurantsActionTypes.FETCHING });
    fetchRestaurants()
    .then((data) => 
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: {
          restaurants: data.restaurants
        }
      })
    );
  },[])

  return (
    <>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt='main logo' />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt='main cover' />
      </MainCoverImageWrapper>
      <RestaurantsContentsList>
      {
        state.fetchState === REQUEST_STATE.LOADING ?
        <>
          <Skeleton variant='rect' width={450} height={300} />
          <Skeleton variant='rect' width={450} height={300} />
          <Skeleton variant='rect' width={450} height={300} />
        </>
        :
        state.restauratnsList
        && 
        state.restauratnsList.map((item: RestaurantObejcts, index) => {
          return (
            <Link to={`/restaurants/${item.id}/foods`} key={index} style={{ textDecoration: 'none' }}>
            <RestaurantsContentWrapper>
              <RestaurantsImageNode src={RestaurantImage} />
              <MainText>{item.name}</MainText>
              <SubText>{`配送料:${item.fee}円 ${item.time_required}分`}</SubText>
            </RestaurantsContentWrapper>
          </Link>
          );
        })
      }
      </RestaurantsContentsList>
    </>
  );
};
