import './App.scss';
import {useRef, useState} from 'react';
import {ChakraProvider, Spinner, Stack} from '@chakra-ui/react'
import SearchSites from "./components/SearchSites";


function App() {
    const [sites, setSites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [siteSearch, setSiteSearch] = useState("");

    return (
        <ChakraProvider>
            <HeaderImage/>
            <SearchBar onResponse={(data) => setSites(data.sites)}
                       setIsLoading={setIsLoading}/>
            <Information/>
            {isLoading
                ? <Spinner/>
                : sites && Array.isArray(sites) && sites.length > 1
                && <Stack>
                    <SearchSites setSiteSearch={setSiteSearch}/>
                    <WebsiteCards sites={sites} filter={siteSearch}/>
                </Stack>
            }
        </ChakraProvider>
    );
}

function HeaderImage() {
    return (
        <>
            <div className='headerImage'>Sherlock</div>
        </>
    );
}

function SearchBar({onResponse, setIsLoading}) {
    const [searchString, setSearchString] = useState("");
    const textInput = useRef();

    const onType = e => {
        setSearchString(textInput.current.value);
    }

    const handleClick = async (e) => {
        setIsLoading(true);
        const response = await fetch("https://run-sherlock-4rsz5rrjca-uw.a.run.app",
            {
                method: "POST",
                body: JSON.stringify({"username": searchString, "extra": false}),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        setIsLoading(false);

        onResponse(await response.json());
    }

    return (
        <div>
            <input ref={textInput} onChange={onType} placeholder='Enter usernames seperated by spaces'></input>
            <button onClick={handleClick}>search icon lmao</button>
            <br/>searched string: {searchString}
        </div>
    );
}

function WebsiteCards({sites, siteSearch}) {
    return (
        <div className='allCards'>
            {sites.filter(
                s => s.site.includes(siteSearch)
            ).map(
                s =>
                    <div className='siteCard'>
                        Site Name: {s.site} <br/>
                        Site address: {s.urlUser} <br/>
                    </div>
            )}
        </div>
    )
}

function Information() {
    return (
        <div>
            Hunt down social media accounts by username across social networks. <br/>
            Enter one or more usernames to check with social networks. <br/>
            Check similar usernames using &#123;%&#125; (replaces to '_', '-', '.')
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