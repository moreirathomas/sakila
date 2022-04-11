import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface Props<T extends number | string> {
  value: T;
  label: string;
  setter: Dispatch<SetStateAction<T>>;
}

export const QueryParamString: FunctionComponent<Props<string>> = ({
  value,
  label,
  setter,
}) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        name={label}
        value={value}
        onChange={(event) => setter(event.target.value)}
        type="text"
      />
    </div>
  );
};

export const QueryParamNumber: FunctionComponent<Props<number>> = ({
  value,
  label,
  setter,
}) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        name={label}
        value={value}
        onChange={(event) => setter(parseInt(event.target.value))}
        type="number"
      />
    </div>
  );
};
