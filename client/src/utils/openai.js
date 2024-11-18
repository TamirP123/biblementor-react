import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: For demo purposes only
});

// Mock response for development
const mockResponses = {
  "Jeremiah 29:11": "This verse offers comfort and hope, emphasizing God's sovereign plan for His people. It was originally spoken to the Israelites in Babylonian exile, assuring them that despite their current hardship, God had good plans for their future. Today, it reminds us that God's plans for us are ultimately for our welfare, not harm, and include a future filled with hope.",
  "Philippians 4:13": "This powerful statement by Paul emphasizes that through Christ's strength, we can face any circumstance. Written while Paul was in prison, it shows that our ability to handle life's challenges comes not from our own strength, but through our relationship with Christ who empowers us.",
  "Psalm 23:1": "This beloved verse presents God as our shepherd, a metaphor that would have been well understood in ancient pastoral culture. It suggests complete provision and care - just as a shepherd provides everything their sheep need, God provides everything we need for our spiritual and physical well-being.",
  "Romans 8:28": "This verse assures believers that God works all circumstances - both good and difficult - together for good. It's important to note that this promise is specifically for those who love God and are called according to His purpose. It doesn't mean everything that happens is good, but that God can work through all situations for our spiritual growth and His purposes.",
  "Proverbs 3:5": "This wisdom teaches us to rely on God's understanding rather than our own limited perspective. It encourages complete trust in God's wisdom and guidance, acknowledging that our human understanding is limited and can be flawed. This verse pairs well with verse 6, which promises God's direction when we submit to His wisdom."
};

export const generateBibleResponse = async (prompt) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Extract verse reference from prompt
    const verseMatch = Object.keys(mockResponses).find(verse => prompt.includes(verse));
    
    if (verseMatch) {
      return mockResponses[verseMatch];
    }
    
    return "This is a demonstration response. To get real AI-powered interpretations, please set up your OpenAI API key with valid billing information.";
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 