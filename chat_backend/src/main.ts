import express from "express";
import OpenAI from "openai";
import { config } from "dotenv";
import fs from "fs/promises";
import gptTools from "./functions/tools.json";
import populateInstructionTemplate from "./utils/populateInstructionTemplate";

config();
const app = express();

app.use(express.json());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

app.post("/setup/initial", async (req, res) => {
	const setup = {
		name: req.body.name,
		venue: req.body.venue,
		location: req.body.location
	}

	await fs.writeFile("../setup.json", JSON.stringify(setup));
	res.send({
		message: "initial setup completed"
	}).status(201);
});

app.post("/setup/about", async (req, res) => {
	const setup = require("../setup.json");
	const instructions = await populateInstructionTemplate(
		setup.name, 
		req.body.description
	)
	
	try {
		await openai.beta.assistants.create({
			instructions: String(instructions),
			name: "SIH_assistant",
			model: "gpt-3.5-turbo",
			tools: [gptTools as OpenAI.Beta.Assistants.AssistantTool]
		})

		res.status(200).send({
			message: "Assistant created successfully"
		});
	} catch (err) {
		res.status(500).send();
		console.log(err);
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
})