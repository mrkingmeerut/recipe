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

export async function suggestRecipeFromIngredients(
  input: SuggestRecipeFromIngredientsInput
): Promise<SuggestRecipeFromIngredientsOutput> {
  return suggestRecipeFromIngredientsFlow(input);
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
