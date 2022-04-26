import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface Props<T> {
  value: T;
  label: string;
  options: { value: string; label: string }[];
  setter: Dispatch<SetStateAction<T>>;
}

export const Select: FunctionComponent<Props<string>> = ({
  value,
  label,
  options,
  setter,
}) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <select
        name={label}
        value={value}
        onChange={(event) => setter(event.target.value)}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
