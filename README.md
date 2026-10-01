# SAPIORA — Academic Intelligence

> A modern academic learning platform designed to help university students learn, track progress, and achieve more.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## 🌟 Platform Highlights

- **SAPIORA Brand Identity:** Custom Academic Intelligence emblem, refined deep navy (`#0F172A`) & indigo (`#4F46E5`) palette, and clean academic typography.
- **Frontend Authentication System:** Complete `/login`, `/register`, and `/forgot-password` pages with client-side route protection.
  - **Demo Student Email:** `student@sapiora.edu`
  - **Demo Student Password:** `student123`
  - **One-Click Demo Login:** Available on the login page for rapid presentation.
- **Academic Dashboard:** Compact greeting hero, logically consistent statistics (6 enrolled, 2 completed, 42h study time, 3 certificates), horizontal continue-learning cards, upcoming assignment milestones, and activity timeline.
- **Curriculum & Courses:**
  - **My Courses:** Tabbed status filters (*All, In Progress, Completed*), topic search, and category selectors.
  - **Explore Courses:** 10 curated computer science engineering specializations with level filters.
  - **Course Details:** 6 modular syllabus accordions, video lecture simulation, and live progress calculations.
- **Coursework & Evaluation:**
  - **Assignments:** Interactive submission modal with file upload simulation and notes.
  - **Grades:** Official transcript breakdown with 87% GPA benchmark and CSS bar visualizations.
  - **Certificates:** Verifiable digital credential cards and preview modal with institutional seal and instructor signature.
  - **Schedule:** Interactive October 2026 academic calendar with exam and assignment markers.
  - **Notifications:** Read status tracking and instant dismissal.
  - **Student Profile:** Shivanand K's CSE credentials and modal editor.
  - **System Settings:** Notification toggles, theme options, and security settings.

---

## 🚀 How to Run the Application

```powershell
# 1. Install dependencies
npm install

# 2. Launch Vite dev server
npm run dev -- --host --port 5173

# 3. Open in Browser
http://localhost:5173/

# 4. Production Build Verification
npm run build
```

---

## 🎓 Presentation Demo Flow

1. Open `http://localhost:5173/login`.
2. Click **"1-Click Demo Login"** (or enter `student@sapiora.edu` / `student123`).
3. Land on **Dashboard** — show the statistics cards and refined continue learning cards.
4. Click **"Explore Courses"**, search for `"React"`, and select **Full Stack Web Development**.
5. Click **"Enroll Now • Free"** — observe success toast and instant module unlock.
6. Navigate to **My Courses** to view the updated enrollment card.
7. Open **Assignments**, click an assignment to inspect the submission modal.
8. Open **Grades** to showcase the 87% GPA performance and score breakdown.
9. Open **Certificates** and click **"View"** to show the verifiable digital credential modal.
10. Open the top right profile dropdown and click **"Logout"** to show route protection in action.
