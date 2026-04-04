import { css } from '@/styled-system/css';
import { socialLinks } from '@/lib/constants/navigation';
import { Section } from '../section';
// import { Link } from '@/components/ui/Link';

const footerStyles = css({
  color: 'grey.900',
  marginTop: '16',
});

const gridStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '8',
  md: {
    gridTemplateColumns: '1fr 1fr',
  },
  lg: {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },
});

const footerSectionStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '3',
});

const footerTitleStyles = css({
  fontSize: 'base',
  fontWeight: 'semibold',
  color: 'grey.900',
});

// const footerLinkStyles = css({
//   color: 'grey.700',
//   fontSize: 'sm',
//   _hover: {
//     color: 'grey.900',
//   },
// });

const socialContainerStyles = css({
  display: 'flex',
  gap: '4',
  alignItems: 'center',
  marginTop: '2',
});

const socialLinkStyles = css({
  color: 'grey.700',
  _hover: {
    color: 'grey.900',
  },
});

export function Footer() {
  return (
    <footer className={footerStyles}>
      <Section maxWidth="layout" padding="md" background="blue">
        <div className={gridStyles}>
        <div className={footerSectionStyles}>
          <h3 className={footerTitleStyles}>Sportsklubb Frem-31</h3>
          <div className={socialContainerStyles}>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkStyles}
              aria-label="Facebook"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
              </svg>
            </a>
            {/* <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkStyles}
              aria-label="Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a> */}
          </div>
        </div>

        {/* {navigationConfig.footer.map((group, index) => (
          <div key={`${group.title}-${index}`} className={footerSectionStyles}>
            <h3 className={footerTitleStyles}>{group.title}</h3>
            {group.links.map((link, linkIndex) => (
              <Link key={`${link.href}-${linkIndex}`} item={link} className={footerLinkStyles} />
            ))}
          </div>
        ))} */}
        </div>
      </Section>
    </footer>
  );
}
