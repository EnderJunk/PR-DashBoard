// src/services/dataService.ts
export interface Project {
  id: string;
  title: string;
  status: string;
  // Add more fields as needed
}

// This will be replaced with your actual API call
export async function fetchProjects(): Promise<Project[]> {
  // For now, return mock data
  return [
    { id: "PR-123", title: "Rodeo Arena 1", status: "Active" },
    { id: "PR-456", title: "Rodeo Arena 2", status: "Complete" },
    { id: "PR-789", title: "Rodeo Arena 3", status: "On Hold" },
  ];
}
