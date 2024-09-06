import { promises as fs } from 'fs';

export default async function populateInstructionTemplate(
	name: String,
	description: String,
): Promise<String> {
	let instructionTemplate = (await fs.readFile('src/functions/instructions.txt', 'utf-8')).toString()

	const values = {
    '{name}': name,
    '{description}': description
  };

	for (const [placeholder, value] of Object.entries(values)) {
    instructionTemplate = instructionTemplate.replace(
			new RegExp(placeholder, 
				'g'
			),
			String(value)
		);
  }

	return instructionTemplate;
}