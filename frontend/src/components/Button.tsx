type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      className="flex items-center justify-center px-6 py-3 border-transparent rounded-lg bg-ess-orange text-neutral-50 font-bold text-sm hover:cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
