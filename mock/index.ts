export type userType = {
  id: string;
  name: string;
  age: number;
  isAdmin: boolean;
  experience: number;
};

export const users: userType[] = [
  {
    id: "1",
    name: "Misha",
    age: 19,
    isAdmin: false,
    experience: 0,
  },
  {
    id: "2",
    name: "Tanya",
    age: 28,
    isAdmin: false,
    experience: 3,
  },
  {
    id: "3",
    name: "Alex",
    age: 41,
    isAdmin: false,
    experience: 3,
  },
];
