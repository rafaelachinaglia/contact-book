import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Contact } from "../../types/Contact";
import {
  AvatarCircle,
  ModalContent,
  InfoCategory,
  InfoLabel,
  InfoInput,
  InfoSelect,
  ButtonRow,
  SaveButton,
  CancelButton,
  EditButton,
  CloseButton,
  TrashButton,
  ModalContentWrapper,
} from "./styles";
import { Pencil } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { useContacts } from "../../hooks/useContacts";
import { customModalStyles } from "../../styles/modalStyles";
import { toast } from "react-toastify";
import { EditableFieldList } from "./EditableFieldList";
import { viewContactSchema } from "./contactSchema";

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
    resolver: yupResolver(viewContactSchema),
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

  const onSubmit = (data: FormData) => {
    const normalize = (value: string) => value.trim().toLowerCase();
    const isDuplicate = (arr: string[]) =>
      new Set(arr.map(normalize)).size !== arr.length;

    const emails = data.emails.map((e) => e.value);
    const phones = data.phones.map((p) => p.value);
    const addresses = data.addresses.map((a) => a.value);

    const duplicateErrors: string[] = [];

    if (isDuplicate(emails)) duplicateErrors.push("E-mails duplicados não são permitidos!");
    if (isDuplicate(phones)) duplicateErrors.push("Telefones duplicados não são permitidos!");
    if (isDuplicate(addresses)) duplicateErrors.push("Endereços duplicados não são permitidos!");

    const nameAlreadyExists = contacts.some(
      (c) =>
        c.id !== contact.id &&
        normalize(c.name) === normalize(data.name)
    );

    if (nameAlreadyExists) duplicateErrors.push("Já existe um contato com esse nome.");

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

            <EditableFieldList
              name="phones"
              label="Telefone"
              isEditing={isEditing}
              control={control}
              register={register}
              mask="(99)99999-9999"
              hideRemoveOnFirst
            />

            <EditableFieldList
              name="emails"
              label="E-mail"
              isEditing={isEditing}
              control={control}
              register={register}
              hideRemoveOnFirst
            />

            <EditableFieldList
              name="addresses"
              label="Endereço"
              isEditing={isEditing}
              control={control}
              register={register}
              useTextarea
              hideRemoveOnFirst
            />

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
                <TrashButton type="button" onClick={() => onDelete(contact.id)}>
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
