const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const OpenAI = require("openai").OpenAI;
const openai = new OpenAI();
const app = express();

messages = [         
  {       
  role: "system",
  content: "Your name is Chib-Bot and you are a helpful assistant.",
  }
];

app.use(express.static('public'))

app.use(express.urlencoded({ extended:true}))

app.use(express.json())



//POST REQUEST 


app.post('/api/gpt', async(req,res) => {
    //initiate message variable with the req object message prop 
    const message = req.body.message

    messages.push({
      role: "user",
      content: message,
    });

    try {
    const response = await openai.chat.completions.create({
        model: "gpt-4",//"gpt-3.5-turbo" "gpt-4"
        max_tokens: 500,
        messages,
    });

    ChatGptMsg = response.choices[0].message.content;

    messages.push({
      role: "assistant",
      content: ChatGptMsg,
    });

        
   res.json({ message: ChatGptMsg });
  

       
    }catch (error) {
        console.error("Error in server.js:", error.message);
        }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

