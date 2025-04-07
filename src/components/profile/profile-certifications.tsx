import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Download, FileText, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProfileCertifications() {
  const certifications = [
    {
      id: "cert1",
      name: "Sales Professional Certification",
      issuer: "DigitalAgents.io",
      date: "May 15, 2025",
      expires: "May 15, 2026",
      score: 92,
    },
    {
      id: "cert2",
      name: "Customer Service Excellence",
      issuer: "DigitalAgents.io",
      date: "March 3, 2025",
      expires: "March 3, 2026",
      score: 88,
    },
  ];
  
  // Mock available certifications
  const availableCertifications = [
    {
      id: "avail1",
      name: "Advanced Sales Techniques",
      description: "Master advanced sales methodologies and closing techniques",
      level: "Advanced",
      duration: "4 hours",
    },
    {
      id: "avail2",
      name: "Leadership Fundamentals",
      description: "Essential leadership skills for new and aspiring managers",
      level: "Intermediate",
      duration: "6 hours",
    },
    {
      id: "avail3",
      name: "Product Knowledge Master",
      description: "Comprehensive overview of product features and benefits",
      level: "Beginner",
      duration: "3 hours",
    },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Certifications</CardTitle>
          <CardDescription>
            Certifications you've earned through training and evaluations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {certifications.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {certifications.map(cert => (
                <Card key={cert.id} className="border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Issued by {cert.issuer} on {cert.date}
                          </p>
                        </div>
                      </div>
                      <Badge>{cert.score}%</Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Expiration:</span>
                        <span>{cert.expires}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No certifications yet</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                Complete training modules and evaluations to earn certifications.
              </p>
              <Button>
                Browse Available Certifications
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Certifications</CardTitle>
          <CardDescription>
            Certifications you can earn through our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {availableCertifications.map(cert => (
              <div key={cert.id} className="flex items-start justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">{cert.level}</Badge>
                    <Badge variant="outline">{cert.duration}</Badge>
                  </div>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Enroll
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}