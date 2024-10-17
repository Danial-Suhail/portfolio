import CodeSymbolAnimation from "@/components/CodeSymbolAnimation";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { div } from "framer-motion/client";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <div style={{ zoom: "160%" }}>
    <main className="flex flex-col min-h-[100dvh] space-y-10">
    <section id="top" className="pt-20">
  <div className="w-full max-w-2xl mx-auto space-y-8"> {/* Centering the content */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-20"> {/* Centering Avatar and Title/Subtitles */}
      <div className="flex flex-col flex-1 space-y-4 text-left"> {/* Change text alignment to left */}
        <div className="relative">
          {/* Pink outline layer */}
          <BlurFade delay={BLUR_FADE_DELAY}>
            <span className="absolute text-pink-500 -translate-x--5 -translate-y-2 text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap hidden sm:block">
              DANIAL SUHAIL
            </span>
          </BlurFade>

          {/* White text layer */}
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap"
            yOffset={8}
            text={`DANIAL SUHAIL`}
          />
        </div>

        <BlurFadeText
          className="tracking-tighter sm:text-md md:text-lg xl:max-w-[400px]"
          delay={BLUR_FADE_DELAY}
          text={DATA.description}
        />
      </div>

      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center justify-center relative" style={{ width: '220px', height: '220px' }}>
          {/* Pink outline with y-offset, no blur */}
          <div className="absolute inset-0 rounded-full border-4 border-pink-500 z-0 translate-y-1"></div>

          {/* Avatar with image */}
          <Avatar className="relative z-10 border rounded-full h-full w-full">
            <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="h-full w-full object-cover" />
            <AvatarFallback className="h-full w-full">{DATA.initials}</AvatarFallback>
          </Avatar>
        </div>
      </BlurFade>
    </div>
  </div>
</section>


<section id="about">

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold pb-2">About Me</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <Markdown className="prose max-w-full text-pretty font-sans text-sm text-gray-800 dark:text-gray-200">
    {DATA.summary}
  </Markdown>
        </BlurFade>
      </section>
      
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.title}
                subtitle={work.company}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
      <h2 className="text-xl font-bold">Skills</h2>
    </BlurFade>
    <div className="flex flex-wrap justify-center gap-4">
      {DATA.skills.map((skill, id) => (
        <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
          <a href={skill.websiteUrl} target="_blank" rel="noopener noreferrer">
            <div className="h-12 w-12 flex items-center justify-center hover:opacity-80 transition-opacity duration-200">
              {skill.svg}
            </div>
          </a>
        </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full pt-6">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
              
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full pt-6 pb-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Want to chat? Shoot me a message at{" "}
          <a
            href="mailto:danialsuhailcs@gmail.com"
            className="text-blue-500 underline hover:text-blue-700"
          >
            danialsuhailcs@gmail.com
          </a>{" "}
          and I&apos;ll respond whenever I can.
        </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
    <div className="border-t border-gray-300 mt-4 pt-6 pb-6 text-center">
        <p className="text-xs">
          made by <span className="font-juliette">Danial Suhail</span>
        </p>
      </div>
    </div>
  );
}
