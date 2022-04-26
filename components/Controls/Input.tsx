import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface Props<T extends number | string> {
  value: T;
  label: string;
  setter: Dispatch<SetStateAction<T>>;
}

interface PropsNumber {
  min: number;
  max: number;
}

export const InputNumber: FunctionComponent<Props<number> & PropsNumber> = ({
  value,
  label,
  setter,
  min,
  max,
}) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        name={label}
        value={value}
        onChange={(event) => setter(parseInt(event.target.value))}
        type="number"
        min={min}
        max={max}
      />
    </>
  );
};
