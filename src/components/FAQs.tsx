import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

export const FAQ = ({
  faqs,
}: {
  faqs: {
    question: string;
    answer: string;
  }[];
}) => {
  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
        <br />
        <span className="text-gray-400">(FAQs)</span>
      </h2>
      {faqs.map((faq, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <div className="my-5">
              <DisclosureButton className="flex justify-between w-full px-4 py-2 my-2 text-sm font-medium text-left text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span className="text-2xl">{faq.question}</span>
                <FaChevronDown
                  className={`mx-5 ${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-gray-500`}
                />
              </DisclosureButton>
              <DisclosurePanel className="text-xl text-left border-2 p-8 bg-gray-500 text-orange-300">
                {faq.answer}
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
};
