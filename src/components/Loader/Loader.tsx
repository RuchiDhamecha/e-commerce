const Loader = () => (
  <section
    className="flex min-h-[200px] items-center justify-center p-8"
    aria-label="Loading"
    aria-live="polite"
  >
    <div
      className="w-8 h-8 border-2 border-gray-200 border-t-blue-600 rounded-full"
      style={{ animation: 'spin 0.6s linear infinite' }}
    />
  </section>
);

export default Loader;
