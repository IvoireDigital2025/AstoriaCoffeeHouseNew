import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Coffee, Gift, User, Phone, Mail, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface CheckinResponse {
  message: string;
  customer: {
    id: number;
    name: string;
    currentPoints: number;
    totalVisits: number;
    totalRewards: number;
  };
  earnedReward: boolean;
  pointsToNextReward: number;
}

export default function LoyaltyCheckin() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [checkinResult, setCheckinResult] = useState<CheckinResponse | null>(null);
  const { toast } = useToast();

  const checkinMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("/api/loyalty/checkin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data: CheckinResponse) => {
      setCheckinResult(data);
      toast({
        title: data.earnedReward ? "🎉 Congratulations!" : "✅ Check-in Successful",
        description: data.message,
      });
      // Reset form
      setFormData({ name: "", phone: "", email: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Check-in Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    checkinMutation.mutate(formData);
  };

  const handleStartOver = () => {
    setCheckinResult(null);
    setFormData({ name: "", phone: "", email: "" });
  };

  if (checkinResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-coffee-cream to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {checkinResult.earnedReward ? (
                <Gift className="w-16 h-16 text-green-600" />
              ) : (
                <CheckCircle className="w-16 h-16 text-blue-600" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-coffee-dark">
              {checkinResult.earnedReward ? "Free Coffee Earned!" : "Check-in Complete"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-coffee-medium mb-4">{checkinResult.message}</p>
              
              <div className="bg-coffee-cream/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-coffee-medium">Current Points:</span>
                  <span className="font-bold text-coffee-dark">{checkinResult.customer.currentPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-medium">Total Visits:</span>
                  <span className="font-bold text-coffee-dark">{checkinResult.customer.totalVisits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-medium">Total Rewards:</span>
                  <span className="font-bold text-coffee-dark">{checkinResult.customer.totalRewards}</span>
                </div>
                {!checkinResult.earnedReward && (
                  <div className="flex justify-between">
                    <span className="text-coffee-medium">Points to Next Reward:</span>
                    <span className="font-bold text-coffee-primary">{checkinResult.pointsToNextReward}</span>
                  </div>
                )}
              </div>
            </div>

            {checkinResult.earnedReward && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-medium">
                  Please show this screen to the barista to claim your free coffee!
                </p>
              </div>
            )}

            <Button 
              onClick={handleStartOver}
              className="w-full bg-coffee-primary hover:bg-coffee-medium text-white"
            >
              <Coffee className="w-4 h-4 mr-2" />
              New Check-in
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-cream to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Coffee className="w-16 h-16 text-coffee-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-coffee-dark">Coffee Pro Loyalty</CardTitle>
          <p className="text-coffee-medium">Scan QR code & check-in for rewards</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-coffee-dark">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-medium w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="pl-10 focus:border-coffee-primary focus:ring-coffee-primary"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-coffee-dark">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-medium w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                  className="pl-10 focus:border-coffee-primary focus:ring-coffee-primary"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-coffee-dark">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-medium w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="pl-10 focus:border-coffee-primary focus:ring-coffee-primary"
                  required
                />
              </div>
            </div>

            <div className="bg-coffee-cream/30 rounded-lg p-4 text-center">
              <p className="text-sm text-coffee-medium">
                <strong>How it works:</strong> Get 1 point per visit. Earn a free coffee at 5 points!
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-coffee-primary hover:bg-coffee-medium text-white"
              disabled={checkinMutation.isPending}
            >
              <Coffee className="w-4 h-4 mr-2" />
              {checkinMutation.isPending ? "Checking in..." : "Check In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}