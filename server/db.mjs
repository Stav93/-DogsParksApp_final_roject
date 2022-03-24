
import { MongoClient }  from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017')
// חיבור פעם אחת ומחכים כל פעם כשמבקשים את הדאטא בייס

export async function getDB() {
   // מחכים לקונקשין
    const connection = await client.connect();
    // בוחרים דאטא בייס
    const db = connection.db("dogParksAppDB");
    return db;
}

