import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import { ModalFooter, Input, Button } from "./styles";
import { toast } from "react-toastify";

interface CategoryFormProps {
  onSuccess: () => void;
}

type FormData = {
  name: string;
};

const schema = yup.object({
  name: yup
    .string()
    .required("O nome da categoria é obrigatório.")
    .min(4, "O nome deve ter pelo menos 4 caracteres."),
});

const normalizeName = (name: string) => name.trim().toLowerCase();

export function CategoryForm({ onSuccess }: CategoryFormProps) {
  const { addCategory, categories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data: FormData) => {
    const normalized = normalizeName(data.name);

    const exists = categories.some(
      (cat) => normalizeName(cat.name) === normalized
    );

    if (exists) {
      toast.error("Já existe uma categoria com esse nome.");
      return;
    }

    try {
      await addCategory(data.name.trim());
      toast.success("Categoria criada com sucesso!");
      onSuccess();
    } catch {
      toast.error("Erro ao adicionar categoria.");
    }
  };

  const onError = () => {
    if (errors.name?.message) toast.error(errors.name.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Input
        type="text"
        placeholder="Nome da Categoria"
        {...register("name")}
        style={{ border: errors.name ? "1px solid #c0392b" : undefined }}
      />
      <ModalFooter>
        <Button type="button" onClick={onSuccess} variant="cancel">
          Cancelar
        </Button>
        <Button type="submit">Adicionar</Button>
      </ModalFooter>
    </form>
  );
}
