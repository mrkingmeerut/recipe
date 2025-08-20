import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Salad, Donut, Pizza, ChefHat, Heart, UtensilsCrossed } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { HeroSection } from '@/components/hero-section';
import { RecipeSuggester } from '@/components/recipe-suggester';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        <section id="features" className="py-16 px-6 md:px-20 bg-white">
          <h2 className="text-3xl font-bold text-center text-primary mb-12 font-headline">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
            <Card className="bg-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <Salad className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl pt-4">Delicious Salads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Discover a variety of fresh and delicious salad recipes perfect for any meal.</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <Donut className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl pt-4">Tempting Donuts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Indulge in our collection of sweet and savory donut recipes.</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <Pizza className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl pt-4">Perfect Pizzas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">From classic Margherita to creative toppings, find your new favorite pizza.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="recipes" className="py-16 px-6 md:px-20 bg-gradient-to-b from-amber-50 to-white">
          <h2 className="text-3xl font-bold text-center text-primary mb-12 font-headline">Popular Recipes</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <Image src="https://placehold.co/600x400.png" alt="White Sauce Pasta" width={600} height={400} className="w-full h-48 object-cover" data-ai-hint="pasta white sauce" />
              <div className="p-4">
                <h3 className="font-headline font-semibold text-lg">White Sauce Pasta</h3>
                <p className="text-muted-foreground text-sm mt-1">Creamy, cheesy, and super delicious pasta recipe.</p>
              </div>
            </Card>
            <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <Image src="https://placehold.co/600x400.png" alt="Cheese Bread Toast" width={600} height={400} className="w-full h-48 object-cover" data-ai-hint="cheese toast" />
              <div className="p-4">
                <h3 className="font-headline font-semibold text-lg">Cheese Bread Toast</h3>
                <p className="text-muted-foreground text-sm mt-1">Crispy bread toast with gooey cheese topping.</p>
              </div>
            </Card>
            <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <Image src="https://placehold.co/600x400.png" alt="Special Maggi" width={600} height={400} className="w-full h-48 object-cover" data-ai-hint="noodles maggi" />
              <div className="p-4">
                <h3 className="font-headline font-semibold text-lg">Special Maggi</h3>
                <p className="text-muted-foreground text-sm mt-1">Quick and spicy street-style Maggi noodles.</p>
              </div>
            </Card>
          </div>
        </section>

        <section id="ai-suggester" className="py-16 px-6 md:px-20 bg-white">
          <div className="text-center">
            <UtensilsCrossed className="h-12 w-12 mx-auto text-primary mb-4" />
            <h2 className="text-3xl font-bold text-center text-primary mb-4 font-headline">Need a Recipe Idea?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Enter the ingredients you have on hand, and our AI will suggest a delicious recipe for you!
            </p>
          </div>
          <RecipeSuggester />
        </section>
        
        <section id="videos" className="py-16 px-6 md:px-20 bg-amber-50">
          <h2 className="text-3xl font-bold text-center text-primary mb-12 font-headline">Latest Vlog</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl aspect-video">
              <iframe
                src="https://www.youtube.com/embed/NEq1mIGOn1g"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl shadow-lg w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
