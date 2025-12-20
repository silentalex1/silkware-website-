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
        { id: 1, icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", t: "No being mean or pushy.", d: "Do not threaten people or use slurs. Do not try to make people angry." },
        { id: 2, icon: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21", t: "No gross or scary images.", d: "No NSFW or gore. This leads to a permanent ban, including in DMs." },
        { id: 3, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", t: "Be a good person.", d: "Act nice. Do not start drama or annoy staff. Follow all Discord rules." },
        { id: 4, icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", t: "Do not steal information.", d: "Do not ask for passwords or trick people for info. We take threats seriously." },
        { id: 5, icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", t: "Listen to staff.", d: "Staff choose punishments. Follow their judgment. High ranks can change rules." },
        { id: 6, icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z", t: "Do not spam.", d: "Do not send the same thing repeatedly. No flooding the chat with images." },
        { id: 7, icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", t: "Keep it peaceful.", d: "Keep extreme thoughts to yourself. This is a safe space for everyone." },
        { id: 8, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", t: "Do not skip rules.", d: "Do not look for loopholes. Rules must be followed exactly as written." },
        { id: 9, icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", t: "NO GOONING.", d: "No gooning allowed. Doing this results in an instant ban from the project.", red: true }
    ];

    return (
        <div className="relative z-10">
            <nav className="fixed top-0 w-full bg-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-8 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => window.location.href='/'} className="text-gray-400 hover:text-white flex items-center gap-2 font-bold">
                        <span>← Go back</span>
                    </button>
                    <div className="flex items-center gap-2 font-bold text-lg absolute left-1/2 -translate-x-1/2">
                        <img src="../silkwarelogo.png" className="h-8" />
                        <span>Silkware</span>
                    </div>
                    <div className="w-20"></div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-16 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand/10 blur-[100px] rounded-full"></div>
                    <h1 className="text-5xl font-black mb-4 tracking-tighter">Terms of Service</h1>
                    <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">Rules & Regulations</p>
                </div>

                <div className="grid gap-4 mb-12">
                    {rules.map(rule => (
                        <div key={rule.id} className={`rule-card bg-card border ${rule.red ? 'border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]' : 'border-white/5'} p-6 rounded-[24px] relative overflow-hidden group`}>
                            <div className="flex gap-5 relative z-10">
                                <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${rule.red ? 'bg-red-500/10 text-red-500' : 'bg-brand/5 text-brand'} border border-white/5`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={rule.icon}></path></svg>
                                </div>
                                <div>
                                    <h3 className={`font-bold text-lg mb-1 ${rule.red ? 'text-red-500' : 'text-white'}`}>{rule.t}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{rule.d}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center mt-20">
                    {buttonState === 'red' && (
                        <button 
                            onClick={handleRuleClick}
                            className="w-full max-w-xl bg-red-600/5 border border-red-600/30 py-8 rounded-[24px] text-red-500 font-black text-sm uppercase tracking-[0.2em] hover:bg-red-600/10 hover:border-red-600 transition-all duration-500"
                        >
                            Breaking these rules will lead to a blacklist or ban.
                        </button>
                    )}

                    {buttonState === 'success' && (
                        <div className="w-full max-w-xl bg-brand/5 border border-brand/40 py-8 rounded-[24px] text-center shadow-[0_0_40px_rgba(0,255,85,0.1)]">
                            <p className="text-brand font-black text-xl mb-1">Ty for following the rules!</p>
                            <p className="text-brand/50 text-[10px] font-black uppercase tracking-[0.3em]">such a w</p>
                        </div>
                    )}

                    {buttonState === 'green' && (
                        <div className="w-full max-w-xl bg-brand border border-brand py-8 rounded-[24px] text-black font-black text-center shadow-[0_0_40px_rgba(0,255,85,0.2)]">
                            Rules Accepted Successfully
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TosApp />);
