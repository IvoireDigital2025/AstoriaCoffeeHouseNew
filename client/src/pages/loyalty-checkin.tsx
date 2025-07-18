import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Coffee, Gift, User, Phone, Mail, CheckCircle, MapPin, AlertCircle, Clock, XCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface CheckinResponse {
  message: string;
  customer?: {
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
  const [isLoading, setIsLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'checking' | 'valid' | 'invalid' | 'denied'>('checking');
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenMessage, setTokenMessage] = useState<string>('');
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const { toast } = useToast();

  // Coffee Pro store location: 23-33 Astoria Blvd, Astoria, NY 11102
  const STORE_LOCATION = {
    latitude: 40.7709,
    longitude: -73.9207,
    radius: 100 // meters - adjust as needed
  };

  useEffect(() => {
    validateTokenFromUrl();
    checkLocationPermission();
  }, []);

  const validateTokenFromUrl = async () => {
    try {
      // Get token from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      if (!token) {
        // If no token in URL, generate a new one (when scanning static QR code)
        try {
          const response = await apiRequest('POST', '/api/qr/generate', {});
          setTokenValid(true);
          setTokenMessage('QR code verified successfully!');
          setRemainingTime(response.validFor);
          
          // Start countdown timer
          const timer = setInterval(() => {
            setRemainingTime(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                setTokenValid(false);
                setTokenMessage('Time expired. Please scan a new QR code.');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          return () => clearInterval(timer);
        } catch (error) {
          setTokenValid(false);
          setTokenMessage('Unable to generate access token. Please try scanning the QR code again.');
          return;
        }
      }

      // If token exists in URL, validate it
      const response = await apiRequest('POST', '/api/qr/validate', { token });
      
      if (response.valid) {
        setTokenValid(true);
        setTokenMessage('QR code verified successfully!');
        setRemainingTime(response.remainingTime);
        
        // Start countdown timer
        const timer = setInterval(() => {
          setRemainingTime(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setTokenValid(false);
              setTokenMessage('Time expired. Please scan a new QR code.');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      }
    } catch (error: any) {
      setTokenValid(false);
      setTokenMessage(error.message || 'Invalid or expired QR code. Please scan a new code.');
    }
  };

  const checkLocationPermission = () => {
    if (!navigator.geolocation) {
      setLocationStatus('invalid');
      toast({
        title: "Location Required",
        description: "Your device doesn't support location services. Please check in at the store.",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        
        const distance = calculateDistance(
          latitude, 
          longitude, 
          STORE_LOCATION.latitude, 
          STORE_LOCATION.longitude
        );
        
        if (distance <= STORE_LOCATION.radius) {
          setLocationStatus('valid');
        } else {
          setLocationStatus('invalid');
          toast({
            title: "Location Check Failed",
            description: `You must be within ${STORE_LOCATION.radius}m of Coffee Pro to check in. You're ${Math.round(distance)}m away.`,
            variant: "destructive",
          });
        }
      },
      (error) => {
        console.error('Location error:', error);
        setLocationStatus('denied');
        toast({
          title: "Location Access Denied",
          description: "Please enable location services and reload the page to check in.",
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    );
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const checkinMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const now = new Date();
      const checkinData = {
        ...data,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localTime: now.toISOString(),
      };
      return await apiRequest("POST", "/api/loyalty/checkin", checkinData);
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
    
    // Check token validity first
    if (!tokenValid) {
      toast({
        title: "Invalid Access",
        description: "Please scan the QR code at Coffee Pro to check in.",
        variant: "destructive",
      });
      return;
    }
    
    // Check location
    if (locationStatus !== 'valid') {
      toast({
        title: "Location Check Required",
        description: "You must be at Coffee Pro to check in. Please enable location services and be within the store.",
        variant: "destructive",
      });
      return;
    }
    
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

  // Access denied page for invalid tokens
  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-coffee-cream to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-coffee-medium">{tokenMessage}</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">
                To check in, you must scan the QR code displayed at Coffee Pro. 
                This ensures you're physically present at our store.
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-coffee-medium">
                <strong>Visit Coffee Pro:</strong><br />
                23-33 Astoria Blvd, Astoria, NY 11102
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              
              {checkinResult.customer && (
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
              )}
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
    <div className="min-h-screen bg-gradient-to-b from-coffee-cream to-white p-4">
      {/* Check-in Form */}
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Coffee className="w-16 h-16 text-coffee-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-coffee-dark">Coffee Pro Loyalty Check-in</CardTitle>
            <p className="text-coffee-medium">Earn 1 point per visit • 5 points = 1 FREE Coffee</p>
            
            {/* QR Token Time Remaining */}
            {tokenValid && (
              <div className="mt-4 p-3 rounded-lg border-2 border-green-200 bg-green-50">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Time remaining: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            )}
            
            {/* Location Status Indicator */}
            <div className="mt-4 p-3 rounded-lg border">
              {locationStatus === 'checking' && (
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <MapPin className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Checking location...</span>
                </div>
              )}
              {locationStatus === 'valid' && (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Location verified - You're at Coffee Pro!</span>
                </div>
              )}
              {locationStatus === 'invalid' && (
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Please visit Coffee Pro to check in</span>
                </div>
              )}
              {locationStatus === 'denied' && (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Enable location services to check in</span>
                  </div>
                  <Button 
                    onClick={checkLocationPermission} 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </div>
            
            {/* How It Works */}
            <div className="bg-amber-50 rounded-lg p-4 mt-4 text-left">
              <h4 className="font-bold text-coffee-dark mb-2 text-sm">How Our System Works:</h4>
              <ul className="text-xs text-coffee-medium space-y-1">
                <li>• Each customer has their own account tracked by phone number</li>
                <li>• Your points and visit history are saved automatically</li>
                <li>• Every check-in earns you 1 point toward your next reward</li>
                <li>• Staff can view your total points and visit history</li>
              </ul>
            </div>
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
                    <strong>Returning customer?</strong> We'll recognize you by your phone number and add points to your existing account.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-coffee-primary hover:bg-coffee-medium text-white disabled:bg-gray-400"
                  disabled={checkinMutation.isPending || locationStatus !== 'valid' || !tokenValid}
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  {checkinMutation.isPending ? "Checking in..." : 
                   !tokenValid ? "Invalid Access" :
                   locationStatus === 'valid' ? "Check In" : "Location Required"}
                </Button>
              </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}