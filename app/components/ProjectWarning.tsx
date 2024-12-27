'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ProjectWarning() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    const warning = document.getElementById('project-warning');
    if (warning) {
      warning.style.opacity = '0';
      warning.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        setIsDismissed(true);
      }, 300);
    } else {
      setIsDismissed(true);
    }
  };

  return (
    <Card
      id="project-warning"
      className="fixed top-4 right-4 z-50 max-w-md p-4 transition-all duration-300 ease-in-out"
    >
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          This is a work in progress. Some features may not work as expected.
        </p>
        <Button variant="outline" size="sm" onClick={handleDismiss}>
          Dismiss
        </Button>
      </div>
    </Card>
  );
}
