export interface RegisterInputs {
  fname: string;
  lname: string;
  email: string;
  tupid: string;
  pwd: string;
  pwd2: string;
  gender: boolean;
}

export interface LoginInputs {
  email: string;
  pwd: string;
}

export interface DefaultState<T> {
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
  data: T;
}

export type AuthState = DefaultState<string?>;

export interface UserData {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  tupid: string;
  gender: string;
}

export interface MockData {
  _id: string;
  author: string | UserData;
  title: string;
  subject: string | SubjectData;
  count: number;
  isBanned: boolean;
  desc: string;
  items: QuestionBody[];
  createdAt: string;
  updatedAt: string;
}

export interface SubjectData {
  _id: string;
  name: string;
  desc: string;
  slug: string;
  user_id: string;
}

export type DropdownItemChange = (e: any, item: string) => void;

interface CreateCallbacksInterface {
  details: {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDropdownChange: (
      e: React.MouseEvent<HTMLButtonElement>,
      item: string
    ) => void;
  };
  questions: {
    onChoiceChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      id: string
    ) => void;
    onTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onCorrectChange: (id: string) => void;
    onAddChoice: () => void;
    onDeleteChoice: (id: string) => void;
    onAddQuestion: () => void;
    onDeleteQuestion: (id: string | string) => void;
  };
}

export interface MockCreateData {
  title: string;
  subject: string;
  desc: string;
}

interface QuestionBody {
  id: string;
  question: string;
  choices: QuestionChoice[];
  correct: string;
}

interface QuestionChoice {
  id: string;
  text: string;
}

type Tabs = "details" | "questions";
