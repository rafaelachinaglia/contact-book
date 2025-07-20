import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import { ModalFooter, Input, Button } from "./styles";
import { toast } from "react-toastify";

interface CategoryFormProps {
  onSuccess: () => void;
  isOpen: boolean;
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

export function CategoryForm({ onSuccess, isOpen }: CategoryFormProps) {
  const { addCategory, categories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleManualSubmit = async () => {
    const isValid = await trigger("name");

    if (!isValid) {
      const currentErrors = errors;
      if (currentErrors.name?.message) {
        toast.error(currentErrors.name.message);
      }
      return;
    }

    const data = getValues();
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

  return (
    <form>
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
        <Button type="button" onClick={handleManualSubmit}>
          Adicionar
        </Button>
      </ModalFooter>
    </form>
  );
}
