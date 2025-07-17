export interface ServicesData {
  id: number;
  name: string;
  category: string;
  image: string;
}

export const servicesImages: ServicesData[] = [
  {
    id: 1,
    name: "Wedding Photography",
    category: "wedding",
    image: "/images/wedding-photo1.jpg",
  },
  {
    id: 3,
    name: "Event Coverage",
    category: "commercial",
    image: "/images/event-coverage.jpg",
  },
  {
    id: 2,
    name: "Portrait Sessions",
    category: "portrait",
    image: "/images/portrait.jpg",
  },
  {
    id: 4,
    name: "Drone Footage",
    category: "event",
    image: "/images/drone-footage.jpg",
  },
];
