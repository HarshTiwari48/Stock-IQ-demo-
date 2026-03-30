import NewsAPI from "newsapi";

const NEWS_API_KEY = process.env.NEWS_API_KEY!;

const newsapi = new NewsAPI(NEWS_API_KEY);

export async function fetchFinanceNews() {
  try {
    const today = new Date();
    const threeDaysAgo = new Date();

    threeDaysAgo.setDate(today.getDate() - 3);

    const toDate = today.toISOString().split("T")[0];
    const fromDate = threeDaysAgo.toISOString().split("T")[0];

    const query = `
      ("Nifty 50" OR Sensex OR "Indian stock market"
      OR NSE OR BSE OR Reliance OR Tata
      OR HDFC OR Infosys OR ICICI
      OR ITC OR Maruti)
    `;

    const response = await newsapi.v2.everything({
      q: query,
      from: fromDate,
      to: toDate,
      sortBy: "publishedAt",
      language: "en",
      pageSize: 50,
    });

    return response.articles
      .filter(
        (article: any) =>
          article.title &&
          article.title !== "[Removed]" &&
          article.description
      )
      .map((article: any, index: number) => ({
        article_id: index + 1,
        date: article.publishedAt?.slice(0, 10),
        source: article.source?.name || "Unknown",
        title: article.title,
        description: article.description,

        source_url: article.url,
        image_url: article.urlToImage,

        author: article.author,
        published_at: article.publishedAt,
      }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}