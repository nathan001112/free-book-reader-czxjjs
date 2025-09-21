
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  coverImage: string;
  content: string;
  readingTime: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  publishedDate: string;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  lastReadDate: string;
  isCompleted: boolean;
}

export interface ReadingSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  backgroundColor: string;
  textColor: string;
}
