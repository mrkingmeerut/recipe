"use server";

import { suggestRecipeFromIngredients, SuggestRecipeFromIngredientsInput } from "@/ai/flows/suggest-recipe-from-ingredients";
import { z } from "zod";

const SuggestRecipeSchema = z.object({
  ingredients: z.string().min(3, "Please enter at least one ingredient."),
});

export async function handleSuggestRecipe(prevState: any, formData: FormData) {
  const validatedFields = SuggestRecipeSchema.safeParse({
    ingredients: formData.get("ingredients"),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: SuggestRecipeFromIngredientsInput = {
      ingredients: validatedFields.data.ingredients,
    };
    const recipe = await suggestRecipeFromIngredients(input);
    return { data: recipe, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: { _server: ["An unexpected error occurred. Please try again."] } };
  }
}
