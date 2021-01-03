import { REQUEST_STATE } from '../constants';
import { initailRestaurantObejcts, RestaurantObejcts } from './restaurants';

type ValueOf<T> = T[keyof T];

export type LineFoodObejcts = {
  amount: number,
  count: number,
  line_foods_ids: number[],
  restaurant: RestaurantObejcts,
};

export const initialLineFoodObject: LineFoodObejcts = {
  amount: 0,
  count: 0,
  line_foods_ids: [],
  restaurant: initailRestaurantObejcts,
};

export type LineFoodsState = {
  fetchState?: ValueOf<typeof REQUEST_STATE>,
  postState?: ValueOf<typeof REQUEST_STATE>,
  lineFoodsSummary?: LineFoodObejcts
}

export const initialState: LineFoodsState = {
  fetchState: REQUEST_STATE.INITIAL,
  postState: REQUEST_STATE.INITIAL,
  lineFoodsSummary: initialLineFoodObject,
};

export const lineFoodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCESS',
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS',
} as const;

type LineFoodsAction = {
  type: ValueOf<typeof lineFoodsActionTypes>;
  payload?: { lineFoodsSummary: LineFoodObejcts };
};

export const lineFoodsReducer = (
  state: LineFoodsState, 
  action: LineFoodsAction
  ): LineFoodsState => {
  switch (action.type) {
    case lineFoodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    case lineFoodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        lineFoodsSummary: action.payload?.lineFoodsSummary
      };
    case lineFoodsActionTypes.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING
      };
    case lineFoodsActionTypes.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK
      };
    default:
      throw new Error();
  };
};
