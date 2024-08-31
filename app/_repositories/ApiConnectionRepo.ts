export async function loadApiKey(): Promise<string | null> {
    return null;
}

export async function storeApiKey(apiKey: string) {
    console.log("Storing API key:", apiKey);
}

export async function resetApiKey() {
    console.log("Resetting API key");
}