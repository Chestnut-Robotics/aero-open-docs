import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const STORAGE_KEY = 'aero-hand-tc-agreed';

export function hasAgreedToTerms() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

export function setAgreedToTerms() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, 'true');
}

export function TermsAndConditionsModal({ isOpen, onAgree, onClose }) {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  const handleAgree = () => {
    if (isChecked) {
      setAgreedToTerms();
      onAgree();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Terms and Conditions</h2>
        </div>
        <div className={styles.modalBody}>
          <h3>End User License Agreement (EULA)</h3>
          <p>
            This End User License Agreement ("Agreement") governs the use of physical products and digital design files or assembly manual files provided by Aero Hand (www.chestnut.bot). By downloading digital design files or assembly manual files or purchasing an Aero Hand product, you agree to the terms below.
          </p>

          <h4>1. CAD File Usage (BY-NC-SA License)</h4>
          <p>
            The digital design files or assembly manual files available on our website are licensed under a Creative Commons BY-NC-SA (Attribution-NonCommercial-ShareAlike) license. You may:
          </p>
          <ul>
            <li>Use them for personal, educational, or research purposes</li>
            <li>Modify and share them non-commercially, with attribution</li>
            <li>Distribute derivatives only under the same BY-NC-SA license</li>
          </ul>
          <p>You may not:</p>
          <ul>
            <li>Use the digital design files or assembly manual files or any derivatives for commercial purposes</li>
            <li>Redistribute or sell any physical products derived from these files</li>
            <li>Reverse engineer or exploit the files for commercial benefit</li>
          </ul>
          <p>
            Any commercial use or deviation from this license requires prior written consent. Contact contact@chestnut.bot to negotiate a custom license.
          </p>

          <h4>2. Product Purchase License</h4>
          <p>
            When you purchase an assembled Aero Hand or an assembly kit, you are granted a commercial license to use the physical product. This includes research, product integration, and other commercial applications. However:
          </p>
          <ul>
            <li>You may not reverse engineer or disassemble the product or extract design elements</li>
            <li>You may not reproduce or distribute derivative products based on the purchased unit</li>
          </ul>
          <p>
            This license is tied to the purchased unit and is non-transferable. The Aero Hand incorporates patent-pending technology, and unauthorized reproduction may infringe intellectual property rights.
          </p>

          <h4>3. Commercial Use Terms</h4>
          <p>
            Only officially purchased hardware grants commercial usage rights. Downloading and self-printing the digital design files or assembly manual files does not include any right to commercial use. You are not permitted to use modified versions of the digital design files or assembly manual files commercially, even if you authored the changes, unless a separate commercial license is granted.
          </p>

          <h4>4. Custom Licensing Requests</h4>
          <p>
            If you wish to use the digital design files or assembly manual files or derivatives for commercial purposes, or distribute them under different terms, you must obtain explicit written permission. Please contact contact@chestnut.bot to request a custom license agreement.
          </p>

          <h4>5. Acceptance Upon Purchase</h4>
          <p>
            By purchasing a product from Aero Hand, you agree to the terms of this license.
          </p>

          <h4>6. Enforcement</h4>
          <p>
            <strong>Unauthorized commercial use, redistribution, or reverse engineering of the design, including any derived versions, will be treated as a violation of this agreement and may be subject to legal enforcement.</strong> Derivative works remain subject to this license and may not be relicensed under different terms without written approval.
          </p>
          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className={styles.checkbox}
              />
              <span>I have read and agree to the Terms and Conditions</span>
            </label>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={clsx('button button--secondary', styles.button)}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={clsx('button button--primary', styles.button)}
            onClick={handleAgree}
            disabled={!isChecked}
          >
            Agree and Continue
          </button>
        </div>
      </div>
    </div>
  );
}

