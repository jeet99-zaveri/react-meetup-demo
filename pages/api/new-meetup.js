import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://jeetdummy333:m1IQMuJGVtlG11Qv@cluster0.k16u67i.mongodb.net/nextMeetup"
    );
    const db = client.db();

    const result = await db.collection("meetups").insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
