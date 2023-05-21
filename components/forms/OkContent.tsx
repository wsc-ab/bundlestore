import Link from "next/link";


export default function OkContent() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Thank you
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Get ready to bundle
        </h1>
        <p className="mt-6 text-xl leading-8">
          Your product has been registered.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>Please wait up to 24 hours until we review your product.</p>
          </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go home
              </Link>
            </div>
      </div>
    </div>
  );
}
