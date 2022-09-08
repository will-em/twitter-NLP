import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  interface Tweet {
    id: number;
    text: string;
  }

  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    const apiUrl = "https://europe-west1-twitter-nlp-backend.cloudfunctions.net/getTweets?name=elonmusk";
    axios.get(apiUrl).then((response: any) => {
      console.log(response.data.data);
      setTweets(response.data.data);
    });
  }, [])

  const listTweets = tweets.map((tweet) => 
    <p>{tweet.text}</p>
  );

  const loading = <p>Loading...</p>

  return (
    <div className="App">
      <header className="App-header">
        {listTweets.length > 0 ? listTweets : loading}
      </header>
    </div>
  );
}

export default App;
