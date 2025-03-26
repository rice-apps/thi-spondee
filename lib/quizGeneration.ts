import { spondeeWords } from "./words";

// Simple hash function for creating a seed
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Seed-based random number generator
function createSeededRandom(seed: string) {
  let state = simpleHash(seed);
  return () => {
    // Linear congruential generator
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

function shuffleArray<T>(array: T[], rand: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuiz(
  setSize: number,
  seed: string = Date.now().toString()
) {
  // Create seeded random number generator
  const rand = createSeededRandom(seed);
  const numQuestions = 20;

  // Create a copy of words to avoid modifying original
  const quiz = [];
  console.log("===");
  console.log(seed);

  for (let i = 0; i < numQuestions; i++) {
    let words = [...spondeeWords];
    let choices: string[] = [];

    // get wrong choices
    for (let j = 0; j < setSize - 1; j++) {
      const idx = Math.floor(rand() * words.length);
      choices.push(words.splice(idx, 1)[0]);
    }

    const correctWordIdx = Math.floor(rand() * words.length);
    const correctWord = words.splice(correctWordIdx, 1)[0];
    choices.push(correctWord);
    console.log(
      "correctWord " + correctWord + " choices: " + choices.toString()
    );

    quiz.push({
      word: correctWord,
      choices: choices,
      correctAnswer: correctWord,
    });
  }
  console.log("===");

  return quiz;
}
