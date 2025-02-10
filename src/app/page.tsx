import BlurFade from "@/components/blureffects/blur-fade";
import BlurFadeText from "@/components/blureffects/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/particles";
import SkillIcon from "@/components/skill-icon";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const chunkedProjects = Array.from(
    { length: Math.ceil(DATA.projects.length / 4) },
    (_, i) => DATA.projects.slice(i * 4, i * 4 + 4)
  );
 
  return (
    <div className="page-zoom">
      <Particles particleColor="255, 255, 255" className="absolute inset-0 pointer-events-none" quantity={50} />
      <Particles particleColor="0,0,0" className="absolute inset-0 pointer-events-none" quantity={50} />
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="top" className="pt-20">
          <div className="w-full mx-auto flex flex-col items-center space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="relative text-center md:text-left space-y-2">
                <div className="relative">
                  <BlurFade delay={BLUR_FADE_DELAY}>
                    <span className="absolute text-pink-500 -translate-y-2 text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap hidden sm:block">
                    DANIAL SUHAIL
                    </span>
                  </BlurFade>
                  <BlurFadeText
                    delay={BLUR_FADE_DELAY}
                    className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap mr-5"
                    yOffset={8}
                    text="DANIAL SUHAIL"
                  />
                </div>

                <BlurFadeText
                  className="pl-1 text-left tracking-tighter sm:text-sm md:text-base xl:max-w-[400px]"
                  delay={BLUR_FADE_DELAY}
                  text= "Software Engineer | Full-Stack Developer | Waterloo, ON" 
                />
              </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="relative flex items-center justify-center  w-[13.75rem] h-[13.75rem]">
                <div className="absolute inset-0 rounded-full border-4 border-pink-500 z-0 translate-y-1"></div>
                <Image
                      src={DATA.avatarUrl}
                      alt={DATA.name}
                      fill
                      priority={true}
                      className="rounded-full object-cover border border-white dark:border-gray-800 bg-muted"
                    />
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
          <div className="prose max-w-full text-pretty text-sm text-gray-800 dark:text-gray-200">
            Hey there! I&apos;m Danial, currently studying <a 
  href="https://uwaterloo.ca/future-students/programs/computer-engineering" target="_blank" rel="noopener noreferrer"
  className="font-sketchetikFillLight italic text-pink-500 font-extrabold no-underline hover:text-pink-700 transition-colors duration-200"
>
  Computer Engineering 
</a> at the University of Waterloo. I&apos;m passionate about bringing ideas to life through building websites, photo/video editing, and sharpening my skills in <a 
  href="https://monkeytype.com/profile/Draconic" target="_blank" rel="noopener noreferrer"
  className="font-sketchetikFillLight italic text-pink-500 font-extrabold no-underline hover:text-pink-700 transition-colors duration-200"
>
  Competitive Typing
</a>.
        </div>
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
                subtitle={    
                    // <span className="text-[0.6rem] sm:text-sm md:text-lg lg:text-lg">
                      work.company    
                }
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
      <h2 className="text-xl font-bold">Skills</h2><br></br>
    </BlurFade>
    <div className="flex flex-wrap justify-center gap-4">
      {DATA.skills.map((skill, id) => (
        <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
          <a href={skill.websiteUrl} target="_blank" rel="noopener noreferrer">
            <SkillIcon icon={skill.svg} text={skill.name}/>
          </a>
        </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore My Recent Projects
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve developed a range of projects, from sleek websites
                  to sophisticated web applications. Here are a few highlights.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="max-w-[800px] mx-auto">
            <div className="hidden sm:block">
              <Carousel className="w-full">
                <CarouselContent className="select-none ">
                  {chunkedProjects.map((projectGroup, groupIndex) => (
                    <CarouselItem key={groupIndex} className ="pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4">
                        {projectGroup.map((project, id) => (
                          <BlurFade
                            key={project.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                          >
                            <ProjectCard
                              href={project.href}
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
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="sm:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DATA.projects.map((project, id) => (
                <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                  <ProjectCard
                    href={project.href}
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
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full pt-6 pb-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Keep in Touch
              </h2>
              <p className=" mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Interested in connecting? Drop me a message at{" "}
          <a
            href="mailto:danialsuhailcs@gmail.com"
            className=" text-blue-500 underline hover:text-blue-700"
          >
            danialsuhailcs@gmail.com
          </a>{" "}
          and I&apos;ll get back to you soon.
        </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
    <BlurFade delay={BLUR_FADE_DELAY * 18}>
    <div className="border-t border-gray-300 mt-4 pt-6 pb-6 text-center">
        <p className="text-xs">
          made by <span className="font-juliette">Danial Suhail</span>
        </p>
      </div>
      </BlurFade>
    </div>
  );
}