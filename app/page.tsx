import { Nav } from "./components/Nav";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/ui/Marquee";
import { Problems } from "./components/sections/Problems";
import { Solution } from "./components/sections/Solution";
import { Features } from "./components/sections/Features";
import { HowItWorks } from "./components/sections/HowItWorks";
import { Pricing } from "./components/sections/Pricing";
import { FAQ } from "./components/sections/FAQ";
import { Waitlist } from "./components/sections/Waitlist";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee
          items={[
            "Anthropic",
            "OpenAI",
            "Mistral",
            "Gemini",
            "Cohere",
            "DeepSeek",
            "Groq",
            "Together",
          ]}
        />
        <Problems />
        <Solution />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
