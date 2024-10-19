import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (response.ok) {
        router.push('/proposals');
      } else {
        console.error('Failed to scrape URL');
      }
    } catch (error) {
      console.error('Error scraping URL:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-primary">Government Military Proposal Generator</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Enter a URL to scrape and generate proposals.
          </p>
          <form onSubmit={handleScrape} className="space-y-4">
            <Input
              type="url"
              placeholder="Enter URL to scrape"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Scrape and Generate Proposals
            </Button>
          </form>
        </div>
      </main>
      <footer className="bg-muted py-4 text-center text-muted-foreground">
        <p>&copy; 2023 Government Military Proposal Generator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
