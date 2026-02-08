export const generateLargeBlockData = (count = 500) => {
  const blocks = [];

  const sampleParagraphs = [
    "React is a powerful JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently. With its virtual DOM implementation, React optimizes rendering performance and provides a smooth user experience.",
    "Performance optimization is crucial for modern web applications. Techniques like code splitting, lazy loading, memoization, and virtualization can significantly improve application responsiveness and reduce resource consumption. Understanding these patterns is essential for building scalable applications.",
    "React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page. React components are JavaScript functions that return markup:",
    "State management becomes challenging as applications grow. Solutions like Redux, Context API, and Zustand offer different approaches to managing global state. Choosing the right tool depends on application complexity and team preferences.",
    "React is a JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images. React lets you combine them into reusable, nestable components. From web sites to phone apps, everything on the screen can be broken down into components. In this chapter, you’ll learn to create, customize, and conditionally display React components.",
  ];

  const codeSnippets = [
    `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
    `const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};`,
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 20px;
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>This is a basic HTML page.</p>
</body>
</html>
`,
    `class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  
  insert(value) {
    if (value < this.value) {
      if (!this.left) this.left = new BinarySearchTree(value);
      else this.left.insert(value);
    } else {
      if (!this.right) this.right = new BinarySearchTree(value);
      else this.right.insert(value);
    }
  }
}`,
  ];

  const quotes = [
    {
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay",
    },
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House",
    },
    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
    },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  ];

  const listItems = [
    [
      "Protecting forests preserves biodiversity",
      "Reducing plastic waste keeps oceans clean",
      "Using renewable energy reduces pollution",
      "Conserving water supports future generations",
    ],
    [
      "Oceans cover over 70% of the Earth's surface",
      "They are home to millions of species of marine life",
      "Oceans help regulate the planet's climate",
      "Plastic pollution is a major threat to ocean health",
      "Coral reefs support biodiversity and protect coastlines",
    ],
    [
      "Honey never spoils and can last thousands of years",
      "Octopuses have three hearts and blue blood",
      "Bananas are berries, but strawberries are not",
      "Sharks existed before trees appeared on Earth",
      "A day on Venus is longer than a year on Venus",
      "Water can boil and freeze at the same time under certain conditions",
    ],
    [
      "Testing ensures software works as intended",
      "There are different types of testing: unit, integration, and system",
      "Automated testing saves time and reduces human error",
      "Proper testing helps improve product quality and reliability",
    ],
  ];

  const actionCallbacks = [
    {title : 'Learn More', action: 'NAVIGATE_TO_LINK', payload: 'https://reactjs.org/'},
    {title : 'Download PDF', action: 'DOWNLOAD_PDF', payload: '/documents/guide.pdf'},
    {title : 'Open Modal', action: 'OPEN_MODAL', payload: {content: 'This is a modal dialog triggered by the action button.'}},
  ];

  for (let i = 0; i < count; i++) {
    const blockType = i % 15;

    switch (blockType) {
      case 0:
        blocks?.push({
          id: `block-${i}`,
          type: "heading1",
          content: `Chapter ${Math.floor(i / 15) + 1}: Advanced React`,
        });
        break;

      case 1:
        blocks?.push({
          id: `block-${i}`,
          type: "heading2",
          content: `Section ${i}: UI Library`,
        });
        break;

      case 2:
      case 3:
      case 4:
        blocks?.push({
          id: `block-${i}`,
          type: "paragraph",
          content: sampleParagraphs?.[i % sampleParagraphs?.length],
        });
        break;

      case 5:
        blocks?.push({
          id: `block-${i}`,
          type: "image",
          content: `https://picsum.photos/seed/${i}/800/400`,
          alt: `Illustration ${i} showing modern web development concepts and architectural patterns`,
          caption: `Figure ${Math.floor(i / 15) + 1}.${i % 15}: Visual representation of component architecture`,
        });
        break;

      case 6:
        blocks?.push({
          id: `block-${i}`,
          type: "code",
          language: "javascript",
          content: codeSnippets?.[i % codeSnippets?.length],
        });
        break;

      case 7:
        blocks?.push({
          id: `block-${i}`,
          type: "quote",
          content: quotes?.[i % quotes?.length]?.text,
          author: quotes?.[i % quotes?.length]?.author,
        });
        break;

      case 8:
        blocks?.push({
          id: `block-${i}`,
          type: "list",
          items: listItems?.[i % listItems?.length],
        });
        break;

      case 9:
        blocks?.push({
          id: `block-${i}`,
          type: "numbered-list",
          items: listItems?.[i % listItems?.length],
        });
        break;

      case 10:
        blocks?.push({
          id: `block-${i}`,
          type: "divider",
        });
        break;

      case 11:
        blocks?.push({
          id: `block-${i}`,
          type: "button",
          content: actionCallbacks?.[i % actionCallbacks?.length].title,
          action: actionCallbacks?.[i % actionCallbacks?.length]?.action,
          payload: actionCallbacks?.[i % actionCallbacks?.length]?.payload,
        });
        break;

      case 12:
        blocks?.push({
          id: `block-${i}`,
          type: "table",
          headers: ["Feature", "Before", "After", "Improvement"],
          rows: [
            ["Render Time", "850ms", "45ms", "94.7%"],
            ["Memory Usage", "245MB", "82MB", "66.5%"],
            ["FPS", "12fps", "60fps", "400%"],
            ["Bundle Size", "2.4MB", "890KB", "62.9%"],
          ],
        });
        break;

      case 13:
        blocks?.push({
          id: `block-${i}`,
          type: "heading3",
          content: `Subsection ${i}: Implementation Details`,
        });
        break;

      case 14:
        blocks?.push({
          id: `block-${i}`,
          type: "paragraph",
          content: `This section demonstrates block ${i} with various content types. Did you know that octopuses have three hearts and blue blood? Two of their hearts pump blood to the gills, while the third pumps it to the rest of the body. Fascinatingly, when an octopus swims, the heart that pumps to the body actually stops beating, which is why they prefer crawling to swimming—it’s less tiring!`,
        });
        break;

      default:
        blocks?.push({
          id: `block-${i}`,
          type: "paragraph",
          content: sampleParagraphs?.[0],
        });
    }
  }

  return blocks;
};
