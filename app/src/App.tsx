import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function App() {

  interface Tweet {
    id: number;
    text: string;
  }

  const [handle, setHandle] = useState<string>("Elon musk");
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const getTweets = (twitterHandle: string) => {
    const apiUrl = "https://europe-west1-twitter-nlp-backend.cloudfunctions.net/getTweets?name=" + twitterHandle;
    axios.get(apiUrl).then((response: any) => {
      console.log(response.data.data);
      if(response.data.data)
        setTweets(response.data.data);
    });
  }

  const listTweets = tweets.map((tweet) => 
    <h4 key={tweet.text}>{tweet.text}</h4>
  );

  const loading = <p>Loading...</p>

  return (
    <div className="App">
      <header className="App-header">
        <TextField id="filled-basic" label="Handle" variant="filled" value={handle} onChange={(event) => setHandle(event.target.value)}/>
        <Button variant="contained" onClick={() => getTweets(handle)}>Search</Button>
        {listTweets.length > 0 ? listTweets : loading}
      </header>
    </div>
  );
}

export default App;
