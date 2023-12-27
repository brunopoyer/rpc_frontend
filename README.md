# Frontend do Sistema de Gerenciamento de Tarefas

Este é o frontend do sistema de gerenciamento de tarefas desenvolvido em React 18 e Next.js 14. Utilizamos as bibliotecas react-icons, react-select, e daisyui para componentes Tailwind. Este frontend interage com o backend para criar, editar, listar e excluir tarefas, além de associar tags às tarefas.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Yarn](https://yarnpkg.com/) (opcional, mas recomendado para gerenciamento de dependências)

## Configuração do Ambiente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-projeto-frontend.git
cd seu-projeto-frontend

# Instale as dependências
yarn install
# or
npm install

## Executando o Projeto

```bash
npm run dev
# or
yarn dev
```

## Funcionalidades

### Tarefas

- **Listar Tarefas:**
  - *Descrição:* Retorna uma lista de todas as tarefas.

- **Criar Tarefa:**
  - *Descrição:* Cria uma nova tarefa.
  - *Campos:*
    - Título (string): Título da tarefa.
    - Descrição (string): Descrição da tarefa.
    - Prazo de Execução (date): Prazo para conclusão da tarefa (formato: YYYY-MM-DD).
    - Status (string): Status da tarefa (por fazer, em progresso, concluída).

- **Editar Tarefa:**
  - *Descrição:* Edita uma tarefa existente.
  - *Campos:*
    - Título (string): Novo título da tarefa.
    - Descrição (string): Nova descrição da tarefa.
    - Prazo de Execução (date): Novo prazo para conclusão da tarefa (formato: YYYY-MM-DD).
    - Status (string): Novo status da tarefa.

- **Excluir Tarefa:**
  - *Descrição:* Exclui uma tarefa.

### Tags

- **Listar Tags:**
  - *Descrição:* Retorna uma lista de todas as tags.

- **Criar Tag:**
  - *Descrição:* Cria uma nova tag.
  - *Campos:*
    - Nome (string): Nome da tag.

- **Editar Tag:**
  - *Descrição:* Edita uma tag existente.
  - *Campos:*
    - Nome (string): Novo nome da tag.

- **Excluir Tag:**
  - *Descrição:* Exclui uma tag.

## Bibliotecas Utilizadas

- [React Icons](https://react-icons.github.io/react-icons/): Ícones para a interface.
- [React Select](https://react-select.com/): Componente de seleção avançada.
- [DaisyUI (Tailwind CSS)](https://daisyui.com/): Componentes para o framework Tailwind CSS.

## Contribuindo

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades. Abra uma **issue** para discussões ou envie um **pull request**.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

