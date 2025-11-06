import { GoogleGenAI } from "@google/genai";
import { DashboardStats } from "./../types";

// IMPORTANT: This assumes the API_KEY is set in the environment.
// In a real application, this key should be handled securely and not exposed on the client-side.
// This service should be called from a backend proxy to protect the API key.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const generatePrompt = (data: DashboardStats): string => {
  return `
    As an expert business analyst for an Internet Service Provider, analyze the following monthly data and provide a concise summary of key trends, potential issues, and actionable recommendations.

    Data:
    - Total Revenue: BDT ${data.totalRevenue.toLocaleString()}
    - New Customers: ${data.newCustomers}
    - Churned Customers: ${data.churnedCustomers}
    - Active Subscriptions: ${data.activeSubscriptions}
    - Average Revenue Per User (ARPU): BDT ${data.arpu.toFixed(2)}
    - Top Selling Package: '${data.topPackage}'
    - Open Support Tickets: ${data.openTickets}

    Focus on revenue growth, customer churn, and package performance. Use Markdown for formatting with headings, bold text, and bullet points. Keep the summary under 250 words.
  `;
}

export const generateInsights = async (data: DashboardStats): Promise<string> => {
  if (!API_KEY) {
    // Return a mock response if API key is not available
    return Promise.resolve(`**AI Insights Unavailable**

*API Key Not Configured*

To enable AI-powered insights, please configure your Gemini API key. This feature provides automated analysis of your ISP's performance, including:

- Revenue and churn analysis.
- Package performance review.
- Actionable recommendations.
    `);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: generatePrompt(data),
    });
    return response.text;
  } catch (error) {
    console.error("Error generating insights from Gemini API:", error);
    throw new Error("Failed to generate AI insights. Please check the console for more details.");
  }
};
