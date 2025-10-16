import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleIngestorService } from 'src/article/application/services/artcile-ingestor.service';

@Injectable()
export class ArticleIngestorCron {
  private readonly logger = new Logger(ArticleIngestorCron.name);

  constructor(private readonly ingestor: ArticleIngestorService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.log('🔁 Cron job lancé pour ingérer les articles...');
    const inserted = await this.ingestor.ingestAll();
    this.logger.log(`✅ ${inserted} nouveaux articles ajoutés.`);
  }
}
