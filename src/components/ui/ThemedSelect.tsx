"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";

type Option = { value: string; label: string; disabled?: boolean };
type Props = {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function ThemedSelect({
  id,
  name,
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder = "Choose an option",
  required,
  disabled,
  className = "",
  "aria-label": label,
}: Props) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [container, setContainer] = useState<HTMLElement>();
  return (
    <Select.Root
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      required={required}
      disabled={disabled}
      onOpenChange={() =>
        setContainer(trigger.current?.closest("dialog") ?? undefined)
      }
    >
      <Select.Trigger
        ref={trigger}
        id={id}
        aria-label={label}
        className={"select-trigger " + className}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon asChild>
          <ChevronDown size={17} strokeWidth={1.8} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal container={container}>
        <Select.Content
          className="select-content"
          position="popper"
          sideOffset={8}
          collisionPadding={12}
        >
          <Select.ScrollUpButton className="select-scroll">
            <ChevronUp size={17} />
          </Select.ScrollUpButton>
          <Select.Viewport className="select-viewport">
            {options.map((option) => (
              <Select.Item
                className="select-option"
                value={option.value}
                key={option.value}
                disabled={option.disabled}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check size={17} strokeWidth={2} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="select-scroll">
            <ChevronDown size={17} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
