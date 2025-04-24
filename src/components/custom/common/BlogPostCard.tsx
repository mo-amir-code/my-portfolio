import Link from "next/link";

const BlogPostCard = () => {
  return (
    <Link href={"/blog/nahin-hai-abhi"}>
      <div className="w-full bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 rounded-md mb-4 p-4 border border-gray-200">
        <div className="w-full font-medium">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-base md:text-base mb-2 w-full text-gray-900 dark:text-gray-100">
              Ace the Javascript Interview - Practical questions to help you
              clear your next interview
            </h4>
            <p className="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
              16,744 views
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
