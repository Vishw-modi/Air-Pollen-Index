import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import PollenIndex from "./PollenIndex";
import GetPollen from "./GetPollen";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  const navItems = [
    { path: "/", label: "Pollen Guide" },
    { path: "/get-pollen", label: "Check Pollen" },
  ];

  const handleNavigation = (path) => {
    if (path === "/get-pollen" && !isSignedIn) {
      return;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Air Pollen Index
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.path === "/get-pollen" && !isSignedIn ? (
                  <SignInButton mode="modal">
                    <button
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                        "text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                      )}
                    >
                      {item.label}
                    </button>
                  </SignInButton>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.firstName || "User"}
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-muted"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.path === "/get-pollen" && !isSignedIn ? (
                    <SignInButton mode="modal">
                      <button
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                          "text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                        )}
                      >
                        {item.label}
                      </button>
                    </SignInButton>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                        location.pathname === item.path
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PollenIndex />} />
            <Route
              path="/get-pollen"
              element={
                <ProtectedRoute>
                  <GetPollen />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <footer className="border-t py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Air Pollen Index. All rights
                reserved.
              </div>
              <div className="flex space-x-4">
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
