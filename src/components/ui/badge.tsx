interface BadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "coral" | "gray";
  className?: string;
}

export function Badge({ children, variant = "emerald", className = "" }: BadgeProps) {
  const variants = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    coral: "bg-coral-50 text-coral-700 dark:bg-coral-900/30 dark:text-coral-400",
    gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
