import { useForm, useFieldArray } from "react-hook-form";
import type { SubmitHandler, DeepPartial } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContacts } from "../../../hooks/useContacts";
import {
  Form,
  FieldGroup,
  DoubleColumn,
  Label,
  Input,
  ErrorMessage,
  ButtonRow,
  AddButton,
  SubmitButton,
  CancelButton,
} from "./styles";

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
    category: yup.string().required("Grupo é obrigatório!"),
    emails: yup
      .array()
      .of(
        yup.object({
          value: yup
            .string()
            .email("E-mail inválido!")
            .required("E-mail é obrigatório!"),
        })
      )
      .min(1, "Pelo menos um e-mail é obrigatório!")
      .defined(),
    phones: yup
      .array()
      .of(
        yup.object({
          value: yup.string().required("Telefone é obrigatório!"),
        })
      )
      .min(1, "Pelo menos um telefone é obrigatório!")
      .defined(),
    addresses: yup
      .array()
      .of(
        yup.object({
          value: yup.string().required("Endereço é obrigatório!"),
        })
      )
      .min(1, "Pelo menos um endereço é obrigatório!")
      .defined(),
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
    onSuccess?.();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <DoubleColumn>
        <Label>Nome</Label>
        <Input placeholder="Digite o nome" {...register("name")} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </DoubleColumn>

      <FieldGroup>
        <Label>Telefone</Label>
        {phoneFields.map((field, index) => (
          <div key={field.id}>
            <Input
              placeholder="Digite o telefone"
              {...register(`phones.${index}.value` as const)}
            />
            {errors.phones?.[index]?.value && (
              <ErrorMessage>
                {errors.phones[index]?.value?.message}
              </ErrorMessage>
            )}
          </div>
        ))}
        <AddButton type="button" onClick={() => addPhone({ value: "" })}>
          + Adicionar telefone
        </AddButton>
      </FieldGroup>

      <FieldGroup>
        <Label>E-mail</Label>
        {emailFields.map((field, index) => (
          <div key={field.id}>
            <Input
              placeholder="Digite o e-mail"
              {...register(`emails.${index}.value` as const)}
            />
            {errors.emails?.[index]?.value && (
              <ErrorMessage>
                {errors.emails[index]?.value?.message}
              </ErrorMessage>
            )}
          </div>
        ))}
        <AddButton type="button" onClick={() => addEmail({ value: "" })}>
          + Adicionar e-mail
        </AddButton>
      </FieldGroup>

      <FieldGroup>
        <Label>Endereço</Label>
        {addressFields.map((field, index) => (
          <div key={field.id}>
            <Input
              placeholder="Digite o endereço"
              {...register(`addresses.${index}.value` as const)}
            />
            {errors.addresses?.[index]?.value && (
              <ErrorMessage>
                {errors.addresses[index]?.value?.message}
              </ErrorMessage>
            )}
          </div>
        ))}
        <AddButton type="button" onClick={() => addAddress({ value: "" })}>
          + Adicionar endereço
        </AddButton>
      </FieldGroup>

      <FieldGroup>
        <Label>Grupo</Label>
        <Input placeholder="Digite o grupo" {...register("category")} />
        {errors.category && (
          <ErrorMessage>{errors.category.message}</ErrorMessage>
        )}
      </FieldGroup>

      <ButtonRow>
        <CancelButton type="button" onClick={onSuccess}>
          Cancelar
        </CancelButton>
        <SubmitButton type="submit">Adicionar Contato</SubmitButton>
      </ButtonRow>
    </Form>
  );
}
