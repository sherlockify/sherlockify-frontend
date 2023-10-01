import { useRef, useState } from 'react';
import { Box, ChakraProvider, Text, Button, Card, Flex, Center, CardHeader, CardFooter, SimpleGrid, CardBody, Image, Input, InputGroup, InputLeftElement, InputRightAddon, InputRightElement, GenericAvatarIcon, Checkbox } from '@chakra-ui/react'

const reqUrl = 'http://localhost:8000'

function App() {
  const [sites, setSites] = useState([]);

  return (
    <ChakraProvider >
      <Flex py={16} flexDirection="column" gap={10} bgColor="#1A2B34">
        <LandingPage onRequest={() => setSites([])} onResponse={(data) => setSites(prevData => [...prevData, data])} />
        <WebsiteCards sites={sites} />
      </Flex>
    </ChakraProvider>
  );
}

function LandingPage({ onRequest, onResponse }) {
  return (
    <Flex direction="column" justify="space-between" align="center" gap={4}>
      <Flex p={8} direction="column" alignItems="center">
        <HeaderImage />
        <Information />
      </Flex>
      <SearchBar onRequest={onRequest} onResponse={onResponse} />
      
    </Flex>
  );
}



function SearchBar({ onRequest, onResponse }) {
  const [searchString, setSearchString] = useState("");
  const [searchExtras, setSearchExtras] = useState(false);
  const [searching, setSearching] = useState(false);
  const textInput = useRef();

  const onType = e => {
    setSearchString(textInput.current.value);
  }

  const handleClick = async (e) => {
    setSearching(true)
    onRequest()

    const sse = new EventSource(reqUrl + '/stream')

    sse.onmessage = (e) => {
      const item = JSON.parse(e.data)
      if (item["stop"]) {
        sse.close()
        setSearching(false)
      } else if (item["start"]) {
        // pass
      } else {
        onResponse(item)
      }
    }

    sse.onerror = () => {
      sse.close()
      setSearching(false)
    }

    // onResponse(await response.json());
    // onResponse(staticResponse);

    await fetch(reqUrl,
      {
        method: "POST",
        body: JSON.stringify({ "username": searchString, "extra": searchExtras }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  return (
    <Flex w="2xl" flexDirection="column" gap={3} alignItems="center">
      <InputGroup size="md">
        <InputLeftElement children={<GenericAvatarIcon color="darkgray" p={1} mb={1} />} />
        <Input variant="filled" ref={textInput} onChange={onType} placeholder='Enter a username' _placeholder={{opacity: 0.7}}></Input>
        <InputRightElement w={36}>
          <Button colorScheme='blue' onClick={handleClick} isLoading={searching} loadingText="Searching..." w="full" borderColor="white">
            Search the web!
          </Button>
        </InputRightElement>
      </InputGroup>
      <Checkbox onChange={() => setSearchExtras(!searchExtras)} textColor="gray.100">Explore non-mainstream sites only?</Checkbox>
    </Flex>
  );
}

function WebsiteCards({ sites }) {
  return (
    <Flex flexDirection="column" gap={2} w="full" px={16}>
      <span><i>{sites.length} results found</i></span>
      <SimpleGrid columns={4} spacing={10}>
        {sites.map((s, index) =>
          <Card variant='filled' key={index} as="a" transition="background-color 150ms ease-in-out" href={s.urlUser} _hover={{ backgroundColor: "#CBD5E0" }}>
            <CardBody>
              <Image src={"https://api.apiflash.com/v1/urltoimage?access_key=3db85e280c3c4e5681d2f642fe599dc6&wait_until=page_loaded&url=" + s.urlUser} alt="placeholder" borderRadius="lg" />
            </CardBody>
            <CardHeader>
              <Box fontSize="xl" fontWeight="bold">{s.site}</Box>
              <Box fontSize="sm" color="gray.500">{s.urlUser}</Box>
            </CardHeader>
          </Card>
        )}
      </SimpleGrid>
    </Flex>
  )
}

function Information() {
  return (
    <div>
      <Text align='text-align' fontSize="lg" textColor="gray.100">
        Hunt down social media accounts by username across the Internet!
      </Text>
    </div>
  )
}

export default App;

const staticResponse = {
  "username": "lunchbox",
  "sites": [
    {
      "site": "9GAG",
      "urlMain": "https://www.9gag.com/",
      "urlUser": "https://www.9gag.com/u/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 1.9976316599995698
    },
    {
      "site": "About.me",
      "urlMain": "https://about.me/",
      "urlUser": "https://about.me/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 1.595576359000006
    },
    {
      "site": "Academia.edu",
      "urlMain": "https://www.academia.edu/",
      "urlUser": "https://independent.academia.edu/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 2.3286137270006293
    },
    {
      "site": "Airliners",
      "urlMain": "https://www.airliners.net/",
      "urlUser": "https://www.airliners.net/user/lunchbox/profile/photos",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 1.7787825099994734
    },
    {
      "site": "AllMyLinks",
      "urlMain": "https://allmylinks.com/",
      "urlUser": "https://allmylinks.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 1.7198032479991525
    },
    {
      "site": "Anilist",
      "urlMain": "https://anilist.co/",
      "urlUser": "https://anilist.co/user/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 1.8790413630003968
    },
    {
      "site": "Apple Developer",
      "urlMain": "https://developer.apple.com",
      "urlUser": "https://developer.apple.com/forums/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 1.5851849239998046
    },
    {
      "site": "Apple Discussions",
      "urlMain": "https://discussions.apple.com",
      "urlUser": "https://discussions.apple.com/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 4.309780831999888
    },
    {
      "site": "Archive of Our Own",
      "urlMain": "https://archiveofourown.org/",
      "urlUser": "https://archiveofourown.org/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 1.4000007719996574
    },
    {
      "site": "Archive.org",
      "urlMain": "https://archive.org",
      "urlUser": "https://archive.org/details/@lunchbox",
      "status": "Claimed",
      "httpStatus": 503,
      "responseTime": 8.675648153000111
    },
    {
      "site": "AskFM",
      "urlMain": "https://ask.fm/",
      "urlUser": "https://ask.fm/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 2.635421103000226
    },
    {
      "site": "Audiojungle",
      "urlMain": "https://audiojungle.net/",
      "urlUser": "https://audiojungle.net/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 1.1321005670006343
    },
    {
      "site": "Bandcamp",
      "urlMain": "https://www.bandcamp.com/",
      "urlUser": "https://www.bandcamp.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 2.032712046000597
    },
    {
      "site": "BitBucket",
      "urlMain": "https://bitbucket.org/",
      "urlUser": "https://bitbucket.org/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 2.718136904999483
    },
    {
      "site": "Blogger",
      "urlMain": "https://www.blogger.com/",
      "urlUser": "https://lunchbox.blogspot.com",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 1.8184759870000562
    },
    {
      "site": "BodyBuilding",
      "urlMain": "https://bodyspace.bodybuilding.com/",
      "urlUser": "https://bodyspace.bodybuilding.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 5.030447860000095
    },
    {
      "site": "Bookcrossing",
      "urlMain": "https://www.bookcrossing.com/",
      "urlUser": "https://www.bookcrossing.com/mybookshelf/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 2.750760107000133
    },
    {
      "site": "BuyMeACoffee",
      "urlMain": "https://www.buymeacoffee.com/",
      "urlUser": "https://buymeacoff.ee/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 2.649533718999919
    },
    {
      "site": "BuzzFeed",
      "urlMain": "https://buzzfeed.com/",
      "urlUser": "https://buzzfeed.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 5.716309235999688
    },
    {
      "site": "CGTrader",
      "urlMain": "https://www.cgtrader.com",
      "urlUser": "https://www.cgtrader.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 2.953199071000199
    },
    {
      "site": "Chess",
      "urlMain": "https://www.chess.com/",
      "urlUser": "https://www.chess.com/member/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 2.936797456000022
    },
    {
      "site": "Clubhouse",
      "urlMain": "https://www.clubhouse.com",
      "urlUser": "https://www.clubhouse.com/@lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 3.719881187000283
    },
    {
      "site": "Codecademy",
      "urlMain": "https://www.codecademy.com/",
      "urlUser": "https://www.codecademy.com/profiles/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 4.277888384000107
    },
    {
      "site": "Codechef",
      "urlMain": "https://www.codechef.com/",
      "urlUser": "https://www.codechef.com/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 3.7167703060003987
    },
    {
      "site": "Codeforces",
      "urlMain": "https://codeforces.com/",
      "urlUser": "https://codeforces.com/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 3.7509432169999855
    },
    {
      "site": "Codewars",
      "urlMain": "https://www.codewars.com",
      "urlUser": "https://www.codewars.com/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 3.86211410299984
    },
    {
      "site": "DMOJ",
      "urlMain": "https://dmoj.ca/",
      "urlUser": "https://dmoj.ca/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 4.268251302999488
    },
    {
      "site": "DailyMotion",
      "urlMain": "https://www.dailymotion.com/",
      "urlUser": "https://www.dailymotion.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 4.516003527000066
    },
    {
      "site": "Disqus",
      "urlMain": "https://disqus.com/",
      "urlUser": "https://disqus.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 6.715530960999786
    },
    {
      "site": "Docker Hub",
      "urlMain": "https://hub.docker.com/",
      "urlUser": "https://hub.docker.com/u/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 4.433589924999978
    },
    {
      "site": "Dribbble",
      "urlMain": "https://dribbble.com/",
      "urlUser": "https://dribbble.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 4.816836628000601
    },
    {
      "site": "Duolingo",
      "urlMain": "https://duolingo.com/",
      "urlUser": "https://www.duolingo.com/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 4.747184161000405
    },
    {
      "site": "Erome",
      "urlMain": "https://www.erome.com/",
      "urlUser": "https://www.erome.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 4.4455518019995
    },
    {
      "site": "Fiverr",
      "urlMain": "https://www.fiverr.com/",
      "urlUser": "https://www.fiverr.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 403,
      "responseTime": 6.050201165000544
    },
    {
      "site": "Flickr",
      "urlMain": "https://www.flickr.com/",
      "urlUser": "https://www.flickr.com/people/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 5.3157912540000325
    },
    {
      "site": "Flipboard",
      "urlMain": "https://flipboard.com/",
      "urlUser": "https://flipboard.com/@lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 5.516217553000388
    },
    {
      "site": "Freelancer",
      "urlMain": "https://www.freelancer.com/",
      "urlUser": "https://www.freelancer.com/u/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 5.331423936000647
    },
    {
      "site": "Freesound",
      "urlMain": "https://freesound.org/",
      "urlUser": "https://freesound.org/people/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 6.115088614999877
    },
    {
      "site": "G2G",
      "urlMain": "https://www.g2g.com/",
      "urlUser": "https://www.g2g.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 5.945938836000096
    },
    {
      "site": "GaiaOnline",
      "urlMain": "https://www.gaiaonline.com/",
      "urlUser": "https://www.gaiaonline.com/profiles/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 6.8357504830000835
    },
    {
      "site": "Gamespot",
      "urlMain": "https://www.gamespot.com/",
      "urlUser": "https://www.gamespot.com/profile/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 6.427075839999816
    },
    {
      "site": "GeeksforGeeks",
      "urlMain": "https://www.geeksforgeeks.org/",
      "urlUser": "https://auth.geeksforgeeks.org/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 6.646694915999433
    },
    {
      "site": "Genius (Artists)",
      "urlMain": "https://genius.com/",
      "urlUser": "https://genius.com/artists/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 7.419547739999871
    },
    {
      "site": "Genius (Users)",
      "urlMain": "https://genius.com/",
      "urlUser": "https://genius.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 8.045353241000157
    },
    {
      "site": "Giphy",
      "urlMain": "https://giphy.com/",
      "urlUser": "https://giphy.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 7.616367706999881
    },
    {
      "site": "GitHub",
      "urlMain": "https://www.github.com/",
      "urlUser": "https://www.github.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 7.762774785999682
    },
    {
      "site": "GoodReads",
      "urlMain": "https://www.goodreads.com/",
      "urlUser": "https://www.goodreads.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.205728967000141
    },
    {
      "site": "Grailed",
      "urlMain": "https://www.grailed.com/",
      "urlUser": "https://www.grailed.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 7.224792724000508
    },
    {
      "site": "Gumroad",
      "urlMain": "https://www.gumroad.com/",
      "urlUser": "https://www.gumroad.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.021465876000548
    },
    {
      "site": "Hackaday",
      "urlMain": "https://hackaday.io/",
      "urlUser": "https://hackaday.io/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 11.320756166000137
    },
    {
      "site": "HackerNews",
      "urlMain": "https://news.ycombinator.com/",
      "urlUser": "https://news.ycombinator.com/user?id=lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 7.915285519000463
    },
    {
      "site": "HackerOne",
      "urlMain": "https://hackerone.com/",
      "urlUser": "https://hackerone.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 7.951239777999945
    },
    {
      "site": "HackerRank",
      "urlMain": "https://hackerrank.com/",
      "urlUser": "https://hackerrank.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 9.828102990999469
    },
    {
      "site": "IFTTT",
      "urlMain": "https://www.ifttt.com/",
      "urlUser": "https://www.ifttt.com/p/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 9.315557122999962
    },
    {
      "site": "Image Fap",
      "urlMain": "https://www.imagefap.com/",
      "urlUser": "https://www.imagefap.com/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 404,
      "responseTime": 10.849022026000057
    },
    {
      "site": "Imgur",
      "urlMain": "https://imgur.com/",
      "urlUser": "https://imgur.com/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 8.420093358000486
    },
    {
      "site": "KEAKR",
      "urlMain": "https://www.keakr.com/",
      "urlUser": "https://www.keakr.com/en/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 11.432884140999704
    },
    {
      "site": "Kaggle",
      "urlMain": "https://www.kaggle.com/",
      "urlUser": "https://www.kaggle.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 8.827692122999906
    },
    {
      "site": "Kik",
      "urlMain": "http://kik.me/",
      "urlUser": "https://kik.me/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 9.414553890000207
    },
    {
      "site": "Kongregate",
      "urlMain": "https://www.kongregate.com/",
      "urlUser": "https://www.kongregate.com/accounts/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 9.515173815000708
    },
    {
      "site": "Launchpad",
      "urlMain": "https://launchpad.net/",
      "urlUser": "https://launchpad.net/~lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.015584568000122
    },
    {
      "site": "LeetCode",
      "urlMain": "https://leetcode.com/",
      "urlUser": "https://leetcode.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 9.322853594999287
    },
    {
      "site": "Linktree",
      "urlMain": "https://linktr.ee/",
      "urlUser": "https://linktr.ee/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.240525051000077
    },
    {
      "site": "LiveJournal",
      "urlMain": "https://www.livejournal.com/",
      "urlUser": "https://lunchbox.livejournal.com",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.931532135000452
    },
    {
      "site": "Lolchess",
      "urlMain": "https://lolchess.gg/",
      "urlUser": "https://lolchess.gg/profile/na/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.630648418000419
    },
    {
      "site": "LushStories",
      "urlMain": "https://www.lushstories.com/",
      "urlUser": "https://www.lushstories.com/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.310040311999728
    },
    {
      "site": "MMORPG Forum",
      "urlMain": "https://forums.mmorpg.com/",
      "urlUser": "https://forums.mmorpg.com/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.504897504999462
    },
    {
      "site": "Medium",
      "urlMain": "https://medium.com/",
      "urlUser": "https://medium.com/@lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.223359459999301
    },
    {
      "site": "Memrise",
      "urlMain": "https://www.memrise.com/",
      "urlUser": "https://www.memrise.com/user/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.575586263000332
    },
    {
      "site": "MixCloud",
      "urlMain": "https://www.mixcloud.com/",
      "urlUser": "https://www.mixcloud.com/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.382470431000002
    },
    {
      "site": "Monkeytype",
      "urlMain": "https://monkeytype.com/",
      "urlUser": "https://monkeytype.com/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.404915300000539
    },
    {
      "site": "MyAnimeList",
      "urlMain": "https://myanimelist.net/",
      "urlUser": "https://myanimelist.net/profile/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.481593235999753
    },
    {
      "site": "Myspace",
      "urlMain": "https://myspace.com/",
      "urlUser": "https://myspace.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.567869491999772
    },
    {
      "site": "Newgrounds",
      "urlMain": "https://newgrounds.com",
      "urlUser": "https://lunchbox.newgrounds.com",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 11.11448601399934
    },
    {
      "site": "NitroType",
      "urlMain": "https://www.nitrotype.com/",
      "urlUser": "https://www.nitrotype.com/racer/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 10.707002733000081
    },
    {
      "site": "OpenStreetMap",
      "urlMain": "https://www.openstreetmap.org/",
      "urlUser": "https://www.openstreetmap.org/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 11.714621930000249
    },
    {
      "site": "Opensource",
      "urlMain": "https://opensource.com/",
      "urlUser": "https://opensource.com/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 11.525892196999848
    },
    {
      "site": "Pastebin",
      "urlMain": "https://pastebin.com/",
      "urlUser": "https://pastebin.com/u/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 11.935756818999835
    },
    {
      "site": "Patreon",
      "urlMain": "https://www.patreon.com/",
      "urlUser": "https://www.patreon.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 12.01544626299983
    },
    {
      "site": "PocketStars",
      "urlMain": "https://pocketstars.com/",
      "urlUser": "https://pocketstars.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 12.13994798800013
    },
    {
      "site": "Pokemon Showdown",
      "urlMain": "https://pokemonshowdown.com",
      "urlUser": "https://pokemonshowdown.com/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 12.219051283000226
    },
    {
      "site": "Pornhub",
      "urlMain": "https://pornhub.com/",
      "urlUser": "https://pornhub.com/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 14.714576538000074
    },
    {
      "site": "RedTube",
      "urlMain": "https://www.redtube.com/",
      "urlUser": "https://www.redtube.com/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 13.147545029999492
    },
    {
      "site": "Reddit",
      "urlMain": "https://www.reddit.com/",
      "urlUser": "https://www.reddit.com/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 14.436936955999954
    },
    {
      "site": "Replit.com",
      "urlMain": "https://replit.com/",
      "urlUser": "https://replit.com/@lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 13.112658263000412
    },
    {
      "site": "ReverbNation",
      "urlMain": "https://www.reverbnation.com/",
      "urlUser": "https://www.reverbnation.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 13.613026811999589
    },
    {
      "site": "Roblox",
      "urlMain": "https://www.roblox.com/",
      "urlUser": "https://www.roblox.com/user.aspx?username=lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 15.844764360999761
    },
    {
      "site": "RocketTube",
      "urlMain": "https://www.rockettube.com/",
      "urlUser": "https://www.rockettube.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 13.636318109000058
    },
    {
      "site": "Rumble",
      "urlMain": "https://rumble.com/",
      "urlUser": "https://rumble.com/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 13.354506462000245
    },
    {
      "site": "RuneScape",
      "urlMain": "https://www.runescape.com/",
      "urlUser": "https://apps.runescape.com/runemetrics/app/overview/player/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 15.917498175999754
    },
    {
      "site": "Scribd",
      "urlMain": "https://www.scribd.com/",
      "urlUser": "https://www.scribd.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 14.457810470999902
    },
    {
      "site": "Sketchfab",
      "urlMain": "https://sketchfab.com/",
      "urlUser": "https://sketchfab.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 14.51319168200007
    },
    {
      "site": "Slack",
      "urlMain": "https://slack.com",
      "urlUser": "https://lunchbox.slack.com",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 14.160078458000498
    },
    {
      "site": "Slashdot",
      "urlMain": "https://slashdot.org",
      "urlUser": "https://slashdot.org/~lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 14.222754452000117
    },
    {
      "site": "SlideShare",
      "urlMain": "https://slideshare.net/",
      "urlUser": "https://slideshare.net/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 15.025765417000002
    },
    {
      "site": "Smule",
      "urlMain": "https://www.smule.com/",
      "urlUser": "https://www.smule.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 15.820683302999896
    },
    {
      "site": "SoundCloud",
      "urlMain": "https://soundcloud.com/",
      "urlUser": "https://soundcloud.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 15.21287896099966
    },
    {
      "site": "SourceForge",
      "urlMain": "https://sourceforge.net/",
      "urlUser": "https://sourceforge.net/u/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 14.81482582300032
    },
    {
      "site": "Spotify",
      "urlMain": "https://open.spotify.com/",
      "urlUser": "https://open.spotify.com/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 15.621066685999722
    },
    {
      "site": "Star Citizen",
      "urlMain": "https://robertsspaceindustries.com/",
      "urlUser": "https://robertsspaceindustries.com/citizens/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 15.113476383000489
    },
    {
      "site": "SteamGroup",
      "urlMain": "https://steamcommunity.com/",
      "urlUser": "https://steamcommunity.com/groups/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 15.247011310999369
    },
    {
      "site": "Strava",
      "urlMain": "https://www.strava.com/",
      "urlUser": "https://www.strava.com/athletes/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 17.2194102630001
    },
    {
      "site": "TETR.IO",
      "urlMain": "https://tetr.io",
      "urlUser": "https://ch.tetr.io/u/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 16.312694886000827
    },
    {
      "site": "Telegram",
      "urlMain": "https://t.me/",
      "urlUser": "https://t.me/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 16.618374249000226
    },
    {
      "site": "Tenor",
      "urlMain": "https://tenor.com/",
      "urlUser": "https://tenor.com/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 16.215108997999778
    },
    {
      "site": "ThemeForest",
      "urlMain": "https://themeforest.net/",
      "urlUser": "https://themeforest.net/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 15.952648479000345
    },
    {
      "site": "Trello",
      "urlMain": "https://trello.com/",
      "urlUser": "https://trello.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 16.311964266999894
    },
    {
      "site": "TryHackMe",
      "urlMain": "https://tryhackme.com/",
      "urlUser": "https://tryhackme.com/p/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 16.61893588699968
    },
    {
      "site": "Tuna",
      "urlMain": "https://tuna.voicemod.net/",
      "urlUser": "https://tuna.voicemod.net/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 16.635700855000323
    },
    {
      "site": "Twitch",
      "urlMain": "https://www.twitch.tv/",
      "urlUser": "https://www.twitch.tv/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 16.449373060000653
    },
    {
      "site": "Twitter",
      "urlMain": "https://twitter.com/",
      "urlUser": "https://twitter.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 403,
      "responseTime": 16.911717207000038
    },
    {
      "site": "Typeracer",
      "urlMain": "https://typeracer.com",
      "urlUser": "https://data.typeracer.com/pit/profile?user=lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 17.216722762000245
    },
    {
      "site": "Ultimate-Guitar",
      "urlMain": "https://ultimate-guitar.com/",
      "urlUser": "https://ultimate-guitar.com/u/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 18.420775818999573
    },
    {
      "site": "Unsplash",
      "urlMain": "https://unsplash.com/",
      "urlUser": "https://unsplash.com/@lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 17.725154720999853
    },
    {
      "site": "VSCO",
      "urlMain": "https://vsco.co/",
      "urlUser": "https://vsco.co/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 18.55141070300033
    },
    {
      "site": "Venmo",
      "urlMain": "https://venmo.com/",
      "urlUser": "https://account.venmo.com/u/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 17.620608895999794
    },
    {
      "site": "Vimeo",
      "urlMain": "https://vimeo.com/",
      "urlUser": "https://vimeo.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 17.22467289300039
    },
    {
      "site": "VirusTotal",
      "urlMain": "https://www.virustotal.com/",
      "urlUser": "https://www.virustotal.com/gui/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 17.1321902640002
    },
    {
      "site": "Wattpad",
      "urlMain": "https://www.wattpad.com/",
      "urlUser": "https://www.wattpad.com/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 17.511829021000267
    },
    {
      "site": "Weebly",
      "urlMain": "https://weebly.com/",
      "urlUser": "https://lunchbox.weebly.com/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 17.911678662999293
    },
    {
      "site": "Wikidot",
      "urlMain": "http://www.wikidot.com/",
      "urlUser": "http://www.wikidot.com/user:info/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 16.816819407000366
    },
    {
      "site": "Wikipedia",
      "urlMain": "https://www.wikipedia.org/",
      "urlUser": "https://en.wikipedia.org/wiki/Special:CentralAuth/lunchbox?uselang=qqx",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 18.026069266000377
    },
    {
      "site": "Windy",
      "urlMain": "https://windy.com/",
      "urlUser": "https://community.windy.com/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 17.845508119999977
    },
    {
      "site": "WordPress",
      "urlMain": "https://wordpress.com",
      "urlUser": "https://lunchbox.wordpress.com/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 18.331933559999925
    },
    {
      "site": "WordPressOrg",
      "urlMain": "https://wordpress.org/",
      "urlUser": "https://profiles.wordpress.org/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 18.611360384999898
    },
    {
      "site": "Wordnik",
      "urlMain": "https://www.wordnik.com/",
      "urlUser": "https://www.wordnik.com/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 18.51164936799978
    },
    {
      "site": "Xvideos",
      "urlMain": "https://xvideos.com/",
      "urlUser": "https://xvideos.com/profiles/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 20.783096293999733
    },
    {
      "site": "YouNow",
      "urlMain": "https://www.younow.com/",
      "urlUser": "https://www.younow.com/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 18.91341652200026
    },
    {
      "site": "YouPorn",
      "urlMain": "https://youporn.com",
      "urlUser": "https://youporn.com/uservids/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 20.276906643000075
    },
    {
      "site": "eGPU",
      "urlMain": "https://egpu.io/",
      "urlUser": "https://egpu.io/forums/profile/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 19.342110981999213
    },
    {
      "site": "freecodecamp",
      "urlMain": "https://www.freecodecamp.org/",
      "urlUser": "https://www.freecodecamp.org/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 19.42971424999996
    },
    {
      "site": "furaffinity",
      "urlMain": "https://www.furaffinity.net",
      "urlUser": "https://www.furaffinity.net/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 19.653079032999813
    },
    {
      "site": "geocaching",
      "urlMain": "https://www.geocaching.com/",
      "urlUser": "https://www.geocaching.com/p/default.aspx?u=lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 19.346713957000247
    },
    {
      "site": "interpals",
      "urlMain": "https://www.interpals.net/",
      "urlUser": "https://www.interpals.net/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 19.44601547900038
    },
    {
      "site": "kofi",
      "urlMain": "https://ko-fi.com",
      "urlUser": "https://ko-fi.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 19.64383839200036
    },
    {
      "site": "last.fm",
      "urlMain": "https://last.fm/",
      "urlUser": "https://last.fm/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 20.59631183500005
    },
    {
      "site": "mastodon.cloud",
      "urlMain": "https://mastodon.cloud/",
      "urlUser": "https://mastodon.cloud/@lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 19.917127437999625
    },
    {
      "site": "mastodon.social",
      "urlMain": "https://chaos.social/",
      "urlUser": "https://mastodon.social/@lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 20.29603768400011
    },
    {
      "site": "mercadolivre",
      "urlMain": "https://www.mercadolivre.com.br",
      "urlUser": "https://www.mercadolivre.com.br/perfil/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 21.20706475099996
    },
    {
      "site": "metacritic",
      "urlMain": "https://www.metacritic.com/",
      "urlUser": "https://www.metacritic.com/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 21.20203090799987
    },
    {
      "site": "minds",
      "urlMain": "https://www.minds.com",
      "urlUser": "https://www.minds.com/lunchbox/",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 20.425964347000445
    },
    {
      "site": "note",
      "urlMain": "https://note.com/",
      "urlUser": "https://note.com/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 21.117466156000773
    },
    {
      "site": "npm",
      "urlMain": "https://www.npmjs.com/",
      "urlUser": "https://www.npmjs.com/~lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 20.81843548500001
    },
    {
      "site": "osu!",
      "urlMain": "https://osu.ppy.sh/",
      "urlUser": "https://osu.ppy.sh/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 20.774349919000088
    },
    {
      "site": "pr0gramm",
      "urlMain": "https://pr0gramm.com/",
      "urlUser": "https://pr0gramm.com/user/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 20.878533157000675
    },
    {
      "site": "xHamster",
      "urlMain": "https://xhamster.com",
      "urlUser": "https://xhamster.com/users/lunchbox",
      "status": "Claimed",
      "httpStatus": 200,
      "responseTime": 20.73538448799991
    }
  ]
}
function HeaderImage() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="646" height="298" viewBox="0 0 646 298">
      <g fill="none" fill-rule="evenodd">
        <rect width="646" height="298" fill="#1A2B34" rx="10" />
        <path fill="#FFF" fill-rule="nonzero" d="M296.927538,42.3001499 C297.143688,42.3001499 297.32517,42.3706985 297.471989,42.5117977 C297.618808,42.6528969 297.692216,42.8273085 297.692216,43.0350379 C297.692216,43.2466867 297.617788,43.4279572 297.46893,43.578855 C297.320072,43.7297527 297.13961,43.8052004 296.927538,43.8052004 C296.719544,43.8052004 296.542141,43.7297527 296.395322,43.578855 C296.248503,43.4279572 296.175095,43.2466867 296.175095,43.0350379 C296.175095,42.8233891 296.247483,42.6479976 296.392263,42.5088581 C296.537043,42.3697186 296.715466,42.3001499 296.927538,42.3001499 Z M306.060852,36.7620344 L305.840625,38.4081834 L305.351231,38.4081834 L305.124886,36.7620344 L305.124886,35.3510496 L306.060852,35.3510496 L306.060852,36.7620344 Z M303.846345,36.7620344 L303.62,38.4081834 L303.130606,38.4081834 L302.904261,36.7620344 L302.904261,35.3510496 L303.846345,35.3510496 L303.846345,36.7620344 Z M313.579167,36.7620344 L313.358939,38.4081834 L312.869545,38.4081834 L312.643201,36.7620344 L312.643201,35.3510496 L313.579167,35.3510496 L313.579167,36.7620344 Z M311.364659,36.7620344 L311.138314,38.4081834 L310.64892,38.4081834 L310.422576,36.7620344 L310.422576,35.3510496 L311.364659,35.3510496 L311.364659,36.7620344 Z M321.097481,36.7620344 L320.877254,38.4081834 L320.38786,38.4081834 L320.161515,36.7620344 L320.161515,35.3510496 L321.097481,35.3510496 L321.097481,36.7620344 Z M318.882973,36.7620344 L318.656629,38.4081834 L318.167235,38.4081834 L317.94089,36.7620344 L317.94089,35.3510496 L318.882973,35.3510496 L318.882973,36.7620344 Z M328.793201,40.7833412 L325.159451,40.7833412 L325.159451,39.8897175 L328.793201,39.8897175 L328.793201,40.7833412 Z M334.51911,42.3001499 C334.73526,42.3001499 334.916742,42.3706985 335.063561,42.5117977 C335.21038,42.6528969 335.283788,42.8273085 335.283788,43.0350379 C335.283788,43.2466867 335.20936,43.4279572 335.060502,43.578855 C334.911644,43.7297527 334.731182,43.8052004 334.51911,43.8052004 C334.311116,43.8052004 334.133713,43.7297527 333.986894,43.578855 C333.840075,43.4279572 333.766667,43.2466867 333.766667,43.0350379 C333.766667,42.8233891 333.839055,42.6479976 333.983835,42.5088581 C334.128615,42.3697186 334.307038,42.3001499 334.51911,42.3001499 Z M284.136004,50.2428188 L280.386023,58.8557055 L279.486761,58.8557055 L283.21839,50.2428188 L284.136004,50.2428188 Z M336.75197,58.8557055 L335.846591,58.8557055 L332.102727,50.2428188 L333.014223,50.2428188 L336.75197,58.8557055 Z M282.368068,75.9991714 L281.425985,75.9991714 L281.425985,65.4520597 L282.368068,65.4520597 L282.368068,75.9991714 Z M308.244773,76.3695549 L300.726458,76.3695549 L300.726458,75.5993924 L308.244773,75.5993924 L308.244773,76.3695549 Z M311.964167,72.40116 C312.180317,72.40116 312.361799,72.4717086 312.508617,72.6128078 C312.655436,72.753907 312.728845,72.9283186 312.728845,73.136048 C312.728845,73.3476968 312.654417,73.5289673 312.505559,73.6798651 C312.356701,73.8307628 312.176238,73.9062105 311.964167,73.9062105 C311.756173,73.9062105 311.57877,73.8307628 311.431951,73.6798651 C311.285132,73.5289673 311.211723,73.3476968 311.211723,73.136048 C311.211723,72.9243992 311.284112,72.7490077 311.428892,72.6098682 C311.573672,72.4707287 311.752095,72.40116 311.964167,72.40116 Z M319.482481,72.40116 C319.698631,72.40116 319.880113,72.4717086 320.026932,72.6128078 C320.173751,72.753907 320.247159,72.9283186 320.247159,73.136048 C320.247159,73.3476968 320.172731,73.5289673 320.023873,73.6798651 C319.875015,73.8307628 319.694553,73.9062105 319.482481,73.9062105 C319.274488,73.9062105 319.097084,73.8307628 318.950265,73.6798651 C318.803446,73.5289673 318.730038,73.3476968 318.730038,73.136048 C318.730038,72.9243992 318.802427,72.7490077 318.947206,72.6098682 C319.091986,72.4707287 319.270409,72.40116 319.482481,72.40116 Z M328.793201,70.8843513 L325.159451,70.8843513 L325.159451,69.9907276 L328.793201,69.9907276 L328.793201,70.8843513 Z M336.311515,70.8843513 L332.677765,70.8843513 L332.677765,69.9907276 L336.311515,69.9907276 L336.311515,70.8843513 Z M342.551288,66.8630445 L342.324943,68.5091935 L341.835549,68.5091935 L341.615322,66.8630445 L341.615322,65.4520597 L342.551288,65.4520597 L342.551288,66.8630445 Z M351.348144,70.8843513 L347.714394,70.8843513 L347.714394,69.9907276 L351.348144,69.9907276 L351.348144,70.8843513 Z M357.074053,72.40116 C357.290203,72.40116 357.471685,72.4717086 357.618504,72.6128078 C357.765323,72.753907 357.838731,72.9283186 357.838731,73.136048 C357.838731,73.3476968 357.764303,73.5289673 357.615445,73.6798651 C357.466587,73.8307628 357.286125,73.9062105 357.074053,73.9062105 C356.86606,73.9062105 356.688656,73.8307628 356.541837,73.6798651 C356.395018,73.5289673 356.32161,73.3476968 356.32161,73.136048 C356.32161,72.9243992 356.393999,72.7490077 356.538778,72.6098682 C356.683558,72.4707287 356.861981,72.40116 357.074053,72.40116 Z M276.856269,84.8942551 L272.280436,87.5339725 L272.280436,86.6697443 L275.95089,84.5709044 L272.280436,82.4191525 L272.280436,81.5725616 L276.856269,84.1887626 L276.856269,84.8942551 Z M281.890909,87.4516651 C282.107059,87.4516651 282.288541,87.5222136 282.43536,87.6633128 C282.582179,87.804412 282.655587,87.9788237 282.655587,88.186553 C282.655587,88.3982018 282.581159,88.5794724 282.432301,88.7303701 C282.283443,88.8812679 282.102981,88.9567156 281.890909,88.9567156 C281.682916,88.9567156 281.505512,88.8812679 281.358693,88.7303701 C281.211874,88.5794724 281.138466,88.3982018 281.138466,88.186553 C281.138466,87.9749042 281.210855,87.7995127 281.355634,87.6603733 C281.500414,87.5212338 281.678837,87.4516651 281.890909,87.4516651 Z M290.412481,81.9488242 L289.721212,81.9488242 L287.818693,80.179214 L289.195114,80.179214 L290.412481,81.9488242 Z M300.726458,91.42006 L293.208144,91.42006 L293.208144,90.6498974 L300.726458,90.6498974 L300.726458,91.42006 Z M308.244773,91.42006 L300.726458,91.42006 L300.726458,90.6498974 L308.244773,90.6498974 L308.244773,91.42006 Z M311.964167,87.4516651 C312.180317,87.4516651 312.361799,87.5222136 312.508617,87.6633128 C312.655436,87.804412 312.728845,87.9788237 312.728845,88.186553 C312.728845,88.3982018 312.654417,88.5794724 312.505559,88.7303701 C312.356701,88.8812679 312.176238,88.9567156 311.964167,88.9567156 C311.756173,88.9567156 311.57877,88.8812679 311.431951,88.7303701 C311.285132,88.5794724 311.211723,88.3982018 311.211723,88.186553 C311.211723,87.9749042 311.284112,87.7995127 311.428892,87.6603733 C311.573672,87.5212338 311.752095,87.4516651 311.964167,87.4516651 Z M321.274886,85.9348564 L317.641136,85.9348564 L317.641136,85.0412326 L321.274886,85.0412326 L321.274886,85.9348564 Z M328.615795,81.9135496 L328.395568,83.5596985 L327.906174,83.5596985 L327.67983,81.9135496 L327.67983,80.5025647 L328.615795,80.5025647 L328.615795,81.9135496 Z M326.401288,81.9135496 L326.174943,83.5596985 L325.685549,83.5596985 L325.459205,81.9135496 L325.459205,80.5025647 L326.401288,80.5025647 L326.401288,81.9135496 Z M336.13411,81.9135496 L335.913883,83.5596985 L335.424489,83.5596985 L335.198144,81.9135496 L335.198144,80.5025647 L336.13411,80.5025647 L336.13411,81.9135496 Z M333.919602,81.9135496 L333.693258,83.5596985 L333.203864,83.5596985 L332.977519,81.9135496 L332.977519,80.5025647 L333.919602,80.5025647 L333.919602,81.9135496 Z M344.270284,88.9567156 L343.364905,88.9567156 L339.621042,80.3438289 L340.532538,80.3438289 L344.270284,88.9567156 Z M349.592443,82.5837674 C349.800437,82.5837674 349.975801,82.6513764 350.118542,82.7865964 C350.261282,82.9218165 350.332652,83.0874096 350.332652,83.2833807 C350.332652,83.4832712 350.261282,83.6498441 350.118542,83.7831045 C349.975801,83.9163648 349.800437,83.982994 349.592443,83.982994 C349.388528,83.982994 349.217242,83.915385 349.07858,83.7801649 C348.939917,83.6449449 348.870587,83.4793518 348.870587,83.2833807 C348.870587,83.0874096 348.939917,82.9218165 349.07858,82.7865964 C349.217242,82.6513764 349.388528,82.5837674 349.592443,82.5837674 Z M349.604678,88.9567156 C349.392606,88.9331991 349.217242,88.8489328 349.07858,88.7039141 C348.939917,88.5588955 348.870587,88.3942823 348.870587,88.2100694 C348.870587,88.0101789 348.937878,87.8416463 349.072462,87.7044665 C349.207046,87.5672868 349.376293,87.4986979 349.580208,87.4986979 C349.808593,87.4986979 350.006388,87.5878634 350.173598,87.7661971 C350.340809,87.9445308 350.424413,88.159116 350.424413,88.409959 C350.424413,89.1781657 349.979884,89.7778282 349.090814,90.2089646 L348.858352,89.7856692 C349.355905,89.5505039 349.604678,89.2741888 349.604678,88.9567156 Z M358.689053,81.9135496 L358.468826,83.5596985 L357.979432,83.5596985 L357.753087,81.9135496 L357.753087,80.5025647 L358.689053,80.5025647 L358.689053,81.9135496 Z M356.474545,81.9135496 L356.248201,83.5596985 L355.758807,83.5596985 L355.532462,81.9135496 L355.532462,80.5025647 L356.474545,80.5025647 L356.474545,81.9135496 Z M365.595625,81.9488242 L364.904356,81.9488242 L363.001837,80.179214 L364.378258,80.179214 L365.595625,81.9488242 Z M276.617689,95.394334 L272.867708,104.007221 L271.968447,104.007221 L275.700076,95.394334 L276.617689,95.394334 Z M291.654318,95.394334 L287.904337,104.007221 L287.005076,104.007221 L290.736705,95.394334 L291.654318,95.394334 Z M299.068636,105.077217 L298.695473,105.58282 C297.786012,104.920438 297.092711,104.150283 296.615549,103.272333 C296.138388,102.394382 295.899811,101.467453 295.899811,100.491517 C295.899811,99.5077418 296.136349,98.5798326 296.609432,97.7077612 C297.082515,96.8356898 297.777855,96.0684745 298.695473,95.4060922 L299.068636,95.9116951 C298.322307,96.5544803 297.784998,97.2276309 297.456695,97.9311671 C297.128392,98.6347034 296.964242,99.4842253 296.964242,100.479759 C296.964242,101.510566 297.134509,102.377726 297.475047,103.081262 C297.815586,103.784798 298.346777,104.45011 299.068636,105.077217 Z M345.194015,99.2157513 L344.319223,99.2157513 L342.074129,95.68241 L339.896326,99.2157513 L338.997064,99.2157513 L341.73767,94.8181818 L342.477879,94.8181818 L345.194015,99.2157513 Z M351.788598,104.007221 L350.88322,104.007221 L347.139356,95.394334 L348.050852,95.394334 L351.788598,104.007221 Z M274.886458,112.01456 L274.660114,113.660709 L274.17072,113.660709 L273.950492,112.01456 L273.950492,110.603575 L274.886458,110.603575 L274.886458,112.01456 Z M283.683314,116.035866 L280.049564,116.035866 L280.049564,115.142243 L283.683314,115.142243 L283.683314,116.035866 Z M290.412481,112.049834 L289.721212,112.049834 L287.818693,110.280224 L289.195114,110.280224 L290.412481,112.049834 Z M295.239129,110.456597 C296.152669,111.11898 296.84597,111.886195 297.319053,112.758266 C297.792136,113.630338 298.028674,114.558247 298.028674,115.542022 C298.028674,116.517958 297.791117,117.444887 297.315994,118.322838 C296.840872,119.200788 296.14859,119.970943 295.239129,120.633325 L294.859848,120.127723 C295.606178,119.492776 296.143486,118.817666 296.47179,118.102371 C296.800093,117.387077 296.964242,116.529716 296.964242,115.530264 C296.964242,114.499456 296.794995,113.637196 296.456496,112.943458 C296.117997,112.24972 295.585786,111.589308 294.859848,110.9622 L295.239129,110.456597 Z M344.96767,113.854719 L339.180587,113.854719 L339.180587,113.084557 L344.96767,113.084557 L344.96767,113.854719 Z M344.96767,116.21224 L339.180587,116.21224 L339.180587,115.442077 L344.96767,115.442077 L344.96767,116.21224 Z M350.032898,121.150687 L349.090814,121.150687 L349.090814,110.603575 L350.032898,110.603575 L350.032898,121.150687 Z M358.866458,116.035866 L355.232708,116.035866 L355.232708,115.142243 L358.866458,115.142243 L358.866458,116.035866 Z M364.592367,117.552675 C364.808517,117.552675 364.989999,117.623224 365.136818,117.764323 C365.283637,117.905422 365.357045,118.079834 365.357045,118.287563 C365.357045,118.499212 365.282618,118.680482 365.133759,118.83138 C364.984901,118.982278 364.804439,119.057726 364.592367,119.057726 C364.384374,119.057726 364.20697,118.982278 364.060152,118.83138 C363.913333,118.680482 363.839924,118.499212 363.839924,118.287563 C363.839924,118.075914 363.912313,117.900523 364.057093,117.761383 C364.201873,117.622244 364.380296,117.552675 364.592367,117.552675 Z M284.136004,125.495344 L280.386023,134.108231 L279.486761,134.108231 L283.21839,125.495344 L284.136004,125.495344 Z M290.412481,127.100339 L289.721212,127.100339 L287.818693,125.330729 L289.195114,125.330729 L290.412481,127.100339 Z M298.719943,131.086372 L295.086193,131.086372 L295.086193,130.192748 L298.719943,130.192748 L298.719943,131.086372 Z M306.238258,131.086372 L302.604508,131.086372 L302.604508,130.192748 L306.238258,130.192748 L306.238258,131.086372 Z M311.964167,132.60318 C312.180317,132.60318 312.361799,132.673729 312.508617,132.814828 C312.655436,132.955927 312.728845,133.130339 312.728845,133.338068 C312.728845,133.549717 312.654417,133.730988 312.505559,133.881885 C312.356701,134.032783 312.176238,134.108231 311.964167,134.108231 C311.756173,134.108231 311.57877,134.032783 311.431951,133.881885 C311.285132,133.730988 311.211723,133.549717 311.211723,133.338068 C311.211723,133.126419 311.284112,132.951028 311.428892,132.811888 C311.573672,132.672749 311.752095,132.60318 311.964167,132.60318 Z M319.996345,127.065065 L319.77,128.711214 L319.280606,128.711214 L319.060379,127.065065 L319.060379,125.65408 L319.996345,125.65408 L319.996345,127.065065 Z M328.793201,131.086372 L325.159451,131.086372 L325.159451,130.192748 L328.793201,130.192748 L328.793201,131.086372 Z M336.311515,131.086372 L332.677765,131.086372 L332.677765,130.192748 L336.311515,130.192748 L336.311515,131.086372 Z M342.551288,127.065065 L342.324943,128.711214 L341.835549,128.711214 L341.615322,127.065065 L341.615322,125.65408 L342.551288,125.65408 L342.551288,127.065065 Z M374.343542,134.108231 L373.438163,134.108231 L369.694299,125.495344 L370.605795,125.495344 L374.343542,134.108231 Z M387.147311,132.60318 C387.363461,132.60318 387.544942,132.673729 387.691761,132.814828 C387.83858,132.955927 387.911989,133.130339 387.911989,133.338068 C387.911989,133.549717 387.837561,133.730988 387.688703,133.881885 C387.539845,134.032783 387.359382,134.108231 387.147311,134.108231 C386.939317,134.108231 386.761914,134.032783 386.615095,133.881885 C386.468276,133.730988 386.394867,133.549717 386.394867,133.338068 C386.394867,133.126419 386.467256,132.951028 386.612036,132.811888 C386.756816,132.672749 386.935239,132.60318 387.147311,132.60318 Z M396.45803,131.086372 L392.82428,131.086372 L392.82428,130.192748 L396.45803,130.192748 L396.45803,131.086372 Z M402.183939,132.60318 C402.400089,132.60318 402.581571,132.673729 402.72839,132.814828 C402.875209,132.955927 402.948617,133.130339 402.948617,133.338068 C402.948617,133.549717 402.87419,133.730988 402.725331,133.881885 C402.576473,134.032783 402.396011,134.108231 402.183939,134.108231 C401.975946,134.108231 401.798542,134.032783 401.651723,133.881885 C401.504905,133.730988 401.431496,133.549717 401.431496,133.338068 C401.431496,133.126419 401.503885,132.951028 401.648665,132.811888 C401.793445,132.672749 401.971868,132.60318 402.183939,132.60318 Z M266.85428,147.653685 C267.07043,147.653685 267.251912,147.724234 267.398731,147.865333 C267.54555,148.006432 267.618958,148.180844 267.618958,148.388573 C267.618958,148.600222 267.54453,148.781493 267.395672,148.93239 C267.246814,149.083288 267.066352,149.158736 266.85428,149.158736 C266.646287,149.158736 266.468883,149.083288 266.322064,148.93239 C266.175245,148.781493 266.101837,148.600222 266.101837,148.388573 C266.101837,148.176924 266.174226,148.001533 266.319006,147.862393 C266.463785,147.723254 266.642209,147.653685 266.85428,147.653685 Z M274.886458,142.11557 L274.660114,143.761719 L274.17072,143.761719 L273.950492,142.11557 L273.950492,140.704585 L274.886458,140.704585 L274.886458,142.11557 Z M282.894167,142.150844 L282.202898,142.150844 L280.300379,140.381234 L281.676799,140.381234 L282.894167,142.150844 Z M291.201629,146.136877 L287.567879,146.136877 L287.567879,145.243253 L291.201629,145.243253 L291.201629,146.136877 Z M296.927538,147.653685 C297.143688,147.653685 297.32517,147.724234 297.471989,147.865333 C297.618808,148.006432 297.692216,148.180844 297.692216,148.388573 C297.692216,148.600222 297.617788,148.781493 297.46893,148.93239 C297.320072,149.083288 297.13961,149.158736 296.927538,149.158736 C296.719544,149.158736 296.542141,149.083288 296.395322,148.93239 C296.248503,148.781493 296.175095,148.600222 296.175095,148.388573 C296.175095,148.176924 296.247483,148.001533 296.392263,147.862393 C296.537043,147.723254 296.715466,147.653685 296.927538,147.653685 Z M308.244773,151.62208 L300.726458,151.62208 L300.726458,150.851918 L308.244773,150.851918 L308.244773,151.62208 Z M320.485739,142.150844 L319.79447,142.150844 L317.891951,140.381234 L319.268371,140.381234 L320.485739,142.150844 Z M327.000795,147.653685 C327.216946,147.653685 327.398427,147.724234 327.545246,147.865333 C327.692065,148.006432 327.765473,148.180844 327.765473,148.388573 C327.765473,148.600222 327.691046,148.781493 327.542188,148.93239 C327.393329,149.083288 327.212867,149.158736 327.000795,149.158736 C326.792802,149.158736 326.615398,149.083288 326.46858,148.93239 C326.321761,148.781493 326.248352,148.600222 326.248352,148.388573 C326.248352,148.176924 326.320741,148.001533 326.465521,147.862393 C326.610301,147.723254 326.788724,147.653685 327.000795,147.653685 Z M336.75197,149.158736 L335.846591,149.158736 L332.102727,140.545849 L333.014223,140.545849 L336.75197,149.158736 Z M372.587841,151.251697 L371.645758,151.251697 L371.645758,140.704585 L372.587841,140.704585 L372.587841,151.251697 Z M388.725606,146.795336 C388.725606,147.555704 388.518635,148.139689 388.104688,148.547309 C387.69074,148.954929 387.084101,149.158736 386.284754,149.158736 C385.587364,149.158736 384.953197,149.017639 384.382235,148.73544 L384.681989,147.965278 C385.167307,148.196524 385.701556,148.312145 386.284754,148.312145 C386.790463,148.312145 387.156486,148.183786 387.382831,147.927064 C387.609177,147.670341 387.722348,147.269587 387.722348,146.724787 L387.722348,140.704585 L388.725606,140.704585 L388.725606,146.795336 Z M404.429034,140.545849 L400.679053,149.158736 L399.779792,149.158736 L403.51142,140.545849 L404.429034,140.545849 Z M261.581061,155.596354 L257.83108,164.209241 L256.931818,164.209241 L260.663447,155.596354 L261.581061,155.596354 Z M312.967424,157.201349 L312.276155,157.201349 L310.373636,155.431739 L311.750057,155.431739 L312.967424,157.201349 Z M321.274886,161.187382 L317.641136,161.187382 L317.641136,160.293758 L321.274886,160.293758 L321.274886,161.187382 Z M328.793201,161.187382 L325.159451,161.187382 L325.159451,160.293758 L328.793201,160.293758 L328.793201,161.187382 Z M334.51911,162.70419 C334.73526,162.70419 334.916742,162.774739 335.063561,162.915838 C335.21038,163.056937 335.283788,163.231349 335.283788,163.439078 C335.283788,163.650727 335.20936,163.831998 335.060502,163.982895 C334.911644,164.133793 334.731182,164.209241 334.51911,164.209241 C334.311116,164.209241 334.133713,164.133793 333.986894,163.982895 C333.840075,163.831998 333.766667,163.650727 333.766667,163.439078 C333.766667,163.227429 333.839055,163.052038 333.983835,162.912899 C334.128615,162.773759 334.307038,162.70419 334.51911,162.70419 Z M342.514583,166.302202 L341.5725,166.302202 L341.5725,155.75509 L342.514583,155.75509 L342.514583,166.302202 Z M374.343542,164.209241 L373.438163,164.209241 L369.694299,155.596354 L370.605795,155.596354 L374.343542,164.209241 Z M383.427917,166.672585 L375.909602,166.672585 L375.909602,165.902423 L383.427917,165.902423 L383.427917,166.672585 Z M390.946231,166.672585 L383.427917,166.672585 L383.427917,165.902423 L390.946231,165.902423 L390.946231,166.672585 Z M396.91072,155.596354 L393.160739,164.209241 L392.261477,164.209241 L395.993106,155.596354 L396.91072,155.596354 Z M60.1403977,198.278646 L52.6220833,198.278646 L52.6220833,197.508483 L60.1403977,197.508483 L60.1403977,198.278646 Z M67.6587121,198.278646 L60.1403977,198.278646 L60.1403977,197.508483 L67.6587121,197.508483 L67.6587121,198.278646 Z M75.1770265,198.278646 L67.6587121,198.278646 L67.6587121,197.508483 L75.1770265,197.508483 L75.1770265,198.278646 Z M82.6953409,198.278646 L75.1770265,198.278646 L75.1770265,197.508483 L82.6953409,197.508483 L82.6953409,198.278646 Z M105.250284,198.278646 L97.7319697,198.278646 L97.7319697,197.508483 L105.250284,197.508483 L105.250284,198.278646 Z M225.543314,198.278646 L218.025,198.278646 L218.025,197.508483 L225.543314,197.508483 L225.543314,198.278646 Z M323.281402,198.278646 L315.763087,198.278646 L315.763087,197.508483 L323.281402,197.508483 L323.281402,198.278646 Z M375.909602,198.278646 L368.391288,198.278646 L368.391288,197.508483 L375.909602,197.508483 L375.909602,198.278646 Z M383.427917,198.278646 L375.909602,198.278646 L375.909602,197.508483 L383.427917,197.508483 L383.427917,198.278646 Z M390.946231,198.278646 L383.427917,198.278646 L383.427917,197.508483 L390.946231,197.508483 L390.946231,198.278646 Z M398.464545,198.278646 L390.946231,198.278646 L390.946231,197.508483 L398.464545,197.508483 L398.464545,198.278646 Z M496.202633,198.278646 L488.684318,198.278646 L488.684318,197.508483 L496.202633,197.508483 L496.202633,198.278646 Z M586.422405,198.278646 L578.904091,198.278646 L578.904091,197.508483 L586.422405,197.508483 L586.422405,198.278646 Z M51.0682576,200.747869 L47.3182765,209.360756 L46.4190152,209.360756 L50.1506439,200.747869 L51.0682576,200.747869 Z M67.6587121,211.8241 L60.1403977,211.8241 L60.1403977,211.053938 L67.6587121,211.053938 L67.6587121,211.8241 Z M75.1770265,211.8241 L67.6587121,211.8241 L67.6587121,211.053938 L75.1770265,211.053938 L75.1770265,211.8241 Z M82.6953409,211.8241 L75.1770265,211.8241 L75.1770265,211.053938 L82.6953409,211.053938 L82.6953409,211.8241 Z M86.8918939,211.453717 L85.9498106,211.453717 L85.9498106,200.906605 L86.8918939,200.906605 L86.8918939,211.453717 Z M94.4102083,211.453717 L93.468125,211.453717 L93.468125,200.906605 L94.4102083,200.906605 L94.4102083,211.453717 Z M109.446837,211.453717 L108.504754,211.453717 L108.504754,200.906605 L109.446837,200.906605 L109.446837,211.453717 Z M120.286913,211.8241 L112.768598,211.8241 L112.768598,211.053938 L120.286913,211.053938 L120.286913,211.8241 Z M127.805227,211.8241 L120.286913,211.8241 L120.286913,211.053938 L127.805227,211.053938 L127.805227,211.8241 Z M157.878485,211.8241 L150.36017,211.8241 L150.36017,211.053938 L157.878485,211.053938 L157.878485,211.8241 Z M165.396799,211.8241 L157.878485,211.8241 L157.878485,211.053938 L165.396799,211.053938 L165.396799,211.8241 Z M172.915114,211.8241 L165.396799,211.8241 L165.396799,211.053938 L172.915114,211.053938 L172.915114,211.8241 Z M187.951742,211.8241 L180.433428,211.8241 L180.433428,211.053938 L187.951742,211.053938 L187.951742,211.8241 Z M202.988371,211.8241 L195.470057,211.8241 L195.470057,211.053938 L202.988371,211.053938 L202.988371,211.8241 Z M210.506686,211.8241 L202.988371,211.8241 L202.988371,211.053938 L210.506686,211.053938 L210.506686,211.8241 Z M214.703239,211.453717 L213.761155,211.453717 L213.761155,200.906605 L214.703239,200.906605 L214.703239,211.453717 Z M229.739867,211.453717 L228.797784,211.453717 L228.797784,200.906605 L229.739867,200.906605 L229.739867,211.453717 Z M248.098258,211.8241 L240.579943,211.8241 L240.579943,211.053938 L248.098258,211.053938 L248.098258,211.8241 Z M255.616572,211.8241 L248.098258,211.8241 L248.098258,211.053938 L255.616572,211.053938 L255.616572,211.8241 Z M263.134886,211.8241 L255.616572,211.8241 L255.616572,211.053938 L263.134886,211.053938 L263.134886,211.8241 Z M293.208144,211.8241 L285.68983,211.8241 L285.68983,211.053938 L293.208144,211.053938 L293.208144,211.8241 Z M300.726458,211.8241 L293.208144,211.8241 L293.208144,211.053938 L300.726458,211.053938 L300.726458,211.8241 Z M308.244773,211.8241 L300.726458,211.8241 L300.726458,211.053938 L308.244773,211.053938 L308.244773,211.8241 Z M312.441326,211.453717 L311.499242,211.453717 L311.499242,200.906605 L312.441326,200.906605 L312.441326,211.453717 Z M327.477955,211.453717 L326.535871,211.453717 L326.535871,200.906605 L327.477955,200.906605 L327.477955,211.453717 Z M345.836345,211.8241 L338.31803,211.8241 L338.31803,211.053938 L345.836345,211.053938 L345.836345,211.8241 Z M353.354659,211.8241 L345.836345,211.8241 L345.836345,211.053938 L353.354659,211.053938 L353.354659,211.8241 Z M365.069527,211.453717 L364.127443,211.453717 L364.127443,200.906605 L365.069527,200.906605 L365.069527,211.453717 Z M390.946231,211.8241 L383.427917,211.8241 L383.427917,211.053938 L390.946231,211.053938 L390.946231,211.8241 Z M404.416799,209.360756 L403.51142,209.360756 L399.767557,200.747869 L400.679053,200.747869 L404.416799,209.360756 Z M421.019489,211.8241 L413.501174,211.8241 L413.501174,211.053938 L421.019489,211.053938 L421.019489,211.8241 Z M436.056117,211.8241 L428.537803,211.8241 L428.537803,211.053938 L436.056117,211.053938 L436.056117,211.8241 Z M443.574432,211.8241 L436.056117,211.8241 L436.056117,211.053938 L443.574432,211.053938 L443.574432,211.8241 Z M458.611061,211.8241 L451.092746,211.8241 L451.092746,211.053938 L458.611061,211.053938 L458.611061,211.8241 Z M466.129375,211.8241 L458.611061,211.8241 L458.611061,211.053938 L466.129375,211.053938 L466.129375,211.8241 Z M473.647689,211.8241 L466.129375,211.8241 L466.129375,211.053938 L473.647689,211.053938 L473.647689,211.8241 Z M487.026496,210.430753 L486.653333,210.936356 C485.743872,210.273973 485.050571,209.503819 484.573409,208.625868 C484.096248,207.747918 483.85767,206.820988 483.85767,205.845052 C483.85767,204.861277 484.094208,203.933368 484.567292,203.061297 C485.040375,202.189225 485.735715,201.42201 486.653333,200.759628 L487.026496,201.26523 C486.280167,201.908016 485.742858,202.581166 485.414555,203.284702 C485.086252,203.988239 484.922102,204.837761 484.922102,205.833294 C484.922102,206.864102 485.092369,207.731261 485.432907,208.434797 C485.773446,209.138333 486.304637,209.803645 487.026496,210.430753 Z M496.202633,211.8241 L488.684318,211.8241 L488.684318,211.053938 L496.202633,211.053938 L496.202633,211.8241 Z M498.233617,200.759628 C499.147157,201.42201 499.840458,202.189225 500.313542,203.061297 C500.786625,203.933368 501.023163,204.861277 501.023163,205.845052 C501.023163,206.820988 500.785605,207.747918 500.310483,208.625868 C499.835361,209.503819 499.143079,210.273973 498.233617,210.936356 L497.854337,210.430753 C498.600667,209.795806 499.137975,209.120696 499.466278,208.405402 C499.794582,207.690107 499.958731,206.832746 499.958731,205.833294 C499.958731,204.802486 499.789484,203.940226 499.450985,203.246488 C499.112486,202.552751 498.580275,201.892338 497.854337,201.26523 L498.233617,200.759628 Z M518.757576,211.8241 L511.239261,211.8241 L511.239261,211.053938 L518.757576,211.053938 L518.757576,211.8241 Z M526.27589,211.8241 L518.757576,211.8241 L518.757576,211.053938 L526.27589,211.053938 L526.27589,211.8241 Z M533.794205,211.8241 L526.27589,211.8241 L526.27589,211.053938 L533.794205,211.053938 L533.794205,211.8241 Z M556.349148,211.8241 L548.830833,211.8241 L548.830833,211.053938 L556.349148,211.053938 L556.349148,211.8241 Z M563.867462,211.8241 L556.349148,211.8241 L556.349148,211.053938 L563.867462,211.053938 L563.867462,211.8241 Z M571.385777,211.8241 L563.867462,211.8241 L563.867462,211.053938 L571.385777,211.053938 L571.385777,211.8241 Z M575.58233,211.453717 L574.640246,211.453717 L574.640246,200.906605 L575.58233,200.906605 L575.58233,211.453717 Z M590.618958,211.453717 L589.676875,211.453717 L589.676875,200.906605 L590.618958,200.906605 L590.618958,211.453717 Z M601.459034,211.8241 L593.94072,211.8241 L593.94072,211.053938 L601.459034,211.053938 L601.459034,211.8241 Z M51.0560227,222.906211 L50.1506439,222.906211 L46.4067803,214.293324 L47.3182765,214.293324 L51.0560227,222.906211 Z M60.1403977,225.369555 L52.6220833,225.369555 L52.6220833,224.599392 L60.1403977,224.599392 L60.1403977,225.369555 Z M67.6587121,225.369555 L60.1403977,225.369555 L60.1403977,224.599392 L67.6587121,224.599392 L67.6587121,225.369555 Z M75.1770265,225.369555 L67.6587121,225.369555 L67.6587121,224.599392 L75.1770265,224.599392 L75.1770265,225.369555 Z M88.6475947,222.906211 L87.7422159,222.906211 L83.9983523,214.293324 L84.9098485,214.293324 L88.6475947,222.906211 Z M94.4102083,224.999171 L93.468125,224.999171 L93.468125,214.45206 L94.4102083,214.45206 L94.4102083,224.999171 Z M109.483542,215.863045 L109.257197,217.509193 L108.767803,217.509193 L108.547576,215.863045 L108.547576,214.45206 L109.483542,214.45206 L109.483542,215.863045 Z M120.286913,225.369555 L112.768598,225.369555 L112.768598,224.599392 L120.286913,224.599392 L120.286913,225.369555 Z M133.757481,222.906211 L132.852102,222.906211 L129.108239,214.293324 L130.019735,214.293324 L133.757481,222.906211 Z M148.806345,214.293324 L145.056364,222.906211 L144.157102,222.906211 L147.888731,214.293324 L148.806345,214.293324 Z M165.396799,225.369555 L157.878485,225.369555 L157.878485,224.599392 L165.396799,224.599392 L165.396799,225.369555 Z M178.867367,222.906211 L177.961989,222.906211 L174.218125,214.293324 L175.129621,214.293324 L178.867367,222.906211 Z M192.185,215.863045 L191.958655,217.509193 L191.469261,217.509193 L191.249034,215.863045 L191.249034,214.45206 L192.185,214.45206 L192.185,215.863045 Z M202.988371,225.369555 L195.470057,225.369555 L195.470057,224.599392 L202.988371,224.599392 L202.988371,225.369555 Z M210.506686,225.369555 L202.988371,225.369555 L202.988371,224.599392 L210.506686,224.599392 L210.506686,225.369555 Z M214.703239,224.999171 L213.761155,224.999171 L213.761155,214.45206 L214.703239,214.45206 L214.703239,224.999171 Z M229.739867,224.999171 L228.797784,224.999171 L228.797784,214.45206 L229.739867,214.45206 L229.739867,224.999171 Z M239.026117,214.293324 L235.276136,222.906211 L234.376875,222.906211 L238.108504,214.293324 L239.026117,214.293324 Z M255.616572,225.369555 L248.098258,225.369555 L248.098258,224.599392 L255.616572,224.599392 L255.616572,225.369555 Z M269.08714,222.906211 L268.181761,222.906211 L264.437898,214.293324 L265.349394,214.293324 L269.08714,222.906211 Z M284.136004,214.293324 L280.386023,222.906211 L279.486761,222.906211 L283.21839,214.293324 L284.136004,214.293324 Z M300.726458,225.369555 L293.208144,225.369555 L293.208144,224.599392 L300.726458,224.599392 L300.726458,225.369555 Z M308.244773,225.369555 L300.726458,225.369555 L300.726458,224.599392 L308.244773,224.599392 L308.244773,225.369555 Z M312.441326,224.999171 L311.499242,224.999171 L311.499242,214.45206 L312.441326,214.45206 L312.441326,224.999171 Z M327.477955,224.999171 L326.535871,224.999171 L326.535871,214.45206 L327.477955,214.45206 L327.477955,224.999171 Z M336.764205,214.293324 L333.014223,222.906211 L332.114962,222.906211 L335.846591,214.293324 L336.764205,214.293324 Z M351.800833,214.293324 L348.050852,222.906211 L347.151591,222.906211 L350.88322,214.293324 L351.800833,214.293324 Z M365.069527,224.999171 L364.127443,224.999171 L364.127443,214.45206 L365.069527,214.45206 L365.069527,224.999171 Z M380.106155,224.999171 L379.164072,224.999171 L379.164072,214.45206 L380.106155,214.45206 L380.106155,224.999171 Z M390.946231,225.369555 L383.427917,225.369555 L383.427917,224.599392 L390.946231,224.599392 L390.946231,225.369555 Z M392.977216,214.305082 C393.890756,214.967464 394.584057,215.73468 395.05714,216.606751 C395.530223,217.478822 395.766761,218.406732 395.766761,219.390507 C395.766761,220.366443 395.529204,221.293372 395.054081,222.171323 C394.578959,223.049273 393.886678,223.819428 392.977216,224.48181 L392.597936,223.976207 C393.344265,223.341261 393.881573,222.666151 394.209877,221.950856 C394.53818,221.235562 394.70233,220.378201 394.70233,219.378748 C394.70233,218.34794 394.533083,217.485681 394.194583,216.791943 C393.856084,216.098205 393.323874,215.437792 392.597936,214.810685 L392.977216,214.305082 Z M410.179413,224.999171 L409.23733,224.999171 L409.23733,214.45206 L410.179413,214.45206 L410.179413,224.999171 Z M425.252746,215.863045 L425.026402,217.509193 L424.537008,217.509193 L424.31678,215.863045 L424.31678,214.45206 L425.252746,214.45206 L425.252746,215.863045 Z M436.056117,225.369555 L428.537803,225.369555 L428.537803,224.599392 L436.056117,224.599392 L436.056117,225.369555 Z M443.574432,225.369555 L436.056117,225.369555 L436.056117,224.599392 L443.574432,224.599392 L443.574432,225.369555 Z M449.53892,214.293324 L445.788939,222.906211 L444.889678,222.906211 L448.621307,214.293324 L449.53892,214.293324 Z M466.129375,225.369555 L458.611061,225.369555 L458.611061,224.599392 L466.129375,224.599392 L466.129375,225.369555 Z M479.599943,222.906211 L478.694564,222.906211 L474.950701,214.293324 L475.862197,214.293324 L479.599943,222.906211 Z M485.362557,224.999171 L484.420473,224.999171 L484.420473,214.45206 L485.362557,214.45206 L485.362557,224.999171 Z M500.399186,224.999171 L499.457102,224.999171 L499.457102,214.45206 L500.399186,214.45206 L500.399186,224.999171 Z M509.685436,214.293324 L505.935455,222.906211 L505.036193,222.906211 L508.767822,214.293324 L509.685436,214.293324 Z M526.27589,225.369555 L518.757576,225.369555 L518.757576,224.599392 L526.27589,224.599392 L526.27589,225.369555 Z M539.746458,222.906211 L538.84108,222.906211 L535.097216,214.293324 L536.008712,214.293324 L539.746458,222.906211 Z M547.277008,214.293324 L543.527027,222.906211 L542.627765,222.906211 L546.359394,214.293324 L547.277008,214.293324 Z M563.867462,225.369555 L556.349148,225.369555 L556.349148,224.599392 L563.867462,224.599392 L563.867462,225.369555 Z M571.385777,225.369555 L563.867462,225.369555 L563.867462,224.599392 L571.385777,224.599392 L571.385777,225.369555 Z M575.58233,224.999171 L574.640246,224.999171 L574.640246,214.45206 L575.58233,214.45206 L575.58233,224.999171 Z M593.94072,225.369555 L586.422405,225.369555 L586.422405,224.599392 L593.94072,224.599392 L593.94072,225.369555 Z M601.459034,225.369555 L593.94072,225.369555 L593.94072,224.599392 L601.459034,224.599392 L601.459034,225.369555 Z M605.655587,224.999171 L604.713504,224.999171 L604.713504,214.45206 L605.655587,214.45206 L605.655587,224.999171 Z M60.1403977,238.915009 L52.6220833,238.915009 L52.6220833,238.144847 L60.1403977,238.144847 L60.1403977,238.915009 Z M67.6587121,238.915009 L60.1403977,238.915009 L60.1403977,238.144847 L67.6587121,238.144847 L67.6587121,238.915009 Z M75.1770265,238.915009 L67.6587121,238.915009 L67.6587121,238.144847 L75.1770265,238.144847 L75.1770265,238.915009 Z M77.2080114,227.850537 C78.1215513,228.512919 78.8148524,229.280134 79.2879356,230.152206 C79.7610188,231.024277 79.9975568,231.952186 79.9975568,232.935961 C79.9975568,233.911897 79.7599992,234.838827 79.2848769,235.716777 C78.8097546,236.594728 78.117473,237.364883 77.2080114,238.027265 L76.8287311,237.521662 C77.5750605,236.886716 78.1123689,236.211605 78.4406723,235.496311 C78.7689758,234.781016 78.933125,233.923656 78.933125,232.924203 C78.933125,231.893395 78.763878,231.031135 78.4253788,230.337397 C78.0868796,229.64366 77.554669,228.983247 76.8287311,228.35614 L77.2080114,227.850537 Z M94.4102083,238.544626 L93.468125,238.544626 L93.468125,227.997514 L94.4102083,227.997514 L94.4102083,238.544626 Z M109.446837,238.544626 L108.504754,238.544626 L108.504754,227.997514 L109.446837,227.997514 L109.446837,238.544626 Z M124.483466,238.544626 L123.541383,238.544626 L123.541383,227.997514 L124.483466,227.997514 L124.483466,238.544626 Z M139.520095,238.544626 L138.578011,238.544626 L138.578011,227.997514 L139.520095,227.997514 L139.520095,238.544626 Z M165.396799,238.915009 L157.878485,238.915009 L157.878485,238.144847 L165.396799,238.144847 L165.396799,238.915009 Z M172.915114,238.915009 L165.396799,238.915009 L165.396799,238.144847 L172.915114,238.144847 L172.915114,238.915009 Z M178.879602,227.838778 L175.129621,236.451665 L174.23036,236.451665 L177.961989,227.838778 L178.879602,227.838778 Z M192.148295,238.544626 L191.206212,238.544626 L191.206212,227.997514 L192.148295,227.997514 L192.148295,238.544626 Z M214.703239,238.544626 L213.761155,238.544626 L213.761155,227.997514 L214.703239,227.997514 L214.703239,238.544626 Z M229.739867,238.544626 L228.797784,238.544626 L228.797784,227.997514 L229.739867,227.997514 L229.739867,238.544626 Z M246.440436,237.521662 L246.067273,238.027265 C245.157811,237.364883 244.46451,236.594728 243.987348,235.716777 C243.510187,234.838827 243.27161,233.911897 243.27161,232.935961 C243.27161,231.952186 243.508148,231.024277 243.981231,230.152206 C244.454314,229.280134 245.149655,228.512919 246.067273,227.850537 L246.440436,228.35614 C245.694106,228.998925 245.156798,229.672075 244.828494,230.375612 C244.500191,231.079148 244.336042,231.92867 244.336042,232.924203 C244.336042,233.955011 244.506308,234.82217 244.846847,235.525706 C245.187385,236.229243 245.718576,236.894554 246.440436,237.521662 Z M255.616572,238.915009 L248.098258,238.915009 L248.098258,238.144847 L255.616572,238.144847 L255.616572,238.915009 Z M257.647557,227.850537 C258.561097,228.512919 259.254398,229.280134 259.727481,230.152206 C260.200564,231.024277 260.437102,231.952186 260.437102,232.935961 C260.437102,233.911897 260.199545,234.838827 259.724422,235.716777 C259.2493,236.594728 258.557018,237.364883 257.647557,238.027265 L257.268277,237.521662 C258.014606,236.886716 258.551914,236.211605 258.880218,235.496311 C259.208521,234.781016 259.37267,233.923656 259.37267,232.924203 C259.37267,231.893395 259.203423,231.031135 258.864924,230.337397 C258.526425,229.64366 257.994214,228.983247 257.268277,228.35614 L257.647557,227.850537 Z M274.849754,238.544626 L273.90767,238.544626 L273.90767,227.997514 L274.849754,227.997514 L274.849754,238.544626 Z M291.550322,237.521662 L291.177159,238.027265 C290.267697,237.364883 289.574396,236.594728 289.097235,235.716777 C288.620073,234.838827 288.381496,233.911897 288.381496,232.935961 C288.381496,231.952186 288.618034,231.024277 289.091117,230.152206 C289.564201,229.280134 290.259541,228.512919 291.177159,227.850537 L291.550322,228.35614 C290.803992,228.998925 290.266684,229.672075 289.938381,230.375612 C289.610077,231.079148 289.445928,231.92867 289.445928,232.924203 C289.445928,233.955011 289.616195,234.82217 289.956733,235.525706 C290.297271,236.229243 290.828462,236.894554 291.550322,237.521662 Z M300.726458,238.915009 L293.208144,238.915009 L293.208144,238.144847 L300.726458,238.144847 L300.726458,238.915009 Z M308.244773,238.915009 L300.726458,238.915009 L300.726458,238.144847 L308.244773,238.144847 L308.244773,238.915009 Z M312.441326,238.544626 L311.499242,238.544626 L311.499242,227.997514 L312.441326,227.997514 L312.441326,238.544626 Z M344.282519,235.028922 L339.706686,232.389205 L339.706686,231.683712 L344.282519,229.067511 L344.282519,229.914102 L340.612064,232.065854 L344.282519,234.164694 L344.282519,235.028922 Z M365.069527,238.544626 L364.127443,238.544626 L364.127443,227.997514 L365.069527,227.997514 L365.069527,238.544626 Z M390.946231,238.915009 L383.427917,238.915009 L383.427917,238.144847 L390.946231,238.144847 L390.946231,238.915009 Z M398.464545,238.915009 L390.946231,238.915009 L390.946231,238.144847 L398.464545,238.144847 L398.464545,238.915009 Z M404.429034,227.838778 L400.679053,236.451665 L399.779792,236.451665 L403.51142,227.838778 L404.429034,227.838778 Z M410.179413,238.544626 L409.23733,238.544626 L409.23733,227.997514 L410.179413,227.997514 L410.179413,238.544626 Z M425.216042,238.544626 L424.273958,238.544626 L424.273958,227.997514 L425.216042,227.997514 L425.216042,238.544626 Z M440.25267,238.544626 L439.310587,238.544626 L439.310587,227.997514 L440.25267,227.997514 L440.25267,238.544626 Z M456.953239,237.521662 L456.580076,238.027265 C455.670614,237.364883 454.977313,236.594728 454.500152,235.716777 C454.02299,234.838827 453.784413,233.911897 453.784413,232.935961 C453.784413,231.952186 454.020951,231.024277 454.494034,230.152206 C454.967117,229.280134 455.662458,228.512919 456.580076,227.850537 L456.953239,228.35614 C456.206909,228.998925 455.669601,229.672075 455.341297,230.375612 C455.012994,231.079148 454.848845,231.92867 454.848845,232.924203 C454.848845,233.955011 455.019111,234.82217 455.35965,235.525706 C455.700188,236.229243 456.231379,236.894554 456.953239,237.521662 Z M466.129375,238.915009 L458.611061,238.915009 L458.611061,238.144847 L466.129375,238.144847 L466.129375,238.915009 Z M468.16036,227.850537 C469.0739,228.512919 469.767201,229.280134 470.240284,230.152206 C470.713367,231.024277 470.949905,231.952186 470.949905,232.935961 C470.949905,233.911897 470.712348,234.838827 470.237225,235.716777 C469.762103,236.594728 469.069821,237.364883 468.16036,238.027265 L467.78108,237.521662 C468.527409,236.886716 469.064717,236.211605 469.393021,235.496311 C469.721324,234.781016 469.885473,233.923656 469.885473,232.924203 C469.885473,231.893395 469.716226,231.031135 469.377727,230.337397 C469.039228,229.64366 468.507018,228.983247 467.78108,228.35614 L468.16036,227.850537 Z M485.362557,238.544626 L484.420473,238.544626 L484.420473,227.997514 L485.362557,227.997514 L485.362557,238.544626 Z M500.399186,238.544626 L499.457102,238.544626 L499.457102,227.997514 L500.399186,227.997514 L500.399186,238.544626 Z M526.27589,238.915009 L518.757576,238.915009 L518.757576,238.144847 L526.27589,238.144847 L526.27589,238.915009 Z M533.794205,238.915009 L526.27589,238.915009 L526.27589,238.144847 L533.794205,238.144847 L533.794205,238.915009 Z M539.758693,227.838778 L536.008712,236.451665 L535.109451,236.451665 L538.84108,227.838778 L539.758693,227.838778 Z M554.691326,237.521662 L554.318163,238.027265 C553.408701,237.364883 552.7154,236.594728 552.238239,235.716777 C551.761077,234.838827 551.5225,233.911897 551.5225,232.935961 C551.5225,231.952186 551.759038,231.024277 552.232121,230.152206 C552.705204,229.280134 553.400545,228.512919 554.318163,227.850537 L554.691326,228.35614 C553.944996,228.998925 553.407688,229.672075 553.079384,230.375612 C552.751081,231.079148 552.586932,231.92867 552.586932,232.924203 C552.586932,233.955011 552.757198,234.82217 553.097737,235.525706 C553.438275,236.229243 553.969466,236.894554 554.691326,237.521662 Z M563.867462,238.915009 L556.349148,238.915009 L556.349148,238.144847 L563.867462,238.144847 L563.867462,238.915009 Z M571.385777,238.915009 L563.867462,238.915009 L563.867462,238.144847 L571.385777,238.144847 L571.385777,238.915009 Z M575.58233,238.544626 L574.640246,238.544626 L574.640246,227.997514 L575.58233,227.997514 L575.58233,238.544626 Z M590.618958,238.544626 L589.676875,238.544626 L589.676875,227.997514 L590.618958,227.997514 L590.618958,238.544626 Z M601.459034,238.915009 L593.94072,238.915009 L593.94072,238.144847 L601.459034,238.144847 L601.459034,238.915009 Z M49.300322,252.09008 L48.3582386,252.09008 L48.3582386,241.542969 L49.300322,241.542969 L49.300322,252.09008 Z M60.1403977,252.460464 L52.6220833,252.460464 L52.6220833,251.690301 L60.1403977,251.690301 L60.1403977,252.460464 Z M67.6587121,252.460464 L60.1403977,252.460464 L60.1403977,251.690301 L67.6587121,251.690301 L67.6587121,252.460464 Z M75.1770265,252.460464 L67.6587121,252.460464 L67.6587121,251.690301 L75.1770265,251.690301 L75.1770265,252.460464 Z M82.6953409,252.460464 L75.1770265,252.460464 L75.1770265,251.690301 L82.6953409,251.690301 L82.6953409,252.460464 Z M88.6598295,241.384233 L84.9098485,249.99712 L84.0105871,249.99712 L87.7422159,241.384233 L88.6598295,241.384233 Z M94.4102083,252.09008 L93.468125,252.09008 L93.468125,241.542969 L94.4102083,241.542969 L94.4102083,252.09008 Z M105.250284,252.460464 L97.7319697,252.460464 L97.7319697,251.690301 L105.250284,251.690301 L105.250284,252.460464 Z M109.446837,252.09008 L108.504754,252.09008 L108.504754,241.542969 L109.446837,241.542969 L109.446837,252.09008 Z M124.483466,252.09008 L123.541383,252.09008 L123.541383,241.542969 L124.483466,241.542969 L124.483466,252.09008 Z M135.323542,252.460464 L127.805227,252.460464 L127.805227,251.690301 L135.323542,251.690301 L135.323542,252.460464 Z M139.520095,252.09008 L138.578011,252.09008 L138.578011,241.542969 L139.520095,241.542969 L139.520095,252.09008 Z M148.79411,249.99712 L147.888731,249.99712 L144.144867,241.384233 L145.056364,241.384233 L148.79411,249.99712 Z M157.878485,252.460464 L150.36017,252.460464 L150.36017,251.690301 L157.878485,251.690301 L157.878485,252.460464 Z M165.396799,252.460464 L157.878485,252.460464 L157.878485,251.690301 L165.396799,251.690301 L165.396799,252.460464 Z M172.915114,252.460464 L165.396799,252.460464 L165.396799,251.690301 L172.915114,251.690301 L172.915114,252.460464 Z M177.111667,252.09008 L176.169583,252.09008 L176.169583,241.542969 L177.111667,241.542969 L177.111667,252.09008 Z M187.951742,252.460464 L180.433428,252.460464 L180.433428,251.690301 L187.951742,251.690301 L187.951742,252.460464 Z M192.148295,252.09008 L191.206212,252.09008 L191.206212,241.542969 L192.148295,241.542969 L192.148295,252.09008 Z M214.703239,252.09008 L213.761155,252.09008 L213.761155,241.542969 L214.703239,241.542969 L214.703239,252.09008 Z M225.543314,252.460464 L218.025,252.460464 L218.025,251.690301 L225.543314,251.690301 L225.543314,252.460464 Z M229.739867,252.09008 L228.797784,252.09008 L228.797784,241.542969 L229.739867,241.542969 L229.739867,252.09008 Z M239.013883,249.99712 L238.108504,249.99712 L234.36464,241.384233 L235.276136,241.384233 L239.013883,249.99712 Z M248.098258,252.460464 L240.579943,252.460464 L240.579943,251.690301 L248.098258,251.690301 L248.098258,252.460464 Z M255.616572,252.460464 L248.098258,252.460464 L248.098258,251.690301 L255.616572,251.690301 L255.616572,252.460464 Z M263.134886,252.460464 L255.616572,252.460464 L255.616572,251.690301 L263.134886,251.690301 L263.134886,252.460464 Z M269.099375,241.384233 L265.349394,249.99712 L264.450133,249.99712 L268.181761,241.384233 L269.099375,241.384233 Z M284.123769,249.99712 L283.21839,249.99712 L279.474527,241.384233 L280.386023,241.384233 L284.123769,249.99712 Z M293.208144,252.460464 L285.68983,252.460464 L285.68983,251.690301 L293.208144,251.690301 L293.208144,252.460464 Z M300.726458,252.460464 L293.208144,252.460464 L293.208144,251.690301 L300.726458,251.690301 L300.726458,252.460464 Z M308.244773,252.460464 L300.726458,252.460464 L300.726458,251.690301 L308.244773,251.690301 L308.244773,252.460464 Z M312.441326,252.09008 L311.499242,252.09008 L311.499242,241.542969 L312.441326,241.542969 L312.441326,252.09008 Z M323.281402,252.460464 L315.763087,252.460464 L315.763087,251.690301 L323.281402,251.690301 L323.281402,252.460464 Z M327.477955,252.09008 L326.535871,252.09008 L326.535871,241.542969 L327.477955,241.542969 L327.477955,252.09008 Z M336.75197,249.99712 L335.846591,249.99712 L332.102727,241.384233 L333.014223,241.384233 L336.75197,249.99712 Z M345.836345,252.460464 L338.31803,252.460464 L338.31803,251.690301 L345.836345,251.690301 L345.836345,252.460464 Z M351.788598,249.99712 L350.88322,249.99712 L347.139356,241.384233 L348.050852,241.384233 L351.788598,249.99712 Z M365.069527,252.09008 L364.127443,252.09008 L364.127443,241.542969 L365.069527,241.542969 L365.069527,252.09008 Z M375.909602,252.460464 L368.391288,252.460464 L368.391288,251.690301 L375.909602,251.690301 L375.909602,252.460464 Z M380.106155,252.09008 L379.164072,252.09008 L379.164072,241.542969 L380.106155,241.542969 L380.106155,252.09008 Z M410.179413,252.09008 L409.23733,252.09008 L409.23733,241.542969 L410.179413,241.542969 L410.179413,252.09008 Z M421.019489,252.460464 L413.501174,252.460464 L413.501174,251.690301 L421.019489,251.690301 L421.019489,252.460464 Z M425.216042,252.09008 L424.273958,252.09008 L424.273958,241.542969 L425.216042,241.542969 L425.216042,252.09008 Z M449.526686,249.99712 L448.621307,249.99712 L444.877443,241.384233 L445.788939,241.384233 L449.526686,249.99712 Z M458.611061,252.460464 L451.092746,252.460464 L451.092746,251.690301 L458.611061,251.690301 L458.611061,252.460464 Z M466.129375,252.460464 L458.611061,252.460464 L458.611061,251.690301 L466.129375,251.690301 L466.129375,252.460464 Z M473.647689,252.460464 L466.129375,252.460464 L466.129375,251.690301 L473.647689,251.690301 L473.647689,252.460464 Z M479.612178,241.384233 L475.862197,249.99712 L474.962936,249.99712 L478.694564,241.384233 L479.612178,241.384233 Z M487.130492,241.384233 L483.380511,249.99712 L482.48125,249.99712 L486.212879,241.384233 L487.130492,241.384233 Z M500.399186,252.09008 L499.457102,252.09008 L499.457102,241.542969 L500.399186,241.542969 L500.399186,252.09008 Z M509.673201,249.99712 L508.767822,249.99712 L505.023958,241.384233 L505.935455,241.384233 L509.673201,249.99712 Z M518.757576,252.460464 L511.239261,252.460464 L511.239261,251.690301 L518.757576,251.690301 L518.757576,252.460464 Z M526.27589,252.460464 L518.757576,252.460464 L518.757576,251.690301 L526.27589,251.690301 L526.27589,252.460464 Z M533.794205,252.460464 L526.27589,252.460464 L526.27589,251.690301 L533.794205,251.690301 L533.794205,252.460464 Z M537.990758,252.09008 L537.048674,252.09008 L537.048674,241.542969 L537.990758,241.542969 L537.990758,252.09008 Z M547.264773,249.99712 L546.359394,249.99712 L542.61553,241.384233 L543.527027,241.384233 L547.264773,249.99712 Z M556.349148,252.460464 L548.830833,252.460464 L548.830833,251.690301 L556.349148,251.690301 L556.349148,252.460464 Z M563.867462,252.460464 L556.349148,252.460464 L556.349148,251.690301 L563.867462,251.690301 L563.867462,252.460464 Z M571.385777,252.460464 L563.867462,252.460464 L563.867462,251.690301 L571.385777,251.690301 L571.385777,252.460464 Z M575.58233,252.09008 L574.640246,252.09008 L574.640246,241.542969 L575.58233,241.542969 L575.58233,252.09008 Z M584.856345,249.99712 L583.950966,249.99712 L580.207102,241.384233 L581.118598,241.384233 L584.856345,249.99712 Z M593.94072,252.460464 L586.422405,252.460464 L586.422405,251.690301 L593.94072,251.690301 L593.94072,252.460464 Z M601.459034,252.460464 L593.94072,252.460464 L593.94072,251.690301 L601.459034,251.690301 L601.459034,252.460464 Z M605.655587,252.09008 L604.713504,252.09008 L604.713504,241.542969 L605.655587,241.542969 L605.655587,252.09008 Z M477.844242,265.635535 L476.902159,265.635535 L476.902159,255.088423 L477.844242,255.088423 L477.844242,265.635535 Z M488.684318,266.005919 L481.166004,266.005919 L481.166004,265.235756 L488.684318,265.235756 L488.684318,266.005919 Z M496.202633,266.005919 L488.684318,266.005919 L488.684318,265.235756 L496.202633,265.235756 L496.202633,266.005919 Z M502.167121,254.929687 L498.41714,263.542574 L497.517879,263.542574 L501.249508,254.929687 L502.167121,254.929687 Z" />
      </g>
    </svg>
  );
}