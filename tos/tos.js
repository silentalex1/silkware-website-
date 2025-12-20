const { useState, useEffect } = React;

const TosApp = () => {
    const [buttonState, setButtonState] = useState('red');

    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            const glow = document.getElementById('cursor-glow');
            if(glow) {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            }
        });
    }, []);

    const handleRuleClick = () => {
        if (buttonState === 'red') {
            setButtonState('success');
            setTimeout(() => {
                setButtonState('green');
            }, 3000);
        }
    };

    const rules = [
        { id: 1, t: "No being mean or pushy.", d: "Do not threaten people or use bad slurs. Do not try to make people angry on purpose." },
        { id: 2, t: "No gross or scary images.", d: "Do not post porn or scary gore. This leads to a permanent ban even in private messages." },
        { id: 3, t: "Be a good person.", d: "Act nice to everyone. Do not start drama or annoy staff. Follow all Discord rules." },
        { id: 4, t: "Do not steal information.", d: "Do not ask for passwords or trick people for info. We take threats very seriously." },
        { id: 5, t: "Listen to staff.", d: "Staff choose punishments. You must follow their judgment. High ranks can change rules anytime." },
        { id: 6, t: "Do not spam.", d: "Do not send the same thing over and over. No flooding the chat with images or text." },
        { id: 7, t: "Keep it peaceful.", d: "Keep extreme thoughts to yourself. This is a safe space for every person." },
        { id: 8, t: "Do not skip rules.", d: "Do not look for loopholes. Rules are meant to be followed as they are written." },
        { id: 9, t: "NO GOONING.", d: "No gooning allowed. Doing this results in an instant ban from the project.", red: true }
    ];

    return (
        <div className="relative z-10">
            <nav className="fixed top-0 w-full bg-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-8 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => window.location.href='/'} className="text-gray-400 hover:text-white flex items-center gap-2 font-bold">
                        <span>← Go back</span>
                    </button>
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <img src="../silkwarelogo.png" className="h-8" />
                        <span>Silkware</span>
                    </div>
                    <div className="w-20"></div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black mb-4 tracking-tighter">Terms of Service</h1>
                    <p className="text-gray-500 font-medium">Please read and follow our rules to stay in the project.</p>
                </div>

                <div className="grid gap-4 mb-12">
                    {rules.map(rule => (
                        <div key={rule.id} className={`rule-card bg-card border ${rule.red ? 'border-red-500/30' : 'border-white/5'} p-6 rounded-2xl`}>
                            <div className="flex gap-4">
                                <span className={`font-black ${rule.red ? 'text-red-500' : 'text-brand'}`}>#{rule.id}</span>
                                <div>
                                    <h3 className={`font-bold mb-1 ${rule.red ? 'text-red-500' : 'text-white'}`}>{rule.t}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{rule.d}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center">
                    {buttonState === 'red' && (
                        <button 
                            onClick={handleRuleClick}
                            className="w-full max-w-2xl bg-red-600/10 border border-red-600 py-6 rounded-2xl text-red-500 font-bold hover:bg-red-600 hover:text-white transition-all duration-300"
                        >
                            Breaking these rules will lead to a blacklist or ban.
                        </button>
                    )}

                    {buttonState === 'success' && (
                        <div className="w-full max-w-2xl bg-brand/10 border border-brand py-6 rounded-2xl text-center animate-pulse">
                            <p className="text-brand font-black text-lg">Ty for following the rules!</p>
                            <p className="text-brand/60 text-xs font-bold uppercase tracking-widest mt-1">such a w</p>
                        </div>
                    )}

                    {buttonState === 'green' && (
                        <div className="w-full max-w-2xl bg-brand border border-brand py-6 rounded-2xl text-black font-black text-center shadow-lg shadow-brand/20">
                            You are following the rules.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TosApp />);
