import { useForm, useFieldArray } from "react-hook-form";
import type { SubmitHandler, DeepPartial } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContacts } from "../../../hooks/useContacts";
import { useCategories } from "../../../hooks/useCategories";
import {
  Form,
  DoubleColumn,
  FieldCategory,
  Label,
  Input,
  ButtonRow,
  SubmitButton,
  CancelButton,
} from "./styles";
import { Select } from "../../Form/Select";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { schema } from "./contactSchema";
import { isDuplicate, normalize } from "./contactUtils";
import { MultiInputField } from "./MultiInputField";

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const emails = data.emails.map((e) => e.value);
    const phones = data.phones.map((p) => p.value);
    const addresses = data.addresses.map((a) => a.value);

    const duplicateErrors: string[] = [];

    if (isDuplicate(emails)) duplicateErrors.push("E-mails duplicados não são permitidos!");
    if (isDuplicate(phones)) duplicateErrors.push("Telefones duplicados não são permitidos!");
    if (isDuplicate(addresses)) duplicateErrors.push("Endereços duplicados não são permitidos!");

    const nameAlreadyExists = contacts.some(
      (contact) => normalize(contact.name) === normalize(data.name)
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
        name: data.name.trim(),
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

      <MultiInputField label="Telefone" name="phones" register={register} control={control} mask="(99)99999-9999" />
      <MultiInputField label="E-mail" name="emails" register={register} control={control} />
      <MultiInputField label="Endereço" name="addresses" register={register} control={control} />

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
