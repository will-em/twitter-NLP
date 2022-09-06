import * as functions from "firebase-functions";
const apiKeys = require(process.cwd() + "/src/apiKeys.json");
const cors = require("cors")({origin: true});
const axios = require("axios").default;
require("firebase-functions/lib/logger/compat");

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//

export const getTweets = functions.region("europe-west1")
    .https.onRequest((request, response) => {
      cors(request, response, () => {
        console.log(request.query);
        const handle = request.body.name || request.query.name;
        axios.get("https://api.twitter.com/2/tweets/search/recent?query=from%3A" + handle, {
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
