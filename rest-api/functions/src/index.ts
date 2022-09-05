import * as functions from "firebase-functions";
const cors = require("cors")({origin: true});
const axios = require("axios").default;

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});

  cors(request, response, () => {
    axios.get("https://random-data-api.com/api/v2/users?size=2&is_xml=true")
        .then((r) => {
          response.send(r.data);
        })
        .catch((e) => {
          response.sendStatus(e);
        });
  });
});
