const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded flex items-center gap-3">
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="ml-auto text-red-400 hover:text-red-600 hover:bg-red-200 rounded px-1.5 py-0.5 transition-colors"
      >
        &times;
      </button>
    </div>
  );
};

export default ErrorMessage;
