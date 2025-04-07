"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { currentUser, trainingSessions, evaluationSessions } from "@/lib/mockData";
import { Edit, Camera, Building, Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";

export function ProfileInfo() {
  // Count completed items
  const completedTraining = trainingSessions.filter(
    s => s.userId === currentUser.id && s.status === "completed"
  ).length;
  
  const completedEvaluations = evaluationSessions.filter(
    s => s.userId === currentUser.id && s.status === "completed"
  ).length;
  
  return (
    <div className="grid gap-6 md:grid-cols-7">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>
                  {currentUser.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-bold">{currentUser.name}</h2>
            <p className="text-muted-foreground">{currentUser.position}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{currentUser.department}</span>
            </div>
            <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {new Date(currentUser.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Last login: {new Date(currentUser.lastLogin).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6 md:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
            <CardDescription>
              A brief description about yourself
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Experienced product manager with a background in SaaS and enterprise software. Passionate about creating intuitive user experiences and driving product innovation through data-driven decisions.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Product Management</Badge>
                <Badge variant="secondary">UX Design</Badge>
                <Badge variant="secondary">Agile Methodology</Badge>
                <Badge variant="secondary">Data Analysis</Badge>
                <Badge variant="secondary">Strategic Planning</Badge>
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>
              Your training and evaluation summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold">{completedTraining}</div>
                <p className="text-sm text-muted-foreground">Training Completed</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{
                  trainingSessions.filter(s => s.userId === currentUser.id && s.status === "in_progress").length
                }</div>
                <p className="text-sm text-muted-foreground">Training in Progress</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{completedEvaluations}</div>
                <p className="text-sm text-muted-foreground">Evaluations Completed</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {evaluationSessions.filter(s => s.userId === currentUser.id && s.score)
                    .reduce((sum, s) => sum + (s.score || 0), 0) / 
                    Math.max(1, evaluationSessions.filter(s => s.userId === currentUser.id && s.score).length)}%
                </div>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
