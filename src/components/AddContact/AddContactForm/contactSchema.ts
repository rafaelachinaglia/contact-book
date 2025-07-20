import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Nome é obrigatório!"),
  category: yup.string().required("Categoria é obrigatória!"),
  emails: yup.array().of(
    yup.object({
      value: yup.string().required("E-mail é obrigatório!").email("E-mail inválido!"),
    })
  ).min(1, "Pelo menos um e-mail é obrigatório!").required(),
  phones: yup.array().of(
    yup.object({
      value: yup
        .string()
        .trim()
        .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido!")
        .required("Telefone é obrigatório!"),
    })
  ).min(1, "Pelo menos um telefone é obrigatório!").required(),
  addresses: yup.array().of(
    yup.object({
      value: yup.string().required("Endereço é obrigatório!"),
    })
  ).min(1, "Pelo menos um endereço é obrigatório!").required(),
});
