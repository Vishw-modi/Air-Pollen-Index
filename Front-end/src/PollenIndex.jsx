import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { SignInButton, useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isLoading, isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/" />;

    return children;
  }
};

const PollenIndex = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { isSignedIn } = useAuth();

  const handleNavigation = () => {
    if (!isSignedIn) {
      return;
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pollenTypes = [
    {
      name: "Grass Pollen",
      description:
        "Common in spring and summer, grass pollen can cause hay fever symptoms.",
      precautions: [
        "Keep windows closed during high pollen counts",
        "Avoid mowing lawns or being around freshly cut grass",
        "Shower after being outdoors",
        "Use air purifiers indoors",
      ],
    },
    {
      name: "Tree Pollen",
      description:
        "Most prevalent in early spring, tree pollen can trigger allergic reactions.",
      precautions: [
        "Wear sunglasses to protect eyes",
        "Avoid outdoor activities in the morning",
        "Change clothes after being outside",
        "Use nasal sprays before going outdoors",
      ],
    },
    {
      name: "Weed Pollen",
      description:
        "Common in late summer and fall, weed pollen can be particularly irritating.",
      precautions: [
        "Stay indoors on windy days",
        "Wear a mask when gardening",
        "Keep car windows closed",
        "Use HEPA filters in your home",
      ],
    },
  ];

  const riskLevels = [
    {
      level: "Low",
      color: "text-green-500",
      description: "Minimal risk of allergic reactions",
      icon: "🌱",
    },
    {
      level: "Moderate",
      color: "text-yellow-500",
      description: "Some risk of allergic reactions",
      icon: "⚠️",
    },
    {
      level: "High",
      color: "text-orange-500",
      description: "High risk of allergic reactions",
      icon: "🚨",
    },
    {
      level: "Very High",
      color: "text-red-500",
      description: "Extreme risk of allergic reactions",
      icon: "🔥",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <Card className="w-full animate-fade-in">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Pollen Index Guide
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Understanding pollen types and their impact on allergies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Risk Levels Section */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-center">
                  Risk Levels
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {riskLevels.map((risk) => (
                    <Card
                      key={risk.level}
                      className="hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-4xl">{risk.icon}</span>
                          <h3 className={`text-xl font-bold ${risk.color}`}>
                            {risk.level}
                          </h3>
                          <p className="text-sm text-center text-muted-foreground">
                            {risk.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Pollen Types Section */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-center">
                  Pollen Types
                </h2>
                <div className="space-y-6">
                  {pollenTypes.map((type) => (
                    <Card
                      key={type.name}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader>
                        <CardTitle className="text-xl">{type.name}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h3 className="font-semibold">Precautions:</h3>
                          <ul className="list-disc list-inside space-y-1">
                            {type.precautions.map((precaution, index) => (
                              <li
                                key={index}
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                              >
                                {precaution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Tips Section */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-center">
                  General Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle>Indoor Precautions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Use air purifiers with HEPA filters
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Keep windows closed during high pollen days
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Clean and vacuum regularly
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Use hypoallergenic bedding
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle>Outdoor Precautions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Check pollen forecasts before going out
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Wear sunglasses and a hat
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Shower after being outdoors
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Avoid outdoor activities during peak pollen times
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Action Section */}
              <section className="text-center space-y-4">
                <h2 className="text-2xl font-semibold">
                  Ready to Check Pollen Levels?
                </h2>
                <p className="text-muted-foreground">
                  Get real-time pollen data for your location
                </p>
                {!isSignedIn ? (
                  <SignInButton mode="modal">
                    <Button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Sign In to Check Pollen
                    </Button>
                  </SignInButton>
                ) : (
                  <Link to="/get-pollen">
                    <Button
                      onclick={() => {
                        window.onscroll({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Check Pollen Levels
                    </Button>
                  </Link>
                )}
                {/* <SignInButton mode="model">
                  <Button
                    className="hover:scale-105 transition-transform duration-200"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Check Pollen Levels
                  </Button>
                </SignInButton> */}
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Scroll to Top Button */}
        {showScrollButton && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 animate-fade-in"
            size="icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PollenIndex;
