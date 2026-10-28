/**
 * Password Safety Hub - In-Browser Password Tester
 * 
 * STRICT PRIVACY ARCHITECTURE:
 * - 100% Client-Side: Evaluated entirely inside the browser's JavaScript engine.
 * - Zero Network Requests: No fetch, XMLHttpRequest, WebSocket, beacon, or form submission.
 * - Zero Storage: No cookies, localStorage, sessionStorage, or URL parameters.
 * - Zero Logging: Password data is never printed to console logs or error reports.
 * - Complete Wipe: Password and analysis are erased whenever the user clears or leaves the tester.
 */

(function () {
    'use strict';

    // DOM Elements
    const homeHero = document.getElementById('homeHero');
    const testerSection = document.getElementById('testerSection');
    const openTesterBtn = document.getElementById('openTesterBtn');
    const backToHomeBtn = document.getElementById('backToHomeFromTesterBtn');
    const clearTesterBtn = document.getElementById('clearTesterBtn');
    const samplePasswordInput = document.getElementById('samplePasswordInput');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const meterBarFill = document.getElementById('meterBarFill');
    const strengthExplanation = document.getElementById('strengthExplanation');
    const suggestionsBox = document.getElementById('suggestionsBox');

    // Only run if elements exist on page
    if (!samplePasswordInput) return;

    // Common weak patterns and dictionary roots
    const COMMON_PATTERNS = [
        'password', 'pass', '123456', '12345678', 'qwerty', 'admin',
        'welcome', 'letmein', 'iloveyou', 'monkey', 'dragon', 'master',
        'shadow', 'football', 'baseball', 'login', 'access', 'secret'
    ];

    /**
     * Resets the tester UI and wipes any evaluated password state.
     */
    function resetTester() {
        samplePasswordInput.value = '';
        samplePasswordInput.setAttribute('type', 'password');
        if (togglePasswordBtn) {
            togglePasswordBtn.textContent = 'Show';
            togglePasswordBtn.setAttribute('aria-label', 'Show password');
        }

        strengthIndicator.className = 'strength-badge empty';
        strengthIndicator.textContent = 'Awaiting Input';

        meterBarFill.style.width = '0%';
        meterBarFill.style.backgroundColor = 'transparent';
        meterBarFill.parentElement.setAttribute('aria-valuenow', '0');

        strengthExplanation.textContent = 'Type a sample password above to see an educational strength estimate.';
        suggestionsBox.innerHTML = '';
    }

    /**
     * Show the tester and hide the Home hero.
     */
    function showTester() {
        resetTester();
        if (homeHero) {
            homeHero.classList.add('hidden');
            homeHero.setAttribute('aria-hidden', 'true');
        }
        if (testerSection) {
            testerSection.classList.remove('hidden');
            testerSection.removeAttribute('aria-hidden');
        }
        samplePasswordInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Hide the tester and restore the Home hero, completely clearing any entered data.
     */
    function hideTester() {
        resetTester();
        if (testerSection) {
            testerSection.classList.add('hidden');
            testerSection.setAttribute('aria-hidden', 'true');
        }
        if (homeHero) {
            homeHero.classList.remove('hidden');
            homeHero.removeAttribute('aria-hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Toggles between password masking and plain text.
     */
    function toggleVisibility() {
        const isMasked = samplePasswordInput.getAttribute('type') === 'password';
        if (isMasked) {
            samplePasswordInput.setAttribute('type', 'text');
            togglePasswordBtn.textContent = 'Hide';
            togglePasswordBtn.setAttribute('aria-label', 'Hide password');
        } else {
            samplePasswordInput.setAttribute('type', 'password');
            togglePasswordBtn.textContent = 'Show';
            togglePasswordBtn.setAttribute('aria-label', 'Show password');
        }
    }

    /**
     * Evaluates password strength and updates the UI in real time.
     */
    function evaluatePassword(pwd) {
        if (!pwd || pwd.length === 0) {
            resetTester();
            return;
        }

        const len = pwd.length;
        const lower = /[a-z]/.test(pwd);
        const upper = /[A-Z]/.test(pwd);
        const number = /[0-9]/.test(pwd);
        const symbol = /[^A-Za-z0-9]/.test(pwd);

        // Character variety count (0 - 4)
        const varietyCount = [lower, upper, number, symbol].filter(Boolean).length;

        // Check for predictable sequences and common patterns
        const lowerPwd = pwd.toLowerCase();
        let containsCommonPattern = false;
        for (const pattern of COMMON_PATTERNS) {
            if (lowerPwd.includes(pattern)) {
                containsCommonPattern = true;
                break;
            }
        }

        const hasConsecutiveRepeats = /(.)\1\1/.test(pwd); // 3+ identical consecutive chars
        const hasSequentialNumbers = /(?:012|123|234|345|456|567|678|789|890)/.test(lowerPwd);
        const hasSequentialLetters = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/.test(lowerPwd);
        const hasObviousPattern = containsCommonPattern || hasConsecutiveRepeats || hasSequentialNumbers || hasSequentialLetters;

        // Strength Classification: Weak, Fair, Strong, Very Strong
        let level = 'Weak';
        let barWidth = '25%';
        let barColor = 'var(--strength-weak)';
        let badgeClass = 'weak';
        let explanation = '';

        if (len < 8 || (len < 10 && hasObviousPattern)) {
            level = 'Weak';
            barWidth = '25%';
            barColor = 'var(--strength-weak)';
            badgeClass = 'weak';
            explanation = 'Weak: This password is too short or predictable and can be quickly guessed by automated tools.';
        } else if (len < 12 || varietyCount < 2 || hasObviousPattern) {
            level = 'Fair';
            barWidth = '50%';
            barColor = 'var(--strength-fair)';
            badgeClass = 'fair';
            explanation = 'Fair: Moderately complex, but adding more length or distinct words will make it significantly safer.';
        } else if (len < 15 || varietyCount < 3) {
            level = 'Strong';
            barWidth = '75%';
            barColor = 'var(--strength-strong)';
            badgeClass = 'strong';
            explanation = 'Strong: Good length and variety. Resistant to typical automated guessing attacks.';
        } else {
            level = 'Very Strong';
            barWidth = '100%';
            barColor = 'var(--strength-very-strong)';
            badgeClass = 'very-strong';
            explanation = 'Very Strong: Excellent security. Long combinations are exponentially harder to crack.';
        }

        // Constructive Suggestions (encouraging, non-shaming)
        const suggestions = [];

        if (len < 15) {
            suggestions.push('Aim for at least 15 characters, or combine multiple unrelated words into a memorable passphrase.');
        }

        if (!upper) {
            suggestions.push('Add uppercase letters to increase variation.');
        }

        if (!number) {
            suggestions.push('Include numbers to expand character variety.');
        }

        if (!symbol) {
            suggestions.push('Include special characters (e.g., !, @, #, $, %) for extra defense.');
        }

        if (hasObviousPattern) {
            suggestions.push('Avoid common dictionary words, simple keyboard walks (like "123" or "abc"), and repeated characters.');
        }

        // Update UI
        strengthIndicator.className = `strength-badge ${badgeClass}`;
        strengthIndicator.textContent = level;

        meterBarFill.style.width = barWidth;
        meterBarFill.style.backgroundColor = barColor;
        meterBarFill.parentElement.setAttribute('aria-valuenow', barWidth.replace('%', ''));

        strengthExplanation.textContent = explanation;

        if (suggestions.length > 0) {
            suggestionsBox.innerHTML = suggestions
                .map(tip => `<div class="suggestion-item"><span>${tip}</span></div>`)
                .join('');
        } else {
            suggestionsBox.innerHTML = '<div class="suggestion-item"><span>Great combination! This password demonstrates strong password safety principles.</span></div>';
        }
    }

    // Attach Event Listeners
    if (openTesterBtn) {
        openTesterBtn.addEventListener('click', showTester);
    }

    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', hideTester);
    }

    if (clearTesterBtn) {
        clearTesterBtn.addEventListener('click', () => {
            resetTester();
            samplePasswordInput.focus();
        });
    }

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', toggleVisibility);
    }

    samplePasswordInput.addEventListener('input', (e) => {
        evaluatePassword(e.target.value);
    });

    // Initial clean reset
    resetTester();
})();
