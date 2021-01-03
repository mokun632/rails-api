import { FC } from "react";
import { RoundButton } from "../shared_style";

type Props = {
  onClick: () => void,
  isDisabled: boolean,
}

export const CountUpButton: FC<Props> = ({
  onClick,
  isDisabled,
}) => (
  <RoundButton onClick={onClick} disabled={isDisabled}>
    +
  </RoundButton>
);
