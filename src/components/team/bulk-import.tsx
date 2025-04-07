"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BulkImport() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleProcessFile = () => {
    if (!file) return;
    
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      setHasUploaded(true);
    }, 2000);
  };

  return (
    <Tabs defaultValue="upload">
      <TabsList>
        <TabsTrigger value="upload">Upload CSV</TabsTrigger>
        <TabsTrigger value="template">Download Template</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Bulk Import Team Members</CardTitle>
            <CardDescription>
              Upload a CSV file with employee information to add multiple team members at once.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!hasUploaded ? (
              <>
                <div
                  className={`border-2 border-dashed rounded-lg p-10 text-center ${
                    dragging ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <UploadCloud className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Drop your CSV file here</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <Input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="csv-upload"
                    onChange={handleFileChange}
                  />
                  <Button variant="outline" onClick={() => document.getElementById("csv-upload")?.click()}>
                    <FileText className="mr-2 h-4 w-4" />
                    Select CSV File
                  </Button>
                </div>
                
                {file && (
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button onClick={handleProcessFile} disabled={processing}>
                        {processing ? "Processing..." : "Process File"}
                      </Button>
                    </div>
                  </div>
                )}
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    The CSV file should include headers: Name, Email, Department, Position, Role (admin, manager, or employee).
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success</AlertTitle>
                  <AlertDescription className="text-green-800">
                    The team members were imported successfully. They have been invited via email.
                  </AlertDescription>
                </Alert>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Import Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Total records processed:</div>
                    <div className="font-medium">5</div>
                    <div>Successfully imported:</div>
                    <div className="font-medium text-green-600">5</div>
                    <div>Errors:</div>
                    <div className="font-medium">0</div>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => {
                    setFile(null);
                    setHasUploaded(false);
                  }}>
                    Import Another File
                  </Button>
                  <Button>
                    View Team Members
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="template" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Download Template</CardTitle>
            <CardDescription>
              Use this template as a starting point for your team import.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">team-import-template.csv</p>
                    <p className="text-xs text-muted-foreground">
                      CSV Template with required headers
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  Download Template
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Template Format</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your CSV file should contain the following columns:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Name</th>
                      <th className="text-left p-2 font-medium">Email</th>
                      <th className="text-left p-2 font-medium">Department</th>
                      <th className="text-left p-2 font-medium">Position</th>
                      <th className="text-left p-2 font-medium">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">John Smith</td>
                      <td className="p-2">john@example.com</td>
                      <td className="p-2">Sales</td>
                      <td className="p-2">Sales Representative</td>
                      <td className="p-2">employee</td>
                    </tr>
                    <tr>
                      <td className="p-2">Jane Doe</td>
                      <td className="p-2">jane@example.com</td>
                      <td className="p-2">Marketing</td>
                      <td className="p-2">Marketing Manager</td>
                      <td className="p-2">manager</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}