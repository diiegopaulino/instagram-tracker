# Instagram Tracker 📉

Um visualizador moderno de dados exportados do Instagram, desenvolvido com [Lovable.dev](https://lovable.dev), Tailwind CSS e React. A aplicação permite que você faça upload de arquivos JSON exportados da plataforma e visualize quem deixou de seguir você, quem você segue e não te segue de volta, além de outras estatísticas personalizadas.

## 🚀 Demonstração

Acesse o projeto online:  
👉 [Ver Projeto no Vercel](https://instagram-tracker-main.vercel.app/)

## 📦 Estrutura do Projeto

- **src/components**: Contém componentes reutilizáveis como `FileInput`, `Header`, entre outros.
- **src/pages**: Reúne as páginas principais da aplicação.
- **public**: Inclui ícones, imagens e outros assets.
- **App.tsx**: Define a estrutura principal da aplicação.
- **index.html**: Arquivo base para o HTML da aplicação.


## 🧠 Funcionalidades

- Upload dos arquivos de seguidores e seguidos do Instagram
- Detecção de não-seguidores e comparação entre listas
- Relatório com visual moderno
- Interface clara e responsiva


## 🛠️ Tecnologias Usadas

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Lovable.dev](https://lovable.dev/)


## ▶️ Como rodar localmente

Para rodar localmente, siga os passos abaixo:

```bash
# Clone o repositório
git clone <URL_DO_SEU_REPOSITORIO>
cd instagram-tracker

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev