import { useForm, useFieldArray } from "react-hook-form";
import type { SubmitHandler, DeepPartial } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContacts } from "../hooks/useContacts";

interface AddContactFormProps {
  onSuccess?: () => void;
}

type Item = { value: string };

type FormData = {
  name: string;
  category: string;
  emails: Item[];
  phones: Item[];
  addresses: Item[];
};

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

export function AddContactForm({ onSuccess }: AddContactFormProps) {
  const { addContact } = useContacts();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      emails: [{ value: "" }],
      phones: [{ value: "" }],
      addresses: [{ value: "" }],
    } as DeepPartial<FormData>,
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formattedData = {
      name: data.name,
      category: data.category,
      emails: data.emails.map((e) => e.value),
      phones: data.phones.map((p) => p.value),
      addresses: data.addresses.map((a) => a.value),
    };

    await addContact(formattedData);
    reset();
  };

  return (
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
            <p>{errors.emails?.[index]?.value?.message}</p>
          </div>
        ))}
        <button type="button" onClick={() => addEmail({ value: "" })}>
          + Add email
        </button>
      </div>

      <div>
        <label>Phones:</label>
        {phoneFields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`phones.${index}.value` as const)} />
            <p>{errors.phones?.[index]?.value?.message}</p>
          </div>
        ))}
        <button type="button" onClick={() => addPhone({ value: "" })}>
          + Add phone
        </button>
      </div>

      <div>
        <label>Addresses:</label>
        {addressFields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`addresses.${index}.value` as const)} />
            <p>{errors.addresses?.[index]?.value?.message}</p>
          </div>
        ))}
        <button type="button" onClick={() => addAddress({ value: "" })}>
          + Add address
        </button>
      </div>

      <button type="submit">Add Contact</button>
    </form>
  );
}
