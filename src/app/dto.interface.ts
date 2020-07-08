export interface IContact {
  id: number;
  domain: string;
  email: string;
  firstName: string;
  lastName: string;
  confidence: number;
}

export interface IList {
  id: number;
  name: string;
  date: string;
  contacts: IContact[];
}
