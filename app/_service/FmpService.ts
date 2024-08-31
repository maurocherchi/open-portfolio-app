export async function testApiKey(apiKey: string): Promise<"valid" | "invalid"> {
    console.log("Testing API key:", apiKey);
    return "valid";
}