import {
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

const features = [
  {
    name: "Standout",
    description: "Bundled products are simply a better deal for users.",
    icon: StarIcon,
  },
  {
    name: "Increase sales",
    description:
      "Users are more likely to try new products offered in a bundle.",
    icon: ArrowTrendingUpIcon,
  },
  {
    name: "Zero marketing cost",
    description:
      "We make money when you do. That's why we market your product for free.",
    icon: CurrencyDollarIcon,
  },
];

export default function Features() {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Sell more
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your new revenue channel
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {`Bundling is a proven sales method used in most industries from
              the Microsoft's Office Suite and McDonald's Big Mac Meal. You
              should offer bundles too.`}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
