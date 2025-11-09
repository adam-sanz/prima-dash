import { useEffect, useRef } from 'react';
import type { User } from '@/features/users/types/user.types';
import styles from './UserDetailModal.module.css';

/*
 * Modal dialog showing user details
 *
 * Features:
 * - Keyboard navigation (Escape to close, Tab for focus)
 * - Click outside overlay to close
 * - Prevents body scroll when open
 * - Auto-focus on close button
 * - ARIA compliant for screen readers
 *
 * @param user - The user object to display
 * @param onClose - Callback function called when modal should close
 *
 * @example
 * ```tsx
 * {selectedUser ? (
 *   <UserDetailModal
 *     user={selectedUser}
 *     onClose={() => setSelectedUser(null)}
 *   />
 * ): null}
 * ```
 */
interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

/* TODO: Add focus management for accessibility */
export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    /* Prevent body scroll and compensate for scrollbar to prevent layout shift */
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab as EventListener);

    return () => {
      modal.removeEventListener('keydown', handleTab as EventListener);
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className={styles.header}>
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            className={styles.avatar}
          />
          <div className={styles.headerInfo}>
            <h2 id="modal-title" className={styles.name}>
              {user.name}
            </h2>
            <span
              className={`${styles.role} ${styles[user.role.toLowerCase()]}`}
            >
              {user.role}
            </span>
          </div>
          <span className={`${styles.status} ${styles[user.status]}`}>
            {user.status}
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>
            <dl className={styles.detailsList}>
              <div className={styles.detailItem}>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${user.email}`} className={styles.link}>
                    {user.email}
                  </a>
                </dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${user.phone}`} className={styles.link}>
                    {user.phone}
                  </a>
                </dd>
              </div>
              <div className={styles.detailItem}>
                <dt>University</dt>
                <dd>{user.university}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Address</h3>
            <address className={styles.address}>
              {user.address.street}
              <br />
              {user.address.city}, {user.address.state} {user.address.zipcode}
              <br />
              {user.address.country}
            </address>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Company</h3>
            <dl className={styles.detailsList}>
              <div className={styles.detailItem}>
                <dt>Name</dt>
                <dd>{user.company.name}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Title</dt>
                <dd>{user.company.title}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Department</dt>
                <dd>{user.company.department}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
