import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function Example() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Register
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Bundle your product
        </h1>
        <p className="mt-6 text-xl leading-8">
          Tell us about your product. We will set your product up on our
          marketplace for you. Enjoy being a customer.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>Just make sure your product meets these requirements.</p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Real.</strong>{" "}
                Your product must be a real working product. No landing page or
                a vaporware.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Priced.</strong>{" "}
                Your product must have a price. Otherwise users won't bundle up
                for discounts.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Website.
                </strong>{" "}
                Your product needs to have a website so users can learn about
                your product before bundling.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            If your product is ready to be bundled. Just fill in this form. We
            will get back to you in 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
