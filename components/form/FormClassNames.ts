export const errorClass = (message?: string) =>
  message
    ? "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500"
    : "text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600";
