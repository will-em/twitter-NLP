import * as functions from "firebase-functions";
const apiKeys = require(process.cwd() + "/src/apiKeys.json");
const cors = require("cors")({origin: true});
const axios = require("axios").default;

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//

export const helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    axios.get("https://api.twitter.com/2/tweets/search/recent?query=from%3Aelonmusk", {
      headers: {
        "Authorization": `Bearer ${apiKeys.bearer}`,
      },
    })
        .then((r) => {
          response.send(r.data);
        })
        .catch((e) => {
          response.sendStatus(e);
        });
  });
});
