import express from "express";
import OpenAI from "openai";
import { config } from "dotenv";
import fs from "fs/promises";
import { definition as openingDefinition } from "./functions/opening_hours";
import { definition as fetchSitesDefinition } from "./functions/fetch_sites";
import { definition as fetchEventTicketsDefinition } from "./functions/fetch_event_tickets";

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

	await fs.writeFile("./setup.json", JSON.stringify(setup));
	res.send({
		message: "initial setup completed"
	}).status(201);
});

app.post("/setup/about", async (req, res) => {
	console.log(__dirname)
	const setup = require('../setup.json');
	console.log(setup);
	console.log(typeof setup)
	const instructions = await populateInstructionTemplate(
		setup.name, 
		req.body.description
	)
	
	try {
		const assistant = await openai.beta.assistants.create({
			instructions: String(instructions),
			name: "SIH_assistant",
			model: "gpt-3.5-turbo",
			tools: [
				openingDefinition as OpenAI.Beta.Assistants.AssistantTool,
				fetchSitesDefinition as OpenAI.Beta.Assistants.AssistantTool,
				fetchEventTicketsDefinition as OpenAI.Beta.Assistants.AssistantTool
			]
		})

		console.log(assistant.id);
		setup.assistant = assistant.id;
		await fs.writeFile("./setup.json", JSON.stringify(setup));

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