import { District } from "./district";

export interface Oblast {
    id?: number,
    name?: string,
    districts?: District[]
}