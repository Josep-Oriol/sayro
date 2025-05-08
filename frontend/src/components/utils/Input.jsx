function Input({ label, type = "text", name, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-dark-light">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-dark-surface border border-dark-border text-dark-light px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-accent transition"
      />
    </div>
  );
}

export default Input;
