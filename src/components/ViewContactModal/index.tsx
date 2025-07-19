import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Contact } from "../../types/Contact";
import {
  AvatarCircle,
  ModalContent,
  InfoGroup,
  InfoLabel,
  InfoInput,
  InfoTextarea,
  ButtonRow,
  SaveButton,
  CancelButton,
  EditButton,
  CloseButton,
  TrashButton,
  customModalStyles,
} from "./styles";
import { Pencil, Trash2 } from "lucide-react";

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
  category: yup.string().required("Grupo é obrigatório!"),
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

  const { fields: emailFields } = useFieldArray({ control, name: "emails" });
  const { fields: phoneFields } = useFieldArray({ control, name: "phones" });
  const { fields: addressFields } = useFieldArray({
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
    >
      {/* Ícone de editar no canto superior direito */}
      {!isEditing && (
        <EditButton onClick={() => setIsEditing(true)} title="Editar">
          <Pencil />
        </EditButton>
      )}

      {/* Avatar com inicial do nome */}
      <AvatarCircle>{firstLetter}</AvatarCircle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          {/* Nome em full width */}
          <InfoGroup fullWidth>
            <InfoLabel>Nome</InfoLabel>
            <InfoInput readOnly={!isEditing} {...register("name")} />
            {errors.name && <span>{errors.name.message}</span>}
          </InfoGroup>

          {/* Telefone + E-mail */}
          {phoneFields.map((field, index) => (
            <InfoGroup key={field.id}>
              <InfoLabel>Telefone</InfoLabel>
              <InfoInput
                readOnly={!isEditing}
                {...register(`phones.${index}.value`)}
              />
              {errors.phones?.[index]?.value && (
                <span>{errors.phones[index]?.value?.message}</span>
              )}
            </InfoGroup>
          ))}

          {emailFields.map((field, index) => (
            <InfoGroup key={field.id}>
              <InfoLabel>E-mail</InfoLabel>
              <InfoInput
                readOnly={!isEditing}
                {...register(`emails.${index}.value`)}
              />
              {errors.emails?.[index]?.value && (
                <span>{errors.emails[index]?.value?.message}</span>
              )}
            </InfoGroup>
          ))}

          {/* Endereço */}
          {addressFields.map((field, index) => (
            <InfoGroup key={field.id}>
              <InfoLabel>Endereço</InfoLabel>
              <InfoTextarea
                readOnly={!isEditing}
                {...register(`addresses.${index}.value`)}
              />
              {errors.addresses?.[index]?.value && (
                <span>{errors.addresses[index]?.value?.message}</span>
              )}
            </InfoGroup>
          ))}

          {/* Grupo */}
          <InfoGroup>
            <InfoLabel>Grupo</InfoLabel>
            <InfoInput readOnly={!isEditing} {...register("category")} />
            {errors.category && <span>{errors.category.message}</span>}
          </InfoGroup>
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
    </Modal>
  );
}
