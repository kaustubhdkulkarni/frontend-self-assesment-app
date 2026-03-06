import { useState } from "react";
// import { useAuth } from "@/contexts/AuthContext"; // Updated path based on new structure
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Lock, User } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  // const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // Mocking login for software skill assessment flow
      const mockData = {
        accessToken: "mock-jwt-token",
        user: { id: "1", username, role: "developer" }
      };
      // login(mockData.accessToken, mockData.user);
      navigate("/color");
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ED4C14]/10 mb-4">
            <Lock className="w-8 h-8 text-[#ED4C14]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">SkillCheck Pro</h1>
          <p className="text-muted-foreground mt-2">Software Development Assessment Portal</p>
        </div>

        <Card className="border-t-4 border-t-[#ED4C14] shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Access your assessment dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="username" 
                    placeholder="Enter your username" 
                    className="pl-10 focus-visible:ring-[#ED4C14]"
                    required 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    className="pr-10 focus-visible:ring-[#ED4C14]"
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#ED4C14]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#ED4C14] hover:bg-[#d44512] text-white py-6 text-lg font-semibold transition-all">
                Login to Portal
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
          <p className="text-sm text-blue-800">
            <strong>Forgot Password?</strong> <br />
            Please contact the administrator to request a new password.
          </p>
        </div>
      </div>
    </div>
  );
}