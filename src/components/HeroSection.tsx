"use client";
import { LayoutGrid } from "@/components/ui/layout-grid";

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
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
