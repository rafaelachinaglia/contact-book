import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Contact } from "../../types/Contact";
import {
  AvatarCircle,
  ModalContent,
  InfoCategory,
  InfoLabel,
  InfoInput,
  InfoTextarea,
  ButtonRow,
  SaveButton,
  CancelButton,
  EditButton,
  CloseButton,
  TrashButton,
  InfoSelect,
  ModalContentWrapper,
  AddFieldButton,
} from "./styles";
import { Pencil, Trash2, X } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { useContacts } from "../../hooks/useContacts";
import { customModalStyles } from "../../styles/modalStyles";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

interface Props {
  contact: Contact;
  onClose: () => void;
  onDelete: (id: number) => void;
  onSave: (updatedContact: Contact) => void;
}

type Item = { value: string };

type FormData = {
  name: string;
  category: string;
  emails: Item[];
  phones: Item[];
  addresses: Item[];
};

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório!"),
  category: yup.string().required("Categoria é obrigatória!"),
  emails: yup
    .array()
    .of(
      yup.object({
        value: yup
          .string()
          .email("E-mail inválido!")
          .required("E-mail obrigatório!"),
      })
    )
    .min(1, "Pelo menos um e-mail é obrigatório!")
    .required(),
  phones: yup
    .array()
    .of(
      yup.object({
        value: yup
          .string()
          .trim()
          .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido!")
          .required("Telefone obrigatório!"),
      })
    )
    .min(1, "Pelo menos um telefone é obrigatório!")
    .required(),
  addresses: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required("Endereço obrigatório!"),
      })
    )
    .min(1, "Pelo menos um endereço é obrigatório!")
    .required(),
});

export function ViewContactModal({
  contact,
  onClose,
  onDelete,
  onSave,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { categories } = useCategories();
  const { contacts } = useContacts();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: contact.name,
      category: contact.category,
      emails: contact.emails.map((value) => ({ value })),
      phones: contact.phones.map((value) => ({ value })),
      addresses: contact.addresses.map((value) => ({ value })),
    },
  });

  useEffect(() => {
    reset({
      name: contact.name,
      category: contact.category,
      emails: contact.emails.map((value) => ({ value })),
      phones: contact.phones.map((value) => ({ value })),
      addresses: contact.addresses.map((value) => ({ value })),
    });
  }, [contact, reset]);

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      const allErrors = [
        errors.name?.message,
        errors.category?.message,
        ...(Array.isArray(errors.emails)
          ? errors.emails.map((e) => e?.value?.message)
          : []),
        ...(Array.isArray(errors.phones)
          ? errors.phones.map((p) => p?.value?.message)
          : []),
        ...(Array.isArray(errors.addresses)
          ? errors.addresses.map((a) => a?.value?.message)
          : []),
      ];

      allErrors
        .filter((msg): msg is string => !!msg)
        .forEach((msg) => toast.error(msg));
    }
  }, [errors, isSubmitted]);

  const {
    fields: emailFields,
    remove: removeEmail,
    append: addEmail,
  } = useFieldArray({ control, name: "emails" });

  const {
    fields: phoneFields,
    remove: removePhone,
    append: addPhone,
  } = useFieldArray({ control, name: "phones" });

  const {
    fields: addressFields,
    remove: removeAddress,
    append: addAddress,
  } = useFieldArray({ control, name: "addresses" });

  const onSubmit = (data: FormData) => {
    const isDuplicate = (arr: string[]) =>
      new Set(arr.map((v) => v.trim().toLowerCase())).size !== arr.length;

    const emails = data.emails.map((e) => e.value);
    const phones = data.phones.map((p) => p.value);
    const addresses = data.addresses.map((a) => a.value);

    const duplicateErrors: string[] = [];

    if (isDuplicate(emails)) {
      duplicateErrors.push("E-mails duplicados não são permitidos!");
    }

    if (isDuplicate(phones)) {
      duplicateErrors.push("Telefones duplicados não são permitidos!");
    }

    if (isDuplicate(addresses)) {
      duplicateErrors.push("Endereços duplicados não são permitidos!");
    }

    const nameAlreadyExists = contacts.some(
      (c) =>
        c.id !== contact.id &&
        c.name.trim().toLowerCase() === data.name.trim().toLowerCase()
    );

    if (nameAlreadyExists) {
      duplicateErrors.push("Já existe um contato com esse nome.");
    }

    if (duplicateErrors.length > 0) {
      duplicateErrors.forEach((err) => toast.error(err));
      return;
    }

    const updated: Contact = {
      id: contact.id,
      name: data.name,
      category: data.category,
      emails,
      phones,
      addresses,
    };

    onSave(updated);
    setIsEditing(false);
  };

  const firstLetter = contact.name.charAt(0).toUpperCase();

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Visualizar ou Editar Contato"
      style={customModalStyles}
      ariaHideApp={false}
    >
      <ModalContentWrapper>
        {!isEditing && (
          <EditButton onClick={() => setIsEditing(true)} title="Editar">
            <Pencil />
          </EditButton>
        )}

        <AvatarCircle>{firstLetter}</AvatarCircle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <InfoCategory fullWidth>
              <InfoLabel>Nome</InfoLabel>
              <InfoInput readOnly={!isEditing} {...register("name")} />
            </InfoCategory>

            {phoneFields.map((field, index) => (
              <InfoCategory key={field.id} fullWidth>
                <InfoLabel>Telefone</InfoLabel>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <InputMask
                    mask="(99)99999-9999"
                    maskChar=""
                    alwaysShowMask
                    disabled={!isEditing}
                    {...register(`phones.${index}.value`)}
                  >
                    {(inputProps) => (
                      <InfoInput
                        {...inputProps}
                        inputMode="numeric"
                      />
                    )}
                  </InputMask>
                  {isEditing && (
                    <X
                      size={18}
                      style={{ cursor: "pointer", color: "#999" }}
                      onClick={() => removePhone(index)}
                      color="#c0392b"
                    />
                  )}
                </div>
              </InfoCategory>
            ))}

            {isEditing && (
              <InfoCategory fullWidth>
                <AddFieldButton type="button" onClick={() => addPhone({ value: "" })}>
                  + Adicionar telefone
                </AddFieldButton>
              </InfoCategory>
            )}

            {emailFields.map((field, index) => (
              <InfoCategory key={field.id} fullWidth>
                <InfoLabel>E-mail</InfoLabel>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <InfoInput
                    readOnly={!isEditing}
                    {...register(`emails.${index}.value`)}
                  />
                  {isEditing && (
                    <X
                      size={18}
                      style={{ cursor: "pointer", color: "#999" }}
                      onClick={() => removeEmail(index)}
                      color="#c0392b"
                    />
                  )}
                </div>
              </InfoCategory>
            ))}

            {isEditing && (
              <InfoCategory fullWidth>
                <AddFieldButton type="button" onClick={() => addEmail({ value: "" })}>
                  + Adicionar e-mail
                </AddFieldButton>
              </InfoCategory>
            )}

            {addressFields.map((field, index) => (
              <InfoCategory key={field.id} fullWidth>
                <InfoLabel>Endereço</InfoLabel>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <InfoTextarea
                    readOnly={!isEditing}
                    {...register(`addresses.${index}.value`)}
                  />
                  {isEditing && (
                    <X
                      size={18}
                      style={{ cursor: "pointer", color: "#999" }}
                      onClick={() => removeAddress(index)}
                      color="#c0392b"
                    />
                  )}
                </div>
              </InfoCategory>
            ))}

            {isEditing && (
              <InfoCategory fullWidth>
                <AddFieldButton type="button" onClick={() => addAddress({ value: "" })}>
                  + Adicionar endereço
                </AddFieldButton>
              </InfoCategory>
            )}

            <InfoCategory fullWidth>
              <InfoLabel>Categoria</InfoLabel>
              {isEditing ? (
                <InfoSelect {...register("category")}>
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </InfoSelect>
              ) : (
                <InfoInput
                  readOnly
                  value={
                    categories.find((c) => c.id === contact.category)?.name ||
                    "Categoria não encontrada"
                  }
                />
              )}
            </InfoCategory>
          </ModalContent>

          <ButtonRow>
            {isEditing ? (
              <>
                <SaveButton type="submit">Salvar</SaveButton>
                <CancelButton type="button" onClick={() => setIsEditing(false)}>
                  Cancelar
                </CancelButton>
              </>
            ) : (
              <>
                <TrashButton
                  type="button"
                  onClick={() => {
                    onDelete(contact.id);
                    onClose();
                  }}
                >
                  <Trash2 />
                  Excluir
                </TrashButton>
                <CloseButton type="button" onClick={onClose}>
                  Fechar
                </CloseButton>
              </>
            )}
          </ButtonRow>
        </form>
      </ModalContentWrapper>
    </Modal>
  );
}
