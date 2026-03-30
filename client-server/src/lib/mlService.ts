import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL!;

export async function sendNewsToML(newsBatch: any[]) {
  try {
    const mlPayload = newsBatch.map((article) => ({
      date: article.date,
      source: article.source,
      title: article.title,
      description: article.description,
    }));

    const response = await axios.post(ML_SERVICE_URL, {
      news: mlPayload,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}