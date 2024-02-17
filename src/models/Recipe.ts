import { User } from "./User";

export interface Recipe {
    id?: string;
    nome: string;
    ingredientes: string[];
    modoPreparo: string[];
    user?: User;
    createdAt?: Date;
}


