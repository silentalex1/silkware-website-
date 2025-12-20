const { useState, useEffect } = React;

const App = () => {
    const [view, setView] = useState('home');
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [word, setWord] = useState('Safe');
    const [modals, setModals] = useState({
        about: false,
        suggestions: false,
        downloadChoice: false,
        silentSoon: false,
        thankYou: false
    });

    const words = ['Safe', 'Stable', 'Smooth', 'Fast'];

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        
        let i = 0;
        const interval = setInterval(() => {
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

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    const toggleModal = (name, val) => {
        setModals(prev => ({ ...prev, [name]: val }));
    };

    const handleDownloadExecutor = () => {
        window.location.href = "https://github.com/shadowdih20-cloud/SetupSilkWareDownload/releases/download/executor/SilKWareSetup.exe";
        toggleModal('downloadChoice', false);
        setTimeout(() => toggleModal('thankYou', true), 1500);
    };

    const submitSuggestion = async () => {
        const user = document.getElementById('s-user').value;
        const text = document.getElementById('s-text').value;
        if(!user || !text) return alert("Fill both boxes.");

        const webhook = "https://discord.com/api/webhooks/1452036770848964871/WNFTuWfZCkujiFU3SLc1oCUFcvZpB_NyAsrtz8I-5HKss7bBxpx_auihKp0F7scOKxAO";
        const data = {
            embeds: [{
                title: "New executor suggestion",
                color: 65365,
                fields: [
                    { name: "Discord Username", value: user },
                    { name: "Suggestion", value: text }
                ]
            }]
        };

        try {
            await fetch(webhook, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
            alert("Sent successfully.");
            toggleModal('suggestions', false);
        } catch(e) { alert("Error sending."); }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center gap-4">
                <img src="silkwarelogo.png" className="w-12 h-12" />
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand w-0 animate-[load_1s_ease_forwards]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-10">
            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/5 py-4' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
                    <div className="flex items-center gap-3 font-bold text-xl cursor-pointer" onClick={() => window.location.reload()}>
                        <img src="silkwarelogo.png" className="h-8" />
                        <span>Silkware</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <button onClick={() => toggleModal('about', true)} className="hover:text-white transition-colors">About</button>
                        <button onClick={() => toggleModal('suggestions', true)} className="hover:text-white transition-colors">Suggestions</button>
                        <button onClick={() => toggleModal('downloadChoice', true)} className="hover:text-white transition-colors">Download</button>
                        <button onClick={() => window.location.href='checkpoint-1/index.html'} className="bg-white text-black px-5 py-2 rounded-full hover:bg-brand transition-all font-bold">Get Started</button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <main className="pt-48 pb-20 px-6 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 bg-brand/5 border border-brand/20 px-4 py-1.5 rounded-full text-brand text-xs font-bold mb-8 hero-animate">
                    <div className="w-1.5 h-1.5 bg-brand rounded-full shadow-[0_0_8px_#00ff55] pulse"></div>
                    <span>Version 1.2 Updated</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.1] hero-animate">
                    Silkware: The <span className="text-brand transition-all duration-500">{word}</span><br />
                    Best lua scripting app.
                </h1>
                
                <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10 hero-animate">
                    Experience the best safe, undetected executor. Silkware works better than the rest for Roblox.
                </p>

                <div className="flex flex-col md:flex-row gap-4 hero-animate">
                    <button onClick={() => toggleModal('downloadChoice', true)} className="bg-brand text-black font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-brand/10">
                        <span>Download Silkware</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                    <button onClick={() => document.getElementById('faq').scrollIntoView({behavior:'smooth'})} className="bg-white/5 border border-white/10 font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all">
                        Read FAQ
                    </button>
                </div>

                {/* FAQ */}
                <section id="faq" class="mt-40 w-full max-w-3xl hero-animate">
                    <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4 text-left">
                        {[
                            {q: "API Information (sUNC / UNC)", a: "We currently use the 95 UNC Based Xeno Module Quorum API. We are planning our own custom API soon for even better performance."},
                            {q: "Official Discord Server", a: "Join our official community for support and updates: <a href='https://discord.gg/pQpFTTiP' target='_blank' class='text-brand font-bold'>Click to Join</a>"}
                        ].map((item, idx) => (
                            <div key={idx} className="bg-card border border-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-2 text-lg">{item.q}</h3>
                                <p className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{__html: item.a}}></p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Modals Component */}
            {modals.downloadChoice && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-card border border-white/10 p-8 rounded-3xl max-w-md w-full text-center">
                        <h3 className="text-2xl font-bold mb-2 text-white">Select Version</h3>
                        <p className="text-gray-400 mb-8">Do you want to download silkware silent or silkware executor?</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => toggleModal('silentSoon', true)} className="bg-white/5 border border-white/10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">Silkware Silent</button>
                            <button onClick={handleDownloadExecutor} className="bg-brand text-black py-4 rounded-xl font-bold hover:scale-[1.02] transition-all">Silkware Executor</button>
                        </div>
                        <button onClick={() => toggleModal('downloadChoice', false)} className="mt-6 text-gray-500 text-sm hover:text-white">Cancel</button>
                    </div>
                </div>
            )}

            {modals.silentSoon && (
                <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-6">
                    <div className="bg-card border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center">
                        <h3 className="text-2xl font-bold mb-2">Coming soon.</h3>
                        <p className="text-gray-400 mb-6">silkware silent is coming soon, our api devs are working there ass off to make silkware silent possible.</p>
                        <button onClick={() => toggleModal('silentSoon', false)} className="bg-brand text-black w-full py-3 rounded-xl font-bold">ok</button>
                    </div>
                </div>
            )}

            {modals.thankYou && (
                <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-6">
                    <div className="bg-card border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center">
                        <div className="text-brand text-4xl mb-4 text-center flex justify-center">✓</div>
                        <h3 className="text-xl font-bold mb-4">Thank you for downloading silkware.</h3>
                        <button onClick={() => toggleModal('thankYou', false)} className="bg-brand text-black w-full py-3 rounded-xl font-bold">Close</button>
                    </div>
                </div>
            )}

            {modals.suggestions && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6">
                    <div className="bg-card border border-white/10 p-8 rounded-3xl max-w-lg w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Suggestions</h3>
                            <button onClick={() => toggleModal('suggestions', false)} className="text-gray-500 hover:text-white text-2xl">✕</button>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Enter your discord username:</label>
                                <input id="s-user" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-brand transition-all" placeholder="Username#0000" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Enter your suggestion for our dev team to improve our executor :)</label>
                                <textarea id="s-text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-brand transition-all h-32 no-resize" placeholder="Your idea..."></textarea>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={submitSuggestion} className="bg-brand text-black font-bold px-10 py-3 rounded-xl hover:scale-105 transition-all">Submit suggestion.</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modals.about && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6" onClick={() => toggleModal('about', false)}>
                    <div className="bg-card border border-white/10 p-8 rounded-3xl max-w-md w-full text-center" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">About Silkware</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">Section In Development. This part of the website is currently being worked on for a future update.</p>
                        <button onClick={() => toggleModal('about', false)} className="bg-white/10 text-white w-full py-3 rounded-xl font-bold hover:bg-white/20">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
