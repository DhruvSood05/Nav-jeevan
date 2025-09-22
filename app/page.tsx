"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Heart,
  MapPin,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [stats, setStats] = useState({
    helpRequests: 0,
    volunteers: 0,
    peopleHelped: 0,
    responseTime: 0,
  });

  useEffect(() => {
    // Animate stats on load
    const timer = setTimeout(() => {
      setStats({
        helpRequests: 1247,
        volunteers: 3892,
        peopleHelped: 15634,
        responseTime: 8,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 md:py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10" />
        <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23000000" fillOpacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-40' />

        <div className="container relative px-4 mx-auto">
          <motion.div
            className="flex flex-col items-center space-y-6 text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-red-600 to-orange-600 bg-clip-text text-transparent">
                Nav Jeevan
              </h1>
              <p className="mx-auto max-w-2xl text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-4">
                Revolutionary disaster relief platform that connects victims,
                volunteers, and organizations with{" "}
                <span className="font-semibold text-red-600">
                  real-time coordination
                </span>{" "}
                and
                <span className="font-semibold text-orange-600">
                  {" "}
                  instant response capabilities
                </span>
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
              variants={itemVariants}
            >
              <Link href="/request-help" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Emergency Help
                </Button>
              </Link>
              <Link href="/volunteer" className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-white/50 backdrop-blur-sm border-2 hover:bg-white/80 transition-all duration-300"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Join as Volunteer
                </Button>
              </Link>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl px-4"
              variants={itemVariants}
            >
              {[
                {
                  label: "Active Requests",
                  value: stats.helpRequests,
                  icon: AlertTriangle,
                  color: "text-red-600",
                },
                {
                  label: "Active Volunteers",
                  value: stats.volunteers,
                  icon: Users,
                  color: "text-blue-600",
                },
                {
                  label: "People Helped",
                  value: stats.peopleHelped,
                  icon: Heart,
                  color: "text-green-600",
                },
                {
                  label: "Avg Response (min)",
                  value: stats.responseTime,
                  icon: Zap,
                  color: "text-orange-600",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 md:p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20"
                >
                  <stat.icon
                    className={`h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 ${stat.color}`}
                  />
                  <div className="text-lg md:text-2xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              How Nav Jeevan Works
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Our platform streamlines disaster response with intelligent
              matching and real-time coordination
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                icon: AlertTriangle,
                title: "Emergency Request",
                description:
                  "Submit help requests with priority assessment and automatic location detection",
                color: "from-red-500 to-red-600",
                href: "/request-help",
                features: [
                  "Priority Assessment",
                  "GPS Auto-Location",
                  "Multi-language Support",
                ],
              },
              {
                icon: Heart,
                title: "Smart Volunteer Matching",
                description:
                  "Matches volunteers with requests based on skills, location, and availability in real-time",
                color: "from-green-500 to-green-600",
                href: "/volunteer",
                features: [
                  "Skill-based Matching",
                  "Real-time Notifications",
                  "Progress Tracking",
                ],
              },
              {
                icon: MapPin,
                title: "Live Relief Map",
                description:
                  "Interactive map with real-time updates, resource tracking, and coordination tools",
                color: "from-blue-500 to-blue-600",
                href: "/map",
                features: [
                  "Real-time Updates",
                  "Resource Tracking",
                  "Route Optimization",
                ],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg md:text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base text-gray-600 px-2">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {feature.features.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href={feature.href} className="w-full">
                      <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-800 transition-all duration-300">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto px-4">
              Join thousands of volunteers and organizations making real impact
              in disaster relief efforts worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link href="/request-help" className="flex-1">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full bg-white text-red-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Need Help Now
                </Button>
              </Link>
              <Link href="/volunteer" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-white text-red-600 border-white hover:bg-gray-200 hover:text-red-600 transition-all duration-300"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Start Volunteering
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container px-4 mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Nav Jeevan</h3>
              <p className="text-gray-400 text-sm">
                Disaster relief coordination platform connecting communities
                worldwide.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/request-help"
                    className="hover:text-white transition-colors"
                  >
                    Request Help
                  </Link>
                </li>
                <li>
                  <Link
                    href="/volunteer"
                    className="hover:text-white transition-colors"
                  >
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/map"
                    className="hover:text-white transition-colors"
                  >
                    Nav Jeevan Map
                  </Link>
                </li>
                <li>
                  <Link
                    href="/donate"
                    className="hover:text-white transition-colors"
                  >
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Nav Jeevan. All rights reserved. Built for humanity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
