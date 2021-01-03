import { FC, useEffect, useReducer, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchFoods } from '../apis/foods';
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';
import { LocalMallIcon } from '../components/Icons';
import { HTTP_STATUS_CODE, REQUEST_STATE } from '../constants';
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
  FoodObejcts,
  initialFoodObject,
} from '../reducers/foods';
import { COLORS } from '../style_constants';
import { Skeleton } from '@material-ui/lab';
import { FoodWrapper } from '../components/Icons/FoodWrapper';
import { FoodOrderDialog } from '../components/FoodOrderDialog';
import { postLineFoods, replaceLineFoods } from '../apis/line_foods';
import { NewOrderCOnfirmDialog } from '../components/NewOrderConfirmDialog';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 10px;
`;

type matchId = {restaurantsId: string};

export type InitailState = {
  isOpenOrderDialog: boolean,
  selectedFood: FoodObejcts,
  selectedFoodCount: number,
  isOpenNewOrderDialog: boolean,
  existingRestaurantName: string,
  newRestaurantName: string,
}

export const Foods: FC = () => {
  const [ foodsState, dispatch ] = useReducer(foodsReducer, foodsInitialState)
  const initailState: InitailState = {
    isOpenOrderDialog: false,
    selectedFood: initialFoodObject,
    selectedFoodCount: 1,
    isOpenNewOrderDialog: false,
    existingRestaurantName: '',
    newRestaurantName: '',
  };
  const [ state, setState ] = useState(initailState);
  const { restaurantsId } = useParams<matchId>();
  const history = useHistory();

  const submitOrder = () => {
    postLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }).then(() => history.push('/orders'))
      .catch((e) => {
        if(e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          console.log(e.response.data.exists_restaurant);
          setState({
            ...state,
            isOpenOrderDialog: false,
            isOpenNewOrderDialog: true,
            existingRestaurantName: e.response.data.exists_restaurant,
            newRestaurantName: e.response.data.new_restaurant,
          })
        } else {
          throw e;
        }
      })
  };

  const replaceOrder = () => {
    replaceLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }).then(() => history.push('/orders'))
  }

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(restaurantsId)
    .then((data) => 
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods
        }
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <HeaderWrapper>
        <Link to='/restaurants'>
          <MainLogoImage src={MainLogo} alt='main logo' />
        </Link>
        <BagIconWrapper>
          <Link to='/orders'>
            <ColoredBagIcon fontSize='large' />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
      {
        foodsState.fetchState === REQUEST_STATE.LOADING ?
        <>
          {
            [...Array(12).keys()].map(i => 
              <ItemWrapper key={i}>
                <Skeleton key={i} variant='rect' width={450} height={180} />
              </ItemWrapper>
            )
          }
        </>
        :
        foodsState.foodsList
        && 
        foodsState.foodsList.map((food: FoodObejcts, i) => 
            <ItemWrapper key={i}>
              <FoodWrapper
              food={food}
              onClickFoodWrapper={
                (food) => setState({
                  ...state,
                  isOpenOrderDialog: true,
                  selectedFood: food,
                })
              }
              imageUrl={FoodImage}
              />
            </ItemWrapper>
        )
      }
      </FoodsList>
      {
        state.isOpenOrderDialog 
        &&
        <FoodOrderDialog
        food={state.selectedFood}
        isOpen={state.isOpenOrderDialog}
        countNumber={state.selectedFoodCount}
        onClickCountUp={() => setState({
          ...state,
          selectedFoodCount: state.selectedFoodCount + 1,
        })}
        onClickCountDown={() => setState({
          ...state,
          selectedFoodCount: state.selectedFoodCount - 1,
        })}
        onClickOrder={() => submitOrder()}
        onClose={() => setState({
          ...state,
          isOpenOrderDialog: false,
          selectedFood: initialFoodObject,
          selectedFoodCount: 1
        })}
        />
      }
      {
        state.isOpenNewOrderDialog 
        &&
        <NewOrderCOnfirmDialog
        isOpen={state.isOpenNewOrderDialog}
        onClose={() => setState({...state, isOpenNewOrderDialog: false})}
        existingRestaurantName={state.existingRestaurantName}
        newRestaurantName={state.newRestaurantName}
        onClickSubmit={() => replaceOrder()}
        />
      }
    </>
  );
};
