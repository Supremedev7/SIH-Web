import { GoogleGenAI } from '@google/genai';
import { generateFallbackGaps } from './fallback';

// Initialize the Gemini API client
// Will throw an error or fail gracefully if no API key is set
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export interface SkillGap {
  skill_name: string;
  category: "technical" | "soft" | "domain";
  current_level: number;
  required_level: number;
  gap_score: number;
  priority: "critical" | "high" | "medium" | "low";
  recommended_resources: Array<{ title: string; url: string }>;
}

export async function analyzeSkillGaps(
  currentScores: Record<string, number>,
  targetCareer: string = "General Software Engineering"
): Promise<SkillGap[]> {
  if (!ai) {
    console.warn("No GEMINI_API_KEY found. Falling back to rule-based gap analysis.");
    return generateFallbackGaps(currentScores, targetCareer);
  }

  try {
    const prompt = `
    You are an expert career counselor and skill assessor. 
    A student has taken an assessment and achieved the following scores (out of 100) in these categories:
    ${JSON.stringify(currentScores, null, 2)}
    
    Their target career track is: ${targetCareer}.

    Analyze their skill gaps based on industry standards for an entry-level position in this track.
    Identify exactly 3 to 5 key skills they are missing or need to improve.
    
    Respond ONLY with a valid JSON array. Do not include markdown codeblocks (\`\`\`).
    The JSON array must contain objects with the following schema:
    {
      "skill_name": "string",
      "category": "technical" | "soft" | "domain",
      "current_level": number (estimated 0-100 based on their score in the parent category),
      "required_level": number (estimated 0-100 required by industry),
      "gap_score": number (required_level - current_level),
      "priority": "critical" | "high" | "medium" | "low",
      "recommended_resources": [
        { "title": "Resource Name", "url": "https://example.com" }
      ]
    }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini API");
    }

    const json = JSON.parse(response.text);
    return json as SkillGap[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    console.warn("Falling back to rule-based gap analysis.");
    return generateFallbackGaps(currentScores, targetCareer);
  }
}
