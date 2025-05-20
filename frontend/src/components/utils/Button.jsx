function Button({ children, type = "button", onClick, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#121212] text-[#F5F5F5] px-4 py-2 rounded-lg hover:bg-[#1B3B2F] transition font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
