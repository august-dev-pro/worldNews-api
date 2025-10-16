// src/article-retrieval/controllers/article.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FetchMultipleArticlesUseCase } from '../use-cases/fetch-multiple-articles.use-case';
import { ApiExterneDto, ApiParam } from '../dtos/api-externe.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleProcessorService } from '../services/article-processor.service';
import { plainToInstance } from 'class-transformer';
import { ArticleService } from 'src/article/application/services/article.service';

@ApiTags('ArticlesRetrieval')
@Controller('articles-retrieval')
export class ArticleRetrivalController {
  constructor(
    private readonly fetchMultipleArticlesUseCase: FetchMultipleArticlesUseCase,
    private readonly processorArticles: ArticleProcessorService,
    private readonly articleService: ArticleService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'url',
    required: false,
    type: String,
    description: "URL de l'API externe",
  })
  @ApiQuery({
    name: 'apiKey',
    required: false,
    type: String,
    description: 'Clé API (optionnelle)',
  })
  @ApiQuery({
    name: 'params',
    required: false,
    type: [ApiParam],
    isArray: true,
    description: "Liste des paramètres API sous forme 'clé=valeur'",
  })
  async getArticles(@Query() query: any): Promise<any[]> {
    const dto = plainToInstance(ApiExterneDto, query);
    return this.fetchMultipleArticlesUseCase.execute();
  }

  @ApiOperation({ summary: 'processor new articles APIs' })
  @ApiResponse({
    status: 200,
    description: 'Articles successfully processor',
  })
  @Post('articles-processor')
  @ApiQuery({
    type: String,
    example: 'code-admin',
    name: 'admin password',
  })
  async processArticles(): Promise<any> {
    // Appel réel à NewsAPI.org
    const apiKey = '5d2ce32ef5104caa80f58218ff948fe0';
    const url = `https://newsapi.org/v2`;

    const externalArticles = await this.fetchMultipleArticlesUseCase.execute();

    /*   const externalArticles = [
      {
        source: { id: 'the-verge', name: 'The Verge' },
        author: 'Emma Roth',
        title: 'Meta Connect 2025: the 6 biggest announcements',
        description:
          'Meta just showed off all the latest in wearable technology, virtual reality, augmented reality, and more at its annual Connect keynote. In addition to the long-awaited reveal of Meta’s updated Ray-Ban smart glasses, the company had some other exciting surpris…',
        url: 'https://www.theverge.com/news/780087/meta-connect-2025-ray-ban-oakley-biggest-announcements',
        urlToImage:
          'https://platform.theverge.com/wp-content/uploads/sites/2/2025/09/Screenshot-2025-09-17-at-8.05.19%E2%80%AFPM.png?quality=90&strip=all&crop=9.1420476771269%2C1.0109208410496%2C90.857952322873%2C97.978158317901&w=1200',
        publishedAt: '2025-09-18T01:01:24Z',
        content:
          '<ul><li></li><li></li><li></li></ul>\r\n' +
          'We got a glimpse of Metas new AI glasses and a bunch more.\r\n' +
          'We got a glimpse of Metas new AI glasses and a bunch more.\r\n' +
          'by\r\n' +
          'Emma RothClose\r\n' +
          'Emma Roth\r\n' +
          'Posts from… [+5647 chars]',
      },
      {
        source: { id: 'the-verge', name: 'The Verge' },
        author: 'Brandon Russell',
        title:
          'Meta’s Ray-Ban Gen 2 and Oakley Vanguard glasses are available to preorder',
        description:
          "At its Connect keynote on Wednesday, Meta officially introduced the $799.99 Meta Ray-Ban Display, also known as Hypernova. The brand's new, high-end smart glasses feature an in-lens display you can control with wrist-based gestures via the new Meta Neural Ban…",
        url: 'https://www.theverge.com/tech/780353/meta-ray-ban-display-oakley-vanguard-preorder-price-how-to-buy',
        urlToImage:
          'https://platform.theverge.com/wp-content/uploads/sites/2/2025/09/Verge-Meta-Rayban-Display-Stills-13.jpg?quality=90&strip=all&crop=0%2C3.4613147178592%2C100%2C93.077370564282&w=1200',
        publishedAt: '2025-09-18T01:00:11Z',
        content:
          '<ul><li></li><li></li><li></li></ul>\r\n' +
          'Youll be able to try on (and buy) Meta Ray-Ban Display on September 30th, but the other new models are up for preorder.\r\n' +
          'Youll be able to try on (and buy) Meta R… [+4114 chars]',
      },
    ]; */

    //  console.log('articles return to the controller: ', externalArticles.slice(0,1));

    // Traitement par lots de 20
    const batchSize = 20;
    for (let i = 0; i < externalArticles.length; i += batchSize) {
      const batch = externalArticles.slice(i, i + batchSize);
      const newsData = await Promise.all(
        batch.map((externalArticle) =>
          this.processorArticles.processArticle(externalArticle),
        ),
      );
      // Enregistre chaque lot en base (adapte selon ton service)
      for (const article of newsData) {
        try {
          const articleCreated = await this.articleService.create(article);
          console.log(
            'article enreistrer avec succes: ',
            articleCreated.getId(),
          );
        } catch (error) {
          console.error(
            'Erreur lors de la création de l’article :',
            article.title,
            error.message,
          );

          console.log(`error: ${error} \n article: ${article}`);
          // Tu peux aussi logger l’article ou l’erreur dans un tableau pour analyse ultérieure
        }
      }
    }
    return { message: 'Traitement terminé' };
  }
}
