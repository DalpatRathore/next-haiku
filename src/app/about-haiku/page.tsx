import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Leaf,
  CloudSun,
  Mountain,
  Wind,
  PenTool,
  BookOpen,
} from "lucide-react";

const AboutHaikuPage = () => {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-bold">About Haiku</h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground">
          Haiku is a traditional form of Japanese poetry that captures the
          beauty of fleeting moments in nature and life. With just 17 syllables,
          each haiku offers a window into profound emotions and a deep
          appreciation for simplicity and mindfulness.
        </p>
      </div>

      <BentoGrid className="max-w-5xl mx-auto grid gap-6">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 1 || i === 2 || i === 5 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default AboutHaikuPage;

const sampleHaikus = [
  {
    text: "An old silent pond...\nA frog jumps into the pond\nSplash! Silence again.",
    author: "Matsuo Bashō",
  },
  {
    text: "In the cicada's cry\nNo sign can foretell\nHow soon it must die.",
    author: "Matsuo Bashō",
  },
  {
    text: "The light of a candle\nIs transferred to another candle\nSpring twilight.",
    author: "Yosa Buson",
  },
  {
    text: "Over the wintry\nForest, winds howl in rage\nWith no leaves to blow.",
    author: "Natsume Sōseki",
  },
  {
    text: "A world of dew,\nAnd within every dewdrop\nA world of struggle.",
    author: "Kobayashi Issa",
  },
  {
    text: "A summer river being crossed\nHow pleasing\nWith sandals in my hands!",
    author: "Yosa Buson",
  },
];

const HaikuCard = ({ haiku }: { haiku: { text: string; author: string } }) => (
  <div className="w-full bg-white p-4 rounded-lg shadow-md bg-gradient-to-r from-green-200 via-blue-100 to-purple-200">
    <div className="w-full max-w-sm mx-auto ">
      <p className="text-md text-slate-700 whitespace-pre-line italic">
        {haiku.text}
      </p>
      <p className="mt-2 text-center text-blue-950 text-md">— {haiku.author}</p>
    </div>
  </div>
);

const items = [
  {
    title: "Nature's Whisper",
    description:
      "Haikus often capture the essence of nature in just a few words.",
    header: <HaikuCard haiku={sampleHaikus[0]} />,
    icon: <Leaf className="h-6 w-6 text-green-500" />,
  },
  {
    title: "The Changing Seasons",
    description: "Seasons are central themes in traditional Haiku poetry.",
    header: <HaikuCard haiku={sampleHaikus[1]} />,
    icon: <CloudSun className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "The Power of Wind",
    description: "Wind symbolizes the unseen forces of nature in many haikus.",
    header: <HaikuCard haiku={sampleHaikus[3]} />,
    icon: <Wind className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Mountains and Stillness",
    description: "Discover how stillness and calm are represented in Haiku.",
    header: <HaikuCard haiku={sampleHaikus[2]} />,
    icon: <Mountain className="h-6 w-6 text-gray-500" />,
  },

  {
    title: "Mindfulness in Words",
    description: "Each word in Haiku is chosen with mindfulness and intent.",
    header: <HaikuCard haiku={sampleHaikus[4]} />,
    icon: <PenTool className="h-6 w-6 text-red-500" />,
  },
  {
    title: "Haiku’s History",
    description:
      "Explore the rich history of Haiku, from its origins to today.",
    header: <HaikuCard haiku={sampleHaikus[5]} />,
    icon: <BookOpen className="h-6 w-6 text-purple-500" />,
  },
];
