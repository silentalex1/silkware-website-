const { useState, useEffect, useRef } = React;

const App = () => {
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [word, setWord] = useState('Safe');
    const [mobileMenu, setMobileMenu] = useState(false);
    const faqRef = useRef(null);
    const [modals, setModals] = useState({
        about: false,
        suggestions: false,
        downloadChoice: false,
        executorSoon: false,
        thankYou: false,
        paypalSoon: false
    });

    const words = ['Safe', 'Stable', 'Smooth', 'Fast'];

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        let i = 0;
        setInterval(() => {
            i = (i + 1) % words.length;
            setWord(words[i]);
        }, 3000);
        window.addEventListener('mousemove', (e) => {
            const glow = document.getElementById('cursor-glow');
            if(glow) {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            }
        });
    }, []);

    const toggleModal = (name, val) => {
        setModals(prev => ({ ...prev, [name]: val }));
        if(val) setMobileMenu(false);
    };

    const scrollToFaq = () => {
        if (faqRef.current) faqRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center gap-4">
                <img src="silkwarelogo.png" className="w-12 h-12" />
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-brand w-0 animate-[load_1s_ease_forwards]"></div></div>
            </div>
        );
    }

    return (
        <div className="relative z-10">
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/5 py-4' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
                    <div className="flex items-center gap-3 font-bold text-xl cursor-pointer" onClick={() => window.location.reload()}>
                        <img src="silkwarelogo.png" className="h-8" />
                        <span>Silkware</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <button onClick={() => toggleModal('about', true)} className="hover:text-white">About</button>
                        <button onClick={() => window.location.href='changelogs/'} className="hover:text-white">Change Log</button>
                        <button onClick={() => toggleModal('suggestions', true)} className="hover:text-white">Suggestions</button>
                        <button onClick={() => window.location.href='tos/'} className="hover:text-white">tos</button>
                        <button onClick={() => window.location.href='donation-page/'} className="hover:text-white">donate to project</button>
                        <button onClick={() => toggleModal('downloadChoice', true)} className="hover:text-white">Download</button>
                        <button onClick={() => window.location.href='checkpoint-1/'} className="bg-white text-black px-5 py-2 rounded-full hover:bg-brand font-bold">Get Started</button>
                    </div>
                    <button onClick={() => setMobileMenu(true)} className="lg:hidden text-2xl">＝</button>
                </div>
            </nav>

            <div className={`fixed inset-0 z-[100] transition-all duration-500 ${mobileMenu ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${mobileMenu ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileMenu(false)}></div>
                <div className={`absolute right-0 top-0 h-full w-72 bg-card border-l border-white/10 p-8 flex flex-col gap-6 transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                    <button onClick={() => toggleModal('about', true)} className="text-left text-gray-400 font-bold">About</button>
                    <button onClick={() => window.location.href='changelogs/'} className="text-left text-gray-400 font-bold">Change Log</button>
                    <button onClick={() => toggleModal('suggestions', true)} className="text-left text-gray-400 font-bold">Suggestions</button>
                    <button onClick={() => window.location.href='tos/'} className="text-left text-gray-400 font-bold">TOS</button>
                    <button onClick={() => window.location.href='donation-page/'} className="text-left text-gray-400 font-bold">Donate</button>
                    <button onClick={() => toggleModal('downloadChoice', true)} className="text-left text-gray-400 font-bold">Download</button>
                    <button onClick={() => window.location.href='checkpoint-1/'} className="bg-brand text-black py-4 rounded-xl font-black mt-auto">Get Started</button>
                </div>
            </div>

            <main className="pt-48 pb-20 px-6 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 bg-brand/5 border border-brand/20 px-4 py-1.5 rounded-full text-brand text-xs font-bold mb-8">
                    <div className="w-1.5 h-1.5 bg-brand rounded-full pulse"></div>
                    <span>Version 1.0.4 Updated</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.1]">Silkware: The <span className="text-brand transition-all duration-500">{word}</span><br />Best lua scripting app.</h1>
                <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10">Experience the best safe, undetected executor. Silkware works better than the rest for Roblox.</p>
                <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={() => toggleModal('downloadChoice', true)} className="bg-brand text-black font-bold px-8 py-3.5 rounded-xl hover:scale-105 transition-all">Download Silkware</button>
                    <button onClick={scrollToFaq} className="bg-white/5 border border-white/10 font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10">Read FAQ</button>
                </div>

                <section className="mt-40 w-full max-w-5xl">
                    <h2 className="text-3xl font-black mb-10 tracking-tighter">Premium Plans</h2>
                    <div className="grid md:grid-cols-4 gap-6 text-left">
                        {[
                            { name: "3 Days", price: "150", link: "https://create.roblox.com/dashboard/creations/experiences/8350019780/passes/1639186558/overview" },
                            { name: "1 Month", price: "50", link: "https://create.roblox.com/dashboard/creations/experiences/8350019780/passes/1639454470/overview" },
                            { name: "3 Months", price: "500", link: "https://create.roblox.com/dashboard/creations/experiences/8350019780/passes/1639308505/overview" },
                            { name: "Lifetime", price: "500", link: "https://create.roblox.com/dashboard/creations/experiences/8350019780/passes/1639040146/overview" }
                        ].map((plan, i) => (
                            <div key={i} className="bg-card border border-white/5 p-6 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-brand/20"></div>
                                <h3 className="font-bold text-gray-400 mb-2 uppercase text-xs tracking-widest">{plan.name}</h3>
                                <div className="text-3xl font-black mb-6">{plan.price} <span className="text-sm font-medium text-gray-500">Robux</span></div>
                                <div className="space-y-3">
                                    <button onClick={() => window.open(plan.link, '_blank')} className="w-full bg-brand text-black font-bold py-2 rounded-xl text-sm">Buy here</button>
                                    <button onClick={() => toggleModal('paypalSoon', true)} className="w-full bg-white/5 border border-white/10 font-bold py-2 rounded-xl text-sm hover:bg-white/10">Buy with PayPal</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-gray-500 text-sm font-medium">prices may change so read <span className="text-brand cursor-pointer font-bold" onClick={() => window.location.href='tos/'}>tos</span> if they do.</p>
                </section>

                <section ref={faqRef} className="mt-40 w-full max-w-3xl text-left">
                    <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-card border border-white/5 rounded-2xl p-6">
                            <h3 className="font-bold mb-2 text-lg">API Information (sUNC / UNC)</h3>
                            <p className="text-gray-400">We currently use the 95 UNC Based Xeno Module Quorum API. We are planning our own custom API soon for even better performance.</p>
                        </div>
                    </div>
                </section>
            </main>

            {modals.paypalSoon && (
                <div className="fixed inset-0 z-[220] bg-black/95 flex items-center justify-center p-6">
                    <div className="bg-card border border-white/10 p-8 rounded-[32px] max-w-sm w-full text-center">
                        <h3 className="text-2xl font-bold mb-4">PayPal payments coming soon for now it’s Robux.</h3>
                        <p className="text-gray-500 mb-8 text-sm">make sure to check <span className="text-brand cursor-pointer font-bold" onClick={() => window.location.href='tos/'}>tos</span> in case if we change any prices.</p>
                        <button onClick={() => toggleModal('paypalSoon', false)} className="bg-brand text-black w-full py-3 rounded-xl font-bold">ok</button>
                    </div>
                </div>
            )}

            {modals.downloadChoice && (
                <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-card border border-white/10 p-8 rounded-[32px] max-w-md w-full text-center">
                        <h3 className="text-2xl font-bold mb-2">Select Version</h3>
                        <p className="text-gray-400 mb-8 text-sm">Do you want to download silkware silent or silkware executor?</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => window.location.href="https://github.com/shadowdih20-cloud/SetupSilkWareDownload/releases/download/executor/SilKWareSetup.exe"} className="bg-white/5 border border-white/10 py-4 rounded-xl font-bold flex items-center justify-center gap-3">⚡ Silkware Silent</button>
                            <button onClick={() => toggleModal('executorSoon', true)} className="bg-brand text-black py-4 rounded-xl font-bold flex items-center justify-center gap-3">📥 Silkware Executor</button>
                        </div>
                        <button onClick={() => toggleModal('downloadChoice', false)} className="mt-6 text-gray-500 text-sm">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);