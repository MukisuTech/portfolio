// Initialize Contentful client
const client = contentful.createClient({
  space: "vlxjrv0mg410",        // Contentful Space ID provided
  accessToken: "NmbyKRdLN9fL0Jt17u2fWiNDgxyFMxHZSKypf-3bNlI" // Content Delivery API token provided
});

// Load projects from Contentful
async function loadProjects() {
  try {
    const response = await client.getEntries({
      content_type: "project"
    });

    const container = document.getElementById("projects-container");
    container.innerHTML = ""; // Clear container

    if (response.items.length === 0) {
      container.innerHTML = "<p class='text-center text-secondary col-span-full'>No projects found.</p>";
      return;
    }

    response.items.forEach(item => {
      const project = item.fields;

      // Debug log to check the structure
      console.log("Project data:", project);

      // Safely handle missing image - construct full URL if needed
      let imageUrl = "https://via.placeholder.com/400x300";
      if (project.image?.fields?.file?.url) {
        imageUrl = "https:" + project.image.fields.file.url;
      } else if (project.image) {
        console.warn("Image found but no URL:", project.image);
      }

      // Safely handle missing fields
      const title = project.title || project.Title || "Untitled Project";
      const description = project.description || project.Description || "No description available";
      const demoLink = project.demoUrl || project.demoURL || "#";
      const githubLink = project.githubUrl || project.githubURL || "#";

      const projectHTML = `
        <div class="project-card hover-glow bg-white rounded-xl overflow-hidden shadow-lg">
            <img src="${imageUrl}" alt="${title}" class="w-full h-48 object-cover" onerror="this.src='https://via.placeholder.com/400x300'">
            <div class="p-6">
                <h3 class="text-xl font-bold text-dark mb-2">${title}</h3>
                <p class="text-secondary mb-4">${description}</p>
                <div class="flex gap-4">
                  ${demoLink !== "#" ? `<a href="${demoLink}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">Live Demo</a>` : ""}
                  ${githubLink !== "#" ? `<a href="${githubLink}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">GitHub</a>` : ""}
                </div>
            </div>
        </div>
      `;

      container.innerHTML += projectHTML;
    });

  } catch (error) {
    console.error("Error fetching projects:", error);
    const container = document.getElementById("projects-container");
    if (container) {
      container.innerHTML = `<p class="text-center text-red-500 col-span-full">Error loading projects. Check console for details.</p>`;
    }
  }
}

window.addEventListener("DOMContentLoaded", loadProjects);
