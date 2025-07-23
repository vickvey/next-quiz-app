export interface Question {
  id: string;
  statement: string;
  options: string[];
  correct: number; // 0-based indexing
}
