import React from "react";

export const Debouncer = ({
  value,
  setValue,
  debounceTime = 800,
  placeholder = "Buscar",
  icon,
}: {
  value: string;
  setValue: (search: string) => void;
  debounceTime?: number;
  icon?: React.ReactNode;
  placeholder?: string;
}) => {
  // Input variable will be used to store the value of the input
  const [inputValue, setInputValue] = React.useState("");
  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  // The following code is debounced to avoid making a request on every keystroke
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(inputValue);
    }, debounceTime);
    return () => clearTimeout(timeoutId);
  }, [debounceTime, inputValue, setValue]);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="mt-4 flex w-[400px] flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        {icon}
        <input
          className="input-transparent h-full w-full border-none text-sm  font-medium not-italic leading-[normal] text-white outline-none"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <hr className="w-full border-white bg-white" />
    </div>
  );
};
