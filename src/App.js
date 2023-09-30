import { useRef, useState } from 'react';

function App() {
  const [sites, setSites] = useState([]);

  return (
    <>
      <HeaderImage />
      <SearchBar onResponse={(data) => setSites(data.sites)} />
      <Information />
      <WebsiteCards sites={sites}/>
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
  const [searchString, setSearchString] = useState();
  const textInput = useRef();

  const handleClick = (e) => {
    setSearchString(textInput.current.value);

    onResponse(staticResponse);
    // const response = await fetch("https://us-west1-sherlockify.cloudfunctions.net/sherlock",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({ username: searchString }),
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImI5YWM2MDFkMTMxZmQ0ZmZkNTU2ZmYwMzJhYWIxODg4ODBjZGUzYjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1NjY2NTM0NTAyNjU1MzczNTk5IiwiZW1haWwiOiJkYW5pZWwucGFuaGVhZDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJJRVpsWTQ2dnNUSGpVTTBGY1pyWDZ3IiwibmJmIjoxNjk2MDUyOTE4LCJpYXQiOjE2OTYwNTMyMTgsImV4cCI6MTY5NjA1NjgxOCwianRpIjoiOTQ2MGZhMDQ2YzI3MDcxNTdkYWRjZjE0NjkxNzcwZmQ3MjlhMTFhYiJ9.OR0B9SZypseuXbvAOSe2T35nDwWSxPECmFs6Em0-HvI0xJLBM3B1ogkS65yXiZGq8Rbnllz1UUIK2oIj9I-x_VCIVAShHZBFL9ku3WHJkylcpvHv_xRQvQ2Tzoh4BHUraT8kHyDIsQWjEqe0V-xlwwFkDuHdHdCOZyFHu6jEEcDDwcFZCiBbx9GDtUv4ifrikiC6Lz1IlAQF7qaFLCH87jKs46tZL-pdxmCaIZbEWqFrdZxSJKtjEnHMJY3UQ-_i7l9aNg7pIhw7N6coYxKo-lZX5QbqtDr6oF0TjOhYrZ-01FwfA5zJTBqWFikZi1dQ3mYLH2pYu-Cb8kisFd3cMQ"
    //     }
    //   }
    // );

    // onResponse(JSON.parse(await response.text()).data);
  }

  function handleType() {
  }

  return (
    <div>
      <input ref={textInput} placeholder='Enter usernames seperated by spaces'></input>
      <button onClick={handleClick}>search icon lmao</button>
      <br />searched string: {searchString} 
    </div>
  );
}

function WebsiteCards({ sites }) {
  
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