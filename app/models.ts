interface Book {
  id?: string;
  title: string;
  description: string;
  cover: { filepath: string; width: number; height: number };
}

export type { Book };
