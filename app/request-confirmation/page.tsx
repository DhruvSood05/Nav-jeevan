import Link from "next/link"
import { CheckCircle, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RequestConfirmationPage() {
  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Help Request Submitted</CardTitle>
          <CardDescription>Your request has been sent to nearby volunteers and NGOs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="font-medium">Request ID</div>
            <div className="text-sm text-muted-foreground">#RC-2025-0001</div>
          </div>

          <div>
            <div className="font-medium">Status</div>
            <div className="text-sm text-orange-500 font-medium">Pending - Looking for volunteers</div>
          </div>

          <div>
            <div className="font-medium">Emergency Type</div>
            <div className="text-sm text-muted-foreground">Medical Emergency</div>
          </div>

          <div>
            <div className="font-medium">Urgency Level</div>
            <div className="text-sm text-yellow-500 font-medium">Medium - Need Help Soon</div>
          </div>

          <div>
            <div className="font-medium">Location</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Coordinates: 37.7749, -122.4194</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center mb-2">
            You will receive SMS notifications when a volunteer accepts your request
          </div>
          <Link href="/map" className="w-full">
            <Button className="w-full" variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              View on Nav Jeevan Map
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
