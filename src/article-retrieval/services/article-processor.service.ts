import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { translate } from '@vitalets/google-translate-api';
import { CreateArticleDto } from 'src/article/application/dtos/create-article.dto';
import { CategoryService } from 'src/category/application/services/category.service';
import { AuthorService } from 'src/author/infrastructure/services/author.service';
import { SourceService } from 'src/source/application/services/source.service'; // AJOUTE ICI
import { ArticleService } from 'src/article/application/services/article.service';

dotenv.config();
@Injectable()
export class ArticleProcessorService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly articleService: ArticleService,
    private readonly authorService: AuthorService,
    private readonly sourceService: SourceService, // AJOUTE ICI
  ) {}
  private readonly GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  private readonly GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  private readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  private readonly IBM_WATSON_API_KEY = process.env.IBM_WATSON_API_KEY;
  private readonly MEANINGCLOUD_API_KEY = process.env.MEANINGCLOUD_API_KEY;
  private readonly UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
  private readonly NEWSGUARD_API_KEY = process.env.NEWSGUARD_API_KEY;

  async processArticle(article: any): Promise<any> {
    if (!article.title || !article.content) return null;
    // console.log('article contente ', article.content);
    const exists = await this.articleService.existsSimilarArticle(article);
    if (exists) return null;

    const cleanedContent = this.cleanArticleContent(article.content);
    const cleanedTitle = this.cleanText(article.title);

    const categoryName = await this.detectCategoryByWords(article);
    const categoryId =
      await this.categoryService.getOrCreateCategory(categoryName);
    const authorName = await this.detectAuthor(article);
    const authorId = await this.authorService.getOrCreateAuthor(authorName);

    const sourceName = article.source?.name || article.source || 'unknown';
    const sourceId = await this.sourceService.getOrCreateSource(sourceName);

    const enrichedContent = await this.enrichArticleCOHERE(
      article.title,
      cleanedContent,
    );

    const newArticle: CreateArticleDto = {
      title: cleanedTitle,
      content: enrichedContent || cleanedContent,
      imageUrl: article.urlToImage,
      sourceId: sourceId,
      publishedAt: article.publishedAt || new Date().toISOString(),
      url: article.url || null,
      authorId: authorId,
      categoryId: categoryId,
      // imageUrl,
      // metadata,
      // summary: summary,
      // sentiment: sentimentScore,
      // credibility,
    };

    return newArticle;
  }

  private cleanText(text: string): string {
    return text.replace(/\[\d+ chars\]$/, '').trim();
  }

  /*   private async generateSummary(text: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.meaningcloud.com/summarization-1.0',
        null,
        {
          params: {
            key: this.MEANINGCLOUD_API_KEY,
            txt: text,
            sentences: 3,
          },
        },
      );
      return response.data.summary || text.slice(0, 200) + '...';
    } catch (error) {
      console.error('Erreur de résumé:', error.message);
      return text.slice(0, 200) + '...';
    }
  } */

  /*  private async generateSummary(text: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Tu es un assistant qui fait des résumés de texte.',
            },
            { role: 'user', content: `Résumé ce texte en 3 phrases : ${text}` },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return (
        response.data.choices[0].message.content || text.slice(0, 200) + '...'
      );
    } catch (error) {
      console.error('Erreur de résumé:', error.message);
      return text.slice(0, 200) + '...';
    }
  } */

  private async generateSummary(text: string): Promise<string> {
    try {
      const response = await axios.get('https://api.smmry.com', {
        params: {
          SM_API_INPUT: text,
          SM_LENGTH: 3, // Nombre de phrases souhaitées
        },
      });

      return response.data.sm_api_content || text.slice(0, 200) + '...';
    } catch (error) {
      console.error('Erreur de résumé:', error.message);
      return text.slice(0, 200) + '...';
    }
  }

  private async analyzeSentiment(text: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/YOUR_INSTANCE_ID/v1/analyze',
        {
          text,
          features: { sentiment: {} },
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`apikey:${this.IBM_WATSON_API_KEY}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const sentiment = response.data.sentiment.document.label;
      return sentiment;
    } catch (error) {
      console.error('Erreur analyse de sentiment:', error.message);
      return 'unknown';
    }
  }

  private async checkSourceCredibility(source: string): Promise<string> {
    try {
      const response = await axios.get(
        `https://api.newsguardtech.com/${source}`,
        {
          headers: { Authorization: `Bearer ${this.NEWSGUARD_API_KEY}` },
        },
      );
      return response.data.credibility || 'unknown';
    } catch (error) {
      console.error('Erreur de vérification de source:', error.message);
      return 'unknown';
    }
  }

  private async translateText(
    text: string,
    targetLang: string,
    sourceLang = 'en', // par défaut anglais
  ): Promise<string> {
    try {
      const res = await translate(text, { to: targetLang });
      return res.text;
    } catch (error) {
      console.error('Erreur de traduction LibreTranslate:', error.message);
      // throw new Error(error);
      return text; // fallback : retourne le texte original si erreur
    }
  }

  private async getImage(query: string): Promise<string> {
    try {
      const response = await axios.get(
        'https://api.unsplash.com/search/photos',
        {
          params: { query, client_id: this.UNSPLASH_API_KEY },
        },
      );
      return response.data.results[0]?.urls?.regular || null;
    } catch (error) {
      console.error('Erreur de récupération d’image:', error.message);
      return 'null';
    }
  }

  private async fetchMetadata(url: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}`,
        {
          params: { app_id: process.env.OPENGRAPH_API_KEY },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Erreur de récupération des métadonnées:', error.message);
      return null;
    }
  }

  private async enrichArticle(
    title: string,
    truncatedContent: string,
  ): Promise<string> {
    const prompt = `Voici un extrait d'article tronqué :

"${truncatedContent}"

En te basant sur le titre : \n"${title}",\n netoie, ameliore et complète intelligemment le contenu sans inventer de faits, mais en simulant un texte plausible, journalistique et l'actualité recente sur le contexte.

je l'utilise directement comme contenu des article donc retour juste le contenu pres a etre mis en base de donner sasn autre traitement !

je dis bien sans traitement je veux que tu retoutrne les contenue pres a etr mis en base de donnee pas de "[insérer ici un sujet d'actualité pertinent et plausible,  par exemple:  les récentes déclarations du président concernant l'Ukraine, ou la politique économique de l'administration] !!"`;

    try {
      const response = await axios.post(
        `${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const enrichedText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      return enrichedText;
    } catch (error) {
      console.error(
        'Erreur enrichissement Gemini:',
        error.response?.data || error.message,
      );
      throw new Error(error);
      // return truncatedContent; // fallback au texte d'origine si erreur
    }
  }

  private async enrichArticleCOHERE(
    title: string,
    truncatedContent: string,
  ): Promise<string> {
    const prompt = `Voici un extrait d'article tronqué :

  "${truncatedContent}"

En te basant sur le titre : \n"${title}",\n netoie, ameliore et complète intelligemment le contenu sans inventer de faits, mais en simulant un texte plausible, journalistique et l'actualité recente sur le contexte.

je l'utilise directement comme contenu des article donc retour juste le contenu pres a etre mis en base de donner sasn autre traitement !

je dis bien sans traitement je veux que tu retoutrne les contenue pres a etre mis en base de donnee pas de donnees a modier fais tout proprement comme des articles de journals et de news mais surtout avec des données veriridiques et reelles"`;

    try {
      console.log('api key: ', process.env.COHERE_API_KEY);

      const response = await axios.post(
        'https://api.cohere.ai/v1/chat',
        {
          model: 'command-r7b-12-2024',
          message: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.text ?? truncatedContent;
    } catch (error) {
      console.error(
        'Erreur Cohere enrichissement:',
        error.response?.data || error.message,
      );
      return truncatedContent;
    }
  }

  private chunkText(text: string, maxLen = 500): string[] {
    const chunks: any = [];
    let start = 0;
    while (start < text.length) {
      let end = start + maxLen;
      if (end > text.length) end = text.length;

      // essayer de couper au dernier espace pour ne pas casser un mot
      const chunk = text.slice(start, end);
      const lastSpace = chunk.lastIndexOf(' ');
      if (lastSpace > 0 && end !== text.length) {
        end = start + lastSpace;
      }
      chunks.push(text.slice(start, end));
      start = end;
    }
    return chunks;
  }

  private async translateLargeText(
    text: string,
    targetLang: string,
  ): Promise<string> {
    const chunks = this.chunkText(text, 500);
    const translations: any = [];
    for (const chunk of chunks) {
      const translatedChunk = await this.translateText(chunk, targetLang);
      translations.push(translatedChunk);
      // optionnel : delay de 200ms entre requêtes pour éviter throttling
      await new Promise((r) => setTimeout(r, 200));
    }
    return translations.join(' ');
  }

  private async detectCategoryByIa(article: any): Promise<string> {
    // 1. Si la catégorie existe déjà dans l'article
    if (article.category) return article.category;

    // 2. Sinon, essaye de la déduire via IA (exemple avec OpenAI)
    try {
      const prompt = `Catégorise cet article :\nTitre : "${article.title}"\nContenu : "${article.content}"\nDonne une seule catégorie (ex: Politique, Sport, Économie, etc.)`;
      const response = await axios.post(
        `${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data.choices[0].message.content.trim();
    } catch (e) {
      return 'Inconnue';
    }
  }

  private async detectCategoryByWords(article: any): Promise<string> {
    if (!article || (!article.title && !article.content)) return 'Inconnue';

    const text =
      `${article.title ?? ''} ${article.content ?? ''}`.toLowerCase();

    // Dictionnaire de catégories et mots-clés associés
    const categories: { [key: string]: string[] } = {
      Sport: [
        'football',
        'soccer',
        'basketball',
        'nba',
        'ligue',
        'championnat',
        'tennis',
        'olympique',
        'but',
        'match',
        'score',
        'joueur',
        'équipe',
        'goal',
        'fifa',
        'rugby',
        'tournoi',
        'athlétisme',
        'cricket',
        'golf',
        'handball',
      ],
      Politique: [
        'président',
        'gouvernement',
        'élection',
        'ministre',
        'parlement',
        'loi',
        'vote',
        'politique',
        'parti',
        'assemblée',
        'réforme',
        'diplomatie',
        'sénat',
        'député',
        'campagne',
        'mandat',
        'congrès',
        'politicien',
      ],
      Économie: [
        'économie',
        'bourse',
        'finance',
        'marché',
        'entreprise',
        'chômage',
        'croissance',
        'inflation',
        'banque',
        'investissement',
        'PIB',
        'monnaie',
        'budget',
        'impôt',
        'salaire',
        'revenu',
        'industrie',
        'commerce',
        'startup',
      ],
      Santé: [
        'santé',
        'médecin',
        'hôpital',
        'maladie',
        'virus',
        'covid',
        'vaccin',
        'pandémie',
        'soin',
        'patient',
        'chirurgie',
        'pharmacie',
        'épidémie',
        'symptôme',
        'traitement',
        'cancer',
        'grippe',
      ],
      Science: [
        'science',
        'recherche',
        'découverte',
        'espace',
        'astronomie',
        'physique',
        'chimie',
        'biologie',
        'laboratoire',
        'expérience',
        'univers',
        'technologie',
        'innovation',
        'robot',
        'intelligence artificielle',
        'climat',
        'écologie',
      ],
      Technologie: [
        'technologie',
        'internet',
        'smartphone',
        'ordinateur',
        'logiciel',
        'application',
        'réseau',
        'cybersécurité',
        'cloud',
        'data',
        'IA',
        'intelligence artificielle',
        'robot',
        'blockchain',
        'crypto',
        'start-up',
        'gadget',
      ],
      Culture: [
        'cinéma',
        'film',
        'musique',
        'concert',
        'art',
        'exposition',
        'livre',
        'roman',
        'théâtre',
        'festival',
        'peinture',
        'sculpture',
        'danse',
        'chanson',
        'acteur',
        'auteur',
        'artiste',
        'spectacle',
      ],
      Société: [
        'société',
        'famille',
        'éducation',
        'école',
        'université',
        'étudiant',
        'professeur',
        'social',
        'discrimination',
        'égalité',
        'droit',
        'justice',
        'crime',
        'police',
        'violence',
        'solidarité',
        'inclusion',
      ],
      International: [
        'international',
        'monde',
        'étranger',
        'ONU',
        'guerre',
        'conflit',
        'paix',
        'diplomatie',
        'relations internationales',
        'pays',
        'frontière',
        'migration',
        'réfugié',
      ],
      Environnement: [
        'environnement',
        'écologie',
        'climat',
        'pollution',
        'biodiversité',
        'développement durable',
        'énergie',
        'recyclage',
        'nature',
        'forêt',
        'océan',
        'changement climatique',
        'gaz à effet de serre',
      ],
      // Ajoute d'autres catégories si besoin
    };

    // Recherche la catégorie la plus pertinente
    let bestCategory = 'Inconnue';
    let maxMatches = 0;

    for (const [category, keywords] of Object.entries(categories)) {
      let matches = 0;
      for (const word of keywords) {
        // Recherche mot entier ou pluriel
        const regex = new RegExp(`\\b${word}s?\\b`, 'i');
        if (regex.test(text)) matches++;
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestCategory = category;
      }
    }

    return bestCategory;
  }

  private async detectAuthor(article: any): Promise<string> {
    if (article.author && article.author.trim() !== '') {
      return article.author.trim();
    }
    try {
      const prompt = `Qui est l'auteur probable de cet article ?\nTitre : "${article.title}"\nContenu : "${article.content}"\nDonne uniquement un nom ou "Inconnu" si impossible.`;
      const response = await axios.post(
        `${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const aiAuthor =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        'Inconnu';
      return aiAuthor;
    } catch (e) {
      return 'Inconnu';
    }
  }

  private enrichArticleLocally(
    title: string,
    truncatedContent: string,
  ): string {
    if (!truncatedContent || truncatedContent.length < 50) {
      return `[ARTICLE INCOMPLET] ${title}\n${truncatedContent}`;
    }

    // Nettoyage de base
    let content = truncatedContent
      .replace(/\s+/g, ' ') // espaces multiples
      .replace(/([.!?])([^\s])/g, '$1 $2') // espace après ponctuation
      .replace(/\[\d+ chars\]/g, '') // balises parasites
      .replace(/(\r\n|\n|\r)/gm, ' ') // retour à la ligne
      .trim();

    // Suppression des phrases incomplètes ou trop courtes
    let sentences = content
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 25 && /[a-zA-Z]/.test(s));

    // Reformulation simple des phrases trop courtes
    sentences = sentences.map((s) =>
      s.length < 40 ? `${s} (détails à suivre)` : s,
    );

    // Ajout d'une introduction si besoin
    if (
      sentences.length > 0 &&
      !sentences[0].toLowerCase().includes(title.toLowerCase().split(' ')[0])
    ) {
      sentences.unshift(`Dans cet article : ${title}.`);
    }

    // Ajout d'une conclusion si le texte est trop court
    if (sentences.length < 4) {
      sentences.push(
        "Pour plus d'informations, suivez l'actualité sur ce sujet dans nos prochaines éditions.",
      );
    }

    // Regroupement en paragraphes
    let enriched = '';
    for (let i = 0; i < sentences.length; i++) {
      enriched += sentences[i];
      if ((i + 1) % 3 === 0)
        enriched += '\n\n'; // saut de ligne tous les 3 phrases
      else enriched += ' ';
    }

    // Nettoyage final
    enriched = enriched
      .replace(/\s{2,}/g, ' ')
      .replace(/ ([.,!?:;])/g, '$1')
      .trim();

    // Capitalisation du début
    enriched = enriched.charAt(0).toUpperCase() + enriched.slice(1);

    return enriched;
  }

  private cleanArticleContent(content: string): string {
    if (!content) return content;
    return (
      content
        // Supprime le trunk
        .replace(/\[\+\d+\schars\]/gi, '')
        // Supprime (détails à suivre)
        .replace(/\(détails à suivre\)/gi, '')
        // Supprime la phrase parasite
        .replace(
          /Pour plus d'informations, suivez l'actualité sur ce sujet dans nos prochaines éditions\./gi,
          '',
        )
        // Supprime "Dans cet article: ..."
        .replace(/^Dans cet article:.*?\.\s*/gis, '')
        // Supprime les espaces multiples et débuts/fin
        .replace(/\s{2,}/g, ' ')
        .trim()
    );
  }
}

// À placer dans ton cleaner d'article
