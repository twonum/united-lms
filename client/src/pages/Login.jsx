/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import StarryBackground from "@/components/StarryBackground";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
      reset: resetRegister,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      reset: resetLogin,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;

    if (
      type === "signup" &&
      (!inputData.name || !inputData.email || !inputData.password)
    ) {
      toast.error("Please fill out all fields for signup.");
      return;
    }
    if (type === "login" && (!inputData.email || !inputData.password)) {
      toast.error("Please fill out all fields for login.");
      return;
    }

    const action = type === "signup" ? registerUser : loginUser;
    try {
      await action(inputData).unwrap(); // Use unwrap to handle errors explicitly
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // Errors will now be handled via toast logic in the `useEffect`
    }
  };

  useEffect(() => {
    // Handle register success
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      resetRegister(); // Clear state after success
    }

    // Handle register error
    if (registerError) {
      const errorMessage =
        registerError?.data?.message ||
        registerError?.error ||
        "Signup failed.";
      toast.error(errorMessage);
      resetRegister(); // Clear state after error
    }

    // Handle login success
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/"); // Redirect to home page
      resetLogin(); // Clear state after success
    }

    // Handle login error
    if (loginError) {
      const errorMessage =
        loginError?.data?.message || loginError?.error || "Login failed.";
      toast.error(errorMessage);
      resetLogin(); // Clear state after error
    }
  }, [
    registerIsSuccess,
    registerError,
    registerData,
    loginIsSuccess,
    loginError,
    loginData,
  ]);
  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Starry Background */}
      <StarryBackground />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-full max-w-xl px-6 py-8">
          <h1 className="text-white text-4xl font-bold mb-6 text-center">
            United LMS
          </h1>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="signup"
                className="text-white hover:underline"
              >
                Signup
              </TabsTrigger>
              <TabsTrigger value="login" className="text-white hover:underline">
                Login
              </TabsTrigger>
            </TabsList>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <Card className="bg-transparent border border-[#ffffff50] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Signup</CardTitle>
                  <CardDescription className="text-white opacity-70">
                    Create a new account and click signup when you&apos;re done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-white">
                      Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={signupInput.name}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="Eg. John Doe"
                      required
                      className="bg-transparent border-2 border-white text-white focus:border-[#00F798] focus:ring-0"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={signupInput.email}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="Eg. john.doe@gmail.com"
                      required
                      className="bg-transparent border-2 border-white text-white focus:border-[#00F798] focus:ring-0"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={signupInput.password}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="Enter a strong password"
                      required
                      className="bg-transparent border-2 border-white text-white focus:border-[#00F798] focus:ring-0"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    disabled={
                      registerIsLoading ||
                      !signupInput.name ||
                      !signupInput.email ||
                      !signupInput.password
                    }
                    onClick={() => handleRegistration("signup")}
                    className="w-full bg-transparent text-white border-2 border-[#00F798] hover:border-[#00F798] hover:bg-transparent hover:ring-0 hover:ring-[#00F798] hover:ring-offset-2 transition-all duration-300"
                  >
                    {registerIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        wait
                      </>
                    ) : (
                      "Signup"
                    )}
                  </Button>
                  {/* <Button className="w-full bg-transparent text-white border-2 border-white hover:bg-gray-200 hover:text-black hover:shadow-lg flex items-center justify-center space-x-2 transition-all duration-300">
                    <img
                      src="/google.svg"
                      alt="Google Logo"
                      className="h-5 w-5"
                    />
                    <span>Continue with Google</span>
                  </Button> */}
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card className="bg-transparent border border-[#ffffff50] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Login</CardTitle>
                  <CardDescription className="text-white opacity-70">
                    Login with your email and password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={loginInput.email}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="Eg. john.doe@gmail.com"
                      required
                      className="bg-transparent border-2 border-white text-white focus:border-[#00F798] focus:ring-0"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={loginInput.password}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="Enter your password"
                      required
                      className="bg-transparent border-2 border-white text-white focus:border-[#00F798] focus:ring-0"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    disabled={
                      loginIsLoading ||
                      !loginInput.email ||
                      !loginInput.password
                    }
                    onClick={() => handleRegistration("login")}
                    className="w-full bg-transparent text-white hover:bg-transparent border-2 border-[#00F798] hover:border-[#00F798] hover:ring-0 hover:ring-[#00F798] hover:ring-offset-2 transition-all duration-300"
                  >
                    {loginIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        wait
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  {/* <Button className="w-full bg-transparent text-white border-2 border-white hover:bg-gray-200 hover:text-black hover:shadow-lg flex items-center justify-center space-x-2 transition-all duration-300">
                    <img
                      src="/google.svg"
                      alt="Google Logo"
                      className="h-5 w-5"
                    />
                    <span>Continue with Google</span>
                  </Button> */}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
