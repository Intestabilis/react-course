"use client";

// error boundary always needs to be a client component

// accepting error and reset props (reset is interactive to do smth so that's why error MUST be a client component)

// Just as normal react error boundary, catching only rendering errors but NOT in callback functions
// Also this boundary doesn't catch errors that might happen in the root layout
// to catch errors in root layout we need to create global-error.js (that will replace the entire layout including root if error happens)
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
