import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://0.0.0.0:27017/nextMeetup"
  );
  const db = client.db();

  const meetupIds = await db.collection("meetups").distinct("_id");

  return {
    fallback: false,
    paths: meetupIds.map((id) => ({
      params: {
        meetupId: id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb://0.0.0.0:27017/nextMeetup"
  );
  const db = client.db();

  const meetup = await db
    .collection("meetups")
    .findOne({ _id: new ObjectId(meetupId) });

  return {
    props: {
      meetupData: {
        image: meetup.image,
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
