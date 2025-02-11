
# Preparação do Ambiente:

  

Passo a passo para configurar e iniciar o MySQL, Backend e Frontend.

  

## 1. **Pré-requisitos**

Certifique-se de ter instalado:

-  **Node.js** (versão 20 ou superior)
- **Prisma**
-  **Docker** e **Docker Compose**
-  **Git** (para clonar o repositório)

  

---

  

## 2. **Configuração do Backend e MySQL**

  

### **Passo 1: Clonar o repositório**

```sh

git  clone  git@github.com:Tranivic/orbita-challenge-full-stack-web.git

cd  orbita-challenge-full-stack-web

```

  

### **Passo 2: Acessar o diretório do backend**

```sh

cd  backend

```

  

### **Passo 3: Configurar as variáveis de ambiente**

Copie o arquivo de exemplo `.env.sample` para `.env` e edite conforme necessário:

```sh

cp  .env.sample  .env

```

  

### **Passo 4: Subir os serviços do Docker (MySQL)**

```sh

docker-compose  up  -d

```

  

### **Passo 5: Instalar as dependências do backend**

```sh

npm  install

```

  

### **Passo 6: Executar as migrações do banco de dados**

Se o projeto utilizar Prisma, rode o comando abaixo para criar as tabelas no MySQL:

```sh

npx  prisma  migrate  dev

```

### **Passo 7: Iniciar o servidor backend**

```sh

npm  run  dev

```

  

O backend estará disponível em: **[http://localhost:2024](http://localhost:2024)**

  

---

  

## 3. **Configuração do Frontend**

  

### **Passo 1: Acessar o diretório do frontend**

```sh

cd  ../frontend

```

  

### **Passo 2: Configurar as variáveis de ambiente**

Copie o arquivo de exemplo `.env.sample` para `.env` e edite conforme necessário:

```sh

cp  .env.sample  .env

```

  

### **Passo 3: Instalar as dependências do frontend**

```sh

npm  install

```

  

### **Passo 4: Iniciar o servidor frontend**

```sh

npm  run  dev

```

  

O frontend estará disponível em: **[http://localhost:2121](http://localhost:2121)**