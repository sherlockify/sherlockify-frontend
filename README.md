# Sherlockify 🔎
### Hunt down social media accounts by username across the Internet!

Most of us are either full time students or full time workers... but all of us are part time stalkers. Imagine if you could cut down the hours it took for such a time consuming activity. You'd be able to spend your extra free time to focus more on your studies, make big wins at work, retire early, travel to Maldives, sleep early... Although we all know the last one is never going to happen...

[![Youtube Psuedoembed](/src/components/Embed.png)](https://www.youtube.com/watch?v=bunobscBWnU))


### Built With
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Chakra UI](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Google Cloud Run](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)


### How we built it
We built up from an existing open source repository, Sherlock Project. We used their library to make the service an easy-to-use web app.

- Used Python to output the results of the Sherlock search into JSON, and serve it with a FastAPI back-end
- Containerized the back-end with Docker and hosted it on Google Cloud Run
- Set up Google Cloud Build pipeline to automatically deploy from GitHub repo to Google Cloud Run
- Used Server-Sent Events to push query results to frontend sequentially
- Extended internal notify functionality to add new sites to queue as they are fetched, across multiple threads of execution
- React lazy load for images to not overwhelm screenshot API
- Designed front-end with Chakra UI

### Challenges we ran into
- Sherlock script on the local machine takes about 10 seconds to load all its site queries… Trying to get this running in the cloud with decent speed was excruciating work
- Started off with Google Cloud Functions - way too slow
  - Switched to Google Cloud Run with one minimum instance to eliminate cold start delay
  - Separated sites list into popular sites and extra sites to reduce burden per request
  - Used SSE to push results to client sequentially instead of waiting to send it all at once as a POST response
- Implementing SSE
  - Had issues with running Sherlock search and pushing site results at the same time
  - Needed to run Sherlock search in a separate thread to allow the SSE endpoint to send updates to the client
  - Python SSE library was designed to send updates over fixed time intervals, but we only wanted to send when we received a new site response
  - Used synchronized queue - Sherlock adds items onto the queue as they are queried and during each loop between intervals, SSE will check the queue - if there are items, it will pop off the queue and send to client
- Synchronizing back-end and front-end

### Accomplishments that we're proud of
- LearnT to understand an existing open source project’s structure, then modify and build up for our app
- We got our API response time to go down from ~100 seconds (Google Cloud Functions, all sites) to ~15 seconds (Google Cloud Run, split into popular sites and extra sites)!
