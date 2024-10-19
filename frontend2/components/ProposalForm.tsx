import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import IdeaList from './IdeaList';
import IdeaForm from './IdeaForm';

interface ProposalFormProps {
  ideas: string[];
  onGenerate: (idea: string) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ ideas, onGenerate }) => {
  const [showIdeaForm, setShowIdeaForm] = useState(false);

  const handleSelectIdea = (idea: string) => {
    onGenerate(idea);
  };

  const handleCustomIdea = (idea: string) => {
    onGenerate(idea);
    setShowIdeaForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4 text-primary">Select an Idea</h2>
        <IdeaList ideas={ideas} onSelect={handleSelectIdea} />
      </div>
      <div className="bg-card rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4 text-primary">Or Enter a Custom Idea</h2>
        {!showIdeaForm ? (
          <Button onClick={() => setShowIdeaForm(true)}>
            Enter Custom Idea
          </Button>
        ) : (
          <IdeaForm onSubmit={handleCustomIdea} />
        )}
      </div>
    </div>
  );
};

export default ProposalForm;
