import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const workExperience = [
    {
      company: "Bloomberg LP",
      title: "Software Engineer",
      start: "2024",
      end: "Present",
      id: "work1",
      summary: "AI Training & Jupyter Notebooks",
    },
    {
      company: "Bloomberg LP",
      title: "Software Engineer",
      start: "2022",
      end: "2024",
      id: "work2",
      summary: "TSOX Fixed-Income Trading Platform",
    },
    {
      company: "ByteDance",
      title: "Intern Software Engineer",
      start: "2021",
      end: "2022",
      id: "work3",
      summary: "Ad Performance & Diagnostics",
    },
  ];

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-16 px-6">
      {/* Header Section */}
      <header className="pt-12 text-left">
        <h1 className="mt-2 text-primary text-2xl font-bold">Ziang Ren</h1>
          <p className="text-secondary m-0 text-xl">Software Engineer</p>
      </header>

      {/* Main Content Section */}
      <main className="flex flex-col gap-20">
        <section id="work-experience" className="space-y-8">
          <h2 className="text-primary text-2xl font-semibold">
            Work Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((work) => (
              <div
                key={work.id}
                className="p-6 rounded-lg transition-all hover:bg-neutral-50 hover:shadow-md duuration-200 ease-in"
              >
                <h3 className="text-primary text-lg font-medium">
                  {work.title}, {work.company}
                </h3>
                <p className="text-secondary text-sm">
                  {work.start} - {work.end}
                </p>
                <p className="text-secondary text-sm">{work.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-6">
          <h2 className="text-primary text-2xl font-semibold">Contact</h2>
          <ul className="flex flex-wrap gap-8">
            <li className="flex-0 flex gap-3">
              <FaGithub size={20} className="text-primary" />
              <a
                href="https://github.com/Sandman-Ren"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary focus:ring-accent hover:underline focus:ring"
              >
                GitHub
              </a>
            </li>
            <li className="flex-0 flex gap-3">
              <FaLinkedin size={20} className="text-primary" />
              <a
                href="https://www.linkedin.com/in/ziang-ren-2b3163143/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary focus:ring-accent hover:underline focus:ring"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex-0 flex gap-3">
              <FaEnvelope size={20} className="text-primary" />
              <a
                href="mailto:ziang_ren@outlook.com"
                className="text-secondary focus:ring-accent hover:underline focus:ring"
              >
                Email
              </a>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="pt-6 text-center">
        <p className="text-secondary text-sm">
          &copy; 2025 Ziang Ren. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
