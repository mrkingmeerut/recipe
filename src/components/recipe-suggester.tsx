"use client";

import { useFormStatus } from "react-dom";
import { handleSuggestRecipe } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface SuccessState {
  data: {
    ingredients: string;
    recipeName: string;
    instructions: string;
  };
  error: null;
}

interface ErrorState {
  data: null;
  error: {
    ingredients?: string[];
    _server?: string[];
  };
}

interface InitialState {
    data: null;
    error: null;
}

type RecipeState = SuccessState | ErrorState | InitialState;

const initialState: RecipeState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Suggest Recipe
    </Button>
  );
}

export function RecipeSuggester() {
  const [state, formAction] = useActionState(handleSuggestRecipe, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error?._server) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.error._server[0],
      });
    }
    if (state.data) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form ref={formRef} action={formAction} className="space-y-4">
            <div>
              <Textarea
                name="ingredients"
                placeholder="e.g., chicken breast, broccoli, olive oil, garlic"
                className="min-h-[100px] text-base"
                aria-label="Ingredients"
              />
              {state.error?.ingredients && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {state.error.ingredients[0]}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
      
      {state.data && (
        <div className="mt-8">
          <Card className="animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">{state.data.recipeName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-headline font-semibold text-lg">Ingredients</h3>
                <p className="text-muted-foreground whitespace-pre-line">{state.data.ingredients}</p>
              </div>
              <div>
                <h3 className="font-headline font-semibold text-lg">Instructions</h3>
                <p className="text-muted-foreground whitespace-pre-line">{state.data.instructions}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
