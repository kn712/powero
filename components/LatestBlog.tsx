import React from "react";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import Title from "./Title";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return (
    <div className="mb-10 lg:mb-20">
      <Title className="text-4xl mt-20 mb-12 md:text-4xl font-medium text-neutral-900 leading-tight text-center">Explore our latest stories.</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {blogs?.map((blog) => (
          <div key={blog?._id} className="rounded-lg overflow-hidden">
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`}>
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
              </Link>
            )}
            <div className="bg-shop_light_bg p-5">
              <div className="text-xs flex items-center gap-5">
                <div className="flex items-center relative group cursor-pointer">
                  {blog?.blogcategories?.map((item, index) => (
                    <p
                      key={index}
                      className="font-semibold text-darkColor tracking-wider"
                    >
                      {item?.title}
                    </p>
                  ))}
                  <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-darkColor hover:cursor-pointer hoverEffect" />
                </div>
                <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-darkColor hoverEffect">
                  <Calendar size={15} />{" "}
                  {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                  <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-darkColor hoverEffect" />
                </p>
              </div>
              <Link
                href={`/blog/${blog?.slug?.current}`}
                className="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-darkColor hoverEffect"
              >
                {blog?.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
