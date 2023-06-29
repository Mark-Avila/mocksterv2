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
