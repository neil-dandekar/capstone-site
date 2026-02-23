import { cloneElement, forwardRef, isValidElement } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
  outline: "border border-zinc-300 bg-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800",
  ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  icon: "h-10 w-10"
};

const Button = forwardRef(function Button(
  { className, variant = "default", size = "default", asChild = false, ...props },
  ref
) {
  const { children, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (asChild) {
    const child = children;
    if (!isValidElement(child)) return null;
    return cloneElement(child, {
      ...rest,
      className: cn(child.props.className, classes)
    });
  }

  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  );
});

export { Button };
