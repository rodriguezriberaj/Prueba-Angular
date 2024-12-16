import { ID } from "./base-model";

export type Product = {
    id : ID;
    name: string;
    description: string;
    logo: string;
    releaseDate: Date;
    revisionDate: Date;
  }
  