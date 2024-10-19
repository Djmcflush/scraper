import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface Proposal {
  title: string;
  content: string;
}

interface ProposalDetailsProps {
  show: boolean;
  handleClose: () => void;
  proposal: Proposal;
}

const ProposalDetails: React.FC<ProposalDetailsProps> = ({ show, handleClose, proposal }) => {
  return (
    <Dialog open={show} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{proposal.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{proposal.content}</p>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalDetails;
