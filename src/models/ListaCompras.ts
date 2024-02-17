import { Recipe } from "./Recipe";
import { User } from "./User";


export interface ListaCompras {
    id: string;
    user: User;
    receita: Recipe;
    email: string;
    itens: string[];
    status: boolean;
    createdAt: Date;
}
