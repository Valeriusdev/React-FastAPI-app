const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`border border-gray-300 text-sm px-4 py-2 rounded outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-colors disabled:opacity-50 ${className}`}
  />
);

export default Input;
