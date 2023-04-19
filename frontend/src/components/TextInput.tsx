type Props = {
  id: string;
  name: string;
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextInput({ id, name, label, value, onChange }: Props) {
  return (
    <div className="max-w-xs w-full">
      <label htmlFor={id} className="text-neutral-600 text-base font-medium">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        required
        className="block h-10 w-full py-0.5 px-2 mx-auto mt-1 box-border border border-solid border-neutral-300 rounded bg-neutral-50 text-neutral-700 text-base"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export default TextInput;
