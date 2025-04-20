
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FileInputProps {
  id: string;
  label: string;
  fileName: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FileInput = ({ id, label, fileName, required = false, onChange, className }: FileInputProps) => {
  return (
    <div className={cn("mb-4", className)}>
      <div className="mb-4 flex flex-col items-center">
        <Label htmlFor={id} className="flex items-center gap-2 min-h-[40px]">
          {label} <code className="text-xs bg-muted px-1 py-0.5 rounded">{fileName}</code>
        </Label>
      </div>
      <Input
        id={id}
        type="file"
        accept="application/json"
        required={required}
        onChange={onChange}
        className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90 h-10 flex items-center"
      />
    </div>
  );
};

export default FileInput;
