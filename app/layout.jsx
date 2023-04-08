import './globals.css';
import Footer from './Footer';
import Header from './Header';

export default ({ children }) => {
  return (
    <html>
      <body
        className="bg-cover text-gray-50 bg-blend-soft-light bg-gray-900 min-h-screen"
        style={{
          backgroundImage: 'url(https://source.unsplash.com/5f0QAmE7I3Q)',
        }}
      >
        <Header />
        <div className="">{children}</div>
        <Footer />
      </body>
    </html>
  );
};
