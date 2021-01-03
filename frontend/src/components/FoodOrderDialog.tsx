import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';
import OrderHeaderImage from '../images/order-header.png';
import { FoodObejcts } from '../reducers/foods';
import { SubText } from './Icons/StyledText';
import { CountDownButton } from '../components/Buttons/CountDownButton';
import { CountUpButton } from '../components/Buttons/CountUpButton';
import { OrderButton } from '../components/Buttons/OrderButton';

const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const CountItem = styled.div`
  margin: 0 8px;
`;

const CountNum = styled.div`
  padding-top: 10px;
`;

const OrderTextWrapper = styled.div`
  display: flex;
`;

const OrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`;

type Props = {
  food: FoodObejcts,
  countNumber: number,
  isOpen: boolean,
  onClose: () => void,
  onClickCountUp: () => void,
  onClickCountDown: () => void,
  onClickOrder: () => void,
};

export const FoodOrderDialog: FC<Props> = ({
  food,
  countNumber,
  isOpen,
  onClose,
  onClickCountUp,
  onClickCountDown,
  onClickOrder,
}) => {
  return (
    <Dialog
    open={isOpen}
    onClose={onClose}
    >
      <OrderHeader src={OrderHeaderImage} alt='order header' />
      <DialogTitle>
        {food.name}
      </DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>
            {food.description}
          </SubText>
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
        <CountersWrapper>
          <CountItem>
            <CountDownButton
            onClick={() => onClickCountDown()}
            isDisabled={countNumber <= 1}
            />
          </CountItem>
          <CountItem>
            <CountNum>
              {countNumber}
            </CountNum>
          </CountItem>
          <CountItem>
            <CountUpButton
            onClick={() => onClickCountUp()}
            isDisabled={countNumber >= 9}
            />
          </CountItem>
        </CountersWrapper>
        <OrderButton onClick={() => onClickOrder()}>
          <OrderTextWrapper>
            <OrderButtonTextWrapper>
            {`${countNumber}点を注文に追加`}
            </OrderButtonTextWrapper>
            <PriceWrapper>
              {`¥${countNumber * food.price}`}
            </PriceWrapper>
          </OrderTextWrapper>
        </OrderButton>
      </DialogActions>
    </Dialog>
  )
};
