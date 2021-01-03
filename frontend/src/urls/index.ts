type LOCALHOST_URL =  'http://localhost:3000/api/v1';
const DEFAULT_API_LOCALHOST: LOCALHOST_URL | never = 'http://localhost:3000/api/v1';

export const restaurantsIndex: Readonly<string> = `${DEFAULT_API_LOCALHOST}/restaurants`;
export const foodsIndex = (restaurantId: string): Readonly<string> =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`;
export const lineFoods: Readonly<string> = `${DEFAULT_API_LOCALHOST}/line_foods`;
export const lineFoodsReplace: Readonly<string> = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;
export const orders: Readonly<string> = `${DEFAULT_API_LOCALHOST}/orders`;
