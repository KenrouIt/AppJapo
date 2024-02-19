export interface User {
  id: number;
  user: string;
  password: string;
  wordsLearned: Set<string>
}

const db: User[] = [
  { id: 1, user: "Teby", password: "Flor", wordsLearned: new Set() },
  { id: 2, user: "Dani", password: "Nash", wordsLearned: new Set() },
  { id: 3, user: "Edu", password: "Pipo", wordsLearned: new Set() },
];

export default db;