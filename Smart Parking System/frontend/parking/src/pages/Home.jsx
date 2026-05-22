import { Link } from "react-router-dom";
import {
  Car,
  MapPin,
  CalendarCheck,
  Wallet,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Car size={60} />
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Smart Parking System
          </h1>

          <p className="text-xl text-blue-100 mb-8">
            Find, book, and manage parking slots with ease
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin size={40} />}
              title="Real-Time Availability"
              description="See available parking slots in real-time with our visual slot grid"
            />

            <FeatureCard
              icon={<CalendarCheck size={40} />}
              title="Easy Booking"
              description="Book your parking slot instantly with just a few clicks"
            />

            <FeatureCard
              icon={<Wallet size={40} />}
              title="Multiple Payments"
              description="Pay via bKash, Nagad, Rocket, or Cash"
            />
          </div>
        </div>
      </section>

      {/* User/Admin Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          <div>
            <h3 className="text-3xl font-bold mb-6">
              For Vehicle Owners
            </h3>

            <ul className="space-y-4">
              <ListItem text="View all parking slots at a glance" />
              <ListItem text="Book and manage your parking" />
              <ListItem text="Track payments and violations" />
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-6">
              For Administrators
            </h3>

            <ul className="space-y-4">
              <ListItem text="Manage all parking slots" />
              <ListItem text="Simulate hardware sensors" />
              <ListItem text="Issue violations and track payments" />
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
      <div className="text-blue-600 mb-5">{icon}</div>

      <h4 className="text-2xl font-semibold mb-3">
        {title}
      </h4>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}

function ListItem({ text }) {
  return (
    <li className="flex items-center gap-3 text-lg">
      <CheckCircle className="text-green-500" size={22} />
      {text}
    </li>
  );
}
