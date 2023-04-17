import wixSecretsBackend from 'wix-secrets-backend';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration)

export async function getAPIKey() {
    return await wixSecretsBackend.getSecret("openAIKey")
}

export async function createPrompt(jobTitle) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Give me three separeted detailed single sentences regarding the skills a person working as ${jobTitle} would put in their resume. `,
            temperature: 0.6,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log(completion.data)
        return completion.data.choices[0].text
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}
