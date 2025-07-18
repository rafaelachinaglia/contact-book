import Modal from "react-modal";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Contact } from "../types/Contact";
import { useContacts } from "../hooks/useContacts";

type Item = { value: string };

type FormData = {
  name: string;
  category: string;
  emails: Item[];
  phones: Item[];
  addresses: Item[];
};

// Definindo o esquema de validação com o yup
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    category: yup.string().required("Category is required"),
    emails: yup
      .array()
      .of(
        yup.object({
          value: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        })
      )
      .min(1, "At least one email is required")
      .required(),
    phones: yup
      .array()
      .of(
        yup.object({
          value: yup.string().required("Phone is required"),
        })
      )
      .min(1, "At least one phone is required")
      .required(),
    addresses: yup
      .array()
      .of(
        yup.object({
          value: yup.string().required("Address is required"),
        })
      )
      .min(1, "At least one address is required")
      .required(),
  })
  .required();

// type FormData = {
//   name: string;
//   category: string;
//   emails: { value: string }[];  // Garantir que emails seja um array não opcional
//   phones: { value: string }[];  // Garantir que phones seja um array não opcional
//   addresses: { value: string }[];  // Garantir que addresses seja um array não opcional
// };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact;
};

export function EditContactModal({ isOpen, onClose, contact }: Props) {
  const { editContact } = useContacts();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: contact.name,
      category: contact.category,
      emails: contact.emails?.map((email) => ({ value: email })) || [
        { value: "" },
      ],
      phones: contact.phones?.map((phone) => ({ value: phone })) || [
        { value: "" },
      ],
      addresses: contact.addresses?.map((address) => ({ value: address })) || [
        { value: "" },
      ],
    },
  });

  const { fields: emailFields, append: addEmail } = useFieldArray({
    control,
    name: "emails",
  });
  const { fields: phoneFields, append: addPhone } = useFieldArray({
    control,
    name: "phones",
  });
  const { fields: addressFields, append: addAddress } = useFieldArray({
    control,
    name: "addresses",
  });

  // Ajuste no onSubmit: precisa ser explicitamente tipado como SubmitHandler<FormData>
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formattedData = {
      ...data,
      emails: data.emails.map((e) => e.value),
      phones: data.phones.map((p) => p.value),
      addresses: data.addresses.map((a) => a.value),
    };
    await editContact(contact.id, formattedData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Contact">
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input {...register("name")} />
          <p>{errors.name?.message}</p>
        </div>

        <div>
          <label>Category:</label>
          <input {...register("category")} />
          <p>{errors.category?.message}</p>
        </div>

        <div>
          <label>Emails:</label>
          {emailFields.map((field, index) => (
            <div key={field.id}>
              <input {...register(`emails.${index}.value` as const)} />
            </div>
          ))}
          <button type="button" onClick={() => addEmail({ value: "" })}>
            + Add email
          </button>
          <p>{errors.emails?.[0]?.value?.message}</p>
        </div>

        <div>
          <label>Phones:</label>
          {phoneFields.map((field, index) => (
            <div key={field.id}>
              <input {...register(`phones.${index}.value` as const)} />
            </div>
          ))}
          <button type="button" onClick={() => addPhone({ value: "" })}>
            + Add phone
          </button>
          <p>{errors.phones?.[0]?.value?.message}</p>
        </div>

        <div>
          <label>Addresses:</label>
          {addressFields.map((field, index) => (
            <div key={field.id}>
              <input {...register(`addresses.${index}.value` as const)} />
            </div>
          ))}
          <button type="button" onClick={() => addAddress({ value: "" })}>
            + Add address
          </button>
          <p>{errors.addresses?.[0]?.value?.message}</p>
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
}
