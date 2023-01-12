import express from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config();


//testing
//console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express(); 
app.use(cors());
app.use(express.json())

app.get('/', async(req, res) => {
    res.status(200).send({
        message: 'Hello from Codex'
    })
});


app.post('/', async(req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`, //passing form frontend
            temperature: 0, // higher the temp, more the risk. From 0.7 to 0
            max_tokens: 3000, //can give pretty long responses from 64 to 3000
            top_p: 1,
            frequency_penalty: 0.5, // cannot respond with frequent responses often from 0 - 0.5
            presence_penalty: 0
        })

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})

    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))