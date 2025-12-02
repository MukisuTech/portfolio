// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times text-2xl text-dark"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars text-2xl text-dark"></i>';
        }
    });
    
    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars text-2xl text-dark"></i>';
        });
    });
    
    // Projects modal functionality
    const projectModal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeModal');
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnologies = document.getElementById('modalTechnologies');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalCodeLink = document.getElementById('modalCodeLink');
    
    // Project data (mock data)
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            image: 'https://cdn.pixabay.com/photo/2016/11/30/20/44/computer-1873831_1280.png',
            description: 'A comprehensive e-commerce platform with product listings, user authentication, shopping cart functionality, and payment integration. The platform includes an admin dashboard for managing products, orders, and customers.',
            technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe'],
        },
        {
            id: 2,
            title: 'Task Management App',
            image: 'https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_1280.jpg',
            description: 'A task management application with drag-and-drop functionality, allowing users to organize tasks into different columns. Features include task creation, assignment, due dates, and progress tracking.',
            technologies: ['React', 'TypeScript', 'Firebase', 'Material UI', 'React DnD'],
        },
        {
            id: 3,
            title: 'Portfolio Website',
            image: 'https://cdn.pixabay.com/photo/2017/05/11/11/15/workplace-2303851_1280.jpg',
            description: 'A responsive portfolio website template for creative professionals. Includes sections for showcasing work, sharing background information, and contacting the site owner.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Responsive Design'],
        },
        {
            id: 4,
            title: 'Weather Dashboard',
            image: 'https://cdn.pixabay.com/photo/2020/04/08/16/32/keyboard-5017973_1280.jpg',
            description: 'A weather application that provides current weather conditions and forecasts for any location. Features include search functionality, saved locations, and detailed weather data.',
            technologies: ['JavaScript', 'OpenWeather API', 'Chart.js', 'Geolocation API'],
        },
        {
            id: 5,
            title: 'Social Media App',
            image: 'https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg',
            description: 'A social networking platform where users can create profiles, connect with friends, share content, and communicate in real-time. The app includes features like news feed, messaging, and notifications.',
            technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'AWS S3'],
        },
        {
            id: 6,
            title: 'Blog Platform',
            image: 'https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg',
            description: 'A content management system for creating and managing blog posts. Features include rich text editing, image uploads, categorization, and search functionality.',
            technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Quill Editor', 'JWT'],
        }
    ];
    
    // Open modal with project details
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                modalTitle.textContent = project.title;
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalDescription.textContent = project.description;
                
                // Clear and add technologies
                modalTechnologies.innerHTML = '';
                project.technologies.forEach(tech => {
                    const techBadge = document.createElement('span');
                    techBadge.className = 'px-3 py-1 bg-primary/10 text-primary rounded-full text-sm';
                    techBadge.textContent = tech;
                    modalTechnologies.appendChild(techBadge);
                });
                
                projectModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        projectModal.classList.add('hidden');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            projectModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formFields = contactForm.querySelectorAll('input, textarea');
        const submitText = document.getElementById('submitText');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const successMessage = document.getElementById('successMessage');
        
        // Load saved form data from LocalStorage
        formFields.forEach(field => {
            const savedValue = localStorage.getItem(`contact_${field.id}`);
            if (savedValue) {
                field.value = savedValue;
            }
            
            // Save form data to LocalStorage as user types
            field.addEventListener('input', function() {
                localStorage.setItem(`contact_${field.id}`, field.value);
            });
        });
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.classList.add('hidden'));
            
            // Form validation
            let isValid = true;
            
            formFields.forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    const errorMsg = field.nextElementSibling;
                    errorMsg.classList.remove('hidden');
                    isValid = false;
                }
                
                if (field.type === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        const errorMsg = field.nextElementSibling;
                        errorMsg.classList.remove('hidden');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Create email body with all form content
                const emailBody = `Name: ${name}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`;
                
                // Create mailto link with pre-filled content
                const mailtoLink = `mailto:bruzeb4@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message after a brief delay
                setTimeout(function() {
                    contactForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    
                    // Clear LocalStorage
                    formFields.forEach(field => {
                        localStorage.removeItem(`contact_${field.id}`);
                    });
                }, 500);
            }
        });
    }
    
    // CV Download button
    const downloadCVBtn = document.getElementById('downloadCV');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(event) {
            event.preventDefault();
            window.open('https://docs.google.com/document/d/17sK220k1YCUHZQHM91re3lbhg-KxGKEJ/edit?usp=sharing&ouid=112338338733191695018&rtpof=true&sd=true', '_blank');
        });
    }
});
