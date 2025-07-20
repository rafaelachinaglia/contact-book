import { type Control, useFieldArray, type UseFormRegister } from "react-hook-form";
import { FieldCategory, Label, Input, AddButton, RemoveButton } from "./styles";
import InputMask from "react-input-mask";

interface Props {
  label: string;
  name: "phones" | "emails" | "addresses";
  register: UseFormRegister<any>;
  control: Control<any>;
  mask?: string;
}

export function MultiInputField({ label, name, register, control, mask }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <FieldCategory>
      <Label>{label}</Label>
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          {mask ? (
            <InputMask mask={mask} {...register(`${name}.${index}.value`)}>
              {(inputProps) => <Input {...inputProps} style={{ flex: 1 }} />}
            </InputMask>
          ) : (
            <Input {...register(`${name}.${index}.value`)} style={{ flex: 1 }} />
          )}
          {index > 0 && (
            <RemoveButton type="button" onClick={() => remove(index)}>
              ×
            </RemoveButton>
          )}
        </div>
      ))}
      <AddButton type="button" onClick={() => append({ value: "" })}>
        + Adicionar {label.toLowerCase()}
      </AddButton>
    </FieldCategory>
  );
}
