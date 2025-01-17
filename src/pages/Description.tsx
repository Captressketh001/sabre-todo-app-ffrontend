
import { Link } from "react-router-dom";
const Description: React.FC = () => {
  return (
    <div className="bg-gray-100 text-white  min-h-screen py-10 px-4">
      <div className="container w-5/6 md:w-3/5  mx-auto">
        <div className="flex flex-col w-full">
          <div className="flex flex-col-reverse gap-8 md:gap-0 md:flex-row  justify-between">
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-1 items-baseline">
                <h1 className="bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD_14.06%,#709DF7_51.02%,#4D78EF_79.09%)] bg-clip-text text-base leading-[1.2] tracking-tighter text-transparent sm:text-center font-semibold sm:text-lg sm:leading-[1.75rem] lg:text-left">
                  Sabre Todo App
                </h1>
              </div>
              <div className="flex gap-4 text-black">
                  <Link to="/" className="hover:text-blue-500">Tasks</Link>
                  <Link to="/about"  className="hover:text-blue-500">About</Link>
              </div>
            </div>
          </div>
          <div className="mt-6 text-black leading-relaxed text-sm md:text-base text-justify">
            <h2 className="text-sm font-medium md:text-lg">
              Project Description{" "}
            </h2>
            <p className="mt-4">
              Sabre To-Do List application allows users to manage their todos
              with basic features like adding, editing, deleting, and filtering
              todos. It includes the following functionalities:
            </p>
            <ul className="mt-4 list-disc">
              <li className="mb-2">
                <h4 className="text-sm font-medium">Todo Display</h4>
                <p>
                  Todos are displayed in a list, fetched from an API (I build my
                  own API with Node.JS to showcase my backend skills and it is
                  hosted on{" "}
                  <a
                    href="https://sabre-todo-app-backend.onrender.com"
                    className="text-blue-500 underline"
                  >
                    https://sabre-todo-app-backend.onrender.com
                  </a>{" "}
                  and the swagger documentation on{" "}
                  <a
                    href="https://sabre-todo-app-backend.onrender.com/api-docs"
                    className="text-blue-500 underline"
                  >
                    https://sabre-todo-app-backend.onrender.com/api-docs
                  </a>
                  )
                </p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">Add todo</h4>
                <p>
                  A form allows users to add new todos with a text input and a
                  submit button.
                </p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">Edit Todo</h4>
                <p>Users can edit the text of an existing todo.</p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">Delete Todo</h4>
                <p>
                  Each todo has a delete icon that allows users to remove Todos
                  from the list.
                </p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">Todo Filtering</h4>
                <p>
                  {" "}
                  Users can filter todos by their completion status (completed
                  or incomplete)
                </p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">Routing</h4>
                <p>
                  The application has two pages: the todo page (/) that displays
                  the todo list, and an '/about' page that provides application
                  information.
                </p>
              </li>
            </ul>
            <h2 className="text-sm mt-4 font-medium md:text-lg">
              Features and Tools
            </h2>
            <ul className="mt-2 list-disc">
              <li className="mb-2">
                <h4 className="text-sm font-medium">
                  React Functional Components & Hooks
                </h4>
                <p>
                  For creating the UI and managing state with useState,
                  useEffect, and custom hooks.
                </p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">React Router</h4>
                <p>For navigation between the todo list and about pages.</p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">API Handling</h4>
                <p>
                  Axios and React Query are used for fetching todos from an API
                  and handling todo state efficiently
                </p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">Form Handling</h4>
                <p>
                  React Hook Form and Zod are used for adding and editing todos
                  with form validation.
                </p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">Styling</h4>
                <p>
                  Tailwind CSS was used for responsive, utility-first styling.
                </p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">@heroicons/react</h4>
                <p>Provides SVG icons for UI</p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">React Hot Toast</h4>
                <p>For displaying toast notifications</p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">Vite</h4>
                <p>For fast development and bundling</p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">TypeScript</h4>
                <p>For type safety and better code maintenance.</p>
              </li>
              <li className="mb-2">
                <h4 className="text-sm font-medium">ESLint</h4>
                <p>
                  For ensuring code quality with linting and React best
                  practices
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Description;
