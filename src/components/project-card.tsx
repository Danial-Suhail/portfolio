import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  mobileDescription?: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  mobileDescription,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border transition-transform duration-300 ease-out h-full transform hover:-translate-y-1 hover:shadow-lg",
        // Adding glow effects based on the theme
        "dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]",
        className // Allow for additional className
      )}
    >
      <Link
        href={href || "#"}
        className="block cursor-pointer"
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-28 w-full object-cover object-top sm:h-40" // needed because random black line at bottom of video
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-28 w-full overflow-hidden object-cover object-top sm:h-40"
          />
        )}
      </Link>
      <CardHeader className="px-1.5 sm:px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-sm leading-tight sm:text-base">{title}</CardTitle>
          <time className="font-sans text-[10px] sm:text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="sm:hidden [&_.prose]:mb-0">
            <Markdown className="prose max-w-full text-pretty font-sans text-[11px] leading-snug text-muted-foreground dark:prose-invert sm:text-xs sm:leading-normal">
              {mobileDescription ?? description}
            </Markdown>
          </div>
          <div className="hidden sm:block [&_.prose]:mb-0">
            <Markdown className="prose max-w-full text-pretty font-sans text-[11px] leading-snug text-muted-foreground dark:prose-invert sm:text-xs sm:leading-normal">
              {description}
            </Markdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
