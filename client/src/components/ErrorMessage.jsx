const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded flex items-center gap-3">
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="font-bold text-red-500 hover:text-red-700"
      >
        &times;
      </button>
    </div>
  );
};

export default ErrorMessage;
