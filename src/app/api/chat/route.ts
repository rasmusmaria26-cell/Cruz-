import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not defined in environment variables." },
                { status: 500 }
            );
        }

        const prompt = `You are a helpful assistant for Sailors Consultancy, a maritime documentation service. You help seafarers with DGS, CDC, INDOS, STCW, and insurance queries. Keep answers concise and professional.

User question: ${message}

Your response:`;

        // Use gemini-2.0-flash which is available for this API key
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        return NextResponse.json({ response: text });
    } catch (error: any) {
        console.error("Error in Gemini API:", error?.message || error);
        return NextResponse.json(
            { error: "Failed to process request." },
            { status: 500 }
        );
    }
}
