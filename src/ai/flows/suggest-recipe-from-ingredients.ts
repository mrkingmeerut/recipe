'use server';
/**
 * @fileOverview Recipe suggestion flow that takes a list of ingredients and suggests a recipe.
 *
 * - suggestRecipeFromIngredients - A function that suggests a recipe based on ingredients.
 * - SuggestRecipeFromIngredientsInput - The input type for the suggestRecipeFromIngredients function.
 * - SuggestRecipeFromIngredientsOutput - The return type for the suggestRecipeFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRecipeFromIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has available.'),
});
export type SuggestRecipeFromIngredientsInput = z.infer<
  typeof SuggestRecipeFromIngredientsInputSchema
>;

const SuggestRecipeFromIngredientsOutputSchema = z.object({
  recipeName: z.string().describe('The name of the suggested recipe.'),
  ingredients: z.string().describe('A list of ingredients required for the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for the recipe.'),
});
export type SuggestRecipeFromIngredientsOutput = z.infer<
  typeof SuggestRecipeFromIngredientsOutputSchema
>;

export interface SuggestRecipeInput {
  ingredients: string;
}

export interface SuggestRecipeOutput {
  recipeName: string;
  instructions: string;
  ingredients: string;
}

export async function suggestRecipeFromIngredients(input: SuggestRecipeInput): Promise<SuggestRecipeOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `${process.env.GEMINI_API_URL}/models/gemini-2.0-flash:generateContent`;

  const prompt = `Given these ingredients: ${input.ingredients}
  Suggest a recipe that can be made with them. Format the response as JSON with these fields:
  - recipeName: the name of the recipe
  - instructions: detailed cooking instructions
  - ingredients: list of ingredients with quantities`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey!
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    try {
      // Try to parse the response as JSON
      const recipe = JSON.parse(generatedText);
      return {
        recipeName: recipe.recipeName || "Recipe Name Not Available",
        instructions: recipe.instructions || "Instructions Not Available",
        ingredients: recipe.ingredients || input.ingredients
      };
    } catch (e) {
      // If JSON parsing fails, return a formatted error response
      console.error("Failed to parse API response:", e);
      return {
        recipeName: "Error Processing Recipe",
        instructions: "There was an error processing the recipe suggestion. Please try again.",
        ingredients: input.ingredients
      };
    }
  } catch (error) {
    console.error("API request failed:", error);
    return {
      recipeName: "Error Generating Recipe",
      instructions: "There was an error generating the recipe. Please check your API key and try again.",
      ingredients: input.ingredients
    };
  }
}

const prompt = ai.definePrompt({
  name: 'suggestRecipeFromIngredientsPrompt',
  input: {schema: SuggestRecipeFromIngredientsInputSchema},
  output: {schema: SuggestRecipeFromIngredientsOutputSchema},
  prompt: `You are a recipe suggestion bot. Given a list of ingredients, you will suggest a recipe that utilizes those ingredients.

Ingredients: {{{ingredients}}}

Recipe Suggestion:`,
});

const suggestRecipeFromIngredientsFlow = ai.defineFlow(
  {
    name: 'suggestRecipeFromIngredientsFlow',
    inputSchema: SuggestRecipeFromIngredientsInputSchema,
    outputSchema: SuggestRecipeFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
