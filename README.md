<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiExterneDto } from '../dtos/api-externe.dto';

@Injectable()
export class ExternalArticleFetcherUtils {
private readonly languages = ['en' /* 'fr' */ /* , 'es', 'de', 'ar' */]; // Ajoute ici toutes les langues disponibles
private readonly countries = [
'us',
'fr',
'ci',
'in' /* , 'gb', 'de', 'in' */,
]; // Ajoute ici tous les pays disponibles
private readonly categories = [
'business',
'entertainment',
'health',
'science',
'sports',
'technology',
'science ',
]; // Catégories

// Fonction utilitaire pour mettre en pause entre les requêtes
private sleep(ms: number) {
return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fonction pour récupérer des articles depuis une API spécifique avec gestion des contraintes
async fetchAllArticlesFromOneApi(
apidata: ApiExterneDto,
maxPages = 5,
pageSize = 50,
): Promise<any[]> {
const allArticles: any[] = [];
for (const lang of this.languages) {
for (const country of this.countries) {
for (const category of this.categories) {
let page = 1;
let hasMore = true;
while (hasMore && page <= maxPages) {
try {
// Construction de l'URL avec les paramètres (langue, pays, catégorie)&category=${category}
/_ const categoryValue =
apidata.params?.find((p) => p.title === 'category')?.value ||
'generale'; _/

              const url = `${apidata.url}/everything?q=${category}&lang=${lang}&country=${country}&apikey=${apidata.apiKey}&page=${page}&pageSize=${pageSize}`;
              console.log(url);

              // Effectuer la requête GET avec l'URL et les en-têtes
              const response = await axios.get(url);
              const articles = response.data.articles || [];
              allArticles.push(...articles);

              if (articles.length < pageSize) {
                hasMore = false;
              } else {
                page++;
                await this.sleep(500); // petite pause pour éviter le rate limit
              }
            } catch (error) {
              hasMore = false;
              if (error.response && error.response.status === 429) {
                console.warn('Limite de requêtes atteinte, pause prolongée...');
                await this.sleep(60000); // Pause d'une minute si la limite est atteinte
              } else {
                console.error(
                  `Erreur lors de la récupération pour lang=${lang}, country=${country}, category=${category}: ${error.message}`,
                );
              }
            }
          }
        }
      }
    }

    // Retourner tous les articles récupérés
    return allArticles;

}
}

const datas = [
{
source: { id: 'business-insider', name: 'Business Insider' },
author: 'Gabby Landsverk',
title: 'Meet Mark Walter, the man poised to buy the LA Lakers in a record-setting $10 billion deal',
description: 'Billionaire CEO Mark Walter has struck a deal to buy the LA Lakers for a reported $10 billion, the largest sale of a pro sports franchise worldwide.',
url: 'https://www.businessinsider.com/who-is-mark-walter-buying-la-lakers-2025-6',
urlToImage: 'https://i.insider.com/6854225ff748d8c055f404a6?width=1200&format=jpeg',
publishedAt: '2025-06-19T16:09:56Z',
content: 'Jon Putman/Anadolu via Getty Images\r\n' +
'<ul><li>CEO and major sports investor Mark Walter is slated to buy the Los Angeles Lakers for $10 billion.</li><li>The sale breaks the record for most expensive w… [+2545 chars]'
},
{
source: { id: 'business-insider', name: 'Business Insider' },
author: 'Julia Hood',
title: 'PepsiCo marketing leader Jane Wakely talks sports partnerships as a growth opportunity',
description: "Global chief consumer and marketing officer Jane Wakely discusses PepsiCo's recent partnerships and its plans to attract more young people to sports.",
url: 'https://www.businessinsider.com/global-consumer-marketing-officer-jane-wakely-pepsico-sports-cannes-lions-2025-6',
urlToImage: 'https://i.insider.com/6854751885e81483682c6d8f?width=1200&format=jpeg',
publishedAt: '2025-06-20T17:06:28Z',
content: 'Read the original article on Business Insider'
},
{
source: { id: null, name: 'NPR' },
author: 'Becky Sullivan',
title: "With $2.7 billion settlement approved, college sports' big money era is officially here",
description: "The settlement in House v. NCAA brings an end to the NCAA's long-standing tradition of amateurism. Starting this fall, schools will be able to pay players directly up to a salary cap of $20.5 million.",
url: 'https://www.npr.org/2025/06/06/nx-s1-5426123/ncaa-settlement-deal-athlete-compensation-judge',
urlToImage: 'https://npr.brightspotcdn.com/dims3/default/strip/false/crop/3969x2233+0+19/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F5e%2F9f%2Fb3e3538d45088b6bbbd1e44f3374%2Fncaa.jpg',
publishedAt: '2025-06-07T02:47:33Z',
content: 'A federal judge has approved the multibillion-dollar class-action legal settlement known as House v. NCAA, paving the way for a new era for college sports.\r\n' +
'Starting this fall, schools and universiti… [+4098 chars]'
},
{
source: { id: null, name: 'Kotaku' },
author: 'Patrick Smith',
title: '5 Reasons Why 2K Needs To Bring Back College Hoops',
description: 'Releasing July 10, 2025, EA Sports College Football 26 is only a few weeks away and is primed to build on last year’s success. When college sports returned to video games last summer, no one could have predicted just how much of a sensation EA’s dormant franc…',
url: 'https://kotaku.com/2k-college-hoops-ea-college-football-26-1851784967',
urlToImage: 'https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/c51d316869ca96c07a2ff4459be2c104.png',
publishedAt: '2025-06-24T13:15:00Z',
content: 'Its no secret that 2K needs to overhaul both the MyCareer and MyPlayer modes that NBA 2K offers, and a College Hoops game is the best way to do that. 2K has dominated basketball video games for years… [+2553 chars]'
},
{
source: { id: 'the-verge', name: 'The Verge' },
author: 'Jess Weatherbed',
title: 'Netflix will air traditional TV channels inside its app in France',
description: 'Starting in summer 2026, Netflix subscribers in France will be able to watch commercially broadcast TV content “without ever having to leave the
service.” The streaming giant has announced a distribution deal with French media company TF1 Group to make TF1’s …',
url: 'https://www.theverge.com/news/689022/netflix-tf1-group-carriage-deal-tv-channels',
urlToImage: 'https://platform.theverge.com/wp-content/uploads/sites/2/2025/02/STK072_VRG_Illo_N_Barclay_1_netflix.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200',
publishedAt: '2025-06-18T11:51:30Z',
content: 'The first of its kind deal will enable French Netflix customers to watch TF1 content as part of their subscription.\r\n' +
'Starting in summer 2026, Netflix subscribers in France will be able to watch comme… [+2224 chars]'
},
{
source: { id: 'espn', name: 'ESPN' },
author: 'Marco Wutz',
title: 'Harry Kane leads Shapeshifters return in EA Sports FC 25',
description: 'The popular Football Ultimate Team program returns with players in new and interesting positions.',
url: 'https://www.espn.com/gaming/story/_/id/45530541/ea-sports-fc-25-shapeshifters',
urlToImage: 'https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0617%2Fr1507735_1279x719_16%2D9.jpg',
publishedAt: '2025-06-17T15:21:38Z',
content: 'Jun 17, 2025, 10:30 AM ET\r\n' +
"Having to follow up on EA Sports FC 25's Team of the Season is a tough feat, but EA has chosen an old fan favorite for the task -- the Shapeshifters program. Renowned for p… [+1117 chars]"
},
{
source: { id: 'business-insider', name: 'Business Insider' },
author: "Lara O'Reilly,Julia Hood,Joi-Marie McKenzie",
title: "AI and sports were hot topics at the ad industry's Cannes Lions bash. Just don't mention 'brand safety.'",
description: 'The huge attendance at Cannes Lions and jubilant mood among attendees suggested AI may not be decimating the ad industry.',
url: 'https://www.businessinsider.com/cannes-lions-2025-recap-ai-sports-brand-safety-2025-6',
urlToImage: 'https://i.insider.com/68556f3f85e81483682c738e?width=1200&format=jpeg',
publishedAt: '2025-06-20T15:25:30Z',
content: 'Cannes Lions\r\n' +
"<ul><li>AI and sports were hot topics du jour at the ad industry's annual confab, Cannes Lions, this week.</li><li>The bustling streets suggested AI isnt decimating the ad industry yet.… [+7561 chars]"
},
{
source: { id: null, name: 'Android Central' },
author: 'techkritiko@gmail.com (Jay Bonggolto) , Jay Bonggolto',
title: 'Google might give At a Glance a Gemini makeover with extra smarts',
description: 'Google might be giving At a Glance a big upgrade, possibly rebranding it with the Gemini name and packing in a ton more features.',
url: 'https://www.androidcentral.com/apps-software/google-might-give-at-a-glance-a-gemini-makeover-with-extra-smarts',
urlToImage: 'https://cdn.mos.cms.futurecdn.net/ygrs523qfAZEvXe7ET3MDQ.jpg',
publishedAt: '2025-06-19T23:00:19Z',
content: 'What you need to know\r\n' +
'<ul><li>Google might be building its own version of Samsung’s Now Bar to surface real-time info right on your lock screen.</li><li>According to a report, the upgraded version c… [+2760 chars]'
},
{
source: { id: null, name: 'Kotaku' },
author: 'Zack Zwiezen',
title: 'EA Reviving College Basketball Series After College Football Broke Records',
description: 'Fans of digital college basketball, get excited. Electronic Arts has officially announced that it is bringing back its college basketball franchise, though it might be a while before you get to play it. Read more...',
url: 'https://kotaku.com/ea-college-basketball-march-madness-return-2028-ps5-1851785339',
urlToImage: 'https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/b094e995a262612b55e24e041bbeec16.jpg',
publishedAt: '2025-06-30T17:45:00Z',
content: 'Fans of digital college basketball, get excited. Electronic Arts has officially announced that it is bringing back its college basketball franchise,
though it might be a while before you get to play … [+1763 chars]'
},
{
source: { id: null, name: 'CNET' },
author: 'Kevin Lynch',
title: 'How to Watch England vs. India From Anywhere for Free: Livestream 1st Test Cricket',
description: 'The cricketing giants get their five-match summer series underway at Headingley.',
url: 'https://www.cnet.com/tech/services-and-software/how-to-watch-england-vs-india-from-anywhere-for-free-livestream-1st-test-cricket/',
urlToImage: 'https://www.cnet.com/a/img/resize/a283400187d37fd75073de95181d89eed8ddee6a/hub/2025/06/20/71364c20-6f4b-4a80-bb22-f15721ce3313/gettyimages-2221133649.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-20T15:27:32Z',
content: "Ben Stokes' England get their five-match contest against a new-look India team underway with an intriguing first Test at Headingley today. \r\n" +
"Below, we'll outline the best live TV streaming services t… [+5598 chars]"
},
{
source: { id: 'espn', name: 'ESPN' },
author: 'Marco Wutz',
title: 'Madden NFL 26 reveals first look at gameplay with new trailer',
description: "EA Sports has provided a detailed look at this year's improvements.",
url: 'https://www.espn.com/gaming/story/_/id/45582841/madden-nfl-26-gameplay-deep-dive',
urlToImage: 'https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0625%2Fr1511112_1279x719_16%2D9.jpg',
publishedAt: '2025-06-25T16:51:12Z',
content: 'Jun 25, 2025, 12:41 PM ET\r\n' +
'EA Sports has promised a long list of improvements and feature additions for Madden NFL 26.\r\n' +
"Editor's Picks\r\n" +
'A gameplay deep dive delivered the details on these plans, whic… [+2972 chars]'
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Mini Crossword Answers for Thursday, June 5",
description: "Here's today's NYT Mini Crossword answer. These answers will help you solve New York Times' popular crossword game, Mini Crossword, every day!",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-mini-crossword-answers-for-thursday-june-5/',
urlToImage: 'https://www.cnet.com/a/img/resize/5a44b4083f306f5c685f3e792be0473edc33c848/hub/2024/07/19/a459b55d-d069-4efa-bab4-4a28dfe8cc45/nyt-mini-crossword.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-05T02:18:01Z',
content: "Looking for the most recent Mini Crossword answer? Click here for today's Mini Crossword hints, as well as our daily answers and hints for The New York Times Wordle, Strands, Connections and Connecti… [+1648 chars]"
},
{
source: { id: null, name: 'BBC News' },
author: null,
title: "Martina Navratilova: 'I wouldn't have left home for Trump's America'",
description: "The tennis icon tells the BBC she doesn't think a Trump-led government would let her in.",
url: 'https://www.bbc.com/news/articles/ce9xzgg91lpo',
urlToImage: 'https://ichef.bbci.co.uk/news/1024/branded_news/3798/live/5c7746b0-4b6b-11f0-8c47-237c2e4015f5.jpg',
publishedAt: '2025-06-17T23:04:03Z',
content: 'Martina Navratilova, left, tells Amol Rajan, right, that she feels the US has become "totalitarian"\r\n' +
'Fifty years ago, Martina Navratilova left everything she knew in communist Czechoslovakia to start… [+5587 chars]'
},
{
source: { id: null, name: 'BBC News' },
author: 'Dan Roan',
title: 'World Boxing sorry for naming Khelif in rule change',
description: "World Boxing apologises for naming Olympic champion Imane Khelif in the governing body's announcement of mandatory sex testing.",
url: 'https://www.bbc.com/sport/boxing/articles/c5yqwpg9dn3o',
urlToImage: 'https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/167f/live/73d72960-4099-11f0-a90d-6b992e1c44a7.jpg',
publishedAt: '2025-06-03T16:54:37Z',
content: 'Khelif had been set to make a competitive comeback in Eindhoven from 5-10 June.\r\n' +
'But on Friday, World Boxing said mandatory sex testing would be introduced next month "to ensure the safety of all par… [+2658 chars]'
},
{
source: { id: 'business-insider', name: 'Business Insider' },
author: 'Chris Johnston',
title: 'Warner Bros. Discovery unveils plan to split into 2 separate companies',
description: 'Warner Bros. Discovery will split into a Streaming & Studios business with HBO and DC Studios, while Global Networks will include CNN and Discovery.',
url: 'https://www.businessinsider.com/warner-bros-discovery-split-two-companies-streaming-studios-global-networks-2025-6',
urlToImage: 'https://i.insider.com/62a76f77a464ed0019584df4?width=1200&format=jpeg',
publishedAt: '2025-06-09T11:24:49Z',
content: 'David Zaslav will become CEO of the new streaming and studios company.Kevin Mazur/Getty Images\r\n' +
'Warner Bros. Discovery will split into two separate companies next year, it announced on Monday.The Str… [+710 chars]'
},
{
source: { id: 'wired', name: 'Wired' },
author: 'Louryn Strampe',
title: '10 Best Electrolyte Powders (2025): Tasty and Effective',
description: 'Get those lost minerals back with the help of our top picks.',
url: 'https://www.wired.com/gallery/best-electrolyte-powders/',
urlToImage: 'https://media.wired.com/photos/6859cd35076cba5cdfcdd66d/191:100/w_2580,c_limit/HYDRATION%20PACKS.png',
publishedAt: '2025-06-24T12:01:00Z',
content: "TL;DR Don't choose something with ultra-high amounts of sodium, carbohydrates, or sugar unless you need to based on your exercise levels or a sweat test.\r\n" +
'Amy Brownstein, a registered dietitian nutri… [+3608 chars]'
},
{
source: { id: 'business-insider', name: 'Business Insider' },
author: 'Jordan Pandy,Mykenna Maniece',
title: "Not all pro athletes get rich. We spoke with 4 who shared how they're securing their financial futures.",
description: "Many professional athletes earn income over a short period of time. Here's how four of them are planning for their financial futures.",
url: 'https://www.businessinsider.com/pro-athletes-share-personal-finance-investing-retirement-advice-2025-6',
urlToImage: 'https://i.insider.com/67e6f9a6b8b41a9673fc0e78?width=1200&format=jpeg',
publishedAt: '2025-06-19T11:10:01Z',
content: 'Artistic swimmer Anita Alvarez has won Olympic medals, but also has to work other jobs to afford training.Adam Pretty/Getty Images\r\n' +
'Most days, Anita Alvarez starts training at 6 a.m. She performs twi… [+9322 chars]'
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Mini Crossword Answers for Wednesday, June 18",
description: "Here's today's NYT Mini Crossword answer. These answers will help you solve New York Times' popular crossword game, Mini Crossword, every day!",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-mini-crossword-answers-for-wednesday-june-18/',
urlToImage: 'https://www.cnet.com/a/img/resize/5a44b4083f306f5c685f3e792be0473edc33c848/hub/2024/07/19/a459b55d-d069-4efa-bab4-4a28dfe8cc45/nyt-mini-crossword.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-18T04:18:00Z',
content: "Looking for the most recent Mini Crossword answer? Click here for today's Mini Crossword hints, as well as our daily answers and hints for The New York Times Wordle, Strands, Connections and Connecti… [+1163 chars]"
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Mini Crossword Answers for Wednesday, July 2",
description: "Here's today's NYT Mini Crossword answer. These answers will help you solve New York Times' popular crossword game, Mini Crossword, every day!",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-mini-crossword-answers-for-wednesday-july-2/',
urlToImage: 'https://www.cnet.com/a/img/resize/4a7dc34963db8f9a51abae1ab77ec99b498be36f/hub/2024/07/25/50d61b9b-1c76-4678-9a92-f6eca531f4a8/nyt-mini-crossword-234876.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-07-02T03:37:00Z',
content: "Looking for the most recent Mini Crossword answer? Click here for today's Mini Crossword hints, as well as our daily answers and hints for The New York Times Wordle, Strands, Connections and Connecti… [+1236 chars]"
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Mini Crossword Answers for Thursday, July 3",
description: "Here's today's NYT Mini Crossword answer. These answers will help you solve New York Times' popular crossword game, Mini Crossword, every day!",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-mini-crossword-answers-for-thursday-july-3/',
urlToImage: 'https://www.cnet.com/a/img/resize/4a7dc34963db8f9a51abae1ab77ec99b498be36f/hub/2024/07/25/50d61b9b-1c76-4678-9a92-f6eca531f4a8/nyt-mini-crossword-234876.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-07-03T04:33:29Z',
content: "Looking for the most recent Mini Crossword answer? Click here for today's Mini Crossword hints, as well as our daily answers and hints for The New York Times Wordle, Strands, Connections and Connecti… [+1278 chars]"
},
{
source: { id: 'the-verge', name: 'The Verge' },
author: 'Sheena Vasani',
title: 'LG’s C4 OLED TV has dropped to a new low price',
description: 'It’s official: Amazon’s Prime Day event is just three weeks away, and it’s possible we’ll see a number of great TV deals during the four-day event. But if you’d rather not wait and see, LG’s C4 OLED TV has hit a new low price, starting at $699.99 ($800 off) f…',
url: 'https://www.theverge.com/tech/688378/lg-c4-oled-tv-motorola-razr-ultra-deal-sale',
urlToImage: 'https://platform.theverge.com/wp-content/uploads/sites/2/2025/05/LG-C4-OLED-TV-Deal-Image.png?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200',
publishedAt: '2025-06-17T17:10:00Z',
content: 'Plus, we found deals on Motorolas Razr Ultra flip phone and the Ring Battery Doorbell.\r\n' +
'Plus, we found deals on Motorolas Razr Ultra flip phone and the Ring Battery Doorbell.\r\n' +
'Its official: Amazons P… [+2893 chars]'
},
{
source: { id: null, name: 'BBC News' },
author: null,
title: "'Commercialising concussion': The Australians taking a backyard collision game global",
description: 'As hype over the game grows, so do concerns about the potential for brain injuries.',
url: 'https://www.bbc.com/news/articles/cedg05z18z7o',
urlToImage: 'https://ichef.bbci.co.uk/news/1024/branded_news/d892/live/0de0f940-5342-11f0-bf89-7dc3da709f40.png',
publishedAt: '2025-06-27T22:31:19Z',
content: 'Lana Lam and Tiffanie Turnbull\r\n' +
'Watch: People compete in Auckland RUNIT championship league event\r\n' +
'"Defender ready?" calls the host.\r\n' +
'A thumbs up and moments later, two burly men - with no protective… [+9525 chars]'
},
{
source: { id: null, name: 'Blog.google' },
author: 'Zahra ThompsonContributorThe Keyword',
title: '6 ways to get a more customized Search experience',
description: 'See more content from your favorite sites, pick up where you left off and more with these tips for customizing Google Search.',
url: 'https://blog.google/products/search/search-customization-tips/',
urlToImage: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Customized_Search_ss.width-1300.png',
publishedAt: '2025-06-26T17:00:00Z',
content: "When you're searching, staying up to date with your personal interests and favorite sites is top of mind. While our systems aim to automatically bring you the most helpful results, what's relevant fo… [+1366 chars]"
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'Gizmodo Deals',
title: 'How to Watch the F1 Canadian GP 2025 on a Free Channel',
description: 'Don’t miss a second of the 2025 Canadian Grand Prix — here’s a free channel that lets you stream the race and qualifying from anywhere in the world.',
url: 'https://gizmodo.com/how-to-watch-the-f1-canadian-gp-2025-on-a-free-channel-2000614253',
urlToImage: 'https://gizmodo.com/app/uploads/2025/06/F1-Canadian-GP-Free-Channel-Live-Stream-1200x675.jpg',
publishedAt: '2025-06-14T18:00:48Z',
content: 'The Canadian Grand Prix is just around the corner, and if you’re looking for ways to stream it for free online, consider yourself lucky. After Piastri’s spectacular win, we’re eagerly awaiting anothe… [+3722 chars]'
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'Joe Tilleli',
title: 'Google Pixel Tablet Hits Its Lowest Price as Amazon Runs Low on Stock Before Father’s Day',
description: 'Save up to 28% on the Google Pixel Tablet with an 11-inch screen over at Amazon.',
url: 'https://gizmodo.com/google-pixel-tablet-hits-its-lowest-price-as-amazon-runs-low-on-stock-before-fathers-day-2000610242',
urlToImage: 'https://gizmodo.com/app/uploads/2025/06/GooglePixelTablet11inch.jpg',
publishedAt: '2025-06-03T13:10:06Z',
content: 'It might be time to upgrade that old tablet of yours. The Google Pixel Tablet is waiting for you to pull it off the shelves. Well, not literally. Its waiting for you to add it to cart. Right now, thi… [+2149 chars]'
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'Gizmodo Deals',
title: 'Is Amazon Clearing Out GoPro Cameras? The Latest Hero 13 Black Hits a Record Low Price',
description: 'The GoPro HERO13 Black is one of the top action cameras available in 2025.',
url: 'https://gizmodo.com/is-amazon-clearing-out-gopro-cameras-the-latest-hero-13-black-hits-a-record-low-price-2000614222',
urlToImage: 'https://gizmodo.com/app/uploads/2024/11/gopro-hero-13-black.jpg',
publishedAt: '2025-06-11T11:10:00Z',
content: 'GoPro is the action camera king and the Hero 13 Black (released in September 2024) is its newest flagship modelthe most feature-loaded and most advanced camera in the lineup. From capturing extreme s… [+2221 chars]'
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'James Whitbrook',
title: 'Warner Bros. Discovery Is Splitting Into Two Companies (Again)',
description: "Stop me if you've heard this before: one of them sounds mostly like Warner Bros., the other mostly sounds like Discovery.",
url: 'https://gizmodo.com/warner-bros-discovery-split-david-zaslav-hbo-2000613110',
urlToImage: 'https://gizmodo.com/app/uploads/2025/06/David-Zaslav-HBO-Max-1200x675.jpg',
publishedAt: '2025-06-09T13:45:40Z',
content: 'Just three years after they first merged, Warner Bros. Discovery is separating off into two different companies in an attempt to carve away the lucrative studio and streaming sections of the company … [+2337 chars]'
},
{
source: { id: 'espn', name: 'ESPN' },
author: null,
title: 'WADA urges U.S. to shut down Enhanced Games',
description: 'The global watchdog of doping in sports said Wednesday it will urge public authorities to shut down the drug-fueled Enhanced Games planned in Las Vegas next year.',
url: 'https://www.espn.com/olympics/story/_/id/45491208/wada-urges-us-authorities-shut-enhanced-games',
urlToImage: 'https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0521%2Fr1496309_1296x729_16%2D9.jpg',
publishedAt: '2025-06-11T13:22:24Z',
content: 'Jun 11, 2025, 09:07 AM ET\r\n' +
'LAUSANNE, Switzerland -- The global watchdog of doping in sports said Wednesday it will urge public authorities to shut down the drug-fueled Enhanced Games
planned in Las V… [+2030 chars]'
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'Kyle Barr',
title: 'Welcome to the New Mac, Now With More ‘Windows’',
description: "Apple's macOS 26 is the latest software to descend into 'glassmorphism' at WWDC25.",
url: 'https://gizmodo.com/welcome-to-the-new-mac-now-with-more-windows-2000613185',
urlToImage: 'https://gizmodo.com/app/uploads/2025/06/WWDC25-macOS-26-First-Announcement-Hero-1200x675.jpg',
publishedAt: '2025-06-09T18:52:42Z',
content: 'If Microsofts Windows operating system popularized the multi-application interface, then Apple is trying to imagine what your floating tabs would look like if they were truly see-through glass panes.… [+3952 chars]'
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'Gizmodo Deals',
title: 'How to Watch the 2025 Austrian GP on a Free Channel',
description: "Looking to stream the F1 Austrian GP for free online? Here's a free channel that streams the Austria Grand Prix in Full HD. Follow along.",
url: 'https://gizmodo.com/how-to-watch-the-2025-austrian-gp-on-a-free-channel-2000618906',
urlToImage: 'https://gizmodo.com/app/uploads/2025/06/Watch-F1-Austrian-GP-on-a-Free-Channel-1200x675.jpg',
publishedAt: '2025-06-28T10:00:19Z',
content: 'After an exciting win for George Russell in Canada, fans are gearing up for another Grand Prix. You know the deal, its time to learn how to watch the F1 Austrian GP on a free channel.\r\n' +
'The Austrian G… [+4133 chars]'
},
{
source: { id: 'business-insider', name: 'Business Insider' },
author: 'insider@insider.com (Lillian Brown)',
title: 'Less than a week left to save over 50% on three months of ESPN Plus',
description: 'ESPN Plus is offering a rare deal that discounts its monthly plan by more than 50% in your first three months of service.',
url: 'https://www.businessinsider.com/guides/deals/espn-plus-deal-2025-6',
urlToImage: 'https://i.insider.com/6850370a85e81483682c2a44?width=1200&format=jpeg',
publishedAt: '2025-06-16T17:00:48Z',
content: "ESPN Plus is offering a rare deal on its monthly plan, and there's less than a week left to cash in on the sale. The sale knocks over 50% off the first three months of service for new and eligible re… [+6871 chars]"
},
{
source: { id: 'espn', name: 'ESPN' },
author: null,
title: 'Comedian Gillis chosen to host ESPYS on July 16',
description: 'Comedian Shane Gillis will celebrate the achievements, athletes and moments in sports from the past year as host of the ESPYS in July, it was announced.',
url: 'https://www.espn.com/espn/story/_/id/45575010/comedian-shane-gillis-chosen-host-espys-july-16',
urlToImage: 'https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0624%2Fr1510681_1296x729_16%2D9.jpg',
publishedAt: '2025-06-24T15:05:47Z',
content: 'Jun 24, 2025, 10:52 AM ET\r\n' +
'Comedian, actor and writer Shane Gillis will take the stage to celebrate the achievements, athletes and moments in sports from the past year as host of The
ESPYS, it was an… [+1175 chars]'
},
{
source: { id: null, name: 'Kotaku' },
author: 'Billy Givens',
title: 'Mario Kart World: Four Essential Tips To Improve Your Racing Skills',
description: 'Mario Kart World is Nintendo’s most recent entry in the long-running racing franchise, and this one sports tons of characters, power-ups, and tracks, as well as an open world to explore. There’s so much packed into the experience that it should keep fans busy…',
url: 'https://kotaku.com/mario-kart-world-best-tips-boxes-coins-grinding-drift-1851783857',
urlToImage: 'https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/dd623962a94aab467d4d0f381102ae9c.jpg',
publishedAt: '2025-06-06T17:58:35Z',
content: 'Mario Kart World is Nintendos most recent entry in the long-running racing franchise, and this one sports tons of characters, power-ups, and tracks,
as well as an open world to explore. Theres so muc… [+3632 chars]'
},
{
source: { id: null, name: 'Kotaku' },
author: 'Kotaku Bot',
title: 'Our Favorite Cosplay From Dream Con 2025',
description: 'Entertainment convention Dream Con was founded by YouTube collective RDCWorld back in 2017. Originally in Waco, Texas, before it outgrew the available venues, the annual event now takes place in Houston, where it “unites enthusiasts globally to celebrate gami…',
url: 'https://kotaku.com/dream-con-2025-cosplay-x-men-megan-thee-stallion-1851785306',
urlToImage: 'https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/e8f6b5ee68eceefc558de7de2f175854.jpg',
publishedAt: '2025-06-30T13:40:00Z',
content: 'Entertainment convention Dream Con was founded by YouTube collective RDCWorld back in 2017. Originally in Waco, Texas, before it outgrew the available venues, the annual event now takes place in Hous… [+827 chars]'
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Mini Crossword Answers for Monday, June 9",
description: "Here's today's NYT Mini Crossword answer. These answers will help you solve New York Times' popular crossword game, Mini Crossword, every day!",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-mini-crossword-answers-for-monday-june-9/',
urlToImage: 'https://www.cnet.com/a/img/resize/5a44b4083f306f5c685f3e792be0473edc33c848/hub/2024/07/19/a459b55d-d069-4efa-bab4-4a28dfe8cc45/nyt-mini-crossword.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-09T03:33:16Z',
content: "Looking for the most recent Mini Crossword answer? Click here for today's Mini Crossword hints, as well as our daily answers and hints for The New York Times Wordle, Strands, Connections and Connecti… [+1603 chars]"
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Mini Crossword Answers for Friday, June 13",
description: "Here's today's NYT Mini Crossword answer. These answers will help you solve New York Times' popular crossword game, Mini Crossword, every day!",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-mini-crossword-answers-for-friday-june-13/',
urlToImage: 'https://www.cnet.com/a/img/resize/5a44b4083f306f5c685f3e792be0473edc33c848/hub/2024/07/19/a459b55d-d069-4efa-bab4-4a28dfe8cc45/nyt-mini-crossword.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-13T03:35:00Z',
content: "Looking for the most recent Mini Crossword answer? Click here for today's Mini Crossword hints, as well as our daily answers and hints for The New York Times Wordle, Strands, Connections and Connecti… [+1715 chars]"
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Mini Crossword Answers for Saturday, June 28",
description: "Here's today's NYT Mini Crossword answer. These answers will help you solve New York Times' popular crossword game, Mini Crossword, every day!",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-mini-crossword-answers-for-saturday-june-28/',
urlToImage: 'https://www.cnet.com/a/img/resize/4a7dc34963db8f9a51abae1ab77ec99b498be36f/hub/2024/07/25/50d61b9b-1c76-4678-9a92-f6eca531f4a8/nyt-mini-crossword-234876.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-28T06:34:49Z',
content: "Looking for the most recent Mini Crossword answer? Click here for today's Mini Crossword hints, as well as our daily answers and hints for The New York Times Wordle, Strands, Connections and Connecti… [+1516 chars]"
},
{
source: { id: null, name: 'Yahoo Entertainment' },
author: null,
title: 'Loss of over-the-air TV leaves some Chicago sports fans frustrated with new CHSN-Comcast deal',
description: null,
url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_e6f84674-5b29-481b-8e3d-325f8ea3613b',
urlToImage: null,
publishedAt: '2025-06-10T01:22:00Z',
content: "If you click 'Accept all', we and our partners, including 240 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+714 chars]"
},
{
source: { id: null, name: 'Yahoo Entertainment' },
author: 'Reuters',
title: 'Basketball-Buss family to sell Lakers, report says',
description: 'Los Angeles (Reuters) -The Buss family is entering an agreement to sell a majority stake in the Los Angeles Lakers, ESPN reported on Wednesday, marking the...',
url: 'https://www.yahoo.com/news/basketball-buss-family-sell-lakers-214124876.html',
urlToImage: 'https://media.zenfs.com/en/reuters.com/bf612dc2a8483c7061f72b91d97c04d1',
publishedAt: '2025-06-18T21:41:24Z',
content: "Los Angeles (Reuters) -The Buss family is entering an agreement to sell a majority stake in the Los Angeles Lakers, ESPN reported on Wednesday, marking the end of an era for one of the NBA's most inf… [+1024 chars]"
},
{
source: { id: null, name: 'MacRumors' },
author: 'Joe Rossignol',
title: 'Apple Highlights Two Smaller CarPlay Changes on iOS 18.4 and iOS 26',
description: "CarPlay is gaining a lot of new features with iOS 26, including a Liquid Glass design, Live Activities, widgets, the ability to use Tapbacks and
view pinned conversations in the Messages app, and more. But that's not all, as Apple has outlined another change …",
url: 'https://www.macrumors.com/2025/06/12/apple-highlights-two-smaller-carplay-changes/',
urlToImage: 'https://images.macrumors.com/t/V82p40h9TY1vX1H6vywVVe7BWYc=/1942x/article-new/2025/06/CarPlay-Compact-Phone-Calls.jpg',
publishedAt: '2025-06-12T14:16:59Z',
content: 'CarPlay is gaining a lot of new features with iOS 26, including a Liquid Glass design, Live Activities, widgets, the ability to use Tapbacks and view pinned conversations in the Messages app, and mor… [+1387 chars]'
},
{
source: { id: null, name: 'BBC News' },
author: 'Mike Henson',
title: "Data, downloads and detective work - chasing rugby's salary cheats",
description: "Each Premiership team is restricted on what they can spend on wages. How do those in charge check big-money owners aren't making secret payments
to get round the cap?",
url: 'https://www.bbc.com/sport/rugby-union/articles/c706pwz0k2do',
urlToImage: 'https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/1177/live/b8ef21b0-46c0-11f0-9471-e380f647874e.jpg',
publishedAt: '2025-06-11T13:35:09Z',
content: `"There is a saying 'never waste a crisis', and that judgement against Saracens was a big springboard to enhance the whole system," he says.\r\n` +
'He now has an ocean of data to dive into.\r\n' +
'Copies of playe… [+5436 chars]'
},
{
source: { id: null, name: 'BBC News' },
author: null,
title: "Who is Lauren Sanchez? Journalist, pilot and Jeff Bezos' fiancé",
description: 'The 55-year-old started her career as journalist and is also a pilot with a keen interest in aviation.',
url: 'https://www.bbc.com/news/articles/c2lejqkzp9vo',
urlToImage: 'https://ichef.bbci.co.uk/news/1024/branded_news/f453/live/59ce7e90-52a2-11f0-9641-1774b19dc1c9.jpg',
publishedAt: '2025-06-26T16:22:36Z',
content: 'Bezos and Sanchez have been in a relationship since 2019\r\n' +
"It's the wedding that everyone is talking about - US tech billionaire Jeff Bezos is set to marry TV presenter Lauren Sanchez, and the million… [+3740 chars]"
},
{
source: { id: null, name: 'The Atlantic' },
author: 'Hana Kiros',
title: 'America’s Newest Gamblers Are Playing a Dangerous Game',
description: 'Sports betting could spur a rise in gambling addiction that the U.S. isn’t equipped to address.',
url: 'https://www.theatlantic.com/health/archive/2025/06/sports-betting-gambling-addiction/683042/',
urlToImage: 'https://cdn.theatlantic.com/thumbor/oIRaBOEayVEkQ_oKXc9X-9v3lZk=/0x61:2876x1559/1200x625/media/img/mt/2025/06/2025_06_03_sports_gambling_1/original.jpg',
publishedAt: '2025-06-05T16:12:00Z',
content: 'Gambling has swallowed American sports culture whole. Until early 2018, sports betting was illegal under federal law; today, it’s legal in 39 states
and Washington, D.C. (and easy enough to access th… [+9291 chars]'
},
{
source: { id: null, name: 'BBC News' },
author: null,
title: 'HBO and CNN owner Warner Bros Discovery to split in two',
description: 'The media giant will separate its studio and streaming business away from its cable TV networks.',
url: 'https://www.bbc.com/news/articles/c80k45vm35go',
urlToImage: 'https://ichef.bbci.co.uk/news/1024/branded_news/1ff3/live/f74e1aa0-4595-11f0-9a12-b5362979f1a7.jpg',
publishedAt: '2025-06-10T02:14:23Z',
content: 'The owner of CNN and HBO Max, Warner Bros Discovery, says it will split into two companies by the middle of next year.\r\n' +
'The US media giant plans to separate its studio and streaming business away fro… [+2078 chars]'
},
{
source: { id: null, name: 'BBC News' },
author: 'Matt Warwick',
title: 'Ex-F1 driver Kubica wins iconic Le Mans 24 hours',
description: 'Former Formula 1 driver Robert Kubica take victory at the Le Mans 24 Hours with a privately entered Ferrari.',
url: 'https://www.bbc.com/sport/motorsport/articles/cwyny381lnjo',
urlToImage: 'https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/dee0/live/aa2e6650-49f8-11f0-bbaa-4bc03e0665b7.jpg',
publishedAt: '2025-06-15T15:12:16Z',
content: 'Former Formula 1 driver Robert Kubica took victory at the Le Mans 24 Hours with a privately entered Ferrari.\r\n' +
"The number 83 AF Corse Ferrari 499P, also driven by China's Yifei Ye and Britain's Phil H… [+1770 chars]"
},
{
source: { id: null, name: 'BBC News' },
author: 'Michael Emons',
title: "Jobe Bellingham following brother's path but wants 'own identity'",
description: 'Just as brother Jude did before him, Jobe Bellingham is set to move from the Championship to Bundesliga giants Borussia Dortmund.',
url: 'https://www.bbc.com/sport/football/articles/ckgnr9p2121o',
urlToImage: 'https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/88c9/live/7940c110-4498-11f0-835b-310c7b938e84.png',
publishedAt: '2025-06-08T19:00:45Z',
content: "Though Jobe is following in his brother's footsteps by joining Dortmund, he wears his first name on the back of his shirt as he aims to create his own headlines.\r\n" +
`"He doesn't want to live off the bac… [+2127 chars]`
},
{
source: { id: null, name: 'CNET' },
author: 'Kevin Lynch',
title: 'Norway vs. Italy: Livestream World Cup 2026 Qualifier Soccer From Anywhere',
description: "The Group I leaders host Luciano Spalletti's men in Oslo.",
url: 'https://www.cnet.com/tech/services-and-software/norway-vs-italy-livestream-world-cup-2026-qualifier-soccer-from-anywhere/',
urlToImage: 'https://www.cnet.com/a/img/resize/203e1e7e1da79f63b78b38cbed0cefe7837fa678/hub/2025/06/06/bf73f046-9e76-4bc5-9355-283fd8f72f0f/gettyimages-2205798878.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-06T18:30:00Z',
content: 'Norway will look to maintain its strong start to World Cup 2026 qualifying as it takes on an Italian team playing its first Group I match. \r\n' +
"Below, we'll outline the best live TV streaming services t… [+4775 chars]"
},
{
source: { id: 'business-insider', name: 'Business Insider' },
author: 'Lucia Moses',
title: 'Netflix is looking more like the cable model it used to say was doomed',
description: "Analysts size up Netflix's TF1 deal, which plays into its ad business and solidifies it as a one-stop shop for entertainment.",
url: 'https://www.businessinsider.com/netflix-first-linear-tv-deal-france-tf1-bigger-ambitions-2025-6',
urlToImage: 'https://i.insider.com/68532e4d85e81483682c677d?width=1200&format=jpeg',
publishedAt: '2025-06-18T21:25:47Z',
content: "Netflix will show a TV network's live and on-demand programming.Jakub Porzycki/NurPhoto via Getty Images\r\n" +
"<ul><li>Netflix is partnering with France's TF1 for live and on-demand streaming in a first-o… [+3126 chars]"
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'Matt Novak',
title: 'The Funniest Memes About Elon and Trump’s Messy Divorce',
description: 'What a glorious day on the internet.',
url: 'https://gizmodo.com/the-funniest-memes-about-elon-and-trumps-messy-divorce-2000611999',
urlToImage: 'https://gizmodo.com/app/uploads/2025/06/elon-trump-march-11-2025-1200x675.jpg',
publishedAt: '2025-06-06T12:35:59Z',
content: 'President Donald Trump and billionaire oligarch Elon Musk are fighting. Like, fighting fighting. And social media is enjoying the drama in the only way it knows how: By sharing memes.\r\n' +
'In case you we… [+2796 chars]'
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'Gizmodo Deals',
title: 'This LG 42-Inch C4 TV Drops to $699 (Was $1,499), Lowest Price Ever for an LG OLED TV',
description: 'This is officially the lowest price ever for an LG C4 Series OLED Smart TV.',
url: 'https://gizmodo.com/this-lg-42-inch-c4-tv-drops-to-699-was-1499-lowest-price-ever-for-an-lg-oled-tv-2000617346',
urlToImage: 'https://gizmodo.com/app/uploads/2024/10/tv-lg-oled.jpg',
publishedAt: '2025-06-18T12:48:10Z',
content: 'When it comes to bringing luxury into your living room, nothing quite matches the experience of an LG OLED smart TV. The LG OLED series is acclaimed
for its stunning picture quality and premium featu… [+2954 chars]'
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'Gizmodo Deals',
title: 'DJI Osmo Action 4 in 4K/120fps Costs Peanuts, Amazon Clears Stock at Record Low for Early Prime Day',
description: 'This is likely the best action camera you can get, especially at this price.',
url: 'https://gizmodo.com/dji-osmo-action-4-in-4k-120fps-costs-peanuts-amazon-clears-stock-at-record-low-for-early-prime-day-2000618829',
urlToImage: 'https://gizmodo.com/app/uploads/2024/11/DJI-Osmo-Action-4.jpg',
publishedAt: '2025-06-23T13:25:28Z',
content: 'Amazon has already begun selling pre-Prime Day discounts, and this year’s early sale is available to all, even non-Prime members. That’s correct, you can score top-of-the-line technology for major di… [+2419 chars]'
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'James Whitbrook',
title: 'Lego’s July Releases Are Swooping In',
description: 'New Lego sets? In July? Roger roger.',
url: 'https://gizmodo.com/new-lego-july-2025-star-wars-marvel-how-to-train-your-dragon-2000623009',
urlToImage: 'https://gizmodo.com/app/uploads/2025/07/lego-july-2025-release-star-wars-battle-droid-stap-1200x675.jpg',
publishedAt: '2025-07-01T21:15:47Z',
content: 'After a blockbuster June, Lego’s having more of a quiet month in July, perhaps in an attempt to get us outside in the sweltering heat rather than indoors with a fan blasting in our faces as we build … [+2610 chars]'
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Connections: Sports Edition Hints and Answers for June 22, #272",
description: "Here's today's Connections: Sports Edition answer and hints for groups. These clues will help you solve The New York Times' popular puzzle game,
Connections: Sports Edition, every day.",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-connections-sports-edition-hints-and-answers-for-june-22-272/',
urlToImage: 'https://www.cnet.com/a/img/resize/b6a176556f33d8a7a6d33d6575c828a27a02cb83/hub/2024/10/16/c34cfc41-01f2-4b1a-80a8-f6479c50c02e/connections-sports-edition-6859.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-22T02:36:56Z',
content: "Looking for the most recent regular Connections answers? Click here for today's Connections hints, as well as our daily answers and hints for The New York Times Mini Crossword, Wordle and Strands puz… [+2096 chars]"
},
{
source: { id: null, name: 'Gizmodo.com' },
author: 'Gizmodo Deals',
title: 'How to Watch Zverev vs Djokovic Live on a Free Channel',
description: "Here's a workaround to watch Zverev vs Djokovic live on a free channel. Enjoy Zverev vs Djokovic online for free with this easy trick.",
url: 'https://gizmodo.com/how-to-watch-zverev-vs-djokovic-live-on-a-free-channel-2000610948',
urlToImage: 'https://gizmodo.com/app/uploads/2025/06/Watch-Zverev-vs-Djokovic-Live-Stream-Free-Channel-1200x675.jpg',
publishedAt: '2025-06-04T14:30:34Z',
content: 'The French Open’s apex the Zverev vs Djokovic clash is on the way. If you’re looking to watch it live on a free channel, you’re one of millions of tennis fans. The tournament is typically broadcast o… [+3378 chars]'
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Connections: Sports Edition Hints and Answers for June 29, #279",
description: "Here's today's Connections: Sports Edition answer and hints for groups. These clues will help you solve The New York Times' popular puzzle game,
Connections: Sports Edition, every day.",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-connections-sports-edition-hints-and-answers-for-june-29-279/',
urlToImage: 'https://www.cnet.com/a/img/resize/b6a176556f33d8a7a6d33d6575c828a27a02cb83/hub/2024/10/16/c34cfc41-01f2-4b1a-80a8-f6479c50c02e/connections-sports-edition-6859.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-28T20:00:05Z',
content: "Looking for the most recent regular Connections answers? Click here for today's Connections hints, as well as our daily answers and hints for The New York Times Mini Crossword, Wordle and Strands puz… [+2036 chars]"
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's NYT Connections: Sports Edition Hints and Answers for June 25, #275",
description: "Here's today's Connections: Sports Edition answer and hints for groups. These clues will help you solve The New York Times' popular puzzle game,
Connections: Sports Edition, every day.",
url: 'https://www.cnet.com/tech/gaming/todays-nyt-connections-sports-edition-hints-and-answers-for-june-25-275/',
urlToImage: 'https://www.cnet.com/a/img/resize/b6a176556f33d8a7a6d33d6575c828a27a02cb83/hub/2024/10/16/c34cfc41-01f2-4b1a-80a8-f6479c50c02e/connections-sports-edition-6859.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-24T20:00:06Z',
content: "Looking for the most recent regular Connections answers? Click here for today's Connections hints, as well as our daily answers and hints for The New York Times Mini Crossword, Wordle and Strands puz… [+2137 chars]"
},
{
source: { id: null, name: 'AppleInsider' },
author: 'news@appleinsider.com (Malcolm Owen)',
title: 'Before Wimbledon, Tennis finally gets some love in Apple Sports',
description: 'Apple has released version 3.0 of the Sports app for iOS, with the new version introducing tennis for the first time, just in time for Wimbledon.Tennis is now represented in the Sports appThe Sports app covers quite a few different sports types, including soc…',
url: 'https://appleinsider.com/articles/25/06/25/before-wimbledon-tennis-finally-gets-some-love-in-apple-sports',
urlToImage: 'https://photos5.appleinsider.com/gallery/64138-133543-tennissports-xl.jpg',
publishedAt: '2025-06-25T14:47:02Z',
content: 'Apple has released version 3.0 of the Sports app for iOS, with the new version introducing tennis for the first time, just in time for Wimbledon.\r\n' +
'The Sports app covers quite a few different sports t… [+1215 chars]'
},
{
source: { id: 'wired', name: 'Wired' },
author: 'Mitch Moxley',
title: 'How to Travel to the Most Remote Office on Earth',
description: 'Commuting to Concordia research station in Antarctica takes days—it’s more remote than the International Space Station. Here’s how to get there.',
url: 'https://www.wired.com/story/concordia-research-station-commute/',
urlToImage: 'https://media.wired.com/photos/685eb7b77d06b9641a4f5eed/191:100/w_1280,c_limit/22523890379_a599897a4b_b.jpg',
publishedAt: '2025-07-02T13:00:00Z',
content: 'This station is just a logistical one; its not meant to host people, and everyone who stays there blocks others from coming in. Its a real logistical challenge for the people working there, so they w… [+3790 chars]'
},
{
source: { id: 'business-insider', name: 'Business Insider' },
author: 'Hallam Bullock',
title: 'Why your next pair of running shoes may be more expensive',
description: 'Nike is raising prices for US customers to offset an expected $1 billion cost increase from tariffs. Investors are taking the news positively.',
url: 'https://www.businessinsider.com/nike-earnings-call-report-increasing-prices-investor-nke-stock-2025-6',
urlToImage: 'https://i.insider.com/685e771bf748d8c055f47c8b?width=1200&format=jpeg',
publishedAt: '2025-06-27T11:26:49Z',
content: 'Ethan Miller/Getty Images\r\n' +
"<ul><li>This post originally appeared in the Business Insider Today newsletter.</li><li>You can sign up for Business Insider's daily newsletter here.</li></ul>Nike is raisi… [+2277 chars]"
},
{
source: { id: null, name: 'The Atlantic' },
author: 'Christopher Beam',
title: 'How I Accidentally Inspired a Major Chinese Motion Picture',
description: 'A decade ago, I wrote a story about transcending cultural boundaries through sports. Now it’s a movie with a very different message.',
url: 'https://www.theatlantic.com/ideas/archive/2025/06/clash-chinese-football-movie/683059/',
urlToImage: 'https://cdn.theatlantic.com/thumbor/m7h6auprD_fH8YeqRQx-Wzy2xMY=/4x50:2880x1548/1200x625/media/img/mt/2025/06/revised_version/original.png',
publishedAt: '2025-06-08T12:00:00Z',
content: 'In December, a friend sent me the trailer for a new Chinese movie called Clash. It’s a sports comedy about a ragtag group of Chinese men who start an American-football team in the southwestern city o… [+18075 chars]'
},
{
source: { id: 'polygon', name: 'Polygon' },
author: 'Marloes Valentina Stella',
title: 'What time does Rematch release?',
description: 'Rematch, a multiplayer soccer game, arrives this week. Customize and control your player, join 5-vs.-5 online matches, and get kicking! With no penalties or anything else to interrupt the action, this game may just knock you off your soccer socks. If that sou…',
url: 'https://www.polygon.com/guides/607336/rematch-release-time-date-edt-pdt',
urlToImage: 'https://platform.polygon.com/wp-content/uploads/sites/2/2025/06/rematch-release-time.jpg?quality=90&strip=all&crop=0%2C3.4613147178592%2C100%2C93.077370564282&w=1200',
publishedAt: '2025-06-17T15:12:00Z',
content: 'Rematch, a multiplayer soccer game, arrives this week. Customize and control your player, join 5-vs.-5 online matches, and get kicking! With no penalties or anything else to interrupt the action, thi… [+1402 chars]'
},
{
source: { id: null, name: 'BBC News' },
author: null,
title: 'Beckham scores a winner with the royal circle',
description: 'The ex-footballer appears to be in line for a knighthood, but he already has a close relationship with the royals.',
url: 'https://www.bbc.com/news/articles/c5yezxvjy25o',
urlToImage: 'https://ichef.bbci.co.uk/news/1024/branded_news/3c89/live/e684bfb0-42c7-11f0-93dd-9f3a34381ccc.jpg',
publishedAt: '2025-06-06T14:05:02Z',
content: 'Sean Coughlan\r\n' +
'The Beckhams have become regular fixtures at royal events\r\n' +
"If David Beckham is imminently going to be awarded a knighthood in the King's Birthday Honours, the ex-footballer has already… [+3651 chars]"
},
{
source: { id: null, name: 'BBC News' },
author: 'Ben Ramsdale',
title: "Littler, Humphries, Wade & Beckham in King's Honours",
description: "Darts duo Luke Littler and Luke Humphries are awarded MBEs in the King's Birthday Honours, while Virginia Wade earns a CBE.",
url: 'https://www.bbc.com/sport/articles/cly3jy68x35o',
urlToImage: 'https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/1407/live/c1ae2930-478e-11f0-84b6-6bf0f66205f1.jpg',
publishedAt: '2025-06-13T21:30:04Z',
content: 'Knighthood\r\n' +
'David Beckham (former England footballer), for services to sport and charity\r\n' +
'Billy Boston (former rugby league player), for services to rugby league football\r\n' +
'Commanders of the Order of … [+3345 chars]'
},
{
source: { id: null, name: 'Yanko Design' },
author: 'Vincent Nguyen',
title: 'Nike’s 3D Printed FlyWeb Sports Bra: Design Innovation That’s Changing Athletic Performance',
description: 'Nike’s 3D Printed FlyWeb Sports Bra: Design Innovation That’s Changing Athletic PerformanceWhen Faith Kipyegon stepped onto the track in Paris wearing Nike’s FlyWeb sports bra, she carried hopes for a sub-four-minute mile. She also wore the...',
url: 'https://www.yankodesign.com/2025/06/30/nikes-3d-printed-flyweb-sports-bra-design-innovation-thats-changing-athletic-performance/',
urlToImage: 'https://www.yankodesign.com/images/design_news/2025/06/nikes-3d-printed-flyweb-sports-bra-design-innovation-thats-changing-athletic-performance/FlyWeb-bra.jpg',
publishedAt: '2025-06-30T17:20:28Z',
content: 'When Faith Kipyegon stepped onto the track in Paris wearing Nike’s FlyWeb sports bra, she carried hopes for a sub-four-minute mile. She also wore the future of performance sportswear: a 3D printed ga… [+9443 chars]'
},
{
source: { id: null, name: 'WGNO New Orleans' },
author: 'Raeven Poole',
title: 'Second arrest made for alleged prostitution at St. Charles massage parlor',
description: 'A St. Charles Parish masseuse has been arrested on solicitation allegations.',
url: 'https://wgno.com/news/crime/second-arrest-made-for-alleged-prostitution-at-st-charles-massage-parlor/',
urlToImage: 'https://media.zenfs.com/en/wgno_articles_329/494a1f5e00e4a499e77eb1af6131dc58',
publishedAt: '2025-06-03T16:27:55Z',
content: 'Disclaimer: All persons are presumed innocent until proven guilty. \r\n' +
'DESTREHAN, La. (WGNO) A St. Charles Parish masseuse has been arrested on solicitation allegations.\r\n' +
'On May 31, St. Charles Parish … [+1214 chars]'
},
{
source: { id: null, name: 'CNET' },
author: 'Gael Cooper',
title: "Today's Wordle Hints, Answer and Help for June 4, #1446",
description: "Here's today's Wordle answer, plus a look at spoiler-free hints and past solutions. These clues will help you solve The New York Times' popular puzzle game, Wordle, every day.",
url: 'https://www.cnet.com/tech/gaming/todays-wordle-hints-answer-and-help-for-june-4-1446/',
urlToImage: 'https://www.cnet.com/a/img/resize/c2b8d1e2686bcca5e387fa0b6c89fa264d27a6c4/hub/2024/05/28/20480816-214e-4fcc-a9b4-b02f0ac71e7c/wordle-word-game-hints-puzzle-8667.jpg?auto=webp&fit=crop&height=675&width=1200',
publishedAt: '2025-06-03T20:00:05Z',
content: "Looking for the most recent Wordle answer? Click here for today's Wordle hints, as well as our daily answers and hints for The New York Times Mini Crossword, Connections, Connections: Sports Edition … [+1194 chars]"
},
{
source: { id: null, name: 'WDAF FOX4 Kansas City' },
author: 'Delaney Eyermann',
title: 'One person dies after head-on crash on I-435: KCPD',
description: 'A deadly crash is causing backups on westbound Interstate 435 near U.S. 169 Highway, the Kansas City Police Department says.',
url: 'https://fox4kc.com/news/deadly-tractor-trailer-crash-causing-backups-on-i-435-at-cookingham-drive/',
urlToImage: 'https://media.zenfs.com/en/wdaf_articles_412/fbdb91083a3a06e057a3dffff9150636',
publishedAt: '2025-06-20T00:13:14Z',
content: 'KANSAS CITY, Mo. A crash on I-435 near Cookingham Drive left one person dead Thursday evening, June 19, the Kansas City Police Department says.\r\n'

-       'Police say that at around 6:30 p.m., a Toyota RAV4 was… [+987 chars]'
  },
  {
  source: { id: null, name: 'Android Central' },
  author: 'Nicholas Sutrich',
  title: "Meta Oakley smart glasses are real. Here's what to expect from Friday's announcement",
  description: "Meta is teasing its next-generation smart glasses powered by an Oakley partnership, scheduled to be announced on Friday, June 20. Here's what to
  expect.",
  url: 'https://www.androidcentral.com/gaming/virtual-reality/oakley-meta-smart-glasses-teaser',
  urlToImage: 'https://cdn.mos.cms.futurecdn.net/MFUj8rPfcR6JEb4o5qG5F8.jpg',
  publishedAt: '2025-06-16T15:22:55Z',
  content: 'What you need to know\r\n' +
  '<ul><li>A new Oakley Meta partnership was teased on social media with a June 20th announcement date.</li><li>Meta created a new Oakley Meta Instagram channel, signaling a new p… [+3350 chars]'
  },
  {
  source: { id: null, name: 'CNET' },
  author: 'Kevin Lynch',
  title: 'World Cup 2026 Qualifier Soccer: Stream Ecuador vs. Brazil Live From Anywhere',
  description: 'Carlo Ancelotti takes charge of the Selecao for the first time in Guayaquil.',
  url: 'https://www.cnet.com/tech/services-and-software/world-cup-2026-qualifier-soccer-stream-ecuador-vs-brazil-live-from-anywhere/',
  urlToImage: 'https://www.cnet.com/a/img/resize/42be92247ca3be6748d3be8bfa67d9c5fcdd8754/hub/2025/06/05/ac769db7-e273-4221-b50c-aded604fb3e6/gettyimages-2217720373.jpg?auto=webp&fit=crop&height=675&width=1200',
  publishedAt: '2025-06-05T22:29:02Z',
  content: 'New boss Carlo Ancelotti faces a tricky first fixture in charge of Brazil as the Verde-Amarela travel to Ecuador for this intriguing World Cup 2026 Qualifier.\r\n' +
  "Below, we'll outline the best live TV s… [+4601 chars]"
  },
  {
  source: { id: 'le-monde', name: 'Le Monde' },
  author: 'Valentin Moinard',
  title: 'A Roland-Garros, le tennis veut gagner le match du pickleball face au badminton',
  description: 'Le ministère des sports doit décider en fin d’année quelle fédération récupérera la délégation de ce nouveau sport de raquette, en pleine expansion aux Etats-Unis et qui commence à s’implanter en France.',
  url: 'https://www.lemonde.fr/sport/article/2025/06/05/a-roland-garros-le-tennis-veut-gagner-le-match-du-pickleball-face-au-badminton_6610610_3242.html',
  urlToImage: 'https://img.lemde.fr/2025/06/03/14/0/3414/2276/1440/960/60/0/08d79f1_sirius-fs-upload-1-8y4z42utd1ux-1748961494128-063-2212829583.jpg',
  publishedAt: '2025-06-05T04:00:18Z',
  content: 'Anna Leigh Waters et lancien joueur de tennis Andre Agassi lors du match les opposant à Tristan Dussault et Stevie Petropouleas, en huitièmes de finale de double mixte de pickleball de lUS Open, à Na… [+1836 chars]'
  },
  {
  source: { id: 'espn', name: 'ESPN' },
  author: 'David Purdum',
  title: 'Sky partners with firm to combat online abuse',
  description: 'The Chicago Sky are partnering with a technology company that said it helped the FBI track an alleged stalker of Caitlin Clark to further combat
  online harassment of players and coaches, the team announced Tuesday.',
  url: 'https://www.espn.com/wnba/story/_/id/45632839/chicago-sky-partners-firm-combat-online-harassment',
  urlToImage: 'https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0701%2Fr1513610_1296x729_16%2D9.jpg',
  publishedAt: '2025-07-01T19:36:08Z',
  content: 'The Chicago Sky are partnering with a technology company that said it helped the FBI track an alleged stalker of Caitlin Clark to further combat online harassment of players and coaches, the team ann… [+1851 chars]'
  },
  {
  source: { id: 'le-monde', name: 'Le Monde' },
  author: 'Alexandre Lemarié',
  title: 'La Coupe du monde des clubs de football, un tournoi qui passe au second plan aux Etats-Unis',
  description: 'Organisée dans un pays où le ballon rond est éclipsé par de nombreux sports, la compétition peine à faire le plein, à l’exception d’une poignée d’affiches. A cela s’ajoute le contexte politique local qui ne favorise pas l’engouement populaire.',
  url: 'https://www.lemonde.fr/sport/article/2025/06/17/la-coupe-du-monde-des-clubs-un-tournoi-qui-passe-au-second-plan-aux-etats-unis_6613890_3242.html',
  urlToImage: 'https://img.lemde.fr/2025/06/15/63/0/5740/3826/1440/960/60/0/dcd8de7_ftp-import-images-1-q7hpq723xt2m-2025-06-15t015223z-443156638-up1el6f0579n9-rtrmadp-3-soccer-club-aly-mia.JPG',
  publishedAt: '2025-06-17T12:30:02Z',
  content: 'Un écran géant affichant le nombre de spectateurs présents au Hard Rock Stadium de Miami (Floride) pour le match douverture de la Coupe du monde des
  clubs de football entre lInter Miami et léquipe ég… [+1774 chars]'
  },
  {
  source: { id: null, name: 'MacRumors' },
  author: 'Tim Hardwick',
  title: 'Apple TV Thread 1.4 Update Coming in tvOS 26 This Fall',
  description: 'Apple TV devices will support Thread 1.4 when tvOS 26 launches this fall, according to network analysis by Matter Alpha. The update was discovered in the tvOS 26 beta announced at WWDC, suggesting the upcoming HomePod Software 26 will also support the latest …',
  url: 'https://www.macrumors.com/2025/06/13/tvos-26-beta-thread-1-4-support/',
  urlToImage: 'https://images.macrumors.com/t/GZwdEPSU3NPri2YCV3gPNHDOvcw=/2500x/article-new/2025/05/tvOS-26-Feature.jpg',
  publishedAt: '2025-06-13T09:45:01Z',
  content: 'Apple TV devices will support Thread 1.4 when tvOS 26 launches this fall, according to network analysis by Matter Alpha. The update was discovered in the tvOS 26 beta announced at WWDC, suggesting th… [+1279 chars]'
  },
  {
  source: { id: null, name: '9to5Mac' },
  author: 'Seth Kurkowski',
  title: '9to5Mac Daily: June 26, 2025 – Apple v Epic continues, Apple Sports update',
  description: 'Listen to a recap of the top stories of the day from 9to5Mac. 9to5Mac Daily is available on iTunes and Apple’s Podcasts app, Stitcher, TuneIn, Google Play, or through our dedicated RSS feed for Overcast and other podcast players.\n' +
  '\n' +
  '\n' +
  '\n' +
  'Sponsored by Bitwarden: Ch…',
  url: 'https://9to5mac.com/2025/06/26/daily-june-26-2025/',
  urlToImage: 'https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/12/9to5Mac-Daily-art-lead.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1',
  publishedAt: '2025-06-26T20:10:24Z',
  content: 'Listen to a recap of the top stories of the day from 9to5Mac. 9to5Mac Daily is available on iTunes and Apples Podcasts app, Stitcher, TuneIn, Google
  Play, or through our dedicated RSS feed for Overca… [+987 chars]'
  },
  {
  source: { id: null, name: '9to5Mac' },
  author: 'Benjamin Mayo',
  title: 'Apple Sports app redesigned with new personalized sections, adds tennis scores just in time for Wimbledon',
  description: 'The Apple Sports app for iPhone has just got a big new update. The home screen layout has been revamped, with upcoming games now separated by league. You can further personalize the list by re-ordering the sections to their preference, so you can make the spo…',
  url: 'https://9to5mac.com/2025/06/25/apple-sports-app-redesigned-tennis-scores/',
  urlToImage: 'https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2025/06/apple-iphone-sports-app-tennis.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1', publishedAt: '2025-06-25T13:50:34Z',
  content: 'The Apple Sports app for iPhone has just got a big new update. The home screen layout has been revamped, with upcoming games now separated by league. You can further personalize the list by re-orderi… [+1447 chars]'
  },
  {
  source: { id: null, name: 'Android Police' },
  author: 'Chris Thomas',
  title: 'Galaxy Z Flip 7 sports a full-size outer display according to a just-leaked render',
  description: "Samsung could bring the Z Flip 7's outer panel in line with the full-frontal display pioneered by the Motorola Razr lineup",
  url: 'https://www.androidpolice.com/z-flip-7-renders-full-outer-display/',
  urlToImage: 'https://static1.anpoimages.com/wordpress/wp-content/uploads/wm/2024/09/galaxy-z-flip-6-in-hand.jpg',
  publishedAt: '2025-06-19T17:38:41Z',
  content: 'With the foldable arms race in full swing, a drip-feed of Galaxy Z Flip 7 rumors has experts and consumers waiting with bated breath to see how Samsung will manage to push the envelope with its lates… [+3717 chars]'
  },
  {
  source: { id: null, name: 'BBC News' },
  author: 'Alex Brotherton',
  title: "'The abuse never stops' - Lionesses to avoid social media",
  description: 'Alessia Russo and some of her England team-mates will not use social media during Euro 2025 because online abuse can be "really damaging."',
  url: 'https://www.bbc.com/sport/football/articles/cgeqdw1yj4vo',
  urlToImage: 'https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/101e/live/85b29410-4bcc-11f0-b6a6-416f13d49b71.jpg',
  publishedAt: '2025-06-17T23:26:38Z',
  content: 'England forward Alessia Russo says she prefers to stay off social media during major tournaments because of how "damaging" abuse can be.\r\n' +
  'The 26-year-old was speaking about the issue alongside her Li… [+3094 chars]'
  },
  {
  source: { id: null, name: 'Gizmodo.com' },
  author: 'Germain Lussier',
  title: 'The Films and Shows You Should Be Streaming in July 2025',
  description: "We've picked out the best horror, sci-fi, and genre titles coming to Netflix, Hulu, Disney+, and beyond, including 'Sinners,' 'RoboCop,' and 'Mortal Kombat.'",
  url: 'https://gizmodo.com/the-films-and-shows-you-should-be-streaming-in-july-2025-2000622208',
  urlToImage: 'https://gizmodo.com/app/uploads/2025/07/nerds-watch-1200x675.jpg',
  publishedAt: '2025-07-01T20:30:23Z',
  content: 'A new era of streaming selections is here. For the past several years, our monthly column, the Nerds Watch, has been the place to find out all the best genre titles coming to the biggest streaming se… [+9054 chars]'
  },
  {
  source: { id: null, name: 'VentureBeat' },
  author: 'Rachel Kaser',
  title: 'Gamefam brings FIFA Club World Cup 2025 to Roblox',
  description: 'Gamefam and FIFA are bringing the World Cup to Roblox via Super League Soccer from June 14 through July 13.',
  url: 'https://venturebeat.com/games/gamefam-brings-fifa-club-world-cup-2025-to-roblox/',
  urlToImage: 'https://venturebeat.com/wp-content/uploads/2025/06/FIFA-Club-World-Cup-Roblox-Key-Art-2.png?w=1024?w=1200&strip=all',
  publishedAt: '2025-06-13T13:00:00Z',
  content: 'Roblox game studio Gamefam announced today it is collaborating with FIFA to bring the FIFA Club World Cup 2025 to its game Super League Soccer. The two are holding a major event within the game leadi… [+2371 chars]'
  },
  {
  source: { id: 'le-monde', name: 'Le Monde' },
  author: 'Le Monde avec AFP',
  title: 'Amélie Oudéa-Castéra, ancienne ministre des sports, désormais seule en lice pour présider le Comité olympique français',
  description: 'L’adversaire de l’ancienne ministre, Didier Séminet, a annoncé son retrait, samedi, en dénonçant « l’iniquité manifeste qui entoure les deux candidatures » à la présidence du CNOSF.',
  url: 'https://www.lemonde.fr/sport/article/2025/06/07/amelie-oudea-castera-ancienne-ministre-des-sports-desormais-seule-en-lice-pour-presider-le-comite-olympique-francais_6611117_3242.html',
  urlToImage: 'https://img.lemde.fr/2025/06/07/0/0/8256/5504/1440/960/60/0/75a15b2_sirius-fs-upload-1-ozz100ysq201-1749316067295-000-34z4663.jpg',
  publishedAt: '2025-06-07T17:14:09Z',
  content: 'Amélie Oudéa-Castéra, alors ministre des sports et des Jeux olympiques, le 26 juin 2024 à Paris. BERTRAND GUAY / AFP\r\n' +
  'Il ne reste plus quelle. Amélie Oudéa-Castéra, ancienne ministre des sports et de… [+1596 chars]'
  },
  {
  source: { id: null, name: 'NPR' },
  author: 'The NPR Network',
  title: 'New laws this month touch on fundamental rights',
  description: "Tennessee's new laws on immigration already face court challenges. Other states are changing gun laws or imposing new restrictions on transgender people.",
  url: 'https://www.npr.org/2025/07/01/nx-s1-5453851/guns-immigration-states-laws-take-effect',
  urlToImage: 'https://npr.brightspotcdn.com/dims3/default/strip/false/crop/6000x3375+0+313/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F2f%2F40%2F6aecb24d4cb3863e644d659eea60%2Fap25111713107150.jpg',
  publishedAt: '2025-07-01T22:17:42Z',
  content: "This year's batch of laws taking effect at the start of July includes measures in Republican-controlled states to back the Trump administration's goals for deportations, put more restrictions on tran… [+3304 chars]"
  },
  {
  source: { id: null, name: 'Core77.com' },
  author: 'Core Jr',
  title: 'The 2025 Core77 Design Awards Sports & Outdoors Winners',
  description: 'The 2025 Professional winner in the Sports & Outdoors category is IXI Autonomous Golf Trolley created by the Future Wave team of Joachim Froment, Quentin Desclee, Thoma Velghe, and engineers at Botorincs. The iXi Golf Trolley offers a fully autonomous, self-d…',
  url: 'https://www.core77.com/posts/137474/The-2025-Core77-Design-Awards-Sports-n-Outdoors-Winners',
  urlToImage: 'https://s3files.core77.com/blog/images/lead_n_spotlight/1730214_lead_400_137474_.png',
  publishedAt: '2025-06-26T14:30:00Z',
  content: 'The 2025 Professional winner in the Sports &amp; Outdoors category is IXI Autonomous Golf Trolley created by the Future Wave team of Joachim Froment, Quentin Desclee, Thoma Velghe, and engineers at B… [+1781 chars]'
  }
  ]
