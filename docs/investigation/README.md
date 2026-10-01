# Investigation and Resources

This directory contains research, documentation, and other helpful resources for the CanSat project.

## Workflow for Adding Investigations

To maintain an organized repository of knowledge, please follow these guidelines when adding new investigation results:

### 1. Naming Convention
*   **Format:** Use `YYYY-MM-DD_topic-name.md` (e.g., `2026-05-20_battery-capacity-tests.md`).
*   **Case:** Use lowercase and hyphens (kebab-case) for the topic name to ensure compatibility across all systems.
*   **Date:** Always start with the date in `YYYY-MM-DD` format so files sort chronologically.

### 2. Simple Investigations (Text Only)
If the investigation consists only of text or small embedded images:
*   Create a single Markdown file directly in the `investigation/` folder using the naming format above.

### 3. Complex Investigations (Multiple Files)
If the investigation includes associated files (data logs, PDFs, CAD files, images, etc.):
1.  Create a folder named `{topic-name}/` (e.g., `telemetry-range-tests/`).
2.  Inside that folder, create a main file named `index.md` or `YYYY-MM-DD_summary.md` that explains the research.
3.  Place all associated files within this folder.
4.  If there are many files, use subfolders like `data/`, `images/`, or `specs/`.

### 4. Content Requirements
Every investigation file should ideally include:
*   **Author:** Who performed the research.
*   **Date:** When the research was completed.
*   **Objective:** What you were trying to find out.
*   **Results/Findings:** The key takeaways.
*   **Next Steps:** Any recommendations based on the findings.

## Templates
To make things easier, use the templates located in the `templates/` folder:

*   **Simple Investigation:** Copy the contents of `templates/simple_investigation_template.md` into a new `.md` file in the root of the `investigation/` folder.
*   **Complex Investigation:** Copy the entire `templates/complex_structure/` folder into the `investigation/` folder and rename it to your topic (e.g., `telemetry-range-tests/`). Fill out the `index.md` inside it.

---
*Note: This workflow ensures that our research is searchable, sortable, and easy for any team member to understand.*