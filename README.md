# Launchpad · Talent CRM dashboard

React 18 + Vite + Tailwind CSS v4 + lucide-react icons.

## Run it

    npm install
    npm run dev

Then open the URL Vite prints (usually http://localhost:5173).

## Structure

    TTP-Dash/
    ├── index.html                 # loads the Manrope font
    ├── package.json
    ├── vite.config.js             # React + Tailwind Vite plugins
    └── src/
        ├── main.jsx               # entry point
        ├── App.jsx                # page layout
        ├── index.css              # Tailwind import + custom theme colors
        ├── data/
        │   └── dashboard.js       # stats, students, opportunities, events
        └── components/
            ├── Sidebar.jsx
            ├── Topbar.jsx
            ├── Greeting.jsx
            ├── StatCard.jsx
            ├── SectionHeader.jsx
            ├── StudentPipeline.jsx
            ├── PipelineInsight.jsx
            ├── PriorityOpportunities.jsx
            ├── UpcomingDevelopment.jsx
            └── HelpButton.jsx
