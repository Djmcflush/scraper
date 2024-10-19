import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProposalTable from '../components/ProposalTable';
import ProposalDetails from '../components/ProposalDetails';
import IdeaList from '../components/IdeaList';
import { Button } from '@/components/ui/button';

interface Proposal {
  id: string;
  title: string;
  content: string;
  date_scraped: string;
}

const ProposalsPage: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/proposals`);
      if (response.ok) {
        const data = await response.json();
        setProposals(data);
      } else {
        console.error('Failed to fetch proposals');
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  const handleSelectProposal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIdeas([]);
    setSelectedIdea(null);
  };

  const handleGenerateIdeas = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/proposals/${id}/ideas`);
      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      } else {
        console.error('Failed to generate ideas');
      }
    } catch (error) {
      console.error('Error generating ideas:', error);
    }
  };

  const handleSelectIdea = (idea: string) => {
    setSelectedIdea(idea);
  };

  const handleGenerateProposal = async () => {
    if (!selectedProposal || !selectedIdea) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/proposals/${selectedProposal.id}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: selectedIdea }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Generated proposal:', data);
        // Handle the generated proposal (e.g., display it, update the list, etc.)
        alert('Proposal generated successfully!');
        fetchProposals(); // Refresh the proposals list
      } else {
        console.error('Failed to generate proposal');
      }
    } catch (error) {
      console.error('Error generating proposal:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-primary">Proposals</h1>
          <ProposalTable 
            proposals={proposals} 
            onSelect={handleSelectProposal} 
            onGenerateIdeas={handleGenerateIdeas} 
          />
          {selectedProposal && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Selected Proposal</h2>
              <ProposalDetails 
                show={!!selectedProposal} 
                handleClose={() => setSelectedProposal(null)} 
                proposal={selectedProposal} 
              />
            </div>
          )}
          {ideas.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Generated Ideas</h2>
              <IdeaList ideas={ideas} onSelect={handleSelectIdea} />
            </div>
          )}
          {selectedIdea && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Selected Idea</h2>
              <p className="mb-4">{selectedIdea}</p>
              <Button onClick={handleGenerateProposal}>Generate Proposal</Button>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-muted py-4 text-center text-muted-foreground">
        <p>&copy; 2023 Government Military Proposal Generator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProposalsPage;
