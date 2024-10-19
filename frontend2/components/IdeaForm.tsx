import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IdeaFormProps {
  onSubmit: (idea: string) => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(idea);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="idea" className="text-sm font-medium text-gray-700">
          Enter Your Idea
        </Label>
        <Input
          id="idea"
          type="text"
          placeholder="Enter idea for proposal"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          required
          className="mt-1 w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Generate Proposal
      </Button>
    </form>
  );
};

export default IdeaForm;
