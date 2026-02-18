const OpenAI = require('openai');

let openai;
function getClient() {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

const SYSTEM_PROMPT = `You are an image analysis system. Analyze the provided image and return a JSON object with a "tags" array. Each tag must have a "label" (descriptive keyword or short phrase) and a "confidence" (number between 0 and 1). Return between 5 and 15 tags ordered from highest to lowest confidence. Return ONLY valid JSON in this format: {"tags": [{"label": "example", "confidence": 0.95}]}`;

async function analyzeImage(imageBuffer, mimeType) {
  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:${mimeType};base64,${base64Image}`;

  const response = await getClient().chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Analyze this image and return the tags as JSON.' },
          {
            type: 'image_url',
            image_url: { url: dataUrl, detail: 'low' },
          },
        ],
      },
    ],
    max_tokens: 1000,
    temperature: 0.2,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0].message.content;
  const parsed = JSON.parse(content);

  if (!parsed.tags || !Array.isArray(parsed.tags)) {
    throw new Error('Invalid response structure from analysis service');
  }

  parsed.tags = parsed.tags.map(tag => ({
    label: String(tag.label),
    confidence: Math.min(1, Math.max(0, Number(tag.confidence) || 0)),
  }));

  return parsed;
}

module.exports = { analyzeImage };
