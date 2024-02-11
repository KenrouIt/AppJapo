export interface User {
  id: number;
  user: string;
  password: string;
  wordsLearned?: string[];
}

// Base de datos de usuarios
const db: User[] = [
  { id: 1, user: "Teby", password: "Flor", wordsLearned: [] },
  { id: 2, user: "Dani", password: "Nash", wordsLearned: [] },
  { id: 3, user: "Edu", password: "Pipo", wordsLearned: [] },
];

export default db;