import express from 'express';
import redis from 'redis';
import { Configuration, OpenAIApi } from 'openai';

const router = express.Router();

// Create a Redis client using the REDIS_URL from environment variables
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Connect to Redis
redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.connect();

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Use the API key from environment variables
});
const openai = new OpenAIApi(configuration);

// GET /proposals
router.get('/proposals', async (req, res) => {
  try {
    const proposals = await redisClient.get('proposals');
    res.json(JSON.parse(proposals) || []);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving proposals', error: error.message });
  }
});

// POST /proposals/:proposalId/ideas
router.post('/proposals/:proposalId/ideas', async (req, res) => {
  const { proposalId } = req.params;
  try {
    const proposals = JSON.parse(await redisClient.get('proposals')) || [];
    const proposal = proposals.find(p => p.id == proposalId);
    if (proposal) {
      // Call OpenAI API to generate ideas
      const gptResponse = await openai.createCompletion({
        model: 'gpt-o1-preview',
        prompt: `Generate ideas for proposal with ID: ${proposalId}`,
      });
      const ideaContent = gptResponse.data.choices[0].text.trim();
      const idea = { id: proposal.ideas.length + 1, content: ideaContent };
      proposal.ideas.push(idea);
      await redisClient.set('proposals', JSON.stringify(proposals));
      res.json(idea);
    } else {
      res.status(404).json({ message: 'Proposal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error generating idea', error: error.message });
  }
});

// POST /proposals/:proposalId/generate
router.post('/proposals/:proposalId/generate', async (req, res) => {
  const { proposalId } = req.params;
  try {
    const proposals = JSON.parse(await redisClient.get('proposals')) || [];
    const proposal = proposals.find(p => p.id == proposalId);
    if (proposal) {
      const sections = {
        "1. Project Planning and Requirements Gathering": {
          "1.1 Define Objectives": "Clearly state the primary and secondary objectives of this proposal.",
          "1.2 Identify Stakeholders": "List all individuals or groups who will be affected by or involved in this proposal.",
          "1.3 Define Success Metrics": "Identify specific, measurable, achievable, relevant, and time-bound (SMART) metrics to evaluate the success of this proposal."
        },
        "2. Information Gathering": {
          "2.1 Identify Information Sources": "Specify the sources from which you will gather information for this proposal.",
          "2.2 Develop Research Methods": "Describe the methods you will use to gather information from the identified sources.",
          "2.3 Ensure Compliance and Ethics": "Outline the ethical considerations and legal requirements related to information gathering for this proposal."
        },
        "3. Information Synthesis and Analysis": {
          "3.1 Information Refinement": "Instructions: Describe the steps involved in refining the gathered information. This includes validating information, resolving inconsistencies, and prioritizing key findings.",
          "3.2 Structure and Organize Information": "Instructions: Explain how you will structure and organize the refined information for inclusion in the proposal. This involves creating a logical flow and ensuring clear communication of key points.",
          "3.3 Develop Key Arguments (Optional)": "Instructions: If applicable, describe the process of developing key arguments to support your proposal. This includes identifying supporting evidence and formulating persuasive reasoning."
        },
        "4. Proposal Framework Development": {
          "4.1 Define the Core Message": "Instructions: Articulate the core message of your proposal. This should be a concise and compelling statement of your main idea.",
          "4.2 Develop Proposal Structure": "Instructions: Describe the overall structure of your proposal. This includes outlining the main sections and subsections, and establishing a clear narrative flow.",
          "4.3 Incorporate Persuasive Techniques": "Instructions: Define the persuasive techniques you will use in your proposal. This includes using strong evidence, addressing potential counterarguments, and appealing to the interests of the stakeholders."
        },
        "5. Proposal Content Development": {
          "5.1 Draft Proposal Sections": "Instructions: Write the content for each section of the proposal, ensuring alignment with the defined structure and core message.",
          "5.2 Refine and Edit Content": "Instructions: Review and edit the drafted content for clarity, conciseness, and accuracy. Ensure that the language is persuasive and appropriate for the target audience.",
          "5.3 Incorporate Visual Aids (Optional)": "Instructions: If applicable, create and incorporate visual aids such as charts, graphs, or diagrams to enhance the clarity and impact of your proposal."
        },
        "6. Proposal Finalization and Submission": {
          "6.1 Format and Style": "Instructions: Apply consistent formatting and styling to the entire proposal document. Adhere to any specific guidelines provided by the recipient.",
          "6.2 Final Review and Proofread": "Instructions: Conduct a final review and proofread of the entire proposal to ensure it is free of errors and meets the highest standards of quality.",
          "6.3 Submission Process": "Instructions: Describe the process for submitting the proposal, including any required platforms or formats."
        },
        "7. Post-Submission Activities (If Applicable)": {
          "7.1 Follow-up Communication": "Instructions: Outline any planned follow-up communication after submitting the proposal.",
          "7.2 Proposal Revision (If Applicable)": "Instructions: Describe the process for revising the proposal if necessary, based on feedback or changes in circumstances."
        },
        "8. Evaluation and Improvement (Post-Decision)": {
          "8.1 Assess Outcomes": "Instructions: Evaluate the outcome of the proposal submission (e.g., accepted, rejected, revisions requested).",
          "8.2 Identify Lessons Learned": "Instructions: Reflect on the proposal development process and identify any lessons learned for future proposals."
        },
        "9. Tools and Resources": "Instructions: List and describe the tools and resources used in developing and submitting the proposal.",
        "10. Timeline": "Instructions: Provide a timeline for completing the proposal development and submission process.",
        "11. Contingency Planning": "Instructions: Identify potential challenges or unexpected events that could impact the proposal development process and outline contingency plans to address them."
      };

      const generatedProposal = {};

      for (const [section, instructions] of Object.entries(sections)) {
        generatedProposal[section] = {};
        for (const [instruction, prompt] of Object.entries(instructions)) {
          const gptResponse = await openai.createCompletion({
            model: 'gpt-o1-preview',
            prompt: `Proposal ID: ${proposalId}. ${prompt}`,
          });
          generatedProposal[section][instruction] = gptResponse.data.choices[0].text.trim();
        }
      }

      res.json(generatedProposal);
    } else {
      res.status(404).json({ message: 'Proposal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error generating proposal', error: error.message });
  }
});

export default router;
