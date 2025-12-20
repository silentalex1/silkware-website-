const { useState, useEffect } = React;

const DonationApp = () => {
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            const glow = document.getElementById('cursor-glow');
            if(glow) {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            }
        });
    }, []);

    return (
        <div className="relative z-10 min-h-screen flex flex-col">
            <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <button onClick={() => window.location.href='/'} className="text-gray-400 hover:text-white flex items-center gap-2 font-bold transition-all">
                    <span>← Go back</span>
                </button>
                <div className="flex items-center gap-2 font-bold text-lg">
                    <img src="../silkwarelogo.png" className="h-8" />
                    <span>Silkware</span>
                </div>
                <div className="w-20"></div>
            </nav>

            <main className="flex-1 flex items-center justify-center px-6">
                <div className="donation-card bg-card border border-white/5 p-12 rounded-[48px] text-center max-w-lg w-full shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-50"></div>
                    
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-brand/10 rounded-3xl mb-8">
                        <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-black mb-4 tracking-tighter">Coming soon.</h1>
                    <p className="text-gray-400 font-medium leading-relaxed mb-10">
                        We are working on a way for you to support the project. 
                        Donations will help us pay for servers and keep our tools safe for everyone.
                    </p>

                    <div className="grid gap-3">
                        <div className="bg-white/5 py-4 rounded-2xl border border-white/5 text-gray-500 font-bold text-sm italic">
                            Payment methods are being set up...
                        </div>
                        <button 
                            onClick={() => window.location.href='/'}
                            className="bg-brand text-black font-black py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-lg shadow-brand/10"
                        >
                            Back to Home
                        </button>
                    </div>
                    
                    <p className="mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        Support the future of Silkware
                    </p>
                </div>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DonationApp />);
