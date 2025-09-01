// Prompt to check if a text was AI-generated. Returns JSON with percentage,
// detection flag, and short explanation.
export const ANALYSIS_PROMPT = `
Actúa como experto detector de contenido generado por IA. Analiza el archivo adjunto.

IMPORTANTE: Responde ÚNICAMENTE con JSON válido en este formato exacto:
{
  "ia_percentage": [número entero 0-100],
  "ia_detected": [true si >50%, false si ≤50%],
  "explanation": "[máximo 200 caracteres explicando tu análisis]"
}

No agregues texto adicional fuera del JSON.
`;