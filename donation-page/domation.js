const DonationApp = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="p-6 flex items-center border-b border-white/5">
                <button onClick={() => window.location.href='/'} className="text-gray-400 hover:text-white flex items-center gap-2 font-bold transition-colors">
                    <span>← Go back</span>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-bold text-lg">
                    <img src="../silkwarelogo.png" className="h-8" />
                    <span>Silkware</span>
                </div>
            </nav>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="bg-card border border-white/10 p-12 rounded-[40px] text-center max-w-md w-full coming-soon-box shadow-2xl shadow-black">
                    <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-black mb-4">Coming soon.</h1>
                    <p className="text-gray-400 font-medium leading-relaxed">
                        Our donation page is currently being worked on. We will be back soon so you can support the project.
                    </p>
                    <button onClick={() => window.location.href='/'} className="mt-10 w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-brand transition-colors">
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DonationApp />);
