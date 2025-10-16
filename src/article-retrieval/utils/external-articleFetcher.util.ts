import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalArticleFetcherUtils {
  private readonly keywords = [
    'actualité',
    'politique',
    /* 'sport',
    'économie',
    'afrique',
    'technologie',
    'culture',
    'santé',
    'crime',
    'guerre', */
  ];

  private readonly apiUrl = 'https://newsapi.org/v2/everything';
  private readonly apiKey = '5d2ce32ef5104caa80f58218ff948fe0';

  // Vérifie si la date est aujourd’hui ou hier
  private isTodayOrYesterday(publishedAt: string): boolean {
    const pubDate = new Date(publishedAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const pubDay = pubDate.getUTCDate();
    const pubMonth = pubDate.getUTCMonth();
    const pubYear = pubDate.getUTCFullYear();

    return (
      (pubYear === today.getUTCFullYear() &&
        pubMonth === today.getUTCMonth() &&
        pubDay === today.getUTCDate()) ||
      (pubYear === yesterday.getUTCFullYear() &&
        pubMonth === yesterday.getUTCMonth() &&
        pubDay === yesterday.getUTCDate())
    );
  }

  async fetchRecentArticles(limit = 50): Promise<any[]> {
    const allArticles: any[] = [];

    for (const keyword of this.keywords) {
      try {
        const url = `${this.apiUrl}?q=${encodeURIComponent(
          keyword,
        )}&language=fr&sortBy=publishedAt&apiKey=${this.apiKey}`;

        console.log('Fetching:', url);

        const response = await axios.get(url);
        let articles = response.data.articles || [];

        // Dédupliquons au niveau de la requête (clé = URL)
        articles = Array.from(
          new Map(articles.map((a) => [a.url, a])).values(),
        );

        // On garde uniquement aujourd’hui + hier
        const recentArticles = articles
          .filter((a) => this.isTodayOrYesterday(a.publishedAt))
          .slice(0, 5); // <= limiter à 5 par requête

        allArticles.push(...recentArticles);
      } catch (error) {
        console.error(`Erreur API pour ${keyword}:`, error.message);
      }
    }

    // Déduplication globale
    const uniqueArticles = Array.from(
      new Map(allArticles.map((a) => [a.url, a])).values(),
    );

    // Tri du plus récent au plus ancien
    uniqueArticles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    // Tronquer à 50 articles max
    return uniqueArticles.slice(0, limit);
  }
}
