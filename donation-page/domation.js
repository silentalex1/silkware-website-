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

    const devs = [
        {
            name: "azreuf",
            pfp: "gojopfp.png",
            bio: "Project Owner",
            link: "https://www.paypal.com/ncp/payment/E9VCYQ2YSHTQG"
        },
        {
            name: "TheRealHyder",
            pfp: "dogpfp.png",
            bio: "I love femboys ❤️",
            link: "https://www.paypal.com/ncp/payment/E9VCYQ2YSHTQG"
        },
        {
            name: "Gio",
            pfp: null,
            bio: "Developer",
            link: null
        }
    ];

    return (
        <div className="relative z-10 min-h-screen flex flex-col pb-20">
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

            <main className="max-w-4xl mx-auto w-full px-6 pt-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black mb-4 tracking-tighter">Support Developers</h1>
                    <p className="text-gray-500 font-medium">Help keep Silkware running.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {devs.map((dev, idx) => (
                        <div key={idx} className="bg-card border border-white/5 p-8 rounded-[40px] flex flex-col items-center text-center group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand/10 group-hover:bg-brand/30 transition-all"></div>
                            
                            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 overflow-hidden mb-6 flex items-center justify-center">
                                {dev.pfp ? (
                                    <img src={dev.pfp} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">updating..</span>
                                )}
                            </div>
                            
                            <h3 className="text-2xl font-black mb-1 tracking-tight">{dev.name}</h3>
                            <p className="text-gray-400 text-sm mb-8 font-bold italic">{dev.bio}</p>

                            {dev.link ? (
                                <button 
                                    onClick={() => window.open(dev.link, '_blank')}
                                    className="w-full bg-brand text-black font-black py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-lg shadow-brand/10 flex items-center justify-center gap-2"
                                >
                                    Donation Link
                                </button>
                            ) : (
                                <div className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl text-gray-600 font-black flex items-center justify-center">
                                    <div className="flex items-center gap-2 animate-pulse">
                                        <span>Updating..</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DonationApp />);
