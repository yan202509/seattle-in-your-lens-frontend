# 📸 Seattle In Your Lens — Frontend

Seattle In Your Lens is a community-driven web application that helps people discover and share things to do in Seattle using clear categories such as seasonality, environment, activity type, and cost.

The project is designed for people who are not tourists, but not yet locals — users who want to step outside their comfort zone and explore Seattle in a more intentional way.

---

## 🚢 Deployment

- Frontend: [https://seattle-in-your-lens-frontend.vercel.app/](https://seattle-in-your-lens-frontend.vercel.app/)  
- Backend: [https://seattle-in-your-lens-backend.up.railway.app](https://seattle-in-your-lens-backend.up.railway.app)

---
## 🧰 Tech Stack

- React
- TypeScript
- Vite
- Axios
- Custom CSS (Neo-Brutalist system)
- Deployed on Netlify

---

## 🚀 Core Features (Implemented)

| Feature | Description |
|------|------------|
| **Event Discovery** | Browse upcoming Seattle events in a grid-based layout. |
| **Search** | Keyword-based search for event titles. |
| **Event Details** | View full descriptions, metadata, and creator information of a single event. |
| **Engagement** | Like events anomynously and view review threads. |
| **Authentication** | Mock login system (placeholder for future JWT authentication). |
| **Responsive Layout** | Layout adapts to different screen sizes, including smaller screens, with a footer that stays at the bottom. |

---

## 🧭 Planned Features

These features were planned in the original capstone concept and will be implemented in future updates.

- Advanced filtering/sorting (season, indoor/outdoor, cost level)
- Map view and neighborhood-based browsing
- Group size tags (solo, pairs, groups)
- Expanded review interactions
- JWT-protected routes for creating and managing events.

---


## 🎨 Design Language (Neo-Brutalist)

This project follows a high-contrast, industrial design approach.

> **Primary Accent:** `#FFCC00` (Seattle Gold)  
> **Border Weight:** `5px solid black`  
> **Shadow Style:** Hard 8px offset  

The visual system intentionally prioritizes legibility and structure over ornamentation.

---
## 🏗️ Project Architecture

```text
src/
 ├── api/           # Axios instance and API service layers
 ├── components/    # Reusable UI components
 │    ├── NavBar.tsx
 │    ├── SearchBar.tsx
 │    ├── ReviewForm.tsx
 │    └── Footer.tsx
 ├── pages/         # Page-level views
 │    ├── Home.tsx
 │    ├── Login.tsx
 │    ├── CreateEvent.tsx
 │    ├── EventDetails.tsx
 │    └── NoMatch.tsx
 ├── types.ts       # Shared TypeScript interfaces
 ├── App.tsx        # Main app layout and routes
 ├── main.tsx       # App entry point
 └── App.css        # Global CSS and Neo-Brutalist variables



