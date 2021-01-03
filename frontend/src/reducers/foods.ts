import { REQUEST_STATE } from '../constants';

type ValueOf<T> = T[keyof T];

export type FoodObejcts = {
  'created_at': string,
  'description': string,
  'id': number,
  'name': string,
  'price': number
  'restaurant_id': number
  'updated_at': string
};

export const initialFoodObject: FoodObejcts = {
  'created_at': '',
  'description': '',
  'id': 0,
  'name': '',
  'price': 0,
  'restaurant_id': 0,
  'updated_at': '',
};

type FoodsState = {
  fetchState: ValueOf<typeof REQUEST_STATE>,
  foodsList?: [FoodObejcts]
}

export const initialState: FoodsState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodsList: [initialFoodObject],
};

export const foodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCESS'
} as const;

type FoodsAction = {
  type: ValueOf<typeof foodsActionTypes>;
  payload?: { 'foods': [FoodObejcts] };
};

export const foodsReducer = (
  state: FoodsState, 
  action: FoodsAction
  ): FoodsState => {
  switch (action.type) {
    case foodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    case foodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload?.foods,
      };
    default:
      throw new Error();
  };
};
