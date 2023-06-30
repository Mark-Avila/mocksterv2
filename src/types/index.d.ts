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

export interface MockData {
  _id?: string;
  author?: string;
  title: string;
  subject: string;
  count: number;
  isBanned?: boolean;
  desc: string;
  items: QuestionBody[];
}
