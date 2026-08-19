import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  CallToAction,
  Footer,
} from "@/components/landing";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  );
}
