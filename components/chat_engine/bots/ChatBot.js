import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export const chatBot = async (req, res) => {
    try {
        const { prompt } = req.body
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." })
        }
       
  const wasteBotInfo = `{
  "name": "WasteBot",
  "developed": "2025",
  "purpose": "AI Assistant for the Waste2Earn Program",
  "services": [
    "Waste Segregation Guidance",
    "Recycling Information Delivery",
    "Waste2Earn Program Support",
    "Environmental Education Resources",
    "Waste Collection Scheduling Assistance"
  ],
  "capabilities": {
    "realTimeIdentification": "Analyze images of waste items for proper classification",
    "pointsCalculation": "Track and calculate reward points for recycled materials",
    "localResources": "Connect users with nearby recycling centers and collection points",
    "educationalContent": "Provide environmental tips and sustainable practices"
  },
  "programFeatures": {
    "size": "Supporting Philippines as testing ground",
    "impact": "Over 1 million tons of waste properly managed through the program",
    "rewards": "Digital tokens, discount coupons, and community improvement funds"
  },
  "contactInfo": {
    "email": "waste2earn.xyz@gmail.com contact",
    "helpline": "(082)282-645 Main Office- Davao City, Philippines",
    "hours": "24/7 AI assistance, human support available Monday-Friday, 8am-8pm local time",
    "response": "Immediate AI responses, under 2 hours for specialized human assistance",
    "If the user wants to talk to a real person.": "Direct users to the helpline or email for human support",
    "Do not put characters period, commas when providing a url, use a space when you add once since it will mess up the original link (Do not do this \\"https://waste2earn.xyz\\" instead do this \\Visit our social media pages \\").": "Link formatting guideline"
  },
  "program": {
    "visit": "https://waste2earn.xyz and create an wallet account to start earning rewards for responsible waste management.",
    "Use this link to register for the Waste2Earn program and start earning rewards for responsible waste management.": "Description for signup",
    "If the user wants to join the program or learn how to participate.": "When to provide signup information",
    "Do not put characters period, commas when providing a url, use a space when you add once since it will mess up the original link (Do not do this \\"https://waste2earn.xyz\\" instead do this \\Visit our social media pages \\").": "Link formatting guideline"
  },
  "faq": [
    {
      "question": "How do I earn points through the Waste2Earn program?",
      "answer": "You earn points by properly segregating and depositing recyclable materials at designated collection points. Use the WasteBot app to scan QR codes at drop-off locations, which will credit points to your account based on material type and weight."
    },
    {
      "question": "What types of waste are accepted in the program?",
      "answer": "The program accepts clean plastics (types 1-7), glass, paper, cardboard, aluminum, electronic waste, and organic waste for composting. Different materials have different point values based on recycling value."
    },
    {
      "question": "How can I redeem my Waste2Earn points?",
      "answer": "Points can be redeemed through the app or website for digital rewards, discount coupons at partner stores, public transportation credits, or can be donated to community environmental projects."
    },
    {
      "question": "Does WasteBot work offline?",
      "answer": "WasteBot requires internet connection for full functionality including image recognition and real-time point calculations. However, basic waste segregation guides are available offline within the app once downloaded."
    }
  ]
}`

        const newPrompt = `You are an AI Assistant for ${companyInfo}. Be helpful, professional, direct and shorten your response. Do not add periods(.) after a url . If you can't answer a specific technical question, offer to connect the user with a ${companyInfo}. Include the following information when appropriate for this users prompt '${prompt}'.`

        const response = await axios.post(
        "https://api.anthropic.com/v1/messages",
        {
            model: "claude-3-opus-20240229",
            max_tokens: 500,
            temperature: 0.7,
            stream: false,
            messages: [{ role: "user", content: newPrompt }], 
        },
        {
            headers: {
            "x-api-key": process.env.ANTHROPIC_API_KEY, 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "anthropic-version": "2023-06-01",
            },
        }
        )

        if (response.data?.content) {
            return res.status(200).json({ message: response.data.content })
        } else {
            return res.status(500).json({ error: "No response from AI." })
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." })
    }
}