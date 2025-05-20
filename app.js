let sensitiveWords = {};

async function loadSensitiveWords() {
  const response = await fetch("sensitive_keywords.json");
  sensitiveWords = await response.json();
}

function detect() {
  const input = document.getElementById("userInput").value;
  const resultDiv = document.getElementById("result");
  let markedText = input;
  let foundWords = [];

  for (const [category, words] of Object.entries(sensitiveWords)) {
    words.forEach(word => {
      if (input.includes(word)) {
        const regex = new RegExp(`(${word})`, 'g');
        markedText = markedText.replace(regex, '<span class="highlight">$1</span>');
        foundWords.push({ word, category });
      }
    });
  }

  if (foundWords.length === 0) {
    resultDiv.innerHTML = "<p>✅ 未检测到敏感词。</p>";
  } else {
    const list = foundWords.map(item => `「${item.word}」 (${item.category})`).join('\n');
    resultDiv.innerHTML = `<p>⚠️ 检测到以下敏感词：</p>\n${list}\n\n<p>${markedText}</p>`;
  }
}

loadSensitiveWords();
