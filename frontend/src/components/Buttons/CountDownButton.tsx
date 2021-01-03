import { FC } from "react";
import { RoundButton } from "../shared_style";

type Props = {
  onClick: () => void,
  isDisabled: boolean,
}

export const CountDownButton: FC<Props> = ({
  onClick,
  isDisabled,
}) => (
  <RoundButton onClick={onClick} disabled={isDisabled}>
    -
  </RoundButton>
);
