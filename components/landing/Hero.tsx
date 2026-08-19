import { memo } from "react";
import Button from "../ui/Button";
const Hero = () => {
  return (
    <section className="bg-surface py-28 text-foreground md:py-40">
      <div className="container mx-auto flex flex-col gap-6 px-6">
        <h1 className="flex flex-col leading-[1.08] tracking-tight text-[clamp(2.5rem,5vw,3.5rem)] font-bold">
          <span>Organize work.</span>
          <span>Collaborate better.</span>
          <span className="text-foreground-muted">Get things done.</span>
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl text-foreground-secondary">
          TaskFlow is a modern project management platform for high-performing
          teams. Plan, track, and deliver projects with clarity and speed.
        </p>
        <div className="mt-3">
          <Button variant="primary" size="large">
            Start for free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
