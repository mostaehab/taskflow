import { memo } from "react";
import Button from "../ui/Button";
const CallToAction = () => {
  return (
    <div className="px-6 py-24">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-sidebar px-8 py-12 shadow-lg md:px-14 md:py-16">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground-inverse">
            Ready to get organized
          </h2>
          <span className="text-lg leading-relaxed text-foreground-inverse/70">
            Join us and get more done
          </span>
        </div>
        <Button
          size="large"
          className="shrink-0 bg-foreground-inverse text-sidebar hover:bg-foreground-inverse/90 active:bg-foreground-inverse/80 focus-visible:ring-foreground-inverse/50 focus-visible:ring-offset-sidebar"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default memo(CallToAction);
