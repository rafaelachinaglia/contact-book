import {
  InfoCategory,
  InfoLabel,
  InfoInput,
  InfoTextarea,
  AddFieldButton,
} from "./styles";
import { X } from "lucide-react";
import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import InputMask from "react-input-mask";

interface EditableFieldListProps {
  name: "phones" | "emails" | "addresses";
  label: string;
  isEditing: boolean;
  control: Control<any>;
  register: UseFormRegister<any>;
  useTextarea?: boolean;
  mask?: string;
  hideRemoveOnFirst?: boolean;
}

export function EditableFieldList({
  name,
  label,
  isEditing,
  control,
  register,
  useTextarea,
  mask,
  hideRemoveOnFirst = false,
}: EditableFieldListProps) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <>
      {fields.map((field, index) => (
        <InfoCategory key={field.id} fullWidth>
          <InfoLabel>{label}</InfoLabel>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {mask ? (
              <InputMask
                mask={mask}
                maskChar=""
                alwaysShowMask
                disabled={!isEditing}
                {...register(`${name}.${index}.value`)}
              >
                {(inputProps) => (
                  <InfoInput {...inputProps} inputMode="numeric" />
                )}
              </InputMask>
            ) : useTextarea ? (
              <InfoTextarea
                readOnly={!isEditing}
                {...register(`${name}.${index}.value`)}
              />
            ) : (
              <InfoInput
                readOnly={!isEditing}
                {...register(`${name}.${index}.value`)}
              />
            )}

            {isEditing && (!hideRemoveOnFirst || index > 0) && (
              <X
                size={18}
                style={{
                  cursor: "pointer",
                  color: "#999",
                  flexShrink: 0,
                }}
                onClick={() => remove(index)}
              />
            )}
          </div>
        </InfoCategory>
      ))}

      {isEditing && (
        <InfoCategory fullWidth>
          <AddFieldButton
            type="button"
            onClick={() => append({ value: "" })}
          >
            + Adicionar {label.toLowerCase()}
          </AddFieldButton>
        </InfoCategory>
      )}
    </>
  );
}
