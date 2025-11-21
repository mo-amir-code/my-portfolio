import React, { Suspense } from "react";
import BlogWriter from "./BlogWriter";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogWriter />
    </Suspense>
  );
};

export default Page;
