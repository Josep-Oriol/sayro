function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-[#A0A0A0]">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="bg-[#1E1E1E] border border-[#2D2D2D] text-[#F5F5F5] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A38] transition"
      />
    </div>
  );
}

export default Input;
