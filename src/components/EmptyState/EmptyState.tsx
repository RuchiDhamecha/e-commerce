interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => (
  <section
    className="flex min-h-[200px] items-center justify-center rounded-lg border border-gray-200 bg-white p-8"
    role="status"
    aria-live="polite"
  >
    <p className="text-center text-gray-600">{message}</p>
  </section>
);

export default EmptyState;
