import { useForm, useFieldArray } from "react-hook-form";
import type { SubmitHandler, DeepPartial } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContacts } from "../../../hooks/useContacts";
import { useCategories } from "../../../hooks/useCategories";
import {
  Form,
  FieldCategory,
  DoubleColumn,
  Label,
  Input,
  ButtonRow,
  AddButton,
  SubmitButton,
  CancelButton,
  RemoveButton,
} from "./styles";
import { Select } from "../../Form/Select";
import { toast } from "react-toastify";
import { useEffect } from "react";

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
    name: yup.string().required("Nome é obrigatório!"),
    category: yup.string().required("Categoria é obrigatória!"),
    emails: yup
      .array()
      .of(
        yup.object({
          value: yup
            .string()
            .required("E-mail é obrigatório!")
            .email("E-mail inválido!"),
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
            .required("Telefone é obrigatório!"),
        })
      )
      .min(1, "Pelo menos um telefone é obrigatório!")
      .required(),
    addresses: yup
      .array()
      .of(
        yup.object({
          value: yup.string().required("Endereço é obrigatório!"),
        })
      )
      .min(1, "Pelo menos um endereço é obrigatório!")
      .required(),
  })
  .required();

export function AddContactForm({ onSuccess }: AddContactFormProps) {
  const { addContact, contacts } = useContacts();
  const { categories } = useCategories();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<FormData>({
    resolver: yupResolver(schema, { abortEarly: false }),
    defaultValues: {
      name: "",
      category: "",
      emails: [{ value: "" }],
      phones: [{ value: "" }],
      addresses: [{ value: "" }],
    } as DeepPartial<FormData>,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const {
    fields: emailFields,
    append: addEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: "emails" });

  const {
    fields: phoneFields,
    append: addPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: "phones" });

  const {
    fields: addressFields,
    append: addAddress,
    remove: removeAddress,
  } = useFieldArray({ control, name: "addresses" });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
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
      (contact) => contact.name.trim().toLowerCase() === data.name.trim().toLowerCase()
    );

    if (nameAlreadyExists) {
      duplicateErrors.push("Já existe um contato com esse nome.");
    }

    if (duplicateErrors.length > 0) {
      duplicateErrors.forEach((err) => toast.error(err));
      return;
    }

    try {
      await addContact({
        name: data.name,
        category: data.category,
        emails,
        phones,
        addresses,
      });
      toast.success("Contato adicionado com sucesso!");
      reset();
      onSuccess?.();
    } catch {
      toast.error("Erro ao adicionar o contato.");
    }
  };

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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <DoubleColumn>
        <Label>Nome</Label>
        <Input placeholder="Digite o nome" {...register("name")} />
      </DoubleColumn>

      <FieldCategory>
        <Label>Telefone</Label>
        {phoneFields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Input
              placeholder="Digite o telefone"
              {...register(`phones.${index}.value`)}
              style={{ flex: 1 }}
            />
            <div style={{ width: "24px", textAlign: "center" }}>
              {index > 0 && (
                <RemoveButton type="button" onClick={() => removePhone(index)}>
                  ×
                </RemoveButton>
              )}
            </div>
          </div>
        ))}
        <AddButton type="button" onClick={() => addPhone({ value: "" })}>
          + Adicionar telefone
        </AddButton>
      </FieldCategory>

      <FieldCategory>
        <Label>E-mail</Label>
        {emailFields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Input
              placeholder="Digite o e-mail"
              {...register(`emails.${index}.value`)}
              style={{ flex: 1 }}
            />
            <div style={{ width: "24px", textAlign: "center" }}>
              {index > 0 && (
                <RemoveButton type="button" onClick={() => removeEmail(index)}>
                  ×
                </RemoveButton>
              )}
            </div>
          </div>
        ))}
        <AddButton type="button" onClick={() => addEmail({ value: "" })}>
          + Adicionar e-mail
        </AddButton>
      </FieldCategory>

      <FieldCategory>
        <Label>Endereço</Label>
        {addressFields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Input
              placeholder="Digite o endereço"
              {...register(`addresses.${index}.value`)}
              style={{ flex: 1 }}
            />
            <div style={{ width: "24px", textAlign: "center" }}>
              {index > 0 && (
                <RemoveButton
                  type="button"
                  onClick={() => removeAddress(index)}
                >
                  ×
                </RemoveButton>
              )}
            </div>
          </div>
        ))}
        <AddButton type="button" onClick={() => addAddress({ value: "" })}>
          + Adicionar endereço
        </AddButton>
      </FieldCategory>

      <FieldCategory>
        <Label>Categoria</Label>
        <Select {...register("category")}>
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FieldCategory>

      <ButtonRow>
        <SubmitButton type="submit">Adicionar Contato</SubmitButton>
        <CancelButton type="button" onClick={onSuccess}>
          Cancelar
        </CancelButton>
      </ButtonRow>
    </Form>
  );
}
