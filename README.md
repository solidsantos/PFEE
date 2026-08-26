# Sistema de Gestão de Eventos

---

# 1. Como executar o projeto

## Pré-requisitos

## 1.1 Clonar o repositório

Clone o repositório:

```bash
git clone https://github.com/solidsantos/PFEE.git
```

Entre na pasta do projeto:

```bash
cd PFEE
```

## 1.2 Instalar as dependências

O projeto possui frontend e backend separados.

### Frontend

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

### Backend

Volte para a raiz do projeto:

```bash
cd ..
```

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

## 1.3 Configurar o backend

Na pasta `backend`, crie um arquivo chamado `.env`.

Adicione:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
```

## 1.4 Executar o backend

Dentro da pasta `backend`, execute:

```bash
npm run dev
```

O backend será iniciado utilizando a configuração definida no projeto.

Mantenha esse terminal aberto enquanto estiver utilizando a aplicação.

## 1.5 Executar o frontend

Abra um **novo terminal** e entre na pasta do frontend:

```bash
cd frontend
```

Execute:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço para acessar a aplicação, normalmente:

```text
http://localhost:5173
```

Acesse o endereço informado pelo Vite no navegador.

## 1.6 Executando o projeto

Para utilizar o sistema, o frontend e o backend devem estar executando simultaneamente.

A estrutura de execução é:

```text
Terminal 1
└── backend
    └── npm run dev

Terminal 2
└── frontend
    └── npm run dev
```

Depois de iniciar os dois serviços, acesse o endereço disponibilizado pelo frontend.

---

# 2. Persona

## Persona principal — Mariana Silva

**Nome:** Mariana Silva

**Idade:** 24 anos

**Profissão:** Estudante universitária

**Localização:** Fortaleza, CE

**Nível de familiaridade com tecnologia:** Intermediário

### Perfil

Mariana participa frequentemente de eventos acadêmicos, palestras, workshops e atividades relacionadas à sua área de formação.

Ela costuma descobrir novos eventos através de redes sociais e grupos de mensagens, mas tem dificuldade para encontrar todas as informações necessárias em um único lugar.

### Objetivos

* Encontrar eventos de seu interesse rapidamente;
* Consultar informações como data, horário e local;
* Conhecer a descrição do evento;
* Realizar sua inscrição de forma simples;
* Acompanhar os eventos dos quais participa;
* Evitar perder informações importantes sobre eventos.

### Necessidades

* Interface simples e intuitiva;
* Informações organizadas;
* Busca rápida por eventos;
* Visualização clara das datas e horários;
* Processo de inscrição com poucos passos;
* Feedback visual após realizar uma ação.

### Frustrações

* Informações de eventos espalhadas em diferentes plataformas;
* Páginas confusas;
* Processos de inscrição muito longos;
* Falta de informações sobre horários e locais;
* Dificuldade para encontrar eventos específicos.

### Cenário de uso

Mariana deseja participar de uma palestra relacionada à tecnologia. Ela acessa o sistema, visualiza os eventos disponíveis, utiliza a busca e os filtros para encontrar eventos relacionados à sua área, abre os detalhes da palestra e realiza sua inscrição.

---

# 3. Jornada do Usuário

A jornada representa as etapas percorridas pela persona desde o momento em que acessa o sistema até a conclusão de uma ação.

| Etapa             | Ação do usuário               | Necessidade                       | Resposta do sistema                      |
| ----------------- | ----------------------------- | --------------------------------- | ---------------------------------------- |
| 1. Acesso         | Mariana acessa o sistema      | Encontrar eventos                 | Sistema apresenta a página inicial       |
| 2. Descoberta     | Visualiza eventos disponíveis | Identificar eventos interessantes | Sistema apresenta os eventos disponíveis |
| 3. Busca          | Pesquisa ou filtra eventos    | Encontrar um evento específico    | Sistema atualiza a lista                 |
| 4. Consulta       | Seleciona um evento           | Conhecer os detalhes              | Sistema apresenta informações completas  |
| 5. Decisão        | Decide participar             | Confirmar disponibilidade         | Sistema apresenta opção de inscrição     |
| 6. Inscrição      | Realiza a inscrição           | Garantir sua participação         | Sistema confirma a inscrição             |
| 7. Acompanhamento | Consulta seus eventos         | Ver eventos inscritos             | Sistema apresenta os eventos do usuário  |

## Fluxo principal

```text
Acessar sistema
      ↓
Visualizar eventos
      ↓
Pesquisar/filtrar
      ↓
Selecionar evento
      ↓
Visualizar detalhes
      ↓
Realizar inscrição
      ↓
Confirmar inscrição
      ↓
Consultar eventos inscritos
```

## Objetivo da jornada

A jornada foi projetada para que o usuário consiga realizar sua principal tarefa — **encontrar um evento e se inscrever nele** — com o menor número possível de etapas.

O sistema fornece feedback após as principais ações, evitando que o usuário fique em dúvida se uma operação foi realizada corretamente.

---

# 4. Componentes

A aplicação utiliza a arquitetura baseada em **componentes do Vue**, permitindo dividir a interface em partes menores, reutilizáveis e independentes.

## 4.1 Componentes relacionados aos eventos

### `EventList`

Responsável pela exibição da lista de eventos.

**Funções:**

* Receber os eventos disponíveis;
* Renderizar os eventos;
* Atualizar a lista de acordo com filtros ou pesquisas.

---

### `EventDetails`

Exibe todas as informações de um evento selecionado.

**Informações:**

* Nome;
* Descrição;
* Data;
* Horário;
* Local;
* Categoria;
* Organizador;
* Quantidade de vagas;
* Status da inscrição.

Também disponibiliza as ações para realizar ou cancelar a inscrição.

---

### `EventForm`

Formulário utilizado para criação e edição de eventos pelo administrador.

**Funções:**

* Criar eventos;
* Editar eventos;
* Validar os dados preenchidos;
* Cancelar a operação.

---

## 4.2 Componentes de interação

### `SearchBar`

Permite pesquisar eventos.

**Funções:**

* Receber o texto digitado;
* Realizar a busca;
* Atualizar os resultados apresentados.

---

### `EventFilter`

Permite filtrar eventos de acordo com critérios disponíveis no sistema.

**Filtros:**

* Categoria;
* Data;
* Local.

---

## 4.3 Funcionalidades administrativas

O sistema possui uma área administrativa protegida para gerenciamento dos eventos.

### Gerenciamento de eventos

O administrador pode:

* Criar eventos;
* Visualizar eventos;
* Editar eventos;
* Excluir eventos.

O acesso à área administrativa é restrito a usuários com permissão de administrador.

---

## 4.4 Inscrições

Usuários autenticados podem:

* Visualizar os detalhes dos eventos;
* Realizar inscrição;
* Cancelar inscrição;
* Consultar seus eventos inscritos.

---

## 4.5 Autenticação

O sistema possui autenticação de usuários.

**Funcionalidades:**

* Login;
* Controle de autenticação;
* Proteção de páginas que exigem autenticação;
* Controle de acesso à área administrativa.

---

## 4.6 Feedback do sistema

O sistema apresenta mensagens de feedback para ações realizadas pelo usuário.

**Exemplos:**

* "Inscrição realizada com sucesso!"
* "Inscrição cancelada com sucesso!"
* "Não foi possível realizar a inscrição."
* "Nenhum evento encontrado."
* "Não foi possível carregar os eventos."
