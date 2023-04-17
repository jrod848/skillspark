import wixSecretsBackend from 'wix-secrets-backend';
import { Configuration, OpenAIApi } from "openai";

export async function createPrompt(jobTitle) {
    const secret = await wixSecretsBackend.getSecret("openAIKey")

    const configuration = new Configuration({
        apiKey: secret,
    });

    const openai = new OpenAIApi(configuration)

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
