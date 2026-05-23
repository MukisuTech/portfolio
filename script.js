// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Sparkle effect function
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        sparkle.textContent = '✨';
        
        const tx = (Math.random() - 0.5) * 60;
        const ty = (Math.random() - 0.5) * 60 - 30;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 600);
    }
    
    // Add sparkle on nav link hover
    const navLinks = document.querySelectorAll('.nav-sparkle');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Create 2-3 sparkles on hover
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createSparkle(x, y);
                }, i * 80);
            }
        });
    });
    
    // Initial sparkle animation on navbar on page load (subtle)
    const navbar = document.querySelector('.header');
    if (navbar) {
        setTimeout(() => {
            const navRect = navbar.getBoundingClientRect();
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    const randomX = navRect.left + Math.random() * navRect.width;
                    const randomY = navRect.top + Math.random() * navRect.height;
                    createSparkle(randomX, randomY);
                }, i * 150);
            }
        }, 600);
    }
    
    
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

    // Add subtle glow entrance animation to hover-glow elements with a stagger
    const hoverGlowEls = document.querySelectorAll('.hover-glow');
    if (hoverGlowEls.length) {
        hoverGlowEls.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('glow-entrance');

                // Remove the entrance class after the animation completes so hover still works
                const onAnimEnd = function(e) {
                    if (e.animationName === 'glowEnter') {
                        el.classList.remove('glow-entrance');
                        el.removeEventListener('animationend', onAnimEnd);
                    }
                };

                el.addEventListener('animationend', onAnimEnd);
            }, 200 + i * 120);
        });
    }
});
