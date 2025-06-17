Plataforma de Agendamento de Consultas

Projeto completo para uma plataforma de agendamentos de consultas, desenvolvido com Next.js, Prisma ORM, PostgreSQL, React Hook Form e validação com Zod.

✨ Visão Geral

A aplicação permite que usuários agendem consultas com profissionais. Teremos funcionalidades como:

Cadastro e login de usuários

Autenticação com JWT

Listagem de profissionais/disponibilidades

Agendamento com seleção de data e horário

Painel de controle para clientes e profissionais

Validação de formulários com React Hook Form + Zod

🛠️ Tecnologias Utilizadas

Frontend

Next.js (com TypeScript)

React Hook Form: gerenciamento de formulários

Zod: validação de dados

Backend/API

Next.js API Routes (App Router)

Prisma ORM: acesso ao banco de dados

PostgreSQL: banco de dados relacional

JSON Web Token (JWT): autenticação

📂 Estrutura Inicial de Pastas (App Router)

app/
├── page.tsx
├── login/
├── register/
├── dashboard/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   └── register/route.ts
│   └── appointments/
│       └── route.ts
components/
lib/
├── prisma.ts
├── auth.ts
prisma/
├── schema.prisma
utils/

🔄 Passo a Passo para Desenvolver

1. Criar o projeto Next.js com TypeScript

npx create-next-app@latest agendamentos --typescript
cd agendamentos

2. Instalar dependências

npm install prisma @prisma/client zod react-hook-form @hookform/resolvers jsonwebtoken bcryptjs

3. Inicializar Prisma e configurar o banco

npx prisma init

Configure o .env com sua URL do PostgreSQL e a chave JWT:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/agendamentos"
JWT_SECRET="sua_chave_secreta_supersegura"

4. Criar o modelo do banco no schema.prisma

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      String   // 'cliente' ou 'profissional'
  createdAt DateTime @default(now())
  appointments Appointment[]
}

model Appointment {
  id             String   @id @default(cuid())
  date           DateTime
  userId         String
  professionalId String
  user           User     @relation("UserAppointments", fields: [userId], references: [id])
  professional   User     @relation("ProfessionalAppointments", fields: [professionalId], references: [id])
}

5. Gerar banco e client do Prisma

npx prisma migrate dev --name init
npx prisma generate

6. Criar conexão com o banco

Em lib/prisma.ts:

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

7. Criar helper de autenticação com JWT

Em lib/auth.ts:

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

8. Criar rotas da API

Registro (app/api/auth/register/route.ts):

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['cliente', 'profissional'])
});

export async function POST(req: Request) {
  const body = await req.json();
  const validation = schema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error, { status: 400 });

  const hashed = await bcrypt.hash(validation.data.password, 10);
  const user = await prisma.user.create({
    data: { ...validation.data, password: hashed }
  });

  return NextResponse.json({ user: { id: user.id, email: user.email } });
}

Login (app/api/auth/login/route.ts):

import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: 'Senha inválida' }, { status: 401 });

  const token = generateToken({ id: user.id, role: user.role });
  return NextResponse.json({ token });
}

📅 Funcionalidades a Implementar

Cadastro/Login de Usuário

✅ Rota de registro com validação usando React Hook Form + Zod

✅ Rota de login com autenticação JWT

Dashboard (Usuário e Profissional)

Listar consultas agendadas

Botão para cancelar

Página de Agendamento

Selecionar profissional, data e horário

Formulário validado com React Hook Form + Zod

Verificação de disponibilidade

🚀 Extras Possíveis Futuramente

Email de confirmação usando Nodemailer

Sistema de notificação em tempo real (Socket.IO ou Pusher)

Pagamento para agendamentos (Stripe)

Layout responsivo com Tailwind CSS ou Shadcn UI

🌐 Executar o Projeto Localmente

npm run dev

Acesse: http://localhost:3000

🚧 Contribuição

Contribuições são bem-vindas. Abra uma issue ou envie um pull request!

🌐 Licença

MIT