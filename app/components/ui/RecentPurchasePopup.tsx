"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RecentPurchasePopup() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const lastIndex = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const names = [
"Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Reyansh","Krishna","Ishaan","Shaurya",
"Ayaan","Atharv","Dhruv","Kabir","Rudra","Aryan","Dev","Aarush","Ansh","Yash",
"Rohan","Karan","Rahul","Ritik","Aman","Varun","Kunal","Nikhil","Harsh","Mohit",
"Siddharth","Ayush","Gaurav","Akash","Manish","Deepak","Sandeep","Ravi","Vikas","Ankit",
"Pratik","Rakesh","Naveen","Tarun","Shubham","Rohit","Adarsh","Hemant","Tejas","Ujjwal",

"Priya","Riya","Sneha","Neha","Aditi","Ananya","Kavya","Simran","Pooja","Payal",
"Divya","Nisha","Ishita","Rashmi","Shreya","Swati","Komal","Muskan","Sakshi","Tanya",
"Megha","Ritu","Jyoti","Preeti","Kritika","Shruti","Bhavna","Mansi","Nupur","Radhika",
"Ankita","Tanvi","Isha","Khushi","Pallavi","Sonam","Garima","Nikita","Chhavi","Prachi",
"Sejal","Heena","Vidhi","Trisha","Disha","Aishwarya","Pavitra","Ruchi","Namrata","Yamini",

"Abeer","Aariz","Aftab","Ahmad","Faizan","Imran","Irfan","Junaid","Kasim","Nadeem",
"Rehan","Sameer","Salman","Shahid","Sohail","Wasim","Yusuf","Zaid","Zubair","Arman",

"Alok","Ashish","Bharat","Chirag","Dinesh","Ganesh","Hitesh","Jignesh","Kalpesh","Lalit",
"Mahesh","Naresh","Paresh","Rajesh","Suresh","Umesh","Yogesh","Mukesh","Ramesh","Tushar",

"Aahana","Aarti","Anjali","Bhavya","Charu","Deepa","Esha","Falguni","Geeta","Hina",
"Indu","Jaya","Kajal","Lata","Meena","Naina","Ojasvi","Pinky","Rupal","Sonal",
"Tanisha","Uma","Vandana","Warda","Yashika","Zoya"
];

  const cities = [
"Mumbai","Pune","Delhi","Bangalore","Hyderabad",
"Ahmedabad","Surat","Jaipur","Nagpur","Nashik",
"Indore","Bhopal","Lucknow","Kanpur","Patna",
"Chandigarh","Ludhiana","Amritsar","Vadodara",
"Rajkot","Coimbatore","Kochi","Chennai",
"Kolkata","Noida","Gurgaon","Faridabad",
"Thane","Kalyan","Aurangabad","Kolhapur"
];

  useEffect(() => {
    if (!mounted) return;

    if (
      pathname.includes("checkout") ||
      pathname.includes("cart") ||
      pathname.includes("order-success")
    ) {
      return;
    }

    function show() {
      let randomIndex;

      do {
        randomIndex = Math.floor(Math.random() * names.length);
      } while (randomIndex === lastIndex.current);

      lastIndex.current = randomIndex;

      const name = names[randomIndex];

      const city =
        cities[Math.floor(Math.random() * cities.length)];

      const size =
        ["S","M","L","XL"][Math.floor(Math.random()*4)];

      setText(`${name} from ${city} purchased size ${size}`);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }

    show();
    const interval = setInterval(show, 30000);

    return () => clearInterval(interval);
  }, [mounted, pathname]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 bg-white shadow-2xl border rounded-lg p-4 text-sm transition-all duration-500 z-50 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5"
      }`}
    >
      <p className="font-medium">
        {text}
      </p>

      <p className="text-xs text-gray-500">
        Just now
      </p>
    </div>
  );
}