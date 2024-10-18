import SiteUnderConstruction from 'components/global/SiteUnderConstruction';
import '../styles/globals.css';
import Navbar from 'components/global/Navbar';

export const metadata = {
    title: {
        template: '%s | Anoop Kini',
        default: 'Hello World!'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="light" className='scroll-smooth'>
            {/* <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head> */}
            <body id="top" className="antialiased prose mx-auto">
                <div className="flex flex-col min-h-screen px-6 bg-grid-pattern sm:px-12">
                    <div className="flex flex-col w-full mx-auto grow">
                        {/* <Header /> */}
                        <div className="relative"><Navbar /></div>
                        <div className="grow">{children}</div>
                        {/* <Footer /> */}
                        {/* <SiteUnderConstruction /> */}
                    </div>
                </div>
            </body>
        </html>
    );
}

