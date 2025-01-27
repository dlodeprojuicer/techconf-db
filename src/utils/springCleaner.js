import firebase from "../firebase";

function springCleaning(newEventList) {
  // const newEventList = sourceData.map((event) => ({
  //   verified: true,
    // createdBy: "JE3Bh37hpOch095fAEAcNbwrQWI3",
    // eventName: event["Event Name"],
    // website: event["Event Link"],
    // logo: event.Logo,
    // venue: event.Place.split(",")[0] ? event.Place.split(",")[0].trim() : event.Place.split(",")[0],
    // town: event.Place.split(",")[1] ? event.Place.split(",")[1].trim() : event.Place.split(",")[1],
    // start: event.Date.split("-")[1] ? `${event.Date.split("-")[0].trim()} ${event.Date.split("-")[1].trim().split(" ")[2]} 2023` : event.Date.split("-")[0],
    // end: event.Date.split("-")[1] ? `${event.Date.split("-")[1].trim()}` : null,
  // }));

  newEventList.forEach((event) => {
    event.start = convertToISO(event.start);
    event.startFormatted = convertISOToDDMMYYYY(event.start);
    event.end = convertToISO(event.end);
    event.endFormatted = convertISOToDDMMYYYY(event.end);
  });

  // delete all empty keys in each event 
  newEventList.forEach((event) => {
    Object.keys(event).forEach((key) => {
      if(event[key] === "" || event[key] === null || event[key] === undefined) {
        delete event[key];
      }
    });
  });

  addEventsToFirestore(newEventList)
  console.log("newEventList", newEventList);

  return newEventList;
}

function convertToISO(dateString) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  // Convert the date object to an ISO string
  return date.toISOString();
}

function convertISOToDDMMYYYY(isoString) {
  // Parse the ISO string into a Date object
  const date = new Date(isoString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// eslint-disable-next-line no-unused-vars
function addEventsToFirestore(eventList) {
  // batch add events to firestore
  // after add id to each event
  const batch = firebase.firestore().batch();
  const eventsRef = firebase.firestore().collection("events");
  eventList.forEach((event) => {
    const docRef = eventsRef.doc();
    if (!event.town) {
      console.log("eee", event);
    }
    batch.set(docRef, {id: docRef.id, ...event});
  });
  batch.commit().then(() => {
    console.log("batch commit done");
  }
  ).catch((error) => {
    console.log("batch commit error", error);
  });
}


export default springCleaning;