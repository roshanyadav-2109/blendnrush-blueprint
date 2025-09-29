import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield } from "lucide-react";

export function TestCredentials() {
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-lg">Test Credentials</CardTitle>
          <CardDescription>
            Use these accounts for testing purposes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-500" />
              <Badge variant="destructive">Admin Account</Badge>
            </div>
            <div className="bg-muted p-3 rounded-lg text-sm font-mono">
              <div><strong>Email:</strong> admin@blendnrush.com</div>
              <div><strong>Password:</strong> admin123</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              <Badge variant="secondary">Customer Account</Badge>
            </div>
            <div className="bg-muted p-3 rounded-lg text-sm font-mono">
              <div><strong>Email:</strong> customer@test.com</div>
              <div><strong>Password:</strong> customer123</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}