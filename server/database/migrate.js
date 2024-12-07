import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const oldUri = process.env.OLD_MONGO_URI;
const newUri = process.env.NEW_MONGO_URI;

const migrateData = async () => {
    try {
        if (!oldUri || !newUri) {
            throw new Error("Database URIs are not defined in the environment variables.");
        }

        const oldClient = new MongoClient(oldUri);
        const newClient = new MongoClient(newUri);

        await oldClient.connect();
        await newClient.connect();

        const oldDb = oldClient.db("united-lms");
        const newDb = newClient.db("lms");

        const collections = await oldDb.listCollections().toArray();

        for (const collection of collections) {
            const collectionName = collection.name;

            const documents = await oldDb.collection(collectionName).find().toArray();
            if (documents.length > 0) {
                await newDb.collection(collectionName).insertMany(documents);
                console.log(`Migrated collection: ${collectionName}`);
            } else {
                console.log(`Collection ${collectionName} is empty.`);
            }
        }

        console.log("Migration completed successfully.");
        await oldClient.close();
        await newClient.close();
    } catch (err) {
        console.error("Error during migration:", err);
    }
};

migrateData();
