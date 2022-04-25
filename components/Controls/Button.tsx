import { FunctionComponent } from "react";

interface Props {
  action: () => void;
}

export const Button: FunctionComponent<Props> = ({ action, children }) => {
  return <button onClick={action}>{children}</button>;
};
