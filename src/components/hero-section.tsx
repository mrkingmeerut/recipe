"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

const foodIcons = ["🥘", "🍕", "🍔", "🍜", "🍩", "🥗"];

export function HeroSection() {
    const [icon, setIcon] = useState(foodIcons[0]);
    const [isFading, setIsFading] = useState(false);
    
    useEffect(() => {
        let iconIndex = 0;
        const intervalId = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                iconIndex = (iconIndex + 1) % foodIcons.length;
                setIcon(foodIcons[iconIndex]);
                setIsFading(false);
            }, 500);
        }, 2000);
        
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="text-center py-20 bg-gradient-to-r from-orange-100 via-white to-orange-50">
            <div className="container">
                <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 font-headline">
                    Welcome to Mrs. & Mr. Recipe Studio{' '}
                    <span 
                        id="food-icon" 
                        className={`inline-block transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
                    >
                        {icon}
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    Your full-stack recipe & vlog workspace — discover quick recipes, fun food vlogs, and cooking hacks, all in one place!
                </p>
                <div className="flex justify-center space-x-4">
                    <Button asChild size="lg">
                        <Link href="#recipes">Explore Recipes</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
                        <Link href="#videos">Watch Videos</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
