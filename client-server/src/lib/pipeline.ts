import { fetchFinanceNews } from "./newsService";
import { sendNewsToML } from "./mlService";
import { connectDB } from "./db";
import News from "@/models/News";

export async function runNewsPipeline() {
  try {
    await connectDB();

    // Step 1: fetch raw news
    const fetchedNews = await fetchFinanceNews();

    if (!fetchedNews.length) {
      console.log("No finance news found");
      return;
    }

    // Step 2: send only selected fields to ML
    const mlResult = await sendNewsToML(fetchedNews);

    // Step 3: merge fetched data + ML output
    const mergedNews = fetchedNews.map((article, index) => {
      const analysis = mlResult[index];

      return {
        article_id: article.article_id,
        date: article.date,
        source: article.source,
        title: article.title,
        description: article.description,

        source_url: article.source_url,
        image_url: article.image_url,

        author: article.author,
        published_at: article.published_at,

        impacted_domains:
          analysis?.ai_analysis?.impacted_domains || [],
      };
    });

    // Step 4: store in MongoDB
    for (const article of mergedNews) {
      await News.updateOne(
        { title: article.title },
        { $set: article },
        { upsert: true }
      );
    }

    console.log("Pipeline executed successfully");
  } catch (error) {
    console.error("Pipeline failed:", error);
    throw error;
  }
}