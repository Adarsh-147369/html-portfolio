
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvT4fPCrLFQ7Noxjjg7Uz3wAHn32nHvDw6IXDM8MS93N7BsRIvWzKRNSXliClCquPT/exec";
        
        messageForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                const formData = new FormData(e.target);
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: formData.get('name'),
                        email: formData.get('email'),
                        message: formData.get('message')
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const result = await response.json();
                
                if (result.result === 'success') {
                    const successAlert = document.createElement('div');
                    successAlert.className = 'alert success';
                    successAlert.innerHTML = 'Message sent successfully! <i class="fas fa-check"></i>';
                    messageForm.prepend(successAlert);
                
                    setTimeout(() => {
                        successAlert.remove();
                    }, 5000);
                    

                    e.target.reset();
                } else {
                    throw new Error(result.error || 'Unknown error occurred');
                }
            } catch (error) {
                console.error('Error:', error);
                const errorAlert = document.createElement('div');
                errorAlert.className = 'alert error';
                errorAlert.innerHTML = `Failed to send message. Please try again later. <i class="fas fa-exclamation-circle"></i>`;
                messageForm.prepend(errorAlert);
                
                setTimeout(() => {
                    errorAlert.remove();
                }, 5000);
            } finally {
        
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
    

    const certificateCards = document.querySelectorAll('.certification-card');
    certificateCards.forEach(card => {
        card.addEventListener('click', function() {
            const filename = this.getAttribute('data-certificate');
            downloadCertificate(filename);
        });
    });
    
    function downloadCertificate(filename) {
    
        const filePath = `assets/${filename}`;
        
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filename;
        link.target = '_blank'; 
        
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .certification-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    document.querySelectorAll('.service-card, .certification-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    document.querySelectorAll('.timeline-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});