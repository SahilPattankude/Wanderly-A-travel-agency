# Wanderly Sanity Studio

1. Copy the project ID and dataset from your Sanity project.
2. Create `sanity/.env` with:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

3. In this folder, install dependencies and start the Studio:

```powershell
npm install
npm run dev
```

The `post` schema is already registered. Once the Studio is connected to the same project as the website, use the root import command to create the five draft posts.
