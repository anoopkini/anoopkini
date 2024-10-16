import '../styles/globals.css';

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
            <body className="antialiased prose mx-auto">
                <div className="flex flex-col min-h-screen px-6 bg-grid-pattern sm:px-12">
                    <div className="flex flex-col w-full max-w-5xl mx-auto grow">
                        {/* <Header /> */}
                        <div className="grow">{children}</div>
                        {/* <Footer /> */}
                        <div className="fixed w-full bg-white left-0 bottom-0 p-3 text-center border-t-2">🚧 Site Under Developement 🚧</div>
                    </div>
                </div>
            </body>
        </html>
    );
}
