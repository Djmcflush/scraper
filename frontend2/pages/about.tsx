import React from 'react';
import Navbar from '../components/Navbar';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-primary">About Government Military Proposal Generator</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The Government Military Proposal Generator is an advanced tool designed to streamline the process of creating and managing proposals for military projects.
            </p>
            <p>
              Our system leverages cutting-edge algorithms and data analysis techniques to generate innovative ideas and create comprehensive proposals tailored to specific military needs.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Automated idea generation based on current military trends and needs</li>
              <li>Comprehensive proposal creation and management</li>
              <li>Integration with existing government and military databases</li>
              <li>Secure and confidential handling of sensitive information</li>
              <li>Advanced analytics for proposal optimization</li>
            </ul>
            <p className="mt-6">
              Our goal is to enhance the efficiency and effectiveness of military project planning and execution. By automating and optimizing the proposal generation process, we enable military personnel to focus on strategic decision-making and implementation.
            </p>
            <p className="mt-6">
              For more information or support, please contact our team at{' '}
              <a href="mailto:support@militaryproposalgenerator.com" className="text-primary hover:underline">
                support@militaryproposalgenerator.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-muted py-4 text-center text-muted-foreground">
        <p>&copy; 2023 Government Military Proposal Generator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
