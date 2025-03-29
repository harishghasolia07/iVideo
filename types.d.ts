import { Connection } from "mongoose"


declare global {
    var mongoose: {
        conn: Connection | null   //If we had already connection with database
        promise: Promise<Connection> | null
    }
}

export { };