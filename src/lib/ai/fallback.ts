import { SkillGap } from "./skill-analyzer";

export function generateFallbackGaps(
  currentScores: Record<string, number>,
  targetCareer: string
): SkillGap[] {
  // Simple rule-based logic to mock gap analysis when AI is not available
  
  const gaps: SkillGap[] = [];
  
  // Basic industry standard targets based on the assessment type (simplified)
  const requiredStandards: Record<string, number> = {
    "Algorithms": 80,
    "Databases": 70,
    "Frontend Frameworks": 75,
    "Teamwork": 85,
    "Communication": 80,
  };

  for (const [category, currentScore] of Object.entries(currentScores)) {
    const required = requiredStandards[category] || 75; // Default required score is 75
    
    if (currentScore < required) {
      const gap = required - currentScore;
      let priority: "critical" | "high" | "medium" | "low" = "low";
      
      if (gap > 40) priority = "critical";
      else if (gap > 20) priority = "high";
      else if (gap > 10) priority = "medium";

      gaps.push({
        skill_name: `Advanced ${category}`,
        category: "technical", // Hardcoded for fallback
        current_level: currentScore,
        required_level: required,
        gap_score: gap,
        priority,
        recommended_resources: [
          { title: `${category} Fundamentals Course`, url: "#" },
          { title: `Practical Guide to ${category}`, url: "#" }
        ]
      });
    }
  }

  // If they somehow have perfect scores in everything assessed, suggest a soft skill gap just to populate data.
  if (gaps.length === 0) {
    gaps.push({
      skill_name: "Industry Domain Knowledge",
      category: "domain",
      current_level: 60,
      required_level: 80,
      gap_score: 20,
      priority: "medium",
      recommended_resources: [
        { title: `Introduction to ${targetCareer} Industry`, url: "#" }
      ]
    });
  }

  // Sort by gap_score descending
  return gaps.sort((a, b) => b.gap_score - a.gap_score).slice(0, 5);
}
