import React from 'react';
import { Button } from '@/components/ui/button';

interface IdeaListProps {
  ideas: string[];
  onSelect: (idea: string) => void;
}

const IdeaList: React.FC<IdeaListProps> = ({ ideas, onSelect }) => {
  return (
    <ul className="space-y-2">
      {ideas.map((idea, index) => (
        <li key={index} className="flex items-center justify-between bg-background p-2 rounded-md">
          <span className="text-sm">{idea}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(idea)}
          >
            Select
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default IdeaList;
