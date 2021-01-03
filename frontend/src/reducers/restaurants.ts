import { REQUEST_STATE } from "../constants";

type ValueOf<T> = T[keyof T];

export type RestaurantObejcts = {
  "id": number,
  "name": string,
  "fee": number,
  "time_required": number,
  "created_at": string
  "updated_at": string
};

export const initailRestaurantObejcts: RestaurantObejcts = {
  "id": 0,
  "name": "",
  "fee": 0,
  "time_required": 0,
  "created_at": "",
  "updated_at": ""
}

type RestaurantsState = {
  fetchState: ValueOf<typeof REQUEST_STATE>,
  restauratnsList?: [RestaurantObejcts]
}

export const initailState: RestaurantsState = {
  fetchState: REQUEST_STATE.INITIAL,
  restauratnsList: [initailRestaurantObejcts],
};

export const restaurantsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCESS'
} as const;

type RestaurantsAction = {
  type: ValueOf<typeof restaurantsActionTypes>;
  payload?: { "restaurants": [RestaurantObejcts] };
};

export const restaurantsReducer = (
  state: RestaurantsState, 
  action: RestaurantsAction
  ): RestaurantsState => {
  switch (action.type) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restauratnsList: action.payload?.restaurants,
      };
    default:
      throw new Error();
  };
};
