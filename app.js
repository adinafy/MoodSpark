const quotesByCategory = {
  "Encouragement": [
    "Keep going, you're doing great!",
    "Every day is a fresh start.",
    "You are stronger than you think.",
    "Difficult roads often lead to beautiful destinations.",
    "Believe in yourself and all that you are."
  ],
  "Philosophy": [
    "He who has a why can bear any how. – Nietzsche",
    "The journey matters more than the destination.",
    "To be is to do. – Socrates",
    "Happiness depends upon ourselves. – Aristotle",
    "The unexamined life is not worth living. – Socrates"
  ],
  "Humor": [
    "If life gives you lemons, find someone with tequila!",
    "An apple a day keeps anyone away if you throw it hard enough.",
    "I'm on a seafood diet. I see food and I eat it.",
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my computer I needed a break, and it said 'No problem, I'll go to sleep.'"
  ]
};

const categorySelect = document.getElementById('category-select');
const quoteText = document.getElementById('quote-text');
const nextQuoteBtn = document.getElementById('next-quote');

const categoryIcons = {
  "Encouragement": "💪",
  "Philosophy": "💡",
  "Humor": "😂"
};
const categoryIconDiv = document.getElementById('category-icon');

// Populate dropdown
function populateCategories() {
  categorySelect.innerHTML = '<option value="" disabled selected>Select a category</option>';
  Object.keys(quotesByCategory).forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Get random quote
function getRandomQuote(category) {
  const quotes = quotesByCategory[category];
  if (!quotes || quotes.length === 0) return '';
  const idx = Math.floor(Math.random() * quotes.length);
  return quotes[idx];
}

let currentCategory = null;

function showQuoteWithAnimation(quote) {
  quoteText.classList.remove('fade-in');
  // Force reflow to restart animation
  void quoteText.offsetWidth;
  quoteText.textContent = quote;
  quoteText.classList.add('fade-in');
}

function showCategoryIcon(category) {
  const icon = categoryIcons[category] || '';
  categoryIconDiv.textContent = icon;
  if (icon) {
    categoryIconDiv.classList.remove('icon-bounce');
    void categoryIconDiv.offsetWidth;
    categoryIconDiv.classList.add('icon-bounce');
  } else {
    categoryIconDiv.classList.remove('icon-bounce');
  }
}

categorySelect.addEventListener('change', () => {
  // Animate the dropdown
  categorySelect.classList.remove('category-animate');
  void categorySelect.offsetWidth;
  categorySelect.classList.add('category-animate');

  currentCategory = categorySelect.value;
  if (currentCategory) {
    showQuoteWithAnimation(getRandomQuote(currentCategory));
    showCategoryIcon(currentCategory);
    nextQuoteBtn.disabled = false;
  } else {
    quoteText.textContent = 'Select a category to see a quote.';
    nextQuoteBtn.disabled = true;
  }
});

// Remove animation class after animation ends so it can be retriggered
categorySelect.addEventListener('animationend', () => {
  categorySelect.classList.remove('category-animate');
});

categoryIconDiv.addEventListener('animationend', () => {
  categoryIconDiv.classList.remove('icon-bounce');
});

nextQuoteBtn.addEventListener('click', () => {
  if (currentCategory) {
    showQuoteWithAnimation(getRandomQuote(currentCategory));
  }
});

// Initialize
populateCategories();

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
} 