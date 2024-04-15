'use client';

import Error from 'next/error';

// This is a catch-all page for 404 errors other than the dashboard

function NotFoundPage() {
  return (
    <html>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}

export default NotFoundPage;
