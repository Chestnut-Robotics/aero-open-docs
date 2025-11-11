import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { TermsAndConditionsModal, hasAgreedToTerms, setAgreedToTerms } from '@site/src/components/TermsAndConditions';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const handleDocsClick = (e) => {
    if (!hasAgreedToTerms()) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const handleAgree = () => {
    setAgreedToTerms();
    setShowModal(false);
    history.push('/docs/intro');
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
              onClick={handleDocsClick}>
              Aero Hand Open Documentation
            </Link>
          </div>
        </div>
      </header>
      <TermsAndConditionsModal
        isOpen={showModal}
        onAgree={handleAgree}
        onClose={handleClose}
      />
    </>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
