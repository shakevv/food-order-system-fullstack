import { Identifiable } from "./identifiable";

export interface IUser extends Identifiable {
    email: string;
}