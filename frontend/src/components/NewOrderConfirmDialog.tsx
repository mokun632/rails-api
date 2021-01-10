import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { FC } from "react";
import { OrderButton } from "./Buttons/OrderButton";

type Props = {
  isOpen: boolean,
  onClose: () => void,
  existingRestaurantName: string,
  newRestaurantName: string,
  onClickSubmit: () => void,
}

export const NewOrderConfirmDialog: FC<Props> = ({
  isOpen,
  onClose,
  existingRestaurantName,
  newRestaurantName,
  onClickSubmit,
}) => (
  <Dialog
  open={isOpen}
  onClose={onClose}
  maxWidth='xs'
  >
    <DialogTitle>
      新規注文を開始しますか？
    </DialogTitle>
    <DialogContent>
      <p>
        {
          `ご注文に${existingRestaurantName}の商品が含まれています。
          新規の注文を開始して${newRestaurantName}の商品を追加してください。`
        }
      </p>
      <OrderButton onClick={onClickSubmit}>
        新規注文
      </OrderButton>
    </DialogContent>
  </Dialog>
)
