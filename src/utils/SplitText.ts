/**
 * SplitText utility for text animation effects
 * Inspired by GSAP's SplitText functionality
 */
class SplitText {
  element: HTMLElement;
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  originalHTML: string;

  constructor(element: HTMLElement | string) {
    // Handle element parameter
    if (typeof element === 'string') {
      const el = document.querySelector(element) as HTMLElement;
      if (!el) throw new Error(`Element ${element} not found`);
      this.element = el;
    } else if (element instanceof HTMLElement) {
      this.element = element;
    } else {
      throw new Error('Invalid element provided to SplitText');
    }

    this.originalHTML = this.element.innerHTML;
    this.split();
  }

  /**
   * Split text into characters, words, and lines
   */
  split() {
    // Reset
    this.chars = [];
    this.words = [];
    this.lines = [];
    
    // Save original content
    const originalContent = this.element.innerHTML;
    
    // Create a container for our split text
    const container = document.createElement('div');
    container.style.display = 'inline-block';
    container.style.position = 'relative';
    
    // Process text content
    const textContent = this.element.textContent || '';
    this.element.textContent = '';
    this.element.appendChild(container);
    
    // Split into words and characters
    const words = textContent.split(' ');
    
    words.forEach((word, i) => {
      // Create word span
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.position = 'relative';
      this.words.push(wordSpan);
      
      // Split word into characters
      const chars = word.split('');
      
      chars.forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.style.display = 'inline-block';
        charSpan.style.position = 'relative';
        charSpan.textContent = char;
        this.chars.push(charSpan);
        wordSpan.appendChild(charSpan);
      });
      
      container.appendChild(wordSpan);
      
      // Add space after word except for last word
      if (i < words.length - 1) {
        const space = document.createTextNode(' ');
        container.appendChild(space);
      }
    });
    
    // Return SplitText instance for chaining
    return this;
  }

  /**
   * Revert the element to its original HTML
   */
  revert() {
    this.element.innerHTML = this.originalHTML;
  }
}

// Export for use in components
export default SplitText;