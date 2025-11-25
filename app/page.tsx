"use client"

export default function Home() {
  return (
    <div>
      <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-blue-500" onClick={() => alert('Hello')}>Click me</button>
    </div>
  );
}
