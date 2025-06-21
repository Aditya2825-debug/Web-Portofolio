// Typing Effect dengan cursor berkedip
const tagline = document.getElementById('tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.classList.add('typing');
    let i = 0;

    function type() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            setTimeout(type, 80);
            i++;
        }
    }

    setTimeout(type, 1000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Toggle Detail Project dengan show/hide functionality
function toggleDetail(idx) {
    const detailElement = document.getElementById('detail-' + idx);
    const buttonElement = document.getElementById('btn-' + idx);
    
    if (detailElement && buttonElement) {
        if (detailElement.classList.contains('hidden')) {
            // Show detail
            detailElement.classList.remove('hidden');
            buttonElement.textContent = 'Sembunyikan Detail';
        } else {
            // Hide detail
            detailElement.classList.add('hidden');
            buttonElement.textContent = 'Lihat Detail';
        }
    }
}

// Fungsi lama showDetail untuk backward compatibility (opsional)
function showDetail(idx) {
    toggleDetail(idx);
}

// Hapus semua JavaScript untuk efek hover pada section About
// Karena sekarang hanya gambar yang punya efek hover, tidak perlu JavaScript tambahan

// Mobile Menu Functions
const selengkapnyaBtn = document.getElementById('selengkapnyaBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('active');
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
}

if (selengkapnyaBtn) selengkapnyaBtn.onclick = openMobileMenu;
if (closeMenuBtn) closeMenuBtn.onclick = closeMobileMenu;

mobileMenuLinks.forEach(link => {
    link.onclick = closeMobileMenu;
});

document.addEventListener('click', function (e) {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && 
            selengkapnyaBtn && !selengkapnyaBtn.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

// Efek glow pada garis saat gambar dihover
const aboutImg = document.getElementById('about-img');
const aboutDivider = document.querySelector('.about-divider');

if (aboutImg && aboutDivider) {
    aboutImg.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            aboutDivider.classList.add('image-glowing');
        }
    });

    aboutImg.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            aboutDivider.classList.remove('image-glowing');
        }
    });
}

// Contact form validation and fake notification
document.addEventListener('DOMContentLoaded', function() {
    const dropdownSelect = document.querySelector('.dropdown-select');
    const submitButton = document.querySelector('#contact button');
    
    // Dropdown functionality (existing code)
    if (dropdownSelect) {
        dropdownSelect.addEventListener('change', function() {
            Array.from(this.options).forEach(option => {
                option.style.backgroundColor = 'rgba(25, 25, 40, 0.95)';
                option.style.color = 'white';
            });
            
            if (this.selectedIndex > 0) {
                this.options[this.selectedIndex].style.backgroundColor = 'rgba(0, 255, 204, 0.2)';
                this.options[this.selectedIndex].style.color = '#00ffcc';
            }
        });
    }
    
    // Form validation and fake notification
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get all form inputs
            const nama = document.querySelector('input[placeholder="Nama"]').value.trim();
            const email = document.querySelector('input[placeholder="Email"]').value.trim();
            const telepon = document.querySelector('input[placeholder="Nomor Telepon"]').value.trim();
            const subjek = document.querySelector('input[placeholder="Subjek"]').value.trim();
            const jenisKelamin = document.querySelector('.dropdown-select').value;
            const pesan = document.querySelector('textarea[placeholder="Pesan"]').value.trim();
            
            // Validation
            if (!nama) {
                showNotification('Nama harus diisi!', 'error');
                return;
            }
            
            if (!email) {
                showNotification('Email harus diisi!', 'error');
                return;
            }
            
            // Email validation - must end with @gmail.com
            if (!email.endsWith('@gmail.com')) {
                showNotification('Email harus menggunakan @gmail.com!', 'error');
                return;
            }
            
            if (!telepon) {
                showNotification('Nomor telepon harus diisi!', 'error');
                return;
            }
            
            // Nomor telepon validation - harus angka dan minimal 11 digit
            const phoneRegex = /^\d+$/; // Hanya angka
            if (!phoneRegex.test(telepon)) {
                showNotification('Nomor telepon harus berisi angka saja!', 'error');
                return;
            }
            
            if (telepon.length < 11) {
                showNotification('Nomor telepon minimal 11 digit!', 'error');
                return;
            }
            
            if (!subjek) {
                showNotification('Subjek harus diisi!', 'error');
                return;
            }
            
            if (!jenisKelamin) {
                showNotification('Jenis kelamin harus dipilih!', 'error');
                return;
            }
            
            if (!pesan) {
                showNotification('Pesan harus diisi!', 'error');
                return;
            }
            
            // If all validation passed
            showNotification('Pesan berhasil terkirim! Terima kasih telah menghubungi saya.', 'success');
            
            // Reset form after successful submission
            setTimeout(() => {
                document.querySelector('input[placeholder="Nama"]').value = '';
                document.querySelector('input[placeholder="Email"]').value = '';
                document.querySelector('input[placeholder="Nomor Telepon"]').value = '';
                document.querySelector('input[placeholder="Subjek"]').value = '';
                document.querySelector('.dropdown-select').selectedIndex = 0;
                document.querySelector('textarea[placeholder="Pesan"]').value = '';
            }, 1000);
        });
    }
});

// Function to show notification
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'error' : ''}`;
    
    if (type === 'error') {
        // Untuk error tetap pakai icon
        notification.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; font-size: 1rem;">
                <span style="font-size: 1.5rem;">❌</span>
                <span>${message}</span>
            </div>
        `;
    } else {
        // Untuk success hanya teks saja
        notification.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                <span>${message}</span>
            </div>
        `;
    }
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}