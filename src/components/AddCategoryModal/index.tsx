import { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategories } from "../../hooks/useCategories";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  ModalTitle,
  Button,
} from "./styles";
import { customModalStyles } from "../../styles/modalStyles";
import { toast } from "react-toastify";

interface AddCategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("O nome da categoria é obrigatório.")
    .min(4, "O nome deve ter pelo menos 4 caracteres."),
});

type FormData = {
  name: string;
};

export function AddCategoryModal({ isOpen, onRequestClose }: AddCategoryModalProps) {
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
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    const trimmedName = data.name.trim().toLowerCase();

    const categoryExists = categories.some(
      (cat) => cat.name.trim().toLowerCase() === trimmedName
    );

    if (categoryExists) {
      toast.error("Já existe uma categoria com esse nome.");
      return;
    }

    try {
      await addCategory(data.name.trim());
      toast.success("Categoria criada com sucesso!");
      reset();
      onRequestClose();
    } catch (error) {
      toast.error("Erro ao adicionar categoria.");
    }
  };

  const onError = (formErrors: typeof errors) => {
    if (formErrors.name?.message) {
      toast.error(formErrors.name.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Category Modal"
      style={customModalStyles}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Nova Categoria</ModalTitle>
        </ModalHeader>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Input
            type="text"
            placeholder="Nome da Categoria"
            {...register("name")}
            style={{
              border: errors.name ? "1px solid #c0392b" : undefined,
            }}
          />

          <ModalFooter>
            <Button type="button" onClick={onRequestClose} variant="cancel">
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
