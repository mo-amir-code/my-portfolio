import Link from "next/link";

const SeeMore = ({ text, _href }: { text:string, _href?: string }) => {
  return (
    <div
      // type="button"
      className="flex items-center text-sm my-4 mx-auto px-4 py-2 rounded-md font-medium text-gray-900 dark:text-gray-100"
      // href={`/${href}`}
    >
      See All {text}
      <svg
        className="h-4 w-4 ml-1"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
  );
};

export default SeeMore;
