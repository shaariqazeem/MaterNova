import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file was uploaded." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Please upload a PDF, PNG, JPG, or JPEG file." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");

    const prompt = `
You are Maternova, a pregnancy healthcare information assistant.

Analyze the uploaded medical document carefully.

IMPORTANT SAFETY RULES:
- Do NOT diagnose the patient.
- Do NOT prescribe medicines.
- Do NOT invent medical values.
- Do NOT invent doctor instructions.
- Only report information that is actually visible in the document.
- If something is unclear, say it is unclear.
- If a laboratory result is flagged High, Low, Abnormal, Positive, Negative, etc., preserve that exact flag.
- Explain the result in simple language without making a diagnosis.
- Encourage the user to discuss abnormal or concerning findings with their healthcare professional.

Extract the following:

1. documentType
2. patientName, if visible
3. gestationalAge, if visible
4. testName
5. result
6. unit
7. referenceValue
8. labFlag
9. simpleExplanation
10. importantPoints - maximum 4 points
11. healthcareFollowUp

For simpleExplanation:
Explain what the report says in easy language.
Do not claim what a result definitively means medically.

Return ONLY valid JSON.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
                {
                  inline_data: {
                    mime_type: file.type,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Gemini API error:", errorText);

      return NextResponse.json(
        {
          error: "Gemini could not analyze the document.",
          details: errorText,
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("") || "";

    if (!text) {
      return NextResponse.json(
        { error: "Gemini returned an empty response." },
        { status: 500 }
      );
    }

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch {
      console.error("Invalid JSON from Gemini:", text);

      return NextResponse.json(
        { error: "Gemini returned an invalid analysis format." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      analysis,
    });
  } catch (error) {
    console.error("Analysis error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while analyzing the document.",
      },
      { status: 500 }
    );
  }
}



