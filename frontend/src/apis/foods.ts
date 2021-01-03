import axios from "axios"
import { foodsIndex } from "../urls"


export const fetchFoods = async(restaurantId: string) => {
  return await axios.get(foodsIndex(restaurantId))
  .then(res => {
    return res.data
  })
  .catch((e) => console.log(e))
};
