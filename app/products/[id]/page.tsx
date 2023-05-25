"use client";

import { classNames } from "@/utils/Tailwind";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

const product = {
  name: "ShipAware",
  price: "220",
  description: "Know about shipping issues before customers do",
  highlights: [
    "Receive alerts for late shipments",
    "View shipments by status",
    "Automate customer service with notifications",
  ],
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg",
  imageAlt: "ShipAware logo",
};
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};
const faqs = [
  {
    question: "Tell us about yourself.",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi ipsum sunt, obcaecati iure minus voluptatem optio eveniet et, atque pariatur minima repellendus, corrupti consequatur quam vel non labore praesentium!",
  },
  {
    question: "Why did you build this?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi ipsum sunt, obcaecati iure minus voluptatem optio eveniet et, atque pariatur minima repellendus, corrupti consequatur quam vel non labore praesentium!",
  },
  {
    question: "How did you build this?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi ipsum sunt, obcaecati iure minus voluptatem optio eveniet et, atque pariatur minima repellendus, corrupti consequatur quam vel non labore praesentium!",
  },
  {
    question: "What features will be added?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi ipsum sunt, obcaecati iure minus voluptatem optio eveniet et, atque pariatur minima repellendus, corrupti consequatur quam vel non labore praesentium!",
  },
  // More FAQs...
];

export default function Product({ params }) {
  console.log(params, "p");

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                className="object-cover object-center"
                fill
              />
            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <p className="mt-2 text-sm text-gray-500">${product.price}</p>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{product.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Bundle
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Visit
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Creator</h3>
              <p className="mt-4 text-sm text-gray-500">
                <a
                  href={"#"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Nathan
                </a>
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                        "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                      )
                    }
                  >
                    Story
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                        "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                      )
                    }
                  >
                    Feedback
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="-mb-10">
                  <h3 className="sr-only">Story</h3>

                  <dl>
                    {faqs.map((faq) => (
                      <Fragment key={faq.question}>
                        <dt className="mt-10 font-medium text-gray-900">
                          {faq.question}
                        </dt>
                        <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                          <p>{faq.answer}</p>
                        </dd>
                      </Fragment>
                    ))}
                  </dl>
                </Tab.Panel>

                <Tab.Panel className="text-sm text-gray-500">
                  <h3 className="sr-only">Feedback</h3>
                  {reviews.featured.map((review, reviewIdx) => (
                    <div
                      key={review.id}
                      className="flex space-x-4 text-sm text-gray-500"
                    >
                      <div className="flex-none py-10">
                        <div className="relative h-10 w-10 rounded-full bg-gray-100">
                          <Image
                            src={review.avatarSrc}
                            alt=""
                            fill
                            className="rounded-full"
                          />
                        </div>
                      </div>
                      <div
                        className={classNames(
                          reviewIdx === 0 ? "" : "border-t border-gray-200",
                          "py-10"
                        )}
                      >
                        <h3 className="font-medium text-gray-900">
                          {review.author}
                        </h3>
                        <p>
                          <time dateTime={review.datetime}>{review.date}</time>
                        </p>

                        <div className="prose prose-sm mt-4 max-w-none text-gray-500">
                          {review.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
