document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const wordCount = document.getElementById('wordCount');
    const sentenceCount = document.getElementById('sentenceCount');

    const countWords = (text) => {
        if (!text.trim()) return 0;
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const countSentences = (text) => {
        if (!text.trim()) return 0;
        return text.trim()
            .split(/[.!?]+(?:\s+|$)/)
            .filter(sentence => sentence.trim().length > 0).length;
    };

    const updateCounts = () => {
        const text = textInput.value;
        
        const words = countWords(text);
        const sentences = countSentences(text);

        animateValue(wordCount, 'Words', words);
        animateValue(sentenceCount, 'Sentences', sentences);
    };

    const animateValue = (element, label, value) => {
        const current = parseInt(element.textContent.split(': ')[1]);
        if (current === value) return;

        element.textContent = `${label}: ${value}`;
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    };

    textInput.addEventListener('input', updateCounts);
    textInput.addEventListener('paste', () => {
        setTimeout(updateCounts, 0);
    });
});