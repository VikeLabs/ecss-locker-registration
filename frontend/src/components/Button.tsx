type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  compact?: boolean;
};

export default function Button({ children, compact, onClick }: Props) {
  const padding = compact ? "px-4 py-2" : "px-6 py-3";
  return (
    <button
      className={`flex-inline items-center justify-center ${padding} border-transparent rounded-lg bg-ess-orange text-neutral-50 font-bold text-sm hover:cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
