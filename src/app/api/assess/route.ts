import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { buildAssessmentPrompt } from "@/lib/assessment-prompt";
import { getMockAssessment } from "@/lib/mock-assessment";
import type { AssessmentResult, LendingFormData, Verdict } from "@/lib/types";

const DEFAULT_GROK_MODEL = "llama-3.3-70b-versatile";

function parseAssessmentJson(text: string): AssessmentResult {
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
  const parsed = JSON.parse(cleaned) as AssessmentResult;

  const validVerdicts: Verdict[] = ["LEND", "LEND WITH CAUTION", "DECLINE"];
  if (!validVerdicts.includes(parsed.verdict)) {
    throw new Error("Invalid verdict in AI response");
  }

  return {
    verdict: parsed.verdict,
    trustScore: Math.min(100, Math.max(0, Number(parsed.trustScore) || 50)),
    headline: parsed.headline || "Assessment complete",
    reasoning: parsed.reasoning || "",
    pros: Array.isArray(parsed.pros) ? parsed.pros.slice(0, 5) : [],
    cons: Array.isArray(parsed.cons) ? parsed.cons.slice(0, 5) : [],
    practicalAdvice: parsed.practicalAdvice || "",
    ...(parsed.islamicPerspective
      ? { islamicPerspective: parsed.islamicPerspective }
      : {}),
  };
}

function getGrokApiKey(): string | undefined {
  return process.env.GROK_API_KEY?.trim();
}

function getGrokModel(): string {
  return process.env.GROK_MODEL?.trim() || DEFAULT_GROK_MODEL;
}

export async function POST(request: Request) {
  let body: LendingFormData;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const apiKey = getGrokApiKey();

  if (!apiKey) {
    return NextResponse.json(getMockAssessment(body));
  }

  try {
    const grok = new Groq({ apiKey });
    const completion = await grok.chat.completions.create({
      model: getGrokModel(),
      max_tokens: 1500,
      temperature: 0.6,
      messages: [
        {
          role: "user",
          content: buildAssessmentPrompt(body),
        },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      throw new Error("No text in model response");
    }

    const result = parseAssessmentJson(text);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Grok assessment error:", err);
    return NextResponse.json(getMockAssessment(body));
  }
}
