"use client";
import { LayoutGrid } from "@/components/ui/layout-grid";

// Photo by <a href="https://unsplash.com/@swimstaralex?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Alexander Sinn</a> on <a href="https://unsplash.com/photos/an-aerial-view-of-a-mountain-range-with-a-cloudy-sky-bBucmsH9LBc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

const HersoSection = () => {
  return (
    <div className="h-full w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
};

export default HersoSection;

const SkeletonCard = ({ haiku }: { haiku: string[] }) => {
  return (
    <div className="space-y-2 -rotate-12">
      {haiku.map((line: string, i: number) => (
        <p key={i} className="font-bold text-xl md:text-2xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-yellow-500 to-purple-500">
            {line}
          </span>
        </p>
      ))}
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: (
      <SkeletonCard
        haiku={[
          "Silent forest calls,",
          "Among trees, whispers of peace,",
          "Rest in nature's arms.",
        ]}
      />
    ),
    className: "md:col-span-2",
    thumbnail: "/1.jpg",
  },
  {
    id: 2,
    content: (
      <SkeletonCard
        haiku={[
          "Skyward dreams take flight,",
          "Clouds embrace the home of peace,",
          "Above, stillness reigns.",
        ]}
      />
    ),
    className: "col-span-1",
    thumbnail: "/2.jpg",
  },
  {
    id: 3,
    content: (
      <SkeletonCard
        haiku={[
          "Green fields stretch afar,",
          "Nature's breath in every leaf,",
          "Life blooms all around.",
        ]}
      />
    ),
    className: "col-span-1",
    thumbnail: "/3.jpg",
  },
  {
    id: 4,
    content: (
      <SkeletonCard
        haiku={[
          "River flows gently,",
          "Soft murmurs in the still air,",
          "Peace in every drop.",
        ]}
      />
    ),
    className: "md:col-span-2",
    thumbnail: "4.jpg",
  },
];
