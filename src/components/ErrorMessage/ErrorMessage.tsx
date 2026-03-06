import { PRODUCT_CONSTANTS } from '../../constants/productConstants';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <section className="p-8 text-center" role="alert" aria-live="polite">
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {PRODUCT_CONSTANTS.errorMessage.retry}
        </button>
      )}
    </section>
  );
};

export default ErrorMessage;
