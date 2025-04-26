import * as React from "react";
import { cn } from "../../lib/utils";

const Footer = React.forwardRef(({ className, ...props }, ref) => (
  <footer
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-between gap-4 border-t py-6 md:h-14 md:flex-row md:py-0",
      className
    )}
    {...props}
  />
));
Footer.displayName = "Footer";

const FooterContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0",
      className
    )}
    {...props}
  />
));
FooterContent.displayName = "FooterContent";

const FooterText = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-center text-sm leading-loose text-muted-foreground md:text-left",
      className
    )}
    {...props}
  />
));
FooterText.displayName = "FooterText";

export { Footer, FooterContent, FooterText };
