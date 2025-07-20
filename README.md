# 📇 Agenda de Contatos

Aplicação front-end para gerenciamento de contatos, com suporte a múltiplos e-mails, telefones, endereços e categorização por grupos.

---

## 🚀 Tecnologias utilizadas

* **ReactJS** com **TypeScript**
* `styled-components` para estilização
* `react-hook-form` + `yup` para formulários e validações
* `react-modal` para janelas modais
* `react-toastify` para mensagens de feedback
* `SweetAlert2` para confirmação de exclusões
* `json-server` para simular uma API REST local

---

## 📆 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor fake com json-server

```bash
npx json-server --watch db.json --port 3001
```

> Isso irá iniciar a API fake em `http://localhost:3001`.

### 4. Em outro terminal, rode a aplicação React

```bash
npm run dev
```

> A aplicação estará disponível em `http://localhost:5173` (ou porta configurada pelo Vite).

---

## 🧹 Funcionalidades

✅ Adicionar, visualizar, editar e excluir contatos
✅ Atribuir múltiplos e-mails, telefones e endereços
✅ Validações com feedback visual via toast
✅ Máscara de telefone
✅ Agrupamento por categorias (grupos)
✅ Criação, filtro e exclusão de categorias
✅ Busca por nome com filtro dinâmico
✅ Interface intuitiva e responsiva
✅ Modal único para visualizar e editar contatos
✅ Componentização e boas práticas com Clean Code

---

## 🧠 Arquitetura

O projeto está organizado da seguinte forma:

```
src/
├— components/        # Componentes reutilizáveis
├— pages/             # Páginas principais (ex: ContactsPage)
├— hooks/             # Hooks personalizados (ex: useContacts)
├— services/          # Comunicação com a API fake (json-server)
├— styles/            # Estilos globais e estilos de modal
├— types/             # Tipagens TypeScript
└— App.tsx
```

---

📬Se necesárrio, entre em contato: rafaelachinaglia@hotmail.com
