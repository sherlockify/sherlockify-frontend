import { useState } from 'react';

function App() {
  const [response, onResponse] = useState([]);

  return (
    <>
      <HeaderImage />
      <SearchBar onResponse={(data) => setResponse(data)} />
      <Information />
    </>
  );
}

function HeaderImage() {
  return (
    <>
      <div>Sherlock</div>
    </>
  );
}

function SearchBar({ onResponse }) {

  const handleSubmit = e => {
    onResponse(staticResponse);
  }

  return (
    <div>
      <input placeholder='Enter usernames'></input>
      <button onClick={handleSubmit}>search icon lmao</button>
    </div>
  );
}

function Information() {
  return (
    <div>
      Hunt down social media accounts by username across social networks. <br />
      Enter one or more usernames to check with social networks. <br />
      Check similar usernames using &#123;%&#125; (replaces to '_', '-', '.')
    </div>
  )
}

export default App;

const staticResponse = {
  "username": "_hasannoor",
  "sites": [
    {
      "site": "CNET",
      "urlMain": "https://www.cnet.com/",
      "urlUser": "https://www.cnet.com/profiles/_hasannoor/",
      "status": "Claimed",
      "httpStatus": 403,
      "responseTime": 0.8199266480005463
    },
    {
      "site": "Lolchess",
      "urlMain": "https://lolchess.gg/",
      "urlUser": "https://lolchess.gg/profile/na/_hasannoor",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 4.638569702001405
    },
    {
      "site": "Slides",
      "urlMain": "https://slides.com/",
      "urlUser": "https://slides.com/_hasannoor",
      "status": "Claimed",
      "httpStatus": 204,
      "responseTime": 6.240763494002749
    },
    {
      "site": "Telegram",
      "urlMain": "https://t.me/",
      "urlUser": "https://t.me/_hasannoor",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 7.287125274000573
    },
    {
      "site": "Twitter",
      "urlMain": "https://twitter.com/",
      "urlUser": "https://twitter.com/_hasannoor",
      "status": "Claimed",
      "httpStatus": 403,
      "responseTime": 7.174079076001362
    },
    {
      "site": "Wikipedia",
      "urlMain": "https://www.wikipedia.org/",
      "urlUser": "https://en.wikipedia.org/wiki/Special:CentralAuth/_hasannoor?uselang=qqx",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 7.297234653997293
    },
    {
      "site": "xHamster",
      "urlMain": "https://xhamster.com",
      "urlUser": "https://xhamster.com/users/_hasannoor",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 9.963766398999724
    }
  ]
}