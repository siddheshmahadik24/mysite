import { motion } from "framer-motion";
import { siteContent } from "../data/content";

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-500 font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Work
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-16"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Projects & Initiatives
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center mb-5">
                <span className="text-amber-400 font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3
                className="text-lg font-semibold text-slate-900 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.filter(t => t).map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 text-sm font-medium hover:text-amber-600 transition-colors"
                >
                  View Project →
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 text-sm font-medium hover:text-amber-600 transition-colors mt-1"
                >
                  View on GitHub →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
