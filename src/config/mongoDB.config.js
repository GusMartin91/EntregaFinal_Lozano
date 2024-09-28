import mongoose from "mongoose";

export class MongoDB {
    static #connection = null;

    static async connect(url, db) {
        if (this.#connection) {
            console.log(`Connection already established`);
            return this.#connection;
        }

        try {
            this.#connection = await mongoose.connect(url, { dbName: db });
            console.log(`Database connection successfully established`);
            return this.#connection;
        } catch (error) {
            console.error(`Failed to connect to the database: ${error}`);
            process.exit(1);
        }
    }
}
