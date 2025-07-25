import { useState } from "react";

type UseSingleChoiceInputProps<T extends string | number> = {
  name: string;
  initialValue?: T | null;
  onChange?: (value: T) => void;
};

export function useSingleChoiceInput<T extends string | number>({
  name,
  initialValue = null,
  onChange,
}: UseSingleChoiceInputProps<T>) {
  const [selected, setSelected] = useState<T | null>(initialValue);

  const handleChange = (value: T) => {
    setSelected(value);
    onChange?.(value);
  };

  const getInputProps = (value: T) => ({
    type: "radio" as const,
    name,
    value,
    checked: selected === value,
    onChange: () => handleChange(value),
  });

  return {
    selectedOption: selected,
    getInputProps,
  } as const;
}
