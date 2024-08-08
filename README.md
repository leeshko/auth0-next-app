App demonstrates login page

link for the app, uploaded to Vercel: https://auth0-next-kwqm6jzuc-dimas-projects-affd4092.vercel.app/

DB is not connected

Mongoose used.
Mongoose does not currently support Next.js Edge Runtime. While you can import Mongoose in Edge Runtime, you'll get Mongoose's browser library. There is no way for Mongoose to connect to MongoDB in Edge Runtime, because Edge Runtime currently doesn't support Node.js net API, which is what the MongoDB Node Driver uses to connect to MongoDB.
