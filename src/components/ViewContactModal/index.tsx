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
} from "./styles";
import { Pencil, Trash2, X } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { customModalStyles } from "../../styles/modalStyles";

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
    .of(yup.object({ value: yup.string().required("Telefone obrigatório!") }))
    .min(1, "Pelo menos um telefone é obrigatório!")
    .required(),
  addresses: yup
    .array()
    .of(yup.object({ value: yup.string().required("Endereço obrigatório!") }))
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

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
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

  const { fields: emailFields, remove: removeEmail } = useFieldArray({
    control,
    name: "emails",
  });
  const { fields: phoneFields, remove: removePhone } = useFieldArray({
    control,
    name: "phones",
  });
  const { fields: addressFields, remove: removeAddress } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = (data: FormData) => {
    const updated: Contact = {
      id: contact.id,
      name: data.name,
      category: data.category,
      emails: data.emails.map((e) => e.value),
      phones: data.phones.map((p) => p.value),
      addresses: data.addresses.map((a) => a.value),
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
              {errors.name && <span>{errors.name.message}</span>}
            </InfoCategory>

            {phoneFields.map((field, index) => (
              <InfoCategory key={field.id} fullWidth>
                <InfoLabel>Telefone</InfoLabel>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <InfoInput
                    readOnly={!isEditing}
                    {...register(`phones.${index}.value`)}
                  />
                  {isEditing && (
                    <X
                      size={18}
                      style={{ cursor: "pointer", color: "#999" }}
                      onClick={() => removePhone(index)}
                      aria-label="Remover telefone"
                      color="#c0392b"
                    />
                  )}
                </div>
                {errors.phones?.[index]?.value && (
                  <span>{errors.phones[index]?.value?.message}</span>
                )}
              </InfoCategory>
            ))}

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
                      aria-label="Remover e-mail"
                      color="#c0392b"
                    />
                  )}
                </div>
                {errors.emails?.[index]?.value && (
                  <span>{errors.emails[index]?.value?.message}</span>
                )}
              </InfoCategory>
            ))}

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
                      aria-label="Remover endereço"
                      color="#c0392b"
                    />
                  )}
                </div>
                {errors.addresses?.[index]?.value && (
                  <span>{errors.addresses[index]?.value?.message}</span>
                )}
              </InfoCategory>
            ))}

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
              {errors.category && <span>{errors.category.message}</span>}
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
