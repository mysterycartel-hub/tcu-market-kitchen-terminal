import { CHARACTER_LESSONS } from "@/lib/tcu/vault";

export default function CharacterLessons() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Character-Based Lessons</p>
        <h2 className="text-2xl font-black text-white">Coach the student with the crew</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {CHARACTER_LESSONS.map((lesson) => (
          <div key={lesson.name} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{lesson.role}</p>
            <h3 className="mt-1 text-lg font-black text-white">{lesson.name}</h3>
            <p className="mt-3 text-sm text-slate-300 leading-6">{lesson.lesson}</p>
            <p className="mt-3 text-xs text-violet-200/80 italic leading-5">“{lesson.prompt}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
