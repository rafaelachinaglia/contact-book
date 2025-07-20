import * as yup from "yup";

export const viewContactSchema = yup.object({
  name: yup.string().required("Nome é obrigatório!"),
  category: yup.string().required("Categoria é obrigatória!"),
  emails: yup.array().of(
    yup.object({
      value: yup.string().email("E-mail inválido!").required("E-mail obrigatório!"),
    })
  ).min(1, "Pelo menos um e-mail é obrigatório!").required(),
  phones: yup.array().of(
    yup.object({
      value: yup
        .string()
        .trim()
        .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido!")
        .required("Telefone obrigatório!"),
    })
  ).min(1, "Pelo menos um telefone é obrigatório!").required(),
  addresses: yup.array().of(
    yup.object({
      value: yup.string().required("Endereço obrigatório!"),
    })
  ).min(1, "Pelo menos um endereço é obrigatório!").required(),
});
