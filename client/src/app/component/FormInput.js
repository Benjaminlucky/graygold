export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-sm font-medium text-primary-700"
        >
          {label}
          {required && <span className="text-secondary-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-primary-200 bg-white px-4 py-3 text-primary-900 placeholder-primary-400 transition-all duration-200 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20"
      />
    </div>
  );
}
