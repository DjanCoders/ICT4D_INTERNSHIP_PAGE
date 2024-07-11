const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              About ICT4D Research Center
            </h3>
            <p className="text-sm">
              The ICT4D Research Center is dedicated to leveraging information
              and communication technologies to address development challenges
              globally. We focus on research, innovation, and implementation of
              sustainable technology solutions.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Research
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Publications
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul>
              <li className="mb-2">
                <span className="font-bold">Address:</span> 123 Research Blvd,
                Tech City, TX 75000
              </li>
              <li className="mb-2">
                <span className="font-bold">Email:</span> info@ict4dcenter.org
              </li>
              <li className="mb-2">
                <span className="font-bold">Phone:</span> (123) 456-7890
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Social Media Links */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.993h-2.54v-2.885h2.54V9.584c0-2.507 1.492-3.89 3.77-3.89 1.093 0 2.24.196 2.24.196v2.481h-1.262c-1.244 0-1.63.771-1.63 1.56v1.874h2.773l-.443 2.885h-2.33v6.993C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 19c-7 0-10-5-10-10 0-.4 0-.7.1-1.1.6.3 1.3.5 2 .6-1-.6-1.7-1.6-2-2.7.4.2.8.4 1.2.5C3 5 5.1 4 7.4 4c-2-.6-4.1-1.1-6.2-2.7.8 1.2 1.9 2 3.1 2-.7-.3-1.4-.8-1.9-1.4.2 1.3.6 2.6 1.3 3.6 1 1.5 2.5 2.4 4.3 2.5-.6 0-1.3-.1-1.9-.3.4 1.3 1.5 2.4 3 2.7-.9.3-1.8.1-2.5-.1.6 1.9 2.2 3.3 4 3.3-1.5 1.1-3.3 1.8-5.4 1.8H3v-.1c1.9 1.2 4.3 1.9 6.8 1.9 8.2 0 12.8-6.8 12.8-12.8 0-.2 0-.4 0-.5C21 7 22 6 23 4.7c-.4.2-.9.3-1.3.4.5-.3 1-.7 1.4-1.1-.5.2-1.1.4-1.7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 21.3V21.3H2V21.3C2 20.6 2.2 19.8 2.6 19.3 3 18.7 3.6 18.3 4.3 18.3 5.1 18.3 5.7 18.7 6.1 19.3 6.5 19.8 6.7 20.6 6.7 21.3H17.3C17.3 20.6 17.5 19.8 17.9 19.3 18.3 18.7 18.9 18.3 19.6 18.3 20.4 18.3 21 18.7 21.4 19.3 21.8 19.8 22 20.6 22 21.3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            {/* Footer Note */}
            <div className="text-sm text-gray-400 mt-4 md:mt-0">
              © {new Date().getFullYear()} ICT4D Research Center. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
