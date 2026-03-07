import type { Assessment } from "../pages/assessment-builder/types";

export const initialAssessments: Assessment[] = [
  {
    id: "a-1",
    title: "Frontend Developer Evaluation",
    description: "Quarterly self-assessment for frontend developers focusing on React and UI/UX.",
    questions: [
      { id: "q-1", text: "Rate your proficiency in React Hooks.", weightage: 40 },
      { id: "q-2", text: "How comfortable are you with Tailwind CSS?", weightage: 60 },
    ],
    designations: ["frontend_dev", "ui_ux"], // Array of strings
    hierarchy: "default",
    createdAt: "2026-03-01",
  },
  {
    id: "a-2",
    title: "Managerial Leadership Review",
    description: "Assessment focusing on team management and conflict resolution.",
    questions: [
      { id: "q-3", text: "Describe a time you resolved a team conflict.", weightage: 100 },
    ],
    designations: ["project_manager"], // Array of strings
    hierarchy: "custom",
    createdAt: "2026-03-05",
  },
];