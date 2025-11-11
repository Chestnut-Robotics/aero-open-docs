import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import { TermsAndConditionsModal, hasAgreedToTerms, setAgreedToTerms } from '@site/src/components/TermsAndConditions';

// This component wraps the entire app and intercepts navigation to docs routes
export default function Root({ children }) {
  const location = useLocation();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);

  useEffect(() => {
    // Check if user is trying to access docs without agreeing
    const isDocsRoute = location.pathname.startsWith('/docs');
    
    if (isDocsRoute && !hasAgreedToTerms() && !showModal) {
      // Store the path they were trying to access
      setPendingPath(location.pathname);
      // Show the modal
      setShowModal(true);
      // Redirect back to home
      if (location.pathname !== '/') {
        history.replace('/');
      }
    }
  }, [location.pathname, history, showModal]);

  const handleAgree = () => {
    setAgreedToTerms();
    setShowModal(false);
    // Navigate to the pending path or default docs intro
    const targetPath = pendingPath || '/docs/intro';
    setPendingPath(null);
    history.push(targetPath);
  };

  const handleClose = () => {
    setShowModal(false);
    setPendingPath(null);
  };

  return (
    <>
      {children}
      <TermsAndConditionsModal
        isOpen={showModal}
        onAgree={handleAgree}
        onClose={handleClose}
      />
    </>
  );
}

