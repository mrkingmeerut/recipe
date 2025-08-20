import { Heart } from 'lucide-react'
import { Button } from './ui/button'

export function SiteFooter() {
  return (
    <footer id="community" className="bg-primary text-primary-foreground">
      <div className="container py-10 text-center">
        <h3 className="text-xl font-headline font-semibold mb-4 flex items-center justify-center gap-2">
          Join the Mrs. & Mr. Recipe Community <Heart className="h-5 w-5 fill-white" />
        </h3>
        <p className="mb-6 max-w-md mx-auto">
          Subscribe on YouTube, follow us on social media, and cook with us!
        </p>
        <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90">
          <a href="https://www.youtube.com/@Mrs._and_Mr._recipe/" target="_blank" rel="noopener noreferrer">
            Subscribe on YouTube
          </a>
        </Button>
        <p className="mt-6 text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} Mrs. & Mr. Recipe. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
