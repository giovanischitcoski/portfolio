document.addEventListener('DOMContentLoaded', function() {
    // Atualizar o ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Ativar link do menu conforme scroll (VERSÃO CORRIGIDA)
    const sections = document.querySelectorAll('section[id]');
    
    function checkActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 150; // Ajuste para ativar antes de chegar na seção
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Adiciona os event listeners
    window.addEventListener('scroll', checkActiveSection);
    window.addEventListener('load', checkActiveSection);

    // Animação das barras de habilidades quando visíveis
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Observar quando a seção de habilidades entra na viewport
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }

    // Formulário de contato
    document.getElementById('contact-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const status = document.getElementById('form-status');
        
        // Mostrar mensagem de carregamento
        status.textContent = "Enviando mensagem...";
        status.className = "status-message";
        status.style.display = "block";
        
        fetch("https://formsubmit.co/ajax/giovanimelo3007@gmail.com", 
            {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: form.name.value,
                email: form.email.value,
                message: form.message.value
            })
        })
        .then(response => response.json())
        .then(data => {
            status.textContent = "Mensagem enviada com sucesso!";
            status.className = "status-message success";
            form.reset();
        })
        .catch(error => {
            status.textContent = "Ocorreu um erro ao enviar. Tente novamente mais tarde.";
            status.className = "status-message error";
        });
    });

    // Efeito de hover nos cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-link').style.color = '#F2EB85';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-link').style.color = '#E2F263';
        });
    });

    // Botão de download do currículo
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Criar link temporário para download
            const link = document.createElement('a');
            link.href = 'assets/Giovani_Melo_CV.pdf';
            link.download = 'Giovani_Melo_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Feedback visual
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Download Concluído!';
            downloadBtn.classList.add('downloaded');
            
            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Baixar Currículo';
                downloadBtn.classList.remove('downloaded');
            }, 2000);
        });
    }

    // Responsividade - ajustar layout para telas menores
    function handleResponsive() {
        if (window.innerWidth <= 992) {
            // Ajustar layout do hero para mobile
            const hero = document.querySelector('.hero .container');
            if (hero) {
                hero.style.flexDirection = 'column';
                hero.querySelector('.hero-content').style.paddingRight = '0';
                hero.querySelector('.hero-content h2').style.textAlign = 'center';
            }
            
            // Ajustar layout sobre mim para mobile
            const aboutContent = document.querySelector('.about-content');
            if (aboutContent) {
                aboutContent.style.flexDirection = 'column';
            }
            
            // Ajustar layout contato para mobile
            const contactContent = document.querySelector('.contact-content');
            if (contactContent) {
                contactContent.style.flexDirection = 'column';
            }
            
            // Mostrar toggle do menu
            menuToggle.style.display = 'block';
            nav.style.display = 'none';
        } else {
            // Restaurar layout para desktop
            const hero = document.querySelector('.hero .container');
            if (hero) {
                hero.style.flexDirection = 'row';
                hero.querySelector('.hero-content').style.paddingRight = '40px';
                hero.querySelector('.hero-content h2').style.textAlign = 'left';
            }
            
            const aboutContent = document.querySelector('.about-content');
            if (aboutContent) {
                aboutContent.style.flexDirection = 'row';
            }
            
            const contactContent = document.querySelector('.contact-content');
            if (contactContent) {
                contactContent.style.flexDirection = 'row';
            }
            
            // Esconder toggle do menu
            menuToggle.style.display = 'none';
            nav.style.display = 'flex';
        }
    }
    
    // Executar na carga e no redimensionamento
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});