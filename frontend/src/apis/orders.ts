import axios from "axios"
import { orders } from "../urls"

type Params = {line_food_ids?: number[]}

export const postOrder = async(params: Params) => {
  return await axios.post(orders,
      {
        line_food_ids: params
      }
    )
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
};
