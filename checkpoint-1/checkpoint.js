const { useState, useEffect } = React;

const CheckpointApp = () => {
    const [step, setStep] = useState(1);
    const [isChecking, setIsChecking] = useState(false);
    const [clickTime, setClickTime] = useState(0);
    const [error, setError] = useState(false);
    const [keyData, setKeyData] = useState(null);
    const [savedKeysModal, setSavedKeysModal] = useState(false);
    const [savedKeys, setSavedKeys] = useState(JSON.parse(localStorage.getItem('silk_keys') || "[]"));

    const links = {
        1: "https://work.ink/27Tr/ypomvhuy",
        2: "https://work.ink/27Tr/checkpoint-02",
        3: "https://work.ink/27Tr/ffft3jcz"
    };

    useEffect(() => {
        const handleFocus = () => {
            if (!isChecking) return;
            const elapsed = Date.now() - clickTime;
            if (elapsed > 10000) {
                if (step < 3) {
                    setStep(s => s + 1);
                    setIsChecking(false);
                } else {
                    fetchKey();
                }
            } else {
                setError(true);
                setIsChecking(false);
            }
        };

        window.addEventListener('focus', handleFocus);
        window.addEventListener('mousemove', (e) => {
            const glow = document.getElementById('cursor-glow');
            if(glow) {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            }
        });
        return () => window.removeEventListener('focus', handleFocus);
    }, [isChecking, clickTime, step]);

    const handleActionClick = () => {
        window.open(links[step], '_blank');
        setClickTime(Date.now());
        setIsChecking(true);
        setError(false);
    };

    const fetchKey = async () => {
        setStep(4);
        setIsChecking(false);
        try {
            const res = await fetch("https://SilkWareTM.pythonanywhere.com/add_key?duration=6h");
            const data = await res.json();
            setKeyData({
                val: data.key,
                expires: new Date(data.expires_at).toLocaleString(),
                timestamp: new Date(data.expires_at).getTime()
            });
        } catch(e) {
            const ts = Date.now() + (6 * 60 * 60 * 1000);
            setKeyData({
                val: "SILK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
                expires: new Date(ts).toLocaleString(),
                timestamp: ts
            });
        }
    };

    const Timer = ({ expiry }) => {
        const [timeLeft, setTimeLeft] = useState("");
        useEffect(() => {
            const interval = setInterval(() => {
                const diff = expiry - Date.now();
                if (diff <= 0) {
                    setTimeLeft("0:0:0");
                    clearInterval(interval);
                } else {
                    const h = Math.floor(diff / 3600000);
                    const m = Math.floor((diff % 3600000) / 60000);
                    const s = Math.floor((diff % 60000) / 1000);
                    setTimeLeft(`${h}:${m}:${s}`);
                }
            }, 1000);
            return () => clearInterval(interval);
        }, [expiry]);
        return <span>{timeLeft}</span>;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
            <nav className="fixed top-0 w-full bg-dark/50 backdrop-blur-md py-4 px-8 flex justify-between items-center z-50 border-b border-white/5">
                <button onClick={() => window.location.href='../'} className="text-gray-400 hover:text-white flex items-center gap-2 font-bold">
                    <span>← Go Back</span>
                </button>
                <div className="flex items-center gap-2 font-bold text-lg absolute left-1/2 -translate-x-1/2">
                    <img src="../silkwarelogo.png" className="h-8" />
                    <span>Silkware</span>
                </div>
                <button onClick={() => setSavedKeysModal(true)} className="text-gray-400 hover:text-white font-bold">Keys</button>
            </nav>

            <div className="w-full max-w-md bg-card border border-white/5 rounded-[40px] p-10 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent"></div>
                <h1 className="text-4xl font-black mb-2 tracking-tighter">{step > 3 ? "Complete" : `Checkpoint ${step}`}</h1>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-12">Step <span className="text-brand">{step > 3 ? 3 : step}</span> of 3</p>

                {error && <p className="text-red-500 text-xs font-bold mb-6 italic">Check return status failed</p>}
                {isChecking && <p className="text-gray-400 text-xs font-bold animate-pulse mb-6">Verifying return...</p>}

                {step <= 3 ? (
                    <button onClick={handleActionClick} className="w-full bg-brand text-black font-black py-4 rounded-2xl hover:scale-[1.02] transition-all mb-10 flex items-center justify-center gap-2 text-sm shadow-lg shadow-brand/10">
                        Get Key Here
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </button>
                ) : (
                    <div className="mb-10 text-left">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-4">
                            <span className="text-brand font-mono text-xl block truncate">{keyData?.val}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase mt-4 block">Ends: {keyData?.expires}</span>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => {
                                const local = JSON.parse(localStorage.getItem('silk_keys') || "[]");
                                local.push({ key: keyData.val, exp: keyData.timestamp, dateString: keyData.expires });
                                localStorage.setItem('silk_keys', JSON.stringify(local));
                                setSavedKeys(local);
                                alert("Key saved.");
                            }} className="flex-1 bg-brand text-black font-bold py-3 rounded-xl text-sm">Save key</button>
                            <button onClick={() => window.location.href='../'} className="flex-1 bg-white/5 border border-white/10 font-bold py-3 rounded-xl text-sm">Close</button>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-brand transition-all duration-1000" style={{width: `${(Math.min(step, 3)/3)*100}%`}}></div>
                    </div>
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex justify-between">
                        <span>Waiting...</span>
                        <span>{Math.round((Math.min(step, 3)/3)*100)}%</span>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase mb-8 tracking-[0.2em]">Instructions</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {[ {n:1, t:"Click Button"}, {n:2, t:"Complete Link"}, {n:3, t:"Return Here"} ].map(i => (
                            <div key={i.n} className="flex flex-col gap-2">
                                <span className="text-white font-bold">{i.n}</span>
                                <span className="text-[10px] text-gray-600 font-bold leading-tight">{i.t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {savedKeysModal && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 text-left">
                    <div className="bg-card border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-bold">Active Keys</h3>
                            <button onClick={() => setSavedKeysModal(false)} className="text-gray-500 hover:text-white">✕</button>
                        </div>
                        <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
                            {savedKeys.length === 0 ? 
                                <p className="text-gray-500 text-sm text-center py-4">No keys saved.</p> : 
                                savedKeys.map((k, i) => (
                                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-brand font-mono text-sm">{k.key}</span>
                                            <span className="text-brand text-xs font-black tracking-widest"><Timer expiry={k.exp} /></span>
                                        </div>
                                        <div className="text-[9px] text-gray-600 font-bold uppercase">Ends: {k.dateString}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CheckpointApp />);
