import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersPath = path.join(__dirname, '../data/users.json');

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'E-mail e senha são obrigatórios.'
      });
    }

    const data = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(data);

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
      return res.status(401).json({
        message: 'E-mail ou senha inválidos.'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h'
      }
    );

    return res.status(200).json({
      message: 'Login realizado com sucesso.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro interno do servidor.'
    });
  }
}
export async function getMe(req, res) {
  try {
    const data = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(data);

    const user = users.find(
      (user) => user.id === req.user.id
    );

    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado.'
      });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao buscar usuário.'
    });
  }
}