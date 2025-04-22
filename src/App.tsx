import { useState, useEffect } from "react";
import "./App.css";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";

// Mock data - replace with real data service later
const useMockData = () => {
  const [data, setData] = useState<
    { id: string; title: string; status: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setData([
        { id: "PR-123", title: "Rodeo Arena 1", status: "Active" },
        { id: "PR-456", title: "Rodeo Arena 2", status: "Complete" },
        { id: "PR-789", title: "Rodeo Arena 3", status: "On Hold" },
        { id: "PR-101", title: "Rodeo Arena 4", status: "Planning" },
      ]);
      setLoading(false);
    }, 1000);

    // Simulate live updates
    const interval = setInterval(() => {
      setData((prev) => {
        const updated = [...prev];
        const randomIndex = Math.floor(Math.random() * updated.length);
        const statuses = ["Active", "Complete", "On Hold", "Planning"];
        updated[randomIndex] = {
          ...updated[randomIndex],
          status: statuses[Math.floor(Math.random() * statuses.length)],
        };
        return updated;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return { data, loading };
};

function ProjectTable({ data }) {
  if (!data.length)
    return (
      <Typography className="no-data-message">No projects available</Typography>
    );

  // Helper function to get the correct status badge class
  const getStatusBadgeClass = (status) => {
    const baseClass = "status-badge";
    // Convert status to lowercase and remove spaces for CSS class compatibility
    const formattedStatus = status.toLowerCase().replace(/\s+/g, "");

    switch (formattedStatus) {
      case "active":
        return `${baseClass} status-badge-active`;
      case "complete":
        return `${baseClass} status-badge-complete`;
      case "onhold":
        return `${baseClass} status-badge-onhold`;
      case "planning":
        return `${baseClass} status-badge-planning`;
      default:
        return baseClass;
    }
  };

  return (
    <Paper elevation={3} className="data-container data-paper-container">
      <div className="data-table-wrapper">
        <div className="data-table">
          <div className="data-table-header">
            <div className="tr">
              <div className="th">Project ID</div>
              <div className="th">Project Name</div>
              <div className="th">Status</div>
            </div>
          </div>
          <div className="data-table-body">
            {data.map((project: Project) => (
              <div className="tr" key={project.id}>
                <div className="td">{project.id}</div>
                <div className="td">{project.title}</div>
                <div className="td">
                  <span className={getStatusBadgeClass(project.status)}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
}

function App() {
  const { data, loading } = useMockData();

  return (
    <Container className="main-container" maxWidth="xl">
      <Paper elevation={2} className="dashboard-header">
        <Typography
          variant="h4"
          component="h1"
          className="dashboard-title"
          gutterBottom
        >
          PowderRiver Rodeo Dashboard
        </Typography>
        <Typography className="dashboard-subtitle">
          Live Project Tracking System
        </Typography>
      </Paper>

      <Grid container className="content-grid">
        <Grid item xs={12}>
          {loading ? (
            <Box className="loading-container">
              <CircularProgress />
            </Box>
          ) : (
            <ProjectTable data={data} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
