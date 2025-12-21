const { useState, useEffect } = React;

const TosApp = () => {
    const [buttonState, setButtonState] = useState('red');

    const handleRuleClick = () => {
        if (buttonState === 'red') {
            setButtonState('success');
            setTimeout(() => setButtonState('green'), 3000);
        }
    };

    const rules = [
        { id: 1, t: "No being mean or pushy.", d: "Do not threaten people or use slurs. Do not try to make people angry." },
        { id: 2, t: "No gross or scary images.", d: "No NSFW or gore. This leads to a permanent ban, including in DMs." },
        { id: 3, t: "Be a good person.", d: "Act nice. Do not start drama or annoy staff. Follow all Discord rules." },
        { id: 4, t: "Do not steal information.", d: "Do not ask for passwords or trick people for info. We take threats seriously." },
        { id: 5, t: "Listen to staff.", d: "Staff choose punishments. Follow their judgment. High ranks can change rules." },
        { id: 6, t: "Do not spam.", d: "Do not send the same thing repeatedly. No flooding the chat with images." },
        { id: 7, t: "Keep it peaceful.", d: "Keep extreme thoughts to yourself. This is a safe space for everyone." },
        { id: 8, t: "Do not skip rules.", d: "Do not look for loopholes. Rules must be followed exactly as written." },
        { id: 9, t: "NO GOONING.", d: "No gooning allowed. Doing this results in an instant ban from the project.", red: true },
        { id: 10, t: "Do not be a retard, or do not skid.", d: "just act like a normal person, if we also catch you skidding your blacklisted we dont want skidders in our server." },
        { id: 11, t: "Price Control.", d: "we can change prices and set prices of our executor products, or ANY products that we make to what I choice to. If you got a problem cry about it continue having a problem? That’s a blacklist. — alex", red: true }
    ];

    return (
        <div className="relative z-10">
            <nav className="fixed top-0 w-full bg-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-8 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => window.location.href='../'} className="text-gray-400 hover:text-white flex items-center gap-2 font-bold"><span>← Go back</span></button>
                    <div className="flex items-center gap-2 font-bold text-lg absolute left-1/2 -translate-x-1/2"><img src="../silkwarelogo.png" className="h-8" /><span>Silkware</span></div>
                </div>
            </nav>
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl font-black mb-12 tracking-tighter text-center">Terms of Service</h1>
                <div className="grid gap-4 mb-12">
                    {rules.map(rule => (
                        <div key={rule.id} className={`bg-card border ${rule.red ? 'border-red-500/20' : 'border-white/5'} p-6 rounded-[24px]`}>
                            <h3 className={`font-bold text-lg mb-1 ${rule.red ? 'text-red-500' : 'text-white'}`}>{rule.t}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium">{rule.d}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center">
                    {buttonState === 'red' && <button onClick={handleRuleClick} className="w-full max-w-xl bg-red-600/5 border border-red-600/30 py-8 rounded-[24px] text-red-500 font-black text-sm uppercase tracking-[0.2em] hover:bg-red-600/10 transition-all">Breaking these rules will lead to a blacklist or ban.</button>}
                    {buttonState === 'success' && <div className="w-full max-w-xl bg-brand/5 border border-brand/40 py-8 rounded-[24px] text-center"><p className="text-brand font-black text-xl mb-1">Ty for following the rules!</p><p className="text-brand/50 text-[10px] font-black uppercase tracking-[0.3em]">such a w</p></div>}
                    {buttonState === 'green' && <div className="w-full max-w-xl bg-brand border border-brand py-8 rounded-[24px] text-black font-black text-center">Rules Accepted Successfully</div>}
                </div>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TosApp />);