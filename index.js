const leftEye = document.getElementById('left-eye')
const rightEye = document.getElementById('right-eye')
const themeBtn = document.getElementById('btn-theme')

document.documentElement.classList.add('no-transition')

if (themeBtn) {
    themeBtn.addEventListener('click', handleThemeButton);
}
document.addEventListener('mousemove', followCursor)
document.addEventListener('click', handleNavMenu)
window.addEventListener('blur', addOutOfFocusClass)
window.addEventListener('focus', removeOutOfFocusClass)
document.addEventListener('DOMContentLoaded', () => {
    getLocalStorageTheme()
    updateDates()
    handleNavScroll()
    applyCtaAnimationsDelay()
    showEyesWhenAvatarLoads()
    handleLanguageTouch()

    setTimeout(() => {
        document.documentElement.classList.remove('no-transition')
    }, 100)
})

function showEyesWhenAvatarLoads() {
    const avatar = document.getElementById("avatar")
    if (avatar.complete) {
        document.querySelectorAll(".eye").forEach(eye => {
            eye.style.opacity = "1"
        })
    } else {
        requestAnimationFrame(showEyesWhenAvatarLoads)
    }
}

function handleLanguageTouch() {
    document.querySelectorAll('#languages .language').forEach(language => {
        language.addEventListener('click', () => {
            language.classList.toggle('active')
            
            setTimeout(() => {
                language.classList.remove('active')
            }, 300)
        })
    })
}

function applyCtaAnimationsDelay() {
    const ctaButtons = document.querySelectorAll("#cta button")

    ctaButtons.forEach((button, index) => {
        button.style.animationDelay = `${index * 0.1}s`
    })
}

function getLocalStorageTheme() {
    let currentTheme = localStorage.getItem('theme')
    if (!currentTheme) {
        currentTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        localStorage.setItem('theme', currentTheme)
    }
    
    document.body.classList.toggle('dark', currentTheme === 'dark')
    document.documentElement.classList.toggle('dark', currentTheme === 'dark')

    applyThemeToElements(currentTheme)
    updateThemeButtonIcon(currentTheme)
}

function applyThemeToElements(theme) {
    const elements = [
        document.querySelectorAll('.project'),
        document.querySelectorAll('.language'),
        document.querySelectorAll('.certificate'),
        document.querySelectorAll('.tool'),
        document.querySelectorAll('.divider'),
        document.querySelectorAll('.nav-a'),
        document.querySelectorAll('.social-btn'),
        document.querySelectorAll('.date'),
        document.querySelectorAll('.proj-link'),
        document.querySelectorAll('.tooltip-text'),
        [document.getElementById('btn-cv')],
        [document.querySelector('nav')],
        [document.getElementById('nav-menu')],
        [document.getElementById('btn-nav-menu')],
        [document.getElementById('btn-theme')],
        [document.getElementById('btn-home')],
        [document.getElementById('education-container')],
        [document.getElementById('experience-container')],
    ]

    elements.forEach(group => {
        group.forEach(el => {
            if (el) {
                el.classList.toggle('dark', theme === 'dark')
            }
        })
    })
}

function updateThemeButtonIcon(theme) {
    const themeBtn = document.getElementById('btn-theme')
    if (!themeBtn) return

    themeBtn.classList.remove('dark', 'light')
    themeBtn.classList.add(theme)
}

function handleNavScroll() {
    const navLinks = document.querySelectorAll('.nav-a')

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const targetId = link.getAttribute('href').substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                targetElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
            }
        })
    })
}

function updateDates() {
    const ageElement = document.getElementById('age')
    const yearsInTechElement = document.getElementById('years-in-tech')
    const monthsDiffElement = document.getElementById('months-diff')
    const currentYearElement = document.getElementById('current-year')

    const birthDate = new Date('1991-03-09')
    const age = Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000))
    const careerStart = new Date('2014-10-01')
    const yearsInTech = Math.floor((new Date() - careerStart) / (365.25 * 24 * 60 * 60 * 1000))
    const frontendStart = new Date('2024-06-01')
    const monthsDiff = Math.floor((new Date() - frontendStart) / (30.44 * 24 * 60 * 60 * 1000))
    const currentYear = new Date().getFullYear()

    ageElement.textContent = age
    yearsInTechElement.textContent = yearsInTech
    monthsDiffElement.textContent = monthsDiff
    currentYearElement.textContent = currentYear
}

function addOutOfFocusClass() {
    document.documentElement.classList.add('window-out-of-focus')
}

function removeOutOfFocusClass() {
    document.documentElement.classList.remove('window-out-of-focus')
}

function handleNavMenu(e) {
    const navMenu = document.getElementById('nav-menu')
    const menuButton = e.target.closest('#btn-nav-menu')
    const clickedInsideMenu = e.target.closest('#nav-menu')
    const clickedLink = e.target.closest('#nav-menu a')

    if (menuButton) {
        navMenu.classList.toggle('hidden')
    } else if (clickedLink) {
        navMenu.classList.add('hidden')
    } else if (!clickedInsideMenu && !navMenu.classList.contains('hidden')) {
        navMenu.classList.add('hidden')
    }
}

function handleThemeButton() {
    const currentTheme = localStorage.getItem('theme') || 'light'
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'

    applyThemeToElements(newTheme)
    document.body.classList.toggle('dark', newTheme === 'dark')
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)

    const themeBtn = document.getElementById('btn-theme')

    const themeIcons = {
        light: "./assets/light-mode-icon.svg",
        dark: "./assets/dark-mode-icon.svg"
    }

    const icon = new Image()
    icon.src = themeIcons[newTheme]
    
    themeBtn.classList.remove('rotate-animation', 'rotate-animation-reverse')
    void themeBtn.offsetWidth
    themeBtn.classList.remove('dark', 'light')
    themeBtn.classList.add(newTheme)
    themeBtn.classList.add(newTheme === 'dark' ? 'rotate-animation-reverse' : 'rotate-animation')

    setTimeout(() => {
        themeBtn.classList.remove('rotate-animation', 'rotate-animation-reverse')
    }, 300)
}

function followCursor(e) {
    if (!leftEye || !rightEye) return

    const eyes = [leftEye, rightEye]
    
    // Calculate center point between eyes
    const leftRect = leftEye.getBoundingClientRect()
    const rightRect = rightEye.getBoundingClientRect()
    const centerX = (leftRect.left + rightRect.right) / 2
    const centerY = (leftRect.top + rightRect.bottom) / 2
    
    // Calculate distance from center point
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    // Limit movement range (same for both eyes)
    const moveX = Math.max(Math.min(distanceX / 5, 3), -9)
    const moveY = Math.max(Math.min(distanceY / 5, 3), -9)
    
    // Apply same translation to both eyes
    eyes.forEach(eye => {
        eye.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
}

function blink() {
    const eyes = [leftEye, rightEye]
    
    eyes.forEach(eye => {
        const currentTransform = eye.style.transform || 'translate(0, 0)'
        eye.style.transform = `${currentTransform} scaleY(0.1)`
        
        setTimeout(() => {
            eye.style.transform = currentTransform
        }, 150)
    })
}
// Initial blink
setTimeout(blink, 1000)

// Random blink interval
setInterval(() => {
    blink()
}, Math.random() * 5000 + 3500)