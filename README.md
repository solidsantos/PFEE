# Sistema de Gestão de Eventos
---

## 1. Persona

### Persona principal — Mariana Silva

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
* Conhecer a descrição e programação do evento;
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

Mariana deseja participar de uma palestra relacionada à tecnologia. Ela acessa o sistema, visualiza os eventos disponíveis, utiliza os filtros para encontrar eventos relacionados à sua área, abre os detalhes da palestra e realiza sua inscrição.

---

# 2. Jornada do Usuário

A jornada representa as etapas percorridas pela persona desde o momento em que acessa o sistema até a conclusão de uma ação.

| Etapa             | Ação do usuário               | Necessidade                       | Resposta do sistema                     |
| ----------------- | ----------------------------- | --------------------------------- | --------------------------------------- |
| 1. Acesso         | Mariana acessa o sistema      | Encontrar eventos                 | Sistema apresenta a página inicial      |
| 2. Descoberta     | Visualiza eventos disponíveis | Identificar eventos interessantes | Sistema apresenta cards de eventos      |
| 3. Busca          | Pesquisa ou filtra eventos    | Encontrar um evento específico    | Sistema atualiza a lista                |
| 4. Consulta       | Seleciona um evento           | Conhecer os detalhes              | Sistema apresenta informações completas |
| 5. Decisão        | Decide participar             | Confirmar disponibilidade         | Sistema apresenta opção de inscrição    |
| 6. Inscrição      | Realiza a inscrição           | Garantir sua participação         | Sistema confirma a inscrição            |
| 7. Acompanhamento | Consulta seus eventos         | Ver eventos inscritos             | Sistema apresenta os eventos do usuário |

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

O sistema deve fornecer feedback após as principais ações, evitando que o usuário fique em dúvida se uma operação foi realizada corretamente.

---

# 3. Componentes

A aplicação utiliza a arquitetura baseada em **componentes do Vue**, permitindo dividir a interface em partes menores, reutilizáveis e independentes.

## 3.1 Componentes de estrutura

### `Navbar`

Responsável pela navegação principal do sistema.

**Funções:**

* Exibir o nome/logo do sistema;
* Permitir acesso às principais páginas;
* Facilitar a navegação entre eventos e inscrições.

---

### `Footer`

Componente responsável pelo rodapé da aplicação.

**Funções:**

* Exibir informações do sistema;
* Informações institucionais;
* Créditos do projeto.

---

## 3.2 Componentes relacionados aos eventos

### `EventCard`

Apresenta um evento de forma resumida.

**Informações exibidas:**

* Nome do evento;
* Data;
* Horário;
* Local;
* Categoria;
* Imagem;
* Botão para visualizar detalhes.

O componente pode ser reutilizado para representar diferentes eventos na listagem.

---

### `EventList`

Responsável pela exibição da lista de eventos.

**Funções:**

* Receber os eventos disponíveis;
* Renderizar vários `EventCard`;
* Atualizar a lista de acordo com filtros ou pesquisas.

Exemplo conceitual:

```text
EventList
 ├── EventCard
 ├── EventCard
 ├── EventCard
 └── EventCard
```

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
* Status das inscrições.

Também disponibiliza a ação para realizar a inscrição.

---

## 3.3 Componentes de interação

### `SearchBar`

Permite pesquisar eventos.

**Funções:**

* Receber o texto digitado;
* Filtrar eventos;
* Atualizar os resultados apresentados.

---

### `EventFilter`

Permite filtrar eventos de acordo com critérios definidos pelo sistema.

Exemplos:

* Categoria;
* Data;
* Local;
* Status.

---

### `Button`

Componente reutilizável para ações da interface.

Exemplos:

* Inscrever-se;
* Ver detalhes;
* Cancelar inscrição;
* Editar;
* Excluir;
* Confirmar.

A utilização de um componente compartilhado mantém um padrão visual consistente em toda a aplicação.

---

### `Modal`

Componente utilizado para apresentar informações ou solicitar confirmação de determinadas ações.

Exemplo:

> "Tem certeza que deseja cancelar sua inscrição neste evento?"

---

### `Notification`

Responsável por apresentar mensagens de feedback ao usuário.

Exemplos:

* "Inscrição realizada com sucesso!"
* "Evento excluído com sucesso."
* "Não foi possível realizar a inscrição."
* "Nenhum evento encontrado."

---
