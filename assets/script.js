/**
 * SCRIPT PRINCIPAL - PORTFÓLIO
 * Organizado por seções funcionais
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. CONFIGURAÇÕES INICIAIS
    // =============================================
    
    // Atualizar ano no footer
    function updateYear() {
        document.getElementById('year').textContent = new Date().getFullYear();
    }
    
    // Verificar se elementos existem
    function elementExists(selector) {
        return document.querySelector(selector) !== null;
    }
    
    // Inicializar configurações
    updateYear();
    
    // =============================================
    // 2. MENU MOBILE E NAVEGAÇÃO
    // =============================================
    
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav ul');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        if (!menuToggle || !nav) return;
        
        // Função para alternar menu
        function toggleMenu() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Alternar visibilidade
            if (nav.classList.contains('active')) {
                nav.style.display = 'flex';
            } else {
                nav.style.display = 'none';
            }
        }
        
        // Fechar menu ao clicar em link
        function closeMenu() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            nav.style.display = 'none';
        }
        
        // Event listeners
        menuToggle.addEventListener('click', toggleMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Inicializar estado do menu
        if (window.innerWidth <= 992) {
            nav.style.display = 'none';
        }
    }
    
    // =============================================
    // 3. SCROLL SUAVE E SEÇÕES ATIVAS
    // =============================================
    
    function initSmoothScroll() {
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
        
        // Ativar link do menu conforme scroll
        function initActiveSection() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav ul li a');
            
            function checkActiveSection() {
                let current = '';
                const scrollPosition = window.scrollY + 150;
                
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
            
            window.addEventListener('scroll', checkActiveSection);
            window.addEventListener('load', checkActiveSection);
        }
        
        initActiveSection();
    }
    
    // =============================================
    // 4. ANIMAÇÕES E EFEITOS VISUAIS
    // =============================================
    
    function initAnimations() {
        // Animação das barras de habilidades
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-level');
            
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
        
        // Observar quando a seção de habilidades entra na viewport
        if (elementExists('.skills')) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(document.querySelector('.skills'));
        }
        
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
    }
    
    // =============================================
    // 5. FORMULÁRIO DE CONTATO
    // =============================================
    
    function initContactForm() {
        if (!elementExists('#contact-form')) return;
        
        const form = document.getElementById('contact-form');
        const status = document.getElementById('form-status');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar mensagem de carregamento
            status.textContent = "Enviando mensagem...";
            status.className = "status-message";
            status.style.display = "block";
            
            fetch("https://formsubmit.co/ajax/giovanimelo3007@gmail.com", {
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
    }
    
    // =============================================
    // 6. BOTÕES E INTERAÇÕES
    // =============================================
    
    function initButtons() {
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
    }
    
    // =============================================
    // 7. RESPONSIVIDADE
    // =============================================
    
    function handleResponsive() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav ul');
        
        if (!menuToggle || !nav) return;
        
        if (window.innerWidth <= 992) {
            // Ajustar layout para mobile
            const hero = document.querySelector('.hero .container');
            if (hero) {
                hero.style.flexDirection = 'column';
                hero.querySelector('.hero-content').style.paddingRight = '0';
                hero.querySelector('.hero-content h2').style.textAlign = 'center';
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
            
            // Esconder toggle do menu
            menuToggle.style.display = 'none';
            nav.style.display = 'flex';
        }
    }
    
    // =============================================
    // 8. INICIALIZAÇÃO DE TODAS AS FUNÇÕES
    // =============================================
    
    function initAll() {
        initMobileMenu();
        initSmoothScroll();
        initAnimations();
        initContactForm();
        initButtons();
        handleResponsive();
        
        // Event listener para redimensionamento
        window.addEventListener('resize', handleResponsive);
    }
    
    // Iniciar tudo
    initAll();
});