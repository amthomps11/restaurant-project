import { type CSSProperties, useEffect, useState } from "react";
import MenuItem from "./components/menu-item";
import CreateMenuItem from "./components/create-menu-item";
import LoginForm from "./components/login-form";
import { checkSession, getRestaurant, logout } from "./api";
import { type Restaurant } from "./types";
import { STYLES, type ThemeName } from "./constants";

interface AppProps {
  restaurantId: string;
  themeColor?: string;
}

const App = ({ restaurantId, themeColor }: AppProps) => {
  const selectedTheme =
    themeColor && themeColor in STYLES
      ? STYLES[themeColor as ThemeName]
      : STYLES.default;
  const themeStyles = {
    "--theme-primary": selectedTheme.primary,
    "--theme-primary-hover": selectedTheme.primaryHover,
    "--theme-primary-foreground": selectedTheme.primaryForeground,
  } as CSSProperties;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checkingSession, setCheckingSession] = useState<boolean>(true);

  const loadRestaurant = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getRestaurant(Number(restaurantId));
      setRestaurant(data);
    } catch (error) {
      setError("Failed loading restaurant");
    } finally {
      setLoading(false);
    }
  };
 
  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setShowLogin(false);
    } catch (error) {
      setError("Failed logging out");
    }
  };

  const loadSession = async () => {
    try {
      const data = await checkSession();

      const sessionMatchesRestaurant =
        data.isLoggedIn && data.restaurantId === Number(restaurantId);

      setIsLoggedIn(sessionMatchesRestaurant);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setCheckingSession(false);
    }
  };

  useEffect(() => {
    loadRestaurant();
    loadSession();
    console.log(themeColor);
  }, []);

  return (
    <main
      style={themeStyles}
      className="flex flex-col items-center gap-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg"
    >
      {!checkingSession && !isLoggedIn && (
        <>
          <div className="flex w-full max-w-96 flex-row">
            {/* <button
              aria-controls="login-form"
              aria-expanded={showLogin}
              className="ml-auto rounded-lg bg-[] px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:ring-2"
              onClick={() => setShowLogin((visible) => !visible)}
              type="button"
            >
              {showLogin ? "Cancel" : "Login"}
            </button> */}
            <button
              aria-controls="login-form"
              aria-expanded={showLogin}
              className="ml-auto rounded-lg bg-[var(--theme-primary)] px-4 py-2 font-medium text-[var(--theme-primary-foreground)] transition hover:bg-[var(--theme-primary-hover)] focus:ring-2"
              onClick={() => setShowLogin((visible) => !visible)}
              type="button"
            >
              {showLogin ? "Cancel" : "Login"}
            </button>
          </div>
          {showLogin && restaurant && (
            <LoginForm
              restaurantId={restaurant.id}
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setShowLogin(false);
              }}
            />
          )}
        </>
      )}

      {!checkingSession && isLoggedIn && (
        <div className="flex w-full max-w-96 flex-row">
          <button
            className="ml-auto rounded-lg bg-[var(--theme-primary)] px-4 py-2 font-medium text-[var(--theme-primary-foreground)] transition hover:bg-[var(--theme-primary-hover)]"
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      )}

      {isLoggedIn && restaurant && (
        <CreateMenuItem onCreated={loadRestaurant} />
      )}

      {loading && <p>Loading menu...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading &&
        !error &&
        !showLogin &&
        restaurant &&
        restaurant.menu.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            isLoggedIn={isLoggedIn}
            onDeleted={loadRestaurant}
          />
        ))}

      {!loading && !error && restaurant && restaurant.menu.length === 0 && (
        <p>No menu items yet.</p>
      )}
    </main>
  );
};

export default App;
