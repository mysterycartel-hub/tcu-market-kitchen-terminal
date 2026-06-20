import { ROADMAP_STEPS } from "@/lib/tcu/constants";

export function getSetupGrade(selectedRoadmap: Record<string, boolean>) {
  const completed = ROADMAP_STEPS.filter((step) => selectedRoadmap[step]).length;
  if (completed === ROADMAP_STEPS.length) return "A";
  if (completed >= ROADMAP_STEPS.length - 1) return "B";
  if (completed >= ROADMAP_STEPS.length - 3) return "C";
  return "D";
}
