import { User } from "./User";

export interface Recipe {
    id?: string;
    nome: string;
    ingredientes: string[];
    modoPreparo: string[];
    categoria: string;
    rendimento: string;
    tempoPreparo: string;
    user?: User;
    createdAt?: Date;
    image?: string;
}


