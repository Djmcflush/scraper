import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Proposal {
  id: string;
  title: string;
  content: string;
  date_scraped: string;
}

interface ProposalTableProps {
  proposals: Proposal[];
  onSelect: (proposal: Proposal) => void;
  onGenerateIdeas: (id: string) => void;
}

const ProposalTable: React.FC<ProposalTableProps> = ({ proposals, onSelect, onGenerateIdeas }) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date Scraped</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal, index) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{proposal.title}</TableCell>
              <TableCell>{new Date(proposal.date_scraped).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => onSelect(proposal)}
                >
                  Select
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onGenerateIdeas(proposal.id)}
                >
                  Generate Ideas
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProposalTable;
