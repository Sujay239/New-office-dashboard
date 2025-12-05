import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../components/NotificationProvider";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { showError } = useNotification();

  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Auto Computauion - Login";
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error on change
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!/^\S+@\S+$/.test(values.email)) {
      newErrors.email = "Invalid email";
    }

    if (values.password.length < 6) {
      newErrors.password = "Password should include at least 6 characters";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors).find(
        (err) => err !== undefined
      );
      if (firstError) showError(firstError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // If you later add token saving, do it here
      // setTokenCookie(data.token);

      if (data.user.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (error) {
      console.error(error);
      showError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">

      <div className="flex h-full overflow-hidden">
        {/* Left side - Image (70%) */}
        <div
          className="xl:block lg:hidden hidden"
          style={{
            width: "70%",
            position: "relative",
            borderRadius: "0 20px 20px 0",
            overflow: "hidden",
          }}
        >
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
            }}
          />
          <img
            src="/bg.png"
            alt="Login background"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-[60px] left-[60px] z-20 flex flex-col gap-1 text-white">
            <h1
              style={{
                fontSize: "42px",
                textDecoration: "underline",
                background: "linear-gradient(90deg, #fac5c8, #9a91ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome Back!,
            </h1>
            <p className="text-[18px] max-w-[450px] leading-[1.6]">
              Login to access your workspace and manage your tasks efficiently.
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full xl:w-[30%] bg-white dark:bg-slate-800 p-[21px] transition-colors duration-300">
          <h1
            className="xl:hidden"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              textAlign: "center",
              paddingTop: "50px",
              fontSize: "40px",
              textDecoration: "underline",
              background: "linear-gradient(90deg, red, blue)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Auto Computation
          </h1>

          <div className="flex items-center justify-center h-full">
            <div className="w-full p-10 flex flex-col gap-6">
              <div>
                <h2 className="text-[28px] font-semibold text-slate-900 dark:text-white">
                  Sign In
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please enter your credentials to continue
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="hello@example.com"
                      value={values.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 sm:h-[50px] sm:text-[16px]
                      bg-white dark:bg-slate-700 text-black dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Your password"
                      value={values.password}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 sm:h-[50px] sm:text-[16px]
                      bg-white dark:bg-slate-700 text-black dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:h-[50px] rounded-md text-white font-medium
                    bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                    active:scale-[0.98] transition-transform duration-200
                    disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
