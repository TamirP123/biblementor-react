import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: Only for development
});

export const generateBibleResponse = async (prompt) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are a knowledgeable Bible scholar and theologian. Provide accurate, insightful analysis of biblical texts, incorporating historical context, interpretation, and practical application. Keep responses clear and accessible for a general audience while maintaining theological depth."
      }, {
        role: "user",
        content: prompt
      }],
      max_tokens: 500, // Increased token limit for more detailed analysis
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}; 