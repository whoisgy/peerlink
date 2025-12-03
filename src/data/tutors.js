export const tutors = [
  {
    id: 1,
    name: "Aisha Ali",
    subject: "Data Structures & Algorithms",
    price: 25,
    rating: 4.9,
    uniYear: "CS Year 3",
    bio: "Top 5% in DSA, loves trees & graphs.",
    longBio:
      "Aisha is a third-year Computer Science student specializing in Data Structures and Algorithms. She has helped many juniors pass DSA with clear, visual explanations of trees, graphs, and dynamic programming.",
    photo:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800",
    reviews: [
      {
        id: 1,
        student: "Amal, CS Year 1",
        rating: 5,
        date: "Oct 2025",
        comment:
          "She explained AVL trees so clearly that my midterm suddenly made sense. Very patient and structured.",
        course: "CSC2103 – Data Structures & Algorithms",
      },
      {
        id: 2,
        student: "Brian, CS Year 2",
        rating: 5,
        date: "Sep 2025",
        comment:
          "We went through past-year questions together. She really focuses on exam-style thinking.",
        course: "DSA midterm prep",
      },
    ],
  },
  {
    id: 2,
    name: "Ken Wong",
    subject: "Probability & Statistics",
    price: 20,
    rating: 4.8,
    uniYear: "Math Year 2",
    bio: "Makes probability simple.",
    longBio:
      "Ken is passionate about making probability and statistics feel intuitive. He uses many real-life examples and visual explanations instead of pure formulas.",
    photo:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800",
    reviews: [
      {
        id: 1,
        student: "Mei, Business Analytics",
        rating: 5,
        date: "Aug 2025",
        comment:
          "Helped me finally understand Bayes’ theorem. He keeps things very down-to-earth.",
        course: "Intro to Probability",
      },
    ],
  },
  {
    id: 3,
    name: "Sara Lim",
    subject: "Python Programming",
    price: 18,
    rating: 4.7,
    uniYear: "CS Year 1",
    bio: "Beginner-friendly teacher.",
    longBio:
      "Sara focuses on getting beginners comfortable with coding. She breaks problems into very small steps and encourages students to think out loud.",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
    reviews: [
      {
        id: 1,
        student: "Jia Wei, Foundation",
        rating: 5,
        date: "Jul 2025",
        comment:
          "I wrote my first real program after one session. She’s very patient with newbies.",
        course: "Intro to Programming with Python",
      },
    ],
  },
  // 👉 continue the same pattern for your other tutors (4–10)
];
